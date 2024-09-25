import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Initialise the OpenAI library to communicate with the OpenAI APIs
const openai = new OpenAI();

export default async function handler(req, res) {
    try {
        // Get the options from the form
        const { language, category } = req.body;

        // The template for the quiz
        const QuizTemplate = z.object({
            quizQuestions: z.array(
                z.object({
                    question: z.string(),
                    imagePrompt: z.string(),
                    mnemonic: z.string()
                })
            )
        });

        // Set up the system prompt and generate the quiz.
        const messages = [
            { role: "system", content: "You are a professional language coach who is a master at creating vocabulary quizzes to practise learning words. Each quiz you create is exactly 4 questions long, and consists of a question which is a single word in the specified language and vocabulary category. Each question must be a different word. For each question you will also provide an imagePrompt written in English that is a single short simple phrase that can be given to DALL-E to generate an image that represents the question word. Each question also has a mnemonic that the student can use to memorise the word if they answer the question wrong."},
            { role: "user", content: `Give me a quiz to learn ${category} in ${language}.` }
        ];

        // Generate the response to the prompt with GPT-4o mini
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o-mini",
            response_format: {
                type: "json_schema",
                json_schema: zodResponseFormat(QuizTemplate, "quiz").json_schema
            }
        });

        // Retrieve and parse the quiz
        const quiz = JSON.parse(completion.choices[0].message.content);

        // For each question generate an image with DALL-E
        const imagePromises = quiz.quizQuestions.map(q => openai.images.generate({ 
            model: "dall-e-2", 
            prompt: q.imagePrompt, 
            response_format: "b64_json",
            size: "256x256"
        }));

        // Wait for all the images to be generated
        const imageResults = await Promise.all(imagePromises);

        // Add the base64 image to each quiz question
        imageResults.forEach((result, index) => {
            quiz.quizQuestions[index].imageb64 = result.data[0].b64_json;
        });

        // Send the quiz data back to the UI.
        res.status(200).json(quiz);
    } catch (error) {
        // Return an error message if the request failed
        res.status(500).json({ error: "Failed to generate quiz" });
    }
}
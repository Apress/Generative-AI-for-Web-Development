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
                    choices: z.array(z.object({
                        id: z.number(),
                        text: z.string()
                    })),
                    answerId: z.number(),
                    mnemonic: z.string()
                })
            )
        });

        // Set up the system prompt and generate the quiz.
        const messages = [
            { role: "system", content: "You are a professional language coach who is a master at creating multiple choice vocabulary quizzes to practise learning words. Each quiz you create is exactly 10 questions long, with 4 choices and exactly 1 correct answer. Each question is a single word in the foreign language and vocabulary category specified, and the options are possible translations of the word in english. All of the choices for a given word must be different. Each question also has a mnemonic that the student can use to memorise the correct translation if they answer the question wrong."},
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

        // Send the quiz data back to the UI.
        res.status(200).json(quiz);
    } catch (error) {
        // Return an error message if the request failed
        res.status(500).json({ error: "Failed to generate quiz" });
    }
}
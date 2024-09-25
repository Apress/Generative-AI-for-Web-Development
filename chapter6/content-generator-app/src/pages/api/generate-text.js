import OpenAI from "openai";

// Initialise the OpenAI library to communicate with the OpenAI APIs
const openai = new OpenAI();

export default async function handler(req, res) {
    try {
        // Get the text prompt from the form
        const { prompt } = req.body;

        // Set up the system prompt and the prompt from the form
        const messages = [
            { role: "system", content: "Respond in a friendly tone."},
            { role: "user", content: prompt }
        ];

        // Generate the response to the prompt with GPT-4o mini
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o-mini",
            // The following parameters are optional and shown 
            // to illustrate how to alter them
            max_tokens: 500,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        // Retrieve the response text
        const result = completion.choices[0].message.content;

        // Send the response text to display in the UI
        res.status(200).json({ result });
    } catch (error) {
        // Return an error message if the request failed
        res.status(500).json({ error: 'Failed to generate' });
    }
}
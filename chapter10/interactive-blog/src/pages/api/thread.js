import { openai } from "@/lib/openai";

export default async function handler(req, res) {
    try {
        const thread = await openai.beta.threads.create();

        // Send the result to display in the UI
        res.status(200).json({ threadId: thread.id });
    } catch (error) {
        // Return an error message if the request failed
        res.status(500).json({ error: 'Failed to create thread' });
    }
}
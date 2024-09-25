import { openai } from "@/lib/openai";

// Get the assistant ID from the .env file
const assistant_id = process.env.ASSISTANT_ID;

function removeCitations(input) {
    // This function removes the citations - text between the characters 【 and 】- that 
    // the assistant inserts that indentify where in the custom data information in the 
    // generated responses came from.
    return input.replace(/【[^】]*】/g, '');
}

export default async function handler(req, res) {
    try {
        // Get the thread ID and message text
        const { threadId, message } = req.body;

        // Set response headers to stream the text from the Chat API
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Transfer-Encoding', 'chunked');

        // Add the new message to the thread
        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: message,
          });

        // Generate the response to the message and stream it to the UI
        await openai.beta.threads.runs.stream(threadId, { assistant_id })
            .on('textDelta', (textDelta) => { 
                res.write(removeCitations(textDelta.value));
                res.flush();
            })
            .on('end', () => {
                // Close the stream when the response has finished generating
                if (!res.writableEnded) {
                    res.end();
                }
            });

    } catch (error) {
        // Return an error message if the request failed
        res.status(500).json({ error: 'Failed to generate response' });
    }
}
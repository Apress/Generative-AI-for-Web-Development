import OpenAI from "openai";

// Initialise the OpenAI library to communicate with the OpenAI APIs
const openai = new OpenAI();

export default async function handler(req, res) {
    try {
        // Get the image prompt from the form
        const { prompt } = req.body;

         // Generate the image
         const image = await openai.images.generate({ 
            model: "dall-e-3", 
            prompt: prompt, 
            // The following parameters are optional and shown 
            // to illustrate how to alter them
            quality: "standard",
            response_format: "url",
            size: "1024x1024"
        });

        // Retrieve the generated image URL
        const result = image.data[0].url;

        // Send the result to display in the UI
        res.status(200).json({ result });
    } catch (error) {
        // Return an error message if the request failed
        res.status(500).json({ error: 'Failed to generate' });
    }
}
# Chapter 10 - Interactive Blog

This project is the final result from Chapter 10 **Building a Blog with a Custom Chatbot** where we build a blog with a custom chatbot to allow users to ask questions and have conversation about the content of the blog posts.

## Running the app

First install all required packages by running:

```bash
npm install
```

Then rename `.env.template` to `.env` and in the file paste in your OpenAI API key:

```conf
OPENAI_API_KEY=<paste key here>
```

and also paste your `Assistant ID` from the OpenAI platform:

```conf
ASSISTANT_ID=<paste Assistant ID here>
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

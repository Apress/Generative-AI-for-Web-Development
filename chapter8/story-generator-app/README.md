# Chapter 8 - Story Generator

This project is the final result from Chapter 8 **Building a Story Generator** where we build an app to generate stories with illustrations. The app contains two features, a story generator for creating short stories and poetry, and a library page for viewing and reading stories.

## Running the app

First install all required packages by running:

```bash
npm install
```

Then rename `.env.template` to `.env` and in the file paste in your OpenAI API key:

```conf
OPENAI_API_KEY=<paste key here>
```

The first time you run the app you will need to create the SQLite database for saving the stories:

```bash
npx prisma db push
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

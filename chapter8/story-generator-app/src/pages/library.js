import { useState } from 'react';
import prisma from '@/lib/prisma';

export async function getServerSideProps() {
  const stories = await prisma.story.findMany();
  return {
    props: { stories },
  };
}

export default function StoriesPage({ stories }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  if (stories.length > 0) {
    const { text, illustrationb64 } = stories[currentStoryIndex];

    return (
      <div className="container">
        <div className="story">
          <p className="story-text">{text}</p>
          <img
            className="story-image"
            src={`data:image/png;base64,${illustrationb64}`}
            alt="Story Illustration"
          />
        </div>
        <div className="navigation">
          <button onClick={handlePrevious} disabled={currentStoryIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={currentStoryIndex === stories.length - 1}>
            Next
          </button>
        </div>
        <style jsx>{`
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Georgia', serif;
            background-color: #f5f5f5;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .story {
            text-align: center;
          }
          .story-text {
            font-size: 18px;
            line-height: 1.6;
            color: #333;
            white-space: pre-line;
          }
          .story-image {
            max-width: 100%;
            height: auto;
            margin-top: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }
          button {
            background-color: #0070f3;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
          button:disabled {
            background-color: #aaa;
            cursor: not-allowed;
          }
          button:hover:enabled {
            background-color: #005bb5;
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div className="container">
        <p className="label-text">No stories generated</p>
        <style jsx>{`
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .label-text {
            text-align: center;
            font-size: 18px;
            line-height: 1.6;
          }
        `}</style>
      </div>
    );
  }
}

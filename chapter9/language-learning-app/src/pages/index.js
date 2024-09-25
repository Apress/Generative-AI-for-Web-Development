// pages/index.js
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleTileClick = (path) => {
    router.push(path);
  };

  return (
    <div className="container">
      <div className="tile" onClick={() => handleTileClick('/translating-quiz')}>
        Translating Quiz
      </div>
      <div className="tile" onClick={() => handleTileClick('/spelling-quiz')}>
        Spelling Quiz
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f4f8;
        }

        .tile {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: 200px;
          margin: 0 20px;
          border-radius: 50%;
          border: 4px solid;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          color: #333;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .tile:first-child {
          border-color: blue;
        }

        .tile:last-child {
          border-color: red;
        }

        .tile:hover {
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}

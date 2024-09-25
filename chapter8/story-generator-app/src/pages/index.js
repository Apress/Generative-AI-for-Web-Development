import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  const navigateTo = (url) => {
    router.push(url);
  };

  return (
    <div className="container">
      <div className="tile" onClick={() => navigateTo('/story-generator')}>
        <span>Generate Story</span>
      </div>
      <div className="tile" onClick={() => navigateTo('/library')}>
        <span>View Library</span>
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
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 5px solid;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin: 0 20px;
        }
        .tile:first-of-type {
          border-color: green;
        }
        .tile:last-of-type {
          border-color: blue;
        }
        .tile:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

import { useState } from 'react';

export default function StoryGenerator() {
  const [mainCharacter, setMainCharacter] = useState('');
  const [plot, setPlot] = useState('');
  const [ending, setEnding] = useState('');
  const [genre, setGenre] = useState('Fantasy');
  const [literature, setLiterature] = useState('story'); // New state for literature type
  const [story, setStory] = useState('');
  const [illustrationb64, setIllustrationb64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const requestBody = {
      mainCharacter,
      plot,
      ending,
      genre,
      literature, // Include the literature type in the request
    };

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      setStory(data.story);
      setIllustrationb64(data.illustrationb64);
    } catch (error) {
      console.error('Error generating story:', error);
      setStory('Sorry, something went wrong. Please try again.');
      setIllustrationb64('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Story Generator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="mainCharacter" style={styles.label}>Main Character:</label>
          <input
            id="mainCharacter"
            type="text"
            value={mainCharacter}
            onChange={(e) => setMainCharacter(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="plot" style={styles.label}>Plot:</label>
          <input
            id="plot"
            type="text"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="ending" style={styles.label}>Ending:</label>
          <input
            id="ending"
            type="text"
            value={ending}
            onChange={(e) => setEnding(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="genre" style={styles.label}>Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={styles.select}
          >
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Adventure">Adventure</option>
            <option value="Historical">Historical</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
          </select>
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="literature" style={styles.label}>Literature Type:</label>
          <select
            id="literature"
            value={literature}
            onChange={(e) => setLiterature(e.target.value)}
            style={styles.select}
          >
            <option value="story">Story</option>
            <option value="rhyming poetry">Rhyming poetry</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {story && (
        <div style={styles.storyContainer}>
          <p style={styles.story}>{story}</p>
          {illustrationb64 && <img src={`data:image/png;base64,${illustrationb64}`}  alt="Story Illustration" style={styles.image} />}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  storyContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  story: {
    fontSize: '18px',
    color: '#333',
    whiteSpace: 'pre-wrap',
    marginBottom: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

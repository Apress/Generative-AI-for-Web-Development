import { useState } from 'react';

export default function Home() {
  const [textPrompt, setTextPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [textResult, setTextResult] = useState('');
  const [imageResult, setImageResult] = useState('');
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setLoadingText(true);
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: textPrompt }),
      });
      const data = await response.json();
      setTextResult(data.result);
    } catch (error) {
      console.error('Error generating text:', error);
      setTextResult('Error generating text');
    } finally {
      setLoadingText(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setLoadingImage(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      const data = await response.json();
      setImageResult(data.result);
    } catch (error) {
      console.error('Error generating image:', error);
      setImageResult('Error generating image');
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Generate Content</h1>
      
      {/* Text Generation Form */}
      <form onSubmit={handleTextSubmit} style={formStyle}>
        <label style={labelStyle}>Prompt</label>
        <input
          type="text"
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" disabled={loadingText} style={buttonStyle}>
          {loadingText ? 'Generating...' : 'Generate Text'}
        </button>
      </form>
      {textResult && (
        <div style={resultStyle}>
          <h3>Generated Text:</h3>
          <p>{textResult}</p>
        </div>
      )}
      <br />
      {/* Image Generation Form */}
      <form onSubmit={handleImageSubmit} style={formStyle}>
        <label style={labelStyle}>Prompt</label>
        <input
          type="text"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" disabled={loadingImage} style={buttonStyle}>
          {loadingImage ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      {imageResult && (
        <div style={resultStyle}>
          <h3>Generated Image:</h3>
          <img src={imageResult} alt="Generated" style={{ maxWidth: '400px', height: 'auto', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
};

const labelStyle = {
  marginBottom: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '300px',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

const resultStyle = {
  textAlign: 'center',
  marginTop: '20px',
  padding: '15px',
  borderRadius: '8px',
  backgroundColor: '#f7f7f7',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

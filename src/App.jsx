import React, { useState } from 'react';
import {GitHubContributions} from './components/GitHubContributions';

const App = () => {
  const [githubLink, setGithubLink] = useState('');

  const handleInputChange = (e) => {
    setGithubLink(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>GitHub Contributions Viewer</h1>
      <label style={styles.label}>
        Enter GitHub Profile Link:
        <input
          type="text"
          value={githubLink}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="https://github.com/username"
        />
      </label>

      <GitHubContributions githubLink={githubLink} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    // margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },
};

export default App;

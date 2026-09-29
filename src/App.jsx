import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [icon, setIcon] = useState('search');
  const [bg, setBg] = useState({
    bg: 'surface-variant',
    text: 'on-surface'
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const allrecent = JSON.parse(localStorage.getItem('iconFinderrecent')) || [];
    setRecent(allrecent);
  }, []);

  useEffect(() => {
    localStorage.setItem('iconFinderrecent', JSON.stringify(recent));
  }, [recent]);

  const handleDownload = () => {
    let updatedRecent = [...recent];
    if (updatedRecent.length >= 3) {
      updatedRecent.shift(); // Remove oldest
    }
    updatedRecent = [...updatedRecent, { name: icon }];
    setRecent(updatedRecent);

    const filepath = `/icons/${icon}.svg`;
    const link = document.createElement('a');
    link.href = filepath;
    link.download = `${icon}.svg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <main className="m3-card-wrapper">
        {/* App Title Header */}
        <header className="title-header">
          <div className="brand-badge">
            <i className="bi bi-search"></i>
          </div>
          <div>
            <h1>Icon <span className="brand-accent">Finder</span></h1>
            <span className="subtitle">Android 14 Material Feed</span>
          </div>
        </header>

        <div className="body-content">
          {/* Search Pill Input */}
          <div className="m3-input-box">
            <i className="bi bi-search search-icon"></i>
            <input 
              type="text" 
              placeholder="Search icon name..." 
              value={icon} 
              onChange={(e) => setIcon(e.target.value)} 
            />
            <button className="m3-icon-btn" onClick={() => setIcon(icon)} title="Search">
              <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>

          {/* Preview Canvas & Dynamic Color Palette */}
          <div className="result-section">
            <div className={`preview-canvas bg-${bg.bg}`}>
              <i className={`bi bi-${icon} text-${bg.text}`}></i>
            </div>

            <div className="color-dock">
              <button 
                className={`theme-chip ${bg.bg === 'dark' ? 'active' : ''}`} 
                onClick={() => setBg({ bg: 'dark', text: 'light' })}
              >
                Dark
              </button>
              <button 
                className={`theme-chip ${bg.bg === 'surface-variant' ? 'active' : ''}`} 
                onClick={() => setBg({ bg: 'surface-variant', text: 'on-surface' })}
              >
                Light
              </button>
              <button 
                className={`theme-chip ${bg.bg === 'warning' ? 'active' : ''}`} 
                onClick={() => setBg({ bg: 'warning', text: 'dark' })}
              >
                Yellow
              </button>
              <button 
                className={`theme-chip ${bg.bg === 'success' ? 'active' : ''}`} 
                onClick={() => setBg({ bg: 'success', text: 'light' })}
              >
                Green
              </button>
            </div>
          </div>

          {/* Android 14 Floating Action Download Button */}
          <div className="download-section">
            <button className="m3-fab-btn" onClick={handleDownload}>
              <span>Download Icon</span>
              <i className="bi bi-download"></i>
            </button>
          </div>

          {/* Recent History List */}
          <div className="recent-section">
            <h3>Recent Searches</h3>
            <div className="recent-grid">
              {recent.length === 0 ? (
                <p className="empty-text">No recent downloads yet.</p>
              ) : (
                recent.map((item, idx) => (
                  <div key={idx} className="recent-chip" onClick={() => setIcon(item.name)}>
                    <i className={`bi bi-${item.name} chip-icon`}></i>
                    <span>{item.name}</span>
                    <i className="bi bi-arrow-up-left-short action-icon"></i>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

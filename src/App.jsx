import { useState, useEffect } from 'react';
import './index.css'

function App () {
  const [icon,setIcon] = useState('search')
  const [bg, setBg] = useState({
    bg: 'light',
    text : 'dark'
  })
  const [recent, setRecent] = useState([])

  useEffect(() => {
   const allrecent = JSON.parse(localStorage.getItem('iconFinderrecent')) || []
   setRecent(allrecent)
  }, [])

  useEffect(() => {
    localStorage.setItem('iconFinderrecent', JSON.stringify(recent))
  }, [recent])

  const handleDownload = () => {
   if(recent.length >= 3){
    recent.shift(recent[0])
   }
    setRecent([...recent, {name: `${icon}`}])
    const filepath = `/icons/${icon}.svg`

    const link = document.createElement('a')
    link.href = filepath
    link.download = `${icon}.svg`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div className="app">
        <div className="container">
       <div className="title my-4">
            <i className="bi bi-search mx-3"></i>
            <h1>Icon <span className='text-success'>Finder</span></h1>
          </div>
        

          <div className="body">
            <div className="input">
              <input type="text" className='form-control' placeholder='search icon..' value={icon} onChange={(e) => setIcon(e.target.value)} />
              <button  onClick={() => setIcon(icon)}> <i className="bi bi-search mx-1"></i></button>
            </div>

          <div className="result ">
            <div className={`bg-${bg.bg} image`}>
              <i className={`bi bi-${icon} text-${bg.text}`}></i>
            </div>

            <div className="bg">
              <button className="btn btn-outline-dark" onClick={() => setBg({bg: 'dark', text : 'light'})}>Dark</button>
              <button className="btn btn-outline-light text-dark border"onClick={() => setBg({bg: 'light', text : 'dark'})} >Light</button>
              <button className="btn btn-outline-warning" onClick={() => setBg({bg: 'warning', text : 'light'})}>Yellow</button>
              <button className="btn btn-outline-success" onClick={() => setBg({bg: 'success', text : 'light'})}>Green</button>
            </div>
          </div>
        
        <div className="download text-center my-3">
        <button className='btn btn-outline-success w-75 btn-lg' onClick={() => handleDownload()}>Download <i className="bi bi-download"></i></button>
        </div>

        <div className="recent">
          <h3>recently downloaded</h3>

          <div className="all-list">
            {recent.map((item) => (
              <div className="list" onClick={() => setIcon(item.name)} >
              <h5 >{item.name} </h5>
              <i className="bi bi-search"></i>
              </div>
            ))}
          </div>
        </div>
         </div>
        </div>
      </div>
    </>
  );
}

export default App;

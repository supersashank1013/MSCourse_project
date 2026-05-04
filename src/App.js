import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Freelancers from './components/Freelancers';
import Projects from './components/Projects';
import PostProject from './components/PostProject';

export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home setPage={setPage} />;
      case 'freelancers': return <Freelancers setPage={setPage} />;
      case 'projects': return <Projects setPage={setPage} />;
      case 'post': return <PostProject setPage={setPage} />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      <main key={page} style={{ animation: 'fadeIn 0.3s ease' }}>
        {renderPage()}
      </main>
    </div>
  );
}

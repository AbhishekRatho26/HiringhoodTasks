import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>MyApp</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Welcome, {username}</span>
          <button 
            onClick={handleLogout} 
            style={{ backgroundColor: '#dc2626', padding: '8px 16px', borderRadius: '8px', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', marginTop: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Discover Something New</h2>
        <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '640px' }}>
          This is a random hero section text where you can put an exciting description about your platform. 
          Engage your users with a compelling message and guide them to explore your content.
        </p>
      </section>
    </div>
  );
};

export default Home;

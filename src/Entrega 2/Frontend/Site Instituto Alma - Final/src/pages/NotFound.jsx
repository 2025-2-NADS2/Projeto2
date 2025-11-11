import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          marginBottom: '1rem', 
          fontSize: '3rem', 
          fontWeight: 'bold',
          color: '#2c5aa0'
        }}>404</h1>
        <p style={{ 
          marginBottom: '1rem', 
          fontSize: '1.25rem', 
          color: '#666'
        }}>Oops! Página não encontrada</p>
        <a href="/" style={{ 
          color: '#2c5aa0', 
          textDecoration: 'underline',
          fontSize: '1.1rem'
        }}>
          Voltar para o Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;

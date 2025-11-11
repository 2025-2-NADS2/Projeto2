import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/institute.css';

const Donation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Bloquear scroll quando menu mobile estiver aberto
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoDoacao: '',
    valor: '',
    observacoes: '',
    anonima: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirecionar para a página de informações bancárias
    navigate('/payment-info', { state: { formData } });
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <Link to="/" className="logo">
            <img src="/img/LOGO_V.1_ALMA.png" alt="Instituto Alma" />
          </Link>
          <ul className="nav-menu">
            <li><Link to="/#sobre">Sobre Nós</Link></li>
            <li><Link to="/#atividades">Atividades</Link></li>
            <li><Link to="/#doador">Portal do Doador</Link></li>
            <li><Link to="/#transparencia">Transparência</Link></li>
            <li><Link to="/#ouvidoria">Ouvidoria</Link></li>
            <li><Link to="/#eventos">Eventos</Link></li>
            <li><Link to="/admin">Administração</Link></li>
          </ul>
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu mobile"
          >
            ☰
          </button>
        </nav>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">Menu</span>
            <button 
              className="mobile-menu-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>
          <ul className="mobile-menu-list">
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/#sobre" onClick={() => setIsMobileMenuOpen(false)}>Sobre Nós</Link></li>
            <li><Link to="/#atividades" onClick={() => setIsMobileMenuOpen(false)}>Atividades</Link></li>
            <li><Link to="/#doador" onClick={() => setIsMobileMenuOpen(false)}>Portal do Doador</Link></li>
            <li><Link to="/#transparencia" onClick={() => setIsMobileMenuOpen(false)}>Transparência</Link></li>
            <li><Link to="/#ouvidoria" onClick={() => setIsMobileMenuOpen(false)}>Ouvidoria</Link></li>
            <li><Link to="/#eventos" onClick={() => setIsMobileMenuOpen(false)}>Eventos</Link></li>
            <li><Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Administração</Link></li>
          </ul>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}
      </header>

      {/* Full Background with Overlay Form */}
      <div className="donation-full-page">
        <div className="donation-hero-content-overlay">
          <h1>Faça Sua</h1>
          <h1>Doação</h1>
          <p>Deseja contribuir com o Instituto Alma?</p>
          <p>Sua contribuição pode transformar vidas e levar esperança para comunidades carentes!</p>
        </div>
        <div className="donation-form-overlay">
          <div className="donation-form-container">
            <h2>Formulário de Doação</h2>
            <form onSubmit={handleSubmit} className="donation-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome Completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tipoDoacao">Tipo de Doação *</label>
                  <select
                    id="tipoDoacao"
                    name="tipoDoacao"
                    value={formData.tipoDoacao}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="unica">Doação Única</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="valor">Valor da Doação (R$) *</label>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={formData.valor}
                  onChange={handleInputChange}
                  min="1"
                  step="0.01"
                  placeholder="Ex: 50.00"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Deixe aqui qualquer informação adicional..."
                />
              </div>
              <button type="submit" className="donation-submit-btn">
                Confirmar Doação
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Redes Sociais:</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/almainstituto.oficial/"><i className="fab fa-facebook social-icon"></i></a>
              <a href="https://www.instagram.com/almainstituto_oficial/"><i className="fab fa-instagram social-icon"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Contato</h3>
            <p>📍 Avenida Gustavo Adolfo 1856, São Paulo, SP</p>
            <p>📞 (11) 99294-2611</p>
            <p>✉️ contato@institutoalma.org.br</p>
          </div>
          <div className="footer-section">
            <h3>Links Úteis</h3>
            <p><Link to="/#sobre">Sobre Nós</Link></p>
            <p><Link to="/#atividades">Atividades</Link></p>
            <p><Link to="/#transparencia">Transparência</Link></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>2025 Instituto Alma&copy; - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Donation;

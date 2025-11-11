import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/institute.css';

const Volunteer = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  const [volunteerData, setVolunteerData] = useState({
    nome: '',
    email: '',
    telefone: '',
    areaInteresse: '',
    disponibilidade: '',
    observacoes: '',
    consentimento: false
  });

  const handleVolunteerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVolunteerData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    alert('Obrigado por se voluntariar! Entraremos em contato em breve.');
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
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
          <h1>Seja</h1>
          <h1>Voluntário</h1>
          <p>Deseja contribuir com o Instituto Alma?</p>
          <p>Doe seu tempo e talento para transformar vidas e levar esperança para comunidades carentes!</p>
        </div>
        <div className="donation-form-overlay">
          <div className="donation-form-container">
            <h2>Formulário de Voluntariado</h2>
            <form onSubmit={handleVolunteerSubmit} className="donation-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="vol_nome">Nome Completo *</label>
                  <input
                    type="text"
                    id="vol_nome"
                    name="nome"
                    value={volunteerData.nome}
                    onChange={handleVolunteerChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vol_email">E-mail *</label>
                  <input
                    type="email"
                    id="vol_email"
                    name="email"
                    value={volunteerData.email}
                    onChange={handleVolunteerChange}
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="vol_telefone">Telefone</label>
                  <input
                    type="tel"
                    id="vol_telefone"
                    name="telefone"
                    value={volunteerData.telefone}
                    onChange={handleVolunteerChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="areaInteresse">Área de Interesse *</label>
                  <select
                    id="areaInteresse"
                    name="areaInteresse"
                    value={volunteerData.areaInteresse}
                    onChange={handleVolunteerChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="logistica">Logística</option>
                    <option value="arrecadacao">Arrecadação</option>
                    <option value="eventos">Eventos</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="disponibilidade">Disponibilidade *</label>
                <select
                  id="disponibilidade"
                  name="disponibilidade"
                  value={volunteerData.disponibilidade}
                  onChange={handleVolunteerChange}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="semana_manha">Dias de semana - Manhã</option>
                  <option value="semana_tarde">Dias de semana - Tarde</option>
                  <option value="semana_noite">Dias de semana - Noite</option>
                  <option value="fimsemana_manha">Fins de semana - Manhã</option>
                  <option value="fimsemana_tarde">Fins de semana - Tarde</option>
                  <option value="fimsemana_noite">Fins de semana - Noite</option>
                  <option value="flexivel">Flexível</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="vol_observacoes">Observações</label>
                <textarea
                  id="vol_observacoes"
                  name="observacoes"
                  value={volunteerData.observacoes}
                  onChange={handleVolunteerChange}
                  rows="4"
                  placeholder="Conte-nos sobre como quer ajudar o Instituto Alma!"
                />
              </div>
              <button type="submit" className="donation-submit-btn">
                Enviar
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

export default Volunteer;


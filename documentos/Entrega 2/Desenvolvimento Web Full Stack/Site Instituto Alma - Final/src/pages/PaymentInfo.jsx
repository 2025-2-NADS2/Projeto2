import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/institute.css';

const PaymentInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const formData = location.state?.formData || {};

  useEffect(() => {
    // Se não houver dados do formulário, redirecionar para a página de doação
    if (!formData || !formData.nome) {
      navigate('/donation');
    }

    // Bloquear scroll quando menu mobile estiver aberto
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, formData, navigate]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copiado para a área de transferência!');
    });
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <Link to="/" className="logo">
            <img src="/img/LOGO_V.3_ALMA.png" alt="Instituto Alma" />
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

      {/* Payment Info Section */}
      <div className="payment-info-page">
        <div className="payment-info-container">
          <div className="payment-info-header">
            <h1>Obrigado pela sua doação, {formData.nome}!</h1>
            <p>Por favor, realize o pagamento usando uma das opções abaixo:</p>
          </div>

          <div className="payment-methods">
            {/* PIX Section */}
            <div className="payment-card">
              <div className="payment-card-header">
                <h2>💰 PIX</h2>
                <p className="payment-subtitle">Pagamento instantâneo</p>
              </div>
              <div className="payment-info-content">
                <div className="payment-field">
                  <label>CNPJ:</label>
                  <div className="payment-value-container">
                    <span className="payment-value">07.735.481/0001-22</span>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard('07.735.481/0001-22')}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Transfer Section */}
            <div className="payment-card">
              <div className="payment-card-header">
                <h2>🏦 Transferência Bancária</h2>
                <p className="payment-subtitle">Dados para transferência</p>
              </div>
              <div className="payment-info-content">
                <div className="payment-field">
                  <label>Agência:</label>
                  <div className="payment-value-container">
                    <span className="payment-value">4820</span>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard('4820')}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
                <div className="payment-field">
                  <label>Conta Corrente:</label>
                  <div className="payment-value-container">
                    <span className="payment-value">00104-0</span>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard('00104-0')}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-summary">
            <h3>Resumo da Doação</h3>
            <div className="summary-item">
              <span>Nome:</span>
              <span>{formData.nome}</span>
            </div>
            <div className="summary-item">
              <span>E-mail:</span>
              <span>{formData.email}</span>
            </div>
            {formData.telefone && (
              <div className="summary-item">
                <span>Telefone:</span>
                <span>{formData.telefone}</span>
              </div>
            )}
            <div className="summary-item">
              <span>Valor:</span>
              <span className="summary-value">
                R$ {formData.valor ? parseFloat(formData.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
              </span>
            </div>
            <div className="summary-item">
              <span>Tipo:</span>
              <span>{formData.tipoDoacao === 'unica' ? 'Doação Única' : 'Doação Mensal'}</span>
            </div>
          </div>

          <div className="payment-actions">
            <Link to="/" className="payment-btn secondary">
              Voltar para Home
            </Link>
            <Link to="/donation" className="payment-btn primary">
              Fazer Nova Doação
            </Link>
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

export default PaymentInfo;


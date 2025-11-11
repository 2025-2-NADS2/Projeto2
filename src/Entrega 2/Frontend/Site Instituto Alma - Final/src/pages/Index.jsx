import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/institute.css';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [adminReports, setAdminReports] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const moveSlide = (direction) => {
    // Previne cliques múltiplos durante a transição
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setCurrentSlide(prev => {
      const totalSlides = 4; // Número de imagens no carrossel
      
      if (direction === 1) {
        // Próximo slide
        return prev === totalSlides - 1 ? 0 : prev + 1;
      } else {
        // Slide anterior
        return prev === 0 ? totalSlides - 1 : prev - 1;
      }
    });
    
    // Libera o clique após a transição CSS (0.5s)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Bloquear scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Função para carregar relatórios
    const loadReports = () => {
      const savedReports = localStorage.getItem('transparencyReports');
      if (savedReports) {
        setAdminReports(JSON.parse(savedReports));
      }
    };

    // Carregar relatórios inicialmente
    loadReports();

    // Listener para atualizar quando houver mudanças no localStorage (outra aba)
    const handleStorageChange = (e) => {
      if (e.key === 'transparencyReports') {
        loadReports();
      }
    };

    // Listener para atualizar quando a página voltar ao foco
    const handleFocus = () => {
      loadReports();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    // Smooth scrolling for navigation links
    const handleClick = (e) => {
      const target = e.target;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Add scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Add event listeners for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <a href="#home" className="logo">
            <img src="/img/LOGO_V.1_ALMA.png" alt="Instituto Alma" />
          </a>
          <ul className="nav-menu">
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#atividades">Atividades</a></li>
            <li><a href="#doador">Portal do Doador</a></li>
            <li><a href="#transparencia">Transparência</a></li>
            <li><a href="#ouvidoria">Ouvidoria</a></li>
            <li><a href="#eventos">Eventos</a></li>
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
            <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#sobre" onClick={() => setIsMobileMenuOpen(false)}>Sobre Nós</a></li>
            <li><a href="#atividades" onClick={() => setIsMobileMenuOpen(false)}>Atividades</a></li>
            <li><a href="#doador" onClick={() => setIsMobileMenuOpen(false)}>Portal do Doador</a></li>
            <li><a href="#transparencia" onClick={() => setIsMobileMenuOpen(false)}>Transparência</a></li>
            <li><a href="#ouvidoria" onClick={() => setIsMobileMenuOpen(false)}>Ouvidoria</a></li>
            <li><a href="#eventos" onClick={() => setIsMobileMenuOpen(false)}>Eventos</a></li>
            <li><Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Administração</Link></li>
          </ul>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}
      </header>

      {/* Home */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Instituto Alma</h1>
          <p>O Instituto Alma é uma luz de esperança nas comunidades mais esquecidas e vulneráveis da sociedade.</p>
          <p>Nascido da convicção de que a transformação social é possível através de ações diferenciadas.</p>
          <Link to="/donation" className="cta-button">Faça uma Doação</Link>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="section fade-in">
        <h2 className="section-title">Sobre Nós</h2>
        <p className="section-subtitle">Conheça nossa história e missão de transformar vidas</p>
        <div className="about-content">
          <div className="carousel-container">
            <div className="carousel-slide" style={{ transform: `translateX(-${currentSlide * 25}%)` }}>
              <img src="/img/imgSorriso.JPG" alt="Imagem 1" />
              <img src="/img/imgbombom.JPG" alt="Imagem 2" />
              <img src="/img/imgEntregaalim.jpeg" alt="Imagem 3" />
              <img src="/img/imgGrupo.JPG" alt="Imagem 4" />
            </div>
            <button 
              className={`carousel-button prev ${isTransitioning ? 'disabled' : ''}`} 
              onClick={() => moveSlide(-1)}
              disabled={isTransitioning}
            >
              ‹
            </button>
            <button 
              className={`carousel-button next ${isTransitioning ? 'disabled' : ''}`} 
              onClick={() => moveSlide(1)}
              disabled={isTransitioning}
            >
              ›
            </button>
            <div className="carousel-dots">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          <div className="about-text">
            <h3>Nossa Missão</h3>
            <p>
              O Instituto Alma surgiu com o propósito de promover mudanças sociais através de ações diferenciadas, nossas ações visam encantar e proporcionar experiências únicas e significativas na vida das pessoas em situação de vulnerabilidade.
            </p>
            <h3>Nosso Público-Alvo</h3>
            <p>
              Nosso público-alvo são os moradores de comunidades carentes e esquecidas, localizadas na zona norte e leste da capital paulista e que, geralmente, não são atendidas por demais ONGs por conta da dificuldade de acesso e isolamento.
            </p>
          </div>
        </div>
      </section>

      {/* Atividades */}
      <section id="atividades" className="section activities fade-in">
        <h2 className="section-title">Nossas Atividades</h2>
        <p className="section-subtitle">Conheça os nossos projetos!</p>
        <div className="activities-grid">
          <div className="activity-card">
            <div className="activity-icon"></div>
            <h3>Projeto Alimentar</h3>
            <p>O Projeto Alimentar acontece aos sábados, os voluntários do Instituto Alma se encontram para preparar e entregar refeições deliciosas em comunidades carentes.</p>
          </div>
          <div className="activity-card">
            <div className="activity-icon"></div>
            <h3>Natal de Amor</h3>
            <p>O Projeto Natal de Amor oferece uma oportunidade rara para 2500 crianças carentes: escolher. Na véspera do Natal montamos um espaço para recebê-las em uma verdadeira loja de brinquedos. Nessa loja elas são livres para escolher o que querem ganhar!</p>
          </div>
          <div className="activity-card">
            <div className="activity-icon"></div>
            <h3>Projeto Crê.Ser</h3>
            <p>O principal objetivo do Projeto Crê.Ser é oferecer carinho, afeto, informação e condições mínimas para uma gravidez saudável, acompanhando mulheres em situação de carência extrema desde o início da gestação até o 6° mês do bebê.</p>
          </div>
        </div>
      </section>

      {/* Portal do Doador */}
      <section id="doador" className="section donor-portal fade-in">
        <h2 className="section-title">Portal do Doador</h2>
        <p className="section-subtitle">Sua contribuição pode fazer a diferença na vida de muitas pessoas!</p>
        <div className="donor-options">
          <div className="donor-card">
            <h3>Doação Única</h3>
            <p>Faça uma contribuição pontual no valor que desejar. Toda ajuda é bem-vinda!</p>
            <Link to="/donation" className="donate-btn">Doar Agora</Link>
          </div>
          <div className="donor-card">
            <h3>Seja Voluntário</h3>
            <p>Doe seu tempo e talento. Precisamos de voluntários em diversas áreas.</p>
            <Link to="/volunteer" className="donate-btn">Voluntariar</Link>
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section id="transparencia" className="section fade-in">
        <h2 className="section-title">Transparência</h2>
        <p className="section-subtitle">Prestação de contas da instituição.</p>
        <div className="transparency-grid">
          {/* Relatórios adicionados pelo admin */}
          {adminReports.map((report) => (
            <div key={report.id} className="transparency-item">
              <h3>{report.titulo}</h3>
              <p>{report.descricao}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {report.isPDF && report.pdfBase64 && (
                  <>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = report.pdfBase64;
                        link.download = report.nomeArquivo || 'documento.pdf';
                        link.click();
                      }}
                      style={{
                        background: '#111F44',
                        color: 'white',
                        border: 'none',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      📥 Baixar PDF
                    </button>
                    <button
                      onClick={() => {
                        window.open(report.pdfBase64, '_blank');
                      }}
                      style={{
                        background: 'transparent',
                        color: '#111F44',
                        border: '2px solid #111F44',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      👁️ Visualizar
                    </button>
                  </>
                )}
                {report.link && !report.link.startsWith('pdf:') && (
                  <a 
                    href={report.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: '#111F44',
                      textDecoration: 'none',
                      fontWeight: '600',
                      padding: '0.6rem 1.2rem',
                      border: '2px solid #111F44',
                      borderRadius: '5px',
                      display: 'inline-block'
                    }}
                  >
                    {report.tipo === 'relatorio' ? 'Ver Link' : 
                     report.tipo === 'financeiro' ? 'Visualizar' :
                     report.tipo === 'certificacao' ? 'Ver Certificados' :
                     report.tipo === 'impacto' ? 'Ver Dados' : 'Ver mais'}
                  </a>
                )}
              </div>
              {report.data && (
                <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
                  Data: {report.data}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ouvidoria */}
      <section id="ouvidoria" className="section fade-in">
        <h2 className="section-title">Ouvidoria</h2>
        <p className="section-subtitle">Seu canal direto de comunicação conosco!</p>
        <div className="contact-form">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="tipo">Assunto:</label>
              <input type="assunto" id="assunto" name="assunto" required />
            </div>
            <div className="form-group">
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea id="mensagem" name="mensagem" rows={5} required></textarea>
            </div>
            <button type="submit" className="submit-btn">Enviar Mensagem</button>
          </form>
        </div>
      </section>

      {/* Eventos */}
      <section id="eventos" className="section events fade-in">
        <h2 className="section-title">Eventos</h2>
        <p className="section-subtitle">Participe das nossas atividades e campanhas!</p>
        <div className="events-grid">
        <div className="event-card">
            <div className="event-date"> 22 NOV</div>
            <div className="event-content">
              <h3>Curso de Culinária</h3>
              <p>Curso profissionalizante de culinária básica e confeitaria para geração de renda.</p>
            </div>
          </div>
          <div className="event-card">
            <div className="event-date">25 DEZ</div>
            <div className="event-content">
              <h3>Campanha de Natal</h3>
              <p>Distribuição de presentes e ceia natalina para 500 famílias carentes da região.</p>
            </div>
          </div>
          <div className="event-card">
            <div className="event-date">05 JAN/26</div>
            <div className="event-content">
              <h3>Mutirão de Saúde</h3>
              <p>Atendimento médico gratuito, exames preventivos e orientação nutricional.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Redes Sociais:</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/almainstituto.oficial/"><i class="fab fa-facebook social-icon"></i></a>
              <a href="https://www.instagram.com/almainstituto_oficial/"><i class="fab fa-instagram social-icon"></i></a>
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
            <p><a href="#sobre">Sobre Nós</a></p>
            <p><a href="#atividades">Atividades</a></p>
            <p><a href="#doador">Como Doar</a></p>
            <p><a href="#transparencia">Transparência</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>2025 Instituto Alma&copy; - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

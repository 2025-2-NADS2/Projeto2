import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/institute.css';

const Admin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    usuario: '',
    senha: ''
  });
  const [reportData, setReportData] = useState({
    titulo: '',
    descricao: '',
    link: '',
    tipo: 'relatorio',
    arquivo: null,
    nomeArquivo: ''
  });
  const [reports, setReports] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Carregar relatórios do localStorage ao montar
  useEffect(() => {
    const savedReports = localStorage.getItem('transparencyReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
    
    // Verificar se está logado
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  
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

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciais simples (em produção, usar autenticação adequada)
    if (loginData.usuario === 'admin' && loginData.senha === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      alert('Login realizado com sucesso!');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    setLoginData({ usuario: '', senha: '' });
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (file.type !== 'application/pdf') {
        alert('Por favor, selecione apenas arquivos PDF.');
        e.target.value = '';
        return;
      }
      
      // Validar tamanho (limite de 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB em bytes
      if (file.size > maxSize) {
        alert('O arquivo é muito grande. Por favor, selecione um arquivo menor que 5MB.');
        e.target.value = '';
        return;
      }

      setReportData(prev => ({
        ...prev,
        arquivo: file,
        nomeArquivo: file.name
      }));
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    
    // Validar que tem link ou arquivo
    if (!reportData.link && !reportData.arquivo) {
      alert('Por favor, forneça um link ou faça upload de um arquivo PDF.');
      return;
    }

    setUploading(true);

    try {
      let pdfBase64 = null;
      let nomeArquivo = reportData.nomeArquivo;

      // Se há arquivo, converter para base64
      if (reportData.arquivo) {
        pdfBase64 = await convertFileToBase64(reportData.arquivo);
        // Se não há link, usar o nome do arquivo como identificador
        if (!reportData.link) {
          // Usar base64 como "link" interno
          reportData.link = `pdf:${Date.now()}`;
        }
      }

      const newReport = {
        id: Date.now(),
        titulo: reportData.titulo,
        descricao: reportData.descricao,
        link: reportData.link,
        tipo: reportData.tipo,
        data: new Date().toLocaleDateString('pt-BR'),
        pdfBase64: pdfBase64,
        nomeArquivo: nomeArquivo,
        isPDF: !!reportData.arquivo
      };

      const updatedReports = [...reports, newReport];
      setReports(updatedReports);
      localStorage.setItem('transparencyReports', JSON.stringify(updatedReports));
      
      // Limpar formulário
      setReportData({
        titulo: '',
        descricao: '',
        link: '',
        tipo: 'relatorio',
        arquivo: null,
        nomeArquivo: ''
      });

      // Limpar input de arquivo
      const fileInput = document.getElementById('pdfFile');
      if (fileInput) {
        fileInput.value = '';
      }

      alert('Relatório adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      alert('Erro ao processar o arquivo. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteReport = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este relatório?')) {
      const updatedReports = reports.filter(report => report.id !== id);
      setReports(updatedReports);
      localStorage.setItem('transparencyReports', JSON.stringify(updatedReports));
      alert('Relatório excluído com sucesso!');
    }
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

      {/* Hero Section */}
      <section className="donation-hero">
        <div className="donation-hero-content">
          <h1>Administração</h1>
          <p>Área restrita para gestão de conteúdo do site</p>
        </div>
      </section>

      {/* Login Section */}
      {!isLoggedIn ? (
        <section className="donation-section">
          <div className="donation-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="donation-form-container">
              <h2>Login de Administrador</h2>
              <form onSubmit={handleLogin} className="donation-form">
                <div className="form-group">
                  <label htmlFor="usuario">Usuário *</label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={loginData.usuario}
                    onChange={handleLoginChange}
                    required
                    placeholder="Digite seu usuário"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="senha">Senha *</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={loginData.senha}
                    onChange={handleLoginChange}
                    required
                    placeholder="Digite sua senha"
                  />
                </div>
                <button type="submit" className="donation-submit-btn">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <section className="donation-section">
          <div className="donation-container">
            {/* Formulário de Adicionar Relatório */}
            <div className="donation-form-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Adicionar Novo Relatório</h2>
                <button 
                  onClick={handleLogout}
                  className="donation-submit-btn"
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                >
                  Sair
                </button>
              </div>
              <form onSubmit={handleAddReport} className="donation-form">
                <div className="form-group">
                  <label htmlFor="titulo">Título do Relatório *</label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={reportData.titulo}
                    onChange={handleReportChange}
                    required
                    placeholder="Ex: Relatório Anual 2024"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descricao">Descrição *</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={reportData.descricao}
                    onChange={handleReportChange}
                    rows="4"
                    required
                    placeholder="Breve descrição do relatório..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pdfFile">Upload de PDF (opcional)</label>
                  <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                  />
                  {reportData.nomeArquivo && (
                    <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                      Arquivo selecionado: <strong>{reportData.nomeArquivo}</strong>
                    </p>
                  )}
                  <p style={{ marginTop: '0.5rem', color: '#999', fontSize: '0.85rem' }}>
                    Tamanho máximo: 5MB. Formato aceito: PDF apenas.
                  </p>
                </div>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label htmlFor="link">Link do Arquivo/URL (opcional se houver PDF)</label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={reportData.link}
                    onChange={handleReportChange}
                    placeholder="URL ou caminho do arquivo (opcional se fizer upload de PDF)"
                  />
                  <p style={{ marginTop: '0.5rem', color: '#999', fontSize: '0.85rem' }}>
                    Forneça um link externo ou faça upload de um PDF acima.
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="tipo">Tipo *</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={reportData.tipo}
                    onChange={handleReportChange}
                    required
                  >
                    <option value="relatorio">Relatório</option>
                    <option value="financeiro">Demonstrativo Financeiro</option>
                    <option value="certificacao">Certificação</option>
                    <option value="impacto">Impacto Social</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="donation-submit-btn"
                  disabled={uploading}
                  style={{ opacity: uploading ? 0.7 : 1, cursor: uploading ? 'not-allowed' : 'pointer' }}
                >
                  {uploading ? 'Processando...' : 'Adicionar Relatório'}
                </button>
              </form>
            </div>

            {/* Lista de Relatórios Existentes */}
            <div className="donation-form-container" style={{ marginTop: '3rem' }}>
              <h2>Relatórios Cadastrados</h2>
              {reports.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                  Nenhum relatório cadastrado ainda.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      style={{
                        background: '#f8f9fa',
                        padding: '1.5rem',
                        borderRadius: '10px',
                        border: '1px solid #e1e5e9'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ color: '#111F44', marginBottom: '0.5rem' }}>{report.titulo}</h3>
                          <p style={{ color: '#666', marginBottom: '0.5rem' }}>{report.descricao}</p>
                          <p style={{ fontSize: '0.9rem', color: '#999' }}>
                            Tipo: {report.tipo} | Data: {report.data}
                            {report.isPDF && ' | 📄 PDF anexado'}
                          </p>
                          {report.link && !report.link.startsWith('pdf:') && (
                            <a
                              href={report.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: '#111F44',
                                textDecoration: 'none',
                                fontWeight: '600',
                                marginTop: '0.5rem',
                                display: 'inline-block',
                                marginRight: '1rem'
                              }}
                            >
                              Ver link →
                            </a>
                          )}
                          {report.isPDF && report.pdfBase64 && (
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
                                padding: '0.5rem 1rem',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                marginTop: '0.5rem',
                                display: 'inline-block'
                              }}
                            >
                              📥 Baixar PDF
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          style={{
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            marginLeft: '1rem'
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
            <p><Link to="/donation">Como Doar</Link></p>
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

export default Admin;


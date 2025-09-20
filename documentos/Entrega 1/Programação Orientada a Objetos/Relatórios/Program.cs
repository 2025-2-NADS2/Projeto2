using System;

public class RelatorioDocumento
{
    public int IdRelatorio { get; set; }
    public string Titulo { get; set; }
    public string TipoRelatorio { get; set; }
    public DateTime DataPublicacao { get; set; }
    public string CaminhoArquivo { get; set; }

    public RelatorioDocumento() { }

    public RelatorioDocumento(string titulo, string tipoRelatorio, DateTime dataPublicacao, string caminhoArquivo)
    {
        this.Titulo = titulo;
        this.TipoRelatorio = tipoRelatorio;
        this.DataPublicacao = dataPublicacao;
        this.CaminhoArquivo = caminhoArquivo;
    }
}
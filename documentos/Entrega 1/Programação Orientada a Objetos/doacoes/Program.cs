using System;

public class Doacoes
{
    public int IdDoacao { get; set; }
    public int? IdUsuario { get; set; }
    public string TipoDoacao { get; set; }
    public decimal Valor { get; set; }
    public DateTime DataDoacao { get; set; }
    public string Descricao { get; set; }

    public Doacoes() { }

    public Doacoes(int? idUsuario, string tipoDoacao, decimal valor, string descricao)
    {
        this.IdUsuario = idUsuario;
        this.TipoDoacao = tipoDoacao;
        this.Valor = valor;
        this.Descricao = descricao;
        this.DataDoacao = DateTime.Now;
    }
}
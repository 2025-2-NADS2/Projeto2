using System;

public class Evento
{
    public int IdEvento { get; set; }
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public DateTime DataInicio { get; set; }
    public DateTime DataFim { get; set; }
    public string Local { get; set; }

    public Evento() { }

    public Evento(string titulo, string descricao, DateTime dataInicio, DateTime dataFim, string local)
    {
        this.Titulo = titulo;
        this.Descricao = descricao;
        this.DataInicio = dataInicio;
        this.DataFim = dataFim;
        this.Local = local;
    }
}
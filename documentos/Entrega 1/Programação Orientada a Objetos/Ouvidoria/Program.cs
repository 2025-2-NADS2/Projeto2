using System;

public class Ouvidoria
{
    public int IdMensagem { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Assunto { get; set; }
    public string Mensagem { get; set; }
    public DateTime DataEnvio { get; set; }
    public string Status { get; set; }

    public Ouvidoria() { }

    public Ouvidoria(string nome, string email, string assunto, string mensagem)
    {
        this.Nome = nome;
        this.Email = email;
        this.Assunto = assunto;
        this.Mensagem = mensagem;
        this.DataEnvio = DateTime.Now;
        this.Status = "Não Lida";
    }
}
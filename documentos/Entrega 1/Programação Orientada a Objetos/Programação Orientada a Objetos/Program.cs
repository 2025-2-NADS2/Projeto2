using System;

public class Usuario
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string SenhaHash { get; set; }
    public DateTime DataCadastro { get; set; }

    public Usuario(string nome, string email, string senhaHash)
    {
        this.Nome = nome;
        this.Email = email;
        this.SenhaHash = senhaHash;
        this.DataCadastro = DateTime.Now;
    }
    public Usuario() { }
}
using System;
using System.Collections.Generic;
using System.Linq;

namespace SiteInstituto
{
    // 1. CLASSE BASE para todas as atividades
    public abstract class Atividade
    {
        public Guid Id { get; }
        public string Titulo { get; set; }
        public DateTime Data { get; set; }
        public string Descricao { get; set; }
        public List<Guid> IdsImagens { get; set; }

        protected Atividade()
        {
            Id = Guid.NewGuid();
            IdsImagens = new List<Guid>();
        }

        public abstract void ExibirDetalhes();
    }

    // 2. CLASSE ESPECÍFICA: Atividade de Acolhimento
    public class AtividadeAcolhimento : Atividade
    {
        public string Local { get; set; }

        public override void ExibirDetalhes()
        {
            Console.WriteLine($"--- Atividade de Acolhimento ---");
            Console.WriteLine($"ID: {Id}");
            Console.WriteLine($"Título: {Titulo}");
            Console.WriteLine($"Data: {Data.ToShortDateString()}");
            Console.WriteLine($"Descrição: {Descricao}");
            Console.WriteLine($"Local: {Local}");
            Console.WriteLine($"Imagens (IDs): {string.Join(", ", IdsImagens)}");
            Console.WriteLine("----------------------------------");
        }
    }

    // 3. CLASSE ESPECÍFICA: Atividade de Entrega de Alimento
    public class AtividadeAlimento : Atividade
    {
        public int QuantidadeCestas { get; set; }

        public override void ExibirDetalhes()
        {
            Console.WriteLine($"--- Atividade de Entrega de Alimentos ---");
            Console.WriteLine($"ID: {Id}");
            Console.WriteLine($"Título: {Titulo}");
            Console.WriteLine($"Data: {Data.ToShortDateString()}");
            Console.WriteLine($"Descrição: {Descricao}");
            Console.WriteLine($"Cestas Entregues: {QuantidadeCestas}");
            Console.WriteLine($"Imagens (IDs): {string.Join(", ", IdsImagens)}");
            Console.WriteLine("------------------------------------------");
        }
    }

    // 4. CLASSE ESPECÍFICA: Atividade de Brincadeiras
    public class AtividadeBrincadeira : Atividade
    {
        public int NumeroParticipantes { get; set; }
        public string TipoBrincadeira { get; set; }

        public override void ExibirDetalhes()
        {
            Console.WriteLine($"--- Atividade de Brincadeiras ---");
            Console.WriteLine($"ID: {Id}");
            Console.WriteLine($"Título: {Titulo}");
            Console.WriteLine($"Data: {Data.ToShortDateString()}");
            Console.WriteLine($"Descrição: {Descricao}");
            Console.WriteLine($"Participantes: {NumeroParticipantes}");
            Console.WriteLine($"Tipo: {TipoBrincadeira}");
            Console.WriteLine($"Imagens (IDs): {string.Join(", ", IdsImagens)}");
            Console.WriteLine("-----------------------------------");
        }
    }

    // 5. CLASSE QUE GERENCIA A PÁGINA "NOSSAS ATIVIDADES"
    public class GerenciadorAtividades
    {
        private Dictionary<Guid, Atividade> atividades = new Dictionary<Guid, Atividade>();

        public void AdicionarAtividade(Atividade atividade)
        {
            atividades.Add(atividade.Id, atividade);
            Console.WriteLine($"Atividade '{atividade.Titulo}' adicionada com o ID: {atividade.Id}");
        }

        public Atividade BuscarAtividadePorId(Guid id)
        {
            return atividades.ContainsKey(id) ? atividades[id] : null;
        }

        public void ExibirTodasAtividades()
        {
            Console.WriteLine("\n*** TODAS AS NOSSAS ATIVIDADES ***");
            foreach (var atividade in atividades.Values.OrderByDescending(a => a.Data))
            {
                atividade.ExibirDetalhes();
                Console.WriteLine();
            }
        }
    }

    // A classe principal com o método Main
    class Program
    {
        static void Main(string[] args)
        {
            var gerenciadorAtividades = new GerenciadorAtividades();

            // Gerando IDs de imagem para simulação
            var imagemId1 = Guid.NewGuid();
            var imagemId2 = Guid.NewGuid();
            var imagemId3 = Guid.NewGuid();

            // Criando e adicionando diferentes tipos de atividades
            var atividadeAcolhimento = new AtividadeAcolhimento
            {
                Titulo = "Acolhimento na Sede",
                Data = new DateTime(2025, 3, 10),
                Descricao = "Recebimento e triagem de novos beneficiários.",
                Local = "Sede do Instituto",
                IdsImagens = new List<Guid> { imagemId1, Guid.NewGuid() }
            };
            gerenciadorAtividades.AdicionarAtividade(atividadeAcolhimento);

            var atividadeAlimento = new AtividadeAlimento
            {
                Titulo = "Entrega de Cestas Básicas",
                Data = new DateTime(2025, 2, 25),
                Descricao = "Distribuição mensal de alimentos para famílias carentes.",
                QuantidadeCestas = 150,
                IdsImagens = new List<Guid> { imagemId2, Guid.NewGuid() }
            };
            gerenciadorAtividades.AdicionarAtividade(atividadeAlimento);

            var atividadeBrincadeira = new AtividadeBrincadeira
            {
                Titulo = "Dia da Alegria na Praça",
                Data = new DateTime(2025, 4, 5),
                Descricao = "Tarde de jogos e diversão com as crianças da comunidade.",
                NumeroParticipantes = 80,
                TipoBrincadeira = "Jogos Lúdicos",
                IdsImagens = new List<Guid> { imagemId3 }
            };
            gerenciadorAtividades.AdicionarAtividade(atividadeBrincadeira);

            Console.WriteLine("\n------------------------------------------------");

            // Exemplo de como buscar uma atividade específica pelo ID
            Console.WriteLine("\n*** BUSCANDO UMA ATIVIDADE ESPECÍFICA PELO ID ***");
            Console.WriteLine($"Buscando atividade com ID: {atividadeAcolhimento.Id}");
            var atividadeEncontrada = gerenciadorAtividades.BuscarAtividadePorId(atividadeAcolhimento.Id);

            if (atividadeEncontrada != null)
            {
                Console.WriteLine("Atividade encontrada:");
                atividadeEncontrada.ExibirDetalhes();
            }
            else
            {
                Console.WriteLine("Atividade não encontrada.");
            }

            Console.WriteLine("\n------------------------------------------------");

            // Exibindo todas as atividades para a página
            gerenciadorAtividades.ExibirTodasAtividades();

            Console.WriteLine("\n--- Fim da Execução ---");
            Console.ReadKey();
        }
    }
}
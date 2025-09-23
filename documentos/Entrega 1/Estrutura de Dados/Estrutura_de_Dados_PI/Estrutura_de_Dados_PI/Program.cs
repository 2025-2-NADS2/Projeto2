using System;
using System.Collections.Generic;

namespace SiteInstituto
{
    // 1. CLASSE BASE para todos os relatórios
    public abstract class Relatorio
    {
        public Guid Id { get; }
        public string Titulo { get; set; }
        public DateTime Data { get; set; }
        public string Conteudo { get; set; }

        protected Relatorio()
        {
            this.Id = Guid.NewGuid(); // Gera um ID único e aleatório para cada relatório.
        }

        // Método abstrato para exibir os detalhes do relatório. Cada subclasse deve implementá-lo.
        public abstract void ExibirDetalhes();
    }

    // 2. CLASSE ESPECÍFICA para relatórios financeiros
    public class RelatorioFinanceiro : Relatorio
    {
        public string DemonstrativoTrimestral { get; set; }

        public override void ExibirDetalhes()
        {
            Console.WriteLine($"--- Relatório Financeiro ---");
            Console.WriteLine($"ID: {this.Id}");
            Console.WriteLine($"Título: {this.Titulo}");
            Console.WriteLine($"Data: {this.Data.ToShortDateString()}");
            Console.WriteLine($"Conteúdo: {this.Conteudo}");
            Console.WriteLine($"Demonstrativo: {this.DemonstrativoTrimestral}");
            Console.WriteLine("------------------------------");
        }
    }

    // 3. CLASSE ESPECÍFICA para relatórios sociais
    public class RelatorioSocial : Relatorio
    {
        public int NumeroDeBeneficiados { get; set; }

        public override void ExibirDetalhes()
        {
            Console.WriteLine($"--- Relatório Social ---");
            Console.WriteLine($"ID: {this.Id}");
            Console.WriteLine($"Título: {this.Titulo}");
            Console.WriteLine($"Data: {this.Data.ToShortDateString()}");
            Console.WriteLine($"Conteúdo: {this.Conteudo}");
            Console.WriteLine($"Beneficiados: {this.NumeroDeBeneficiados}");
            Console.WriteLine("--------------------------");
        }
    }

    // 4. CLASSE ESPECÍFICA para relatórios da diretoria e conselho
    public class RelatorioDiretoria : Relatorio
    {
        public string AtaDeReuniao { get; set; }

        public override void ExibirDetalhes()
        {
            Console.WriteLine($"--- Relatório de Diretoria e Conselho ---");
            Console.WriteLine($"ID: {this.Id}");
            Console.WriteLine($"Título: {this.Titulo}");
            Console.WriteLine($"Data: {this.Data.ToShortDateString()}");
            Console.WriteLine($"Conteúdo: {this.Conteudo}");
            Console.WriteLine($"Ata da Reunião: {this.AtaDeReuniao}");
            Console.WriteLine("------------------------------------------");
        }
    }

    // 5. CLASSE QUE GERENCIA A PÁGINA DE TRANSPARÊNCIA
    // Agora usando um Dictionary para armazenar os relatórios
    public class GerenciadorTransparencia
    {
        private Dictionary<Guid, Relatorio> relatorios = new Dictionary<Guid, Relatorio>();

        public void AdicionarRelatorio(Relatorio relatorio)
        {
            relatorios.Add(relatorio.Id, relatorio);
            Console.WriteLine($"Relatório '{relatorio.Titulo}' adicionado com o ID: {relatorio.Id}");
        }

        public Relatorio BuscarRelatorioPorId(Guid id)
        {
            if (relatorios.ContainsKey(id))
            {
                return relatorios[id];
            }
            return null; // Retorna null se não encontrar.
        }

        public void ExibirTodosRelatorios()
        {
            Console.WriteLine("\n*** TODOS OS RELATÓRIOS PUBLICADOS ***");
            foreach (var relatorio in relatorios.Values)
            {
                relatorio.ExibirDetalhes();
                Console.WriteLine();
            }
        }
    }

    // A classe principal com o método Main
    class Program
    {
        static void Main(string[] args)
        {
            var gerenciador = new GerenciadorTransparencia();

            // Criando e adicionando diferentes tipos de relatórios
            var relatorioFinanceiro = new RelatorioFinanceiro
            {
                Titulo = "Balanço Financeiro Anual 2024",
                Data = new DateTime(2024, 12, 31),
                Conteudo = "Este relatório detalha as receitas e despesas do ano fiscal.",
                DemonstrativoTrimestral = "1º Trimestre: Receita líquida de R$ 150.000."
            };
            gerenciador.AdicionarRelatorio(relatorioFinanceiro);

            var relatorioSocial = new RelatorioSocial
            {
                Titulo = "Relatório de Atividades Sociais",
                Data = new DateTime(2025, 1, 15),
                Conteudo = "Detalhes dos projetos sociais e impacto na comunidade.",
                NumeroDeBeneficiados = 500
            };
            gerenciador.AdicionarRelatorio(relatorioSocial);

            var relatorioDiretoria = new RelatorioDiretoria
            {
                Titulo = "Ata de Reunião do Conselho - Março/2025",
                Data = new DateTime(2025, 3, 20),
                Conteudo = "Documento que resume os pontos discutidos na última reunião.",
                AtaDeReuniao = "Principais decisões: aprovação de novo projeto e orçamento."
            };
            gerenciador.AdicionarRelatorio(relatorioDiretoria);

            Console.WriteLine("\n------------------------------------------------");

            // Exemplo de como um admin buscaria um relatório específico pelo ID
            Console.WriteLine("\n*** ADMINISTRADOR BUSCANDO UM RELATÓRIO ESPECÍFICO ***");
            Console.WriteLine($"Buscando relatório com ID: {relatorioSocial.Id}");
            var relatorioEncontrado = gerenciador.BuscarRelatorioPorId(relatorioSocial.Id);

            if (relatorioEncontrado != null)
            {
                Console.WriteLine("Relatório encontrado:");
                relatorioEncontrado.ExibirDetalhes();
            }
            else
            {
                Console.WriteLine("Relatório não encontrado.");
            }

            Console.WriteLine("\n------------------------------------------------");
            gerenciador.ExibirTodosRelatorios();

            Console.WriteLine("\n--- Fim da Execução ---");
            Console.ReadKey();
        }
    }
}
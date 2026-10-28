
"use strict";

/*
 * Minha Alimentação ♡
 * Armazenamento local, alimentos, pratos e cálculos nutricionais.
 * Não utiliza Firebase nem serviços externos.
 */

const CHAVE_DADOS = "minhaAlimentacao_dados_v1";

const dadosIniciais = {
  versao: 1,
  alimentos: [],
  pratos: [],
  semanas: [],
  preferencias: {
    semanaAtivaId: null,
    metas: {
      kcal: 0,
      proteinas: 0,
      carboidratos: 0,
      gorduras: 0
    }
  }
};

function copiar(objeto) {
  return JSON.parse(JSON.stringify(objeto));
}

function gerarId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 10)
  );
}

function numeroValido(valor, nome = "Valor") {
  const numero = Number(valor);

  if (!Number.isFinite(numero) || numero < 0) {
    throw new Error(nome + " deve ser um número válido e não negativo.");
  }

  return numero;
}

function textoObrigatorio(valor, nome = "Campo") {
  const texto = String(valor ?? "").trim();

  if (!texto) {
    throw new Error(nome + " é obrigatório.");
  }

  return texto;
}

function carregarDados() {
  try {
    const salvo = localStorage.getItem(CHAVE_DADOS);

    if (!salvo) {
      return copiar(dadosIniciais);
    }

    const dados = JSON.parse(salvo);

    if (
      !dados ||
      !Array.isArray(dados.alimentos) ||
      !Array.isArray(dados.pratos) ||
      !Array.isArray(dados.semanas)
    ) {
      throw new Error("Estrutura de dados inválida.");
    }

    return {
      ...copiar(dadosIniciais),
      ...dados,
      preferencias: {
        ...copiar(dadosIniciais.preferencias),
        ...(dados.preferencias || {})
      }
    };
  } catch (erro) {
    console.error("Não foi possível carregar os dados:", erro);
    return copiar(dadosIniciais);
  }
}

let dados = carregarDados();

function salvarDados() {
  try {
    localStorage.setItem(CHAVE_DADOS, JSON.stringify(dados));
    return true;
  } catch (erro) {
    console.error("Não foi possível salvar os dados:", erro);
    throw new Error(
      "O navegador não conseguiu salvar os dados. Verifique o espaço disponível."
    );
  }
}

function listarAlimentos() {
  return copiar(dados.alimentos).sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR")
  );
}

function buscarAlimento(id) {
  const alimento = dados.alimentos.find(item => item.id === id);
  return alimento ? copiar(alimento) : null;
}

/*
 * nutrientes:
 * valores nutricionais para cada 100 g, 100 ml ou unidade,
 * conforme a unidade-base escolhida.
 *
 * unidadeBase:
 * "g", "ml" ou "unidade".
 */
function cadastrarAlimento({
  nome,
  categoria = "Outros",
  unidadeBase = "g",
  nutrientes = {}
}) {
  nome = textoObrigatorio(nome, "Nome do alimento");

  if (!["g", "ml", "unidade"].includes(unidadeBase)) {
    throw new Error("A unidade-base deve ser g, ml ou unidade.");
  }

  const alimento = {
    id: gerarId(),
    nome,
    categoria: textoObrigatorio(categoria, "Categoria"),
    unidadeBase,
    nutrientes: {
      kcal: numeroValido(nutrientes.kcal ?? 0, "Calorias"),
      proteinas: numeroValido(
        nutrientes.proteinas ?? 0,
        "Proteínas"
      ),
      carboidratos: numeroValido(
        nutrientes.carboidratos ?? 0,
        "Carboidratos"
      ),
      gorduras: numeroValido(
        nutrientes.gorduras ?? 0,
        "Gorduras"
      )
    },
    criadoEm: new Date().toISOString()
  };

  dados.alimentos.push(alimento);
  salvarDados();

  return copiar(alimento);
}

function atualizarAlimento(id, alteracoes) {
  const indice = dados.alimentos.findIndex(item => item.id === id);

  if (indice === -1) {
    throw new Error("Alimento não encontrado.");
  }

  const atual = dados.alimentos[indice];

  const atualizado = {
    ...atual,
    nome: textoObrigatorio(
      alteracoes.nome ?? atual.nome,
      "Nome do alimento"
    ),
    categoria: textoObrigatorio(
      alteracoes.categoria ?? atual.categoria,
      "Categoria"
    ),
    unidadeBase: alteracoes.unidadeBase ?? atual.unidadeBase,
    nutrientes: {
      ...atual.nutrientes,
      ...(alteracoes.nutrientes || {})
    }
  };

  if (!["g", "ml", "unidade"].includes(atualizado.unidadeBase)) {
    throw new Error("Unidade-base inválida.");
  }

  for (const chave of [
    "kcal",
    "proteinas",
    "carboidratos",
    "gorduras"
  ]) {
    atualizado.nutrientes[chave] = numeroValido(
      atualizado.nutrientes[chave],
      chave
    );
  }

  dados.alimentos[indice] = atualizado;
  salvarDados();

  return copiar(atualizado);
}

function excluirAlimento(id) {
  const usadoEmPrato = dados.pratos.some(prato =>
    prato.ingredientes.some(ingrediente =>
      ingrediente.alimentoId === id
    )
  );

  if (usadoEmPrato) {
    throw new Error(
      "Este alimento está em um prato. Remova-o dos pratos antes de excluí-lo."
    );
  }

  dados.alimentos = dados.alimentos.filter(item => item.id !== id);
  salvarDados();
}

/*
 * quantidade é expressa na unidade-base do alimento.
 * Exemplo: 150 g, 200 ml ou 2 unidades.
 */
function calcularNutrientes(ingredientes) {
  const total = {
    kcal: 0,
    proteinas: 0,
    carboidratos: 0,
    gorduras: 0
  };

  for (const ingrediente of ingredientes) {
    const alimento = buscarAlimento(ingrediente.alimentoId);

    if (!alimento) continue;

    const quantidade = numeroValido(
      ingrediente.quantidade,
      "Quantidade do ingrediente"
    );

    const fator =
      alimento.unidadeBase === "unidade"
        ? quantidade
        : quantidade / 100;

    for (const chave of Object.keys(total)) {
      total[chave] += alimento.nutrientes[chave] * fator;
    }
  }

  return Object.fromEntries(
    Object.entries(total).map(([chave, valor]) => [
      chave,
      Math.round(valor * 100) / 100
    ])
  );
}

/*
 * Cada prato é cadastrado para UMA porção individual.
 * Os valores nutricionais são calculados pelos ingredientes.
 *
 * origem:
 * "colecao" = prato permanente
 * "semana" = prato exclusivo de uma semana
 */
function cadastrarPrato({
  nome,
  categoria = "Outros",
  ingredientes = [],
  origem = "colecao",
  semanaId = null,
  preparo = ""
}) {
  nome = textoObrigatorio(nome, "Nome do prato");

  if (!["colecao", "semana"].includes(origem)) {
    throw new Error("Origem do prato inválida.");
  }

  if (origem === "semana" && !semanaId) {
    throw new Error(
      "Informe a semana para cadastrar um prato exclusivo."
    );
  }

  if (
    origem === "semana" &&
    !dados.semanas.some(semana => semana.id === semanaId)
  ) {
    throw new Error("A semana selecionada não existe.");
  }

  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    throw new Error("Adicione pelo menos um ingrediente.");
  }

  const ingredientesValidos = ingredientes.map(item => {
    const alimento = buscarAlimento(item.alimentoId);

    if (!alimento) {
      throw new Error("Um dos alimentos selecionados não existe.");
    }

    return {
      alimentoId: alimento.id,
      quantidade: numeroValido(
        item.quantidade,
        "Quantidade de " + alimento.nome
      )
    };
  });

  const prato = {
    id: gerarId(),
    nome,
    categoria: textoObrigatorio(categoria, "Categoria do prato"),
    origem,
    semanaId: origem === "semana" ? semanaId : null,
    ingredientes: ingredientesValidos,
    preparo: String(preparo || "").trim(),
    criadoEm: new Date().toISOString()
  };

  dados.pratos.push(prato);
  salvarDados();

  return copiar({
    ...prato,
    nutrientes: calcularNutrientes(prato.ingredientes)
  });
}

function listarPratos({ semanaId = null } = {}) {
  return copiar(dados.pratos)
    .filter(prato =>
      prato.origem === "colecao" ||
      prato.semanaId === semanaId
    )
    .map(prato => ({
      ...prato,
      nutrientes: calcularNutrientes(prato.ingredientes)
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

function buscarPrato(id) {
  const prato = dados.pratos.find(item => item.id === id);

  if (!prato) return null;

  return copiar({
    ...prato,
    nutrientes: calcularNutrientes(prato.ingredientes)
  });
}

function excluirPrato(id) {
  const usadoNaSemana = dados.semanas.some(semana =>
    semana.refeicoes.some(refeicao =>
      refeicao.pratoId === id
    )
  );

  if (usadoNaSemana) {
    throw new Error(
      "Este prato está em um cardápio semanal. Remova-o do cardápio antes de excluí-lo."
    );
  }

  dados.pratos = dados.pratos.filter(prato => prato.id !== id);
  salvarDados();
}

/*
 * Cria uma semana vazia.
 * As refeições serão ligadas aos pratos nas próximas etapas.
 */
function criarSemana({ nome, inicio }) {
  nome = textoObrigatorio(nome, "Nome da semana");
  inicio = textoObrigatorio(inicio, "Data inicial");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio)) {
    throw new Error("Use a data no formato AAAA-MM-DD.");
  }

  const dataInicio = new Date(inicio + "T12:00:00");

  if (Number.isNaN(dataInicio.getTime())) {
    throw new Error("Data inicial inválida.");
  }

  const semana = {
    id: gerarId(),
    nome,
    inicio,
    refeicoes: [],
    criadaEm: new Date().toISOString()
  };

  dados.semanas.push(semana);

  if (!dados.preferencias.semanaAtivaId) {
    dados.preferencias.semanaAtivaId = semana.id;
  }

  salvarDados();

  return copiar(semana);
}

function listarSemanas() {
  return copiar(dados.semanas).sort((a, b) =>
    b.inicio.localeCompare(a.inicio)
  );
}

function buscarSemana(id) {
  const semana = dados.semanas.find(item => item.id === id);
  return semana ? copiar(semana) : null;
}

function selecionarSemana(id) {
  if (!dados.semanas.some(semana => semana.id === id)) {
    throw new Error("Semana não encontrada.");
  }

  dados.preferencias.semanaAtivaId = id;
  salvarDados();
}

function obterResumo() {
  const semanaAtiva = buscarSemana(
    dados.preferencias.semanaAtivaId
  );

  return {
    quantidadeAlimentos: dados.alimentos.length,
    quantidadePratos: dados.pratos.length,
    quantidadeSemanas: dados.semanas.length,
    semanaAtiva
  };
}

/*
 * API pública para a interface e para testes.
 */
window.Alimentacao = Object.freeze({
  listarAlimentos,
  buscarAlimento,
  cadastrarAlimento,
  atualizarAlimento,
  excluirAlimento,
  calcularNutrientes,
  cadastrarPrato,
  listarPratos,
  buscarPrato,
  excluirPrato,
  criarSemana,
  listarSemanas,
  buscarSemana,
  selecionarSemana,
  obterResumo,
  salvarDados
});

console.info("Minha Alimentação: núcleo carregado.");

/* =========================================
   CONEXÃO INICIAL COM A INTERFACE
========================================= */

function atualizarPainel() {
  const resumo = window.Alimentacao.obterResumo();

  const elementoData = document.getElementById("dataHoje");
  const elementoAlimentos = document.getElementById("quantidadeAlimentos");
  const elementoPratos = document.getElementById("quantidadePratos");
  const elementoSemanas = document.getElementById("quantidadeSemanas");

  if (elementoData) {
    elementoData.textContent = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short"
    });
  }

  if (elementoAlimentos) {
    elementoAlimentos.textContent = resumo.quantidadeAlimentos;
  }

  if (elementoPratos) {
    elementoPratos.textContent = resumo.quantidadePratos;
  }

  if (elementoSemanas) {
    elementoSemanas.textContent = resumo.quantidadeSemanas;
  }
}

function configurarNavegacaoInicial() {
  document.querySelectorAll("[data-tela]").forEach(botao => {
    botao.addEventListener("click", () => {
      const tela = botao.dataset.tela;

      if (tela === "inicio") {
        document.getElementById("telaDinamica").hidden = true;

        document.querySelectorAll(
          "#conteudo > section:not(#telaDinamica)"
        ).forEach(secao => {
          secao.hidden = false;
        });
      } else {
        alert(
          "A área selecionada será ativada na próxima etapa. ♡"
        );
      }

      document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.toggle(
          "ativo",
          item.dataset.tela === tela
        );
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarPainel();
  configurarNavegacaoInicial();
});

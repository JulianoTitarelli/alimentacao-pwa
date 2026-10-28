
"use strict";

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

  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

function numeroValido(valor, nome = "Valor") {
  if (valor === "" || valor === null || valor === undefined) {
    throw new Error(nome + " é obrigatório.");
  }

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

    if (!salvo) return copiar(dadosIniciais);

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
    throw new Error("Não foi possível salvar os dados neste navegador.");
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

function cadastrarAlimento({
  nome,
  categoria = "Outros",
  unidadeBase = "g",
  nutrientes = {}
}) {
  nome = textoObrigatorio(nome, "Nome do alimento");

  if (!["g", "ml", "unidade"].includes(unidadeBase)) {
    throw new Error("Escolha uma unidade válida.");
  }

  const alimento = {
    id: gerarId(),
    nome,
    categoria: textoObrigatorio(categoria, "Categoria"),
    unidadeBase,
    nutrientes: {
      kcal: numeroValido(nutrientes.kcal, "Calorias"),
      proteinas: numeroValido(nutrientes.proteinas, "Proteínas"),
      carboidratos: numeroValido(nutrientes.carboidratos, "Carboidratos"),
      gorduras: numeroValido(nutrientes.gorduras, "Gorduras")
    },
    criadoEm: new Date().toISOString()
  };

  dados.alimentos.push(alimento);
  salvarDados();

  return copiar(alimento);
}

function excluirAlimento(id) {
  const usadoEmPrato = dados.pratos.some(prato =>
    prato.ingredientes.some(ingrediente => ingrediente.alimentoId === id)
  );

  if (usadoEmPrato) {
    throw new Error("Este alimento está em um prato. Remova-o dos pratos antes de excluí-lo.");
  }

  dados.alimentos = dados.alimentos.filter(item => item.id !== id);
  salvarDados();
}

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

    const quantidade = numeroValido(ingrediente.quantidade, "Quantidade");
    const fator = alimento.unidadeBase === "unidade"
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

  if (origem === "semana" && !dados.semanas.some(s => s.id === semanaId)) {
    throw new Error("A semana selecionada não existe.");
  }

  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    throw new Error("Adicione pelo menos um ingrediente.");
  }

  const ingredientesValidos = ingredientes.map(item => {
    const alimento = buscarAlimento(item.alimentoId);

    if (!alimento) throw new Error("Um dos alimentos não existe.");

    return {
      alimentoId: alimento.id,
      quantidade: numeroValido(item.quantidade, "Quantidade de " + alimento.nome)
    };
  });

  const prato = {
    id: gerarId(),
    nome,
    categoria: textoObrigatorio(categoria, "Categoria"),
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
    .filter(prato => prato.origem === "colecao" || prato.semanaId === semanaId)
    .map(prato => ({
      ...prato,
      nutrientes: calcularNutrientes(prato.ingredientes)
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

function buscarPrato(id) {
  const prato = dados.pratos.find(item => item.id === id);

  return prato
    ? copiar({ ...prato, nutrientes: calcularNutrientes(prato.ingredientes) })
    : null;
}

function excluirPrato(id) {
  const usado = dados.semanas.some(semana =>
    semana.refeicoes.some(refeicao => refeicao.pratoId === id)
  );

  if (usado) {
    throw new Error("Este prato está em um cardápio. Remova-o antes de excluí-lo.");
  }

  dados.pratos = dados.pratos.filter(prato => prato.id !== id);
  salvarDados();
}

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
  return {
    quantidadeAlimentos: dados.alimentos.length,
    quantidadePratos: dados.pratos.length,
    quantidadeSemanas: dados.semanas.length,
    semanaAtiva: buscarSemana(dados.preferencias.semanaAtivaId)
  };
}

window.Alimentacao = Object.freeze({
  listarAlimentos,
  buscarAlimento,
  cadastrarAlimento,
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

/* =========================================
   INTERFACE
========================================= */

const $ = seletor => document.querySelector(seletor);

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;

  return elemento;
}

function formatarNumero(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    maximumFractionDigits: 2
  });
}

function atualizarPainel() {
  const resumo = obterResumo();

  if ($("#dataHoje")) {
    $("#dataHoje").textContent = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short"
    });
  }

  if ($("#quantidadeAlimentos")) {
    $("#quantidadeAlimentos").textContent = resumo.quantidadeAlimentos;
  }

  if ($("#quantidadePratos")) {
    $("#quantidadePratos").textContent = resumo.quantidadePratos;
  }

  if ($("#quantidadeSemanas")) {
    $("#quantidadeSemanas").textContent = resumo.quantidadeSemanas;
  }
}

function mostrarMensagem(container, mensagem, tipo = "") {
  const elemento = criarElemento("div", "mensagem-status" + (tipo ? " " + tipo : ""), mensagem);
  elemento.setAttribute("role", tipo === "erro" ? "alert" : "status");
  container.prepend(elemento);
}

function criarCampo({ rotulo, nome, tipo = "text", valor = "", obrigatorio = false, opcoes = null, ajuda = "" }) {
  const campo = criarElemento("div", "campo");
  const id = "campo-" + nome;

  const label = criarElemento("label", "", rotulo);
  label.htmlFor = id;
  campo.append(label);

  let entrada;

  if (opcoes) {
    entrada = document.createElement("select");

    opcoes.forEach(opcao => {
      const item = document.createElement("option");
      item.value = opcao.valor;
      item.textContent = opcao.texto;
      entrada.append(item);
    });
  } else {
    entrada = document.createElement("input");
    entrada.type = tipo;
    if (tipo === "number") {
      entrada.min = "0";
      entrada.step = "any";
      entrada.inputMode = "decimal";
    }
  }

  entrada.id = id;
  entrada.name = nome;
  entrada.value = valor;
  entrada.required = obrigatorio;
  campo.append(entrada);

  if (ajuda) campo.append(criarElemento("small", "", ajuda));

  return { campo, entrada };
}

function renderizarAlimentos() {
  const tela = $("#telaDinamica");
  tela.replaceChildren();
  tela.hidden = false;

  const secao = criarElemento("section", "tela-interna");
  const cabecalho = criarElemento("div", "cabecalho-tela");
  const titulo = document.createElement("div");

  titulo.append(criarElemento("p", "sobretitulo", "SUA DESPENSA DIGITAL"));
  titulo.append(criarElemento("h2", "", "Meus alimentos"));
  titulo.append(criarElemento("p", "subtitulo", "Cadastre ingredientes e seus nutrientes."));

  const voltar = criarElemento("button", "botao-voltar", "‹ Início");
  voltar.type = "button";
  voltar.addEventListener("click", mostrarInicio);

  cabecalho.append(titulo, voltar);
  secao.append(cabecalho);

  const formularioCartao = criarElemento("div", "cartao-formulario");
  formularioCartao.append(criarElemento("h3", "", "♡ Novo alimento"));

  const formulario = document.createElement("form");
  formulario.noValidate = false;

  const nome = criarCampo({
    rotulo: "Nome do alimento",
    nome: "nome",
    obrigatorio: true
  });

  const categoria = criarCampo({
    rotulo: "Categoria",
    nome: "categoria",
    obrigatorio: true,
    opcoes: [
      { valor: "Cereais e tubérculos", texto: "Cereais e tubérculos" },
      { valor: "Frutas", texto: "Frutas" },
      { valor: "Verduras e legumes", texto: "Verduras e legumes" },
      { valor: "Proteínas", texto: "Proteínas" },
      { valor: "Laticínios", texto: "Laticínios" },
      { valor: "Leguminosas", texto: "Leguminosas" },
      { valor: "Óleos e gorduras", texto: "Óleos e gorduras" },
      { valor: "Outros", texto: "Outros" }
    ]
  });

  const unidade = criarCampo({
    rotulo: "Unidade-base",
    nome: "unidadeBase",
    obrigatorio: true,
    opcoes: [
      { valor: "g", texto: "Gramas (g)" },
      { valor: "ml", texto: "Mililitros (ml)" },
      { valor: "unidade", texto: "Unidade (ex.: 1 ovo)" }
    ]
  });

  formulario.append(nome.campo, categoria.campo, unidade.campo);

  formulario.append(
    criarElemento("p", "texto-vazio", "Informe os nutrientes por 100 g ou 100 ml. Para unidade, informe os nutrientes de uma unidade.")
  );

  const grade = criarElemento("div", "grade-campos");

  const kcal = criarCampo({
    rotulo: "Energia (kcal)",
    nome: "kcal",
    tipo: "number",
    obrigatorio: true,
    valor: "0"
  });

  const proteinas = criarCampo({
    rotulo: "Proteínas (g)",
    nome: "proteinas",
    tipo: "number",
    obrigatorio: true,
    valor: "0"
  });

  const carboidratos = criarCampo({
    rotulo: "Carboidratos (g)",
    nome: "carboidratos",
    tipo: "number",
    obrigatorio: true,
    valor: "0"
  });

  const gorduras = criarCampo({
    rotulo: "Gorduras (g)",
    nome: "gorduras",
    tipo: "number",
    obrigatorio: true,
    valor: "0"
  });

  [kcal, proteinas, carboidratos, gorduras].forEach(item => {
    grade.append(item.campo);
  });

  formulario.append(grade);

  const salvar = criarElemento("button", "botao-principal", "♡ Salvar alimento");
  salvar.type = "submit";
  formulario.append(salvar);

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
      cadastrarAlimento({
        nome: nome.entrada.value,
        categoria: categoria.entrada.value,
        unidadeBase: unidade.entrada.value,
        nutrientes: {
          kcal: numeroValido(kcal.entrada.value, "Calorias"),
          proteinas: numeroValido(proteinas.entrada.value, "Proteínas"),
          carboidratos: numeroValido(carboidratos.entrada.value, "Carboidratos"),
          gorduras: numeroValido(gorduras.entrada.value, "Gorduras")
        }
      });

      renderizarAlimentos();
      atualizarPainel();
      mostrarMensagem($("#telaDinamica .tela-interna"), "Alimento salvo com sucesso! ♡", "sucesso");
      $("#telaDinamica").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (erro) {
      mostrarMensagem(secao, erro.message, "erro");
    }
  });

  formularioCartao.append(formulario);
  secao.append(formularioCartao);

  secao.append(criarElemento("h3", "", "Alimentos cadastrados"));

  const lista = criarElemento("div", "lista-cadastros");
  const alimentos = listarAlimentos();

  if (alimentos.length === 0) {
    lista.append(
      criarElemento("div", "texto-vazio", "Ainda não há alimentos cadastrados. Adicione o primeiro usando o formulário acima.")
    );
  }

  alimentos.forEach(alimento => {
    const item = criarElemento("article", "item-cadastro");
    const conteudo = criarElemento("div", "item-cadastro-conteudo");

    conteudo.append(criarElemento("span", "etiqueta", alimento.categoria));
    conteudo.append(criarElemento("h4", "", alimento.nome));

    const unidadeTexto = alimento.unidadeBase === "unidade"
      ? "por unidade"
      : "por 100 " + alimento.unidadeBase;

    conteudo.append(
      criarElemento(
        "p",
        "",
        `${formatarNumero(alimento.nutrientes.kcal)} kcal · P ${formatarNumero(alimento.nutrientes.proteinas)} g · C ${formatarNumero(alimento.nutrientes.carboidratos)} g · G ${formatarNumero(alimento.nutrientes.gorduras)} g`
      )
    );

    conteudo.append(criarElemento("p", "", unidadeTexto));

    const excluir = criarElemento("button", "botao-excluir", "Excluir");
    excluir.type = "button";

    excluir.addEventListener("click", () => {
      if (!confirm(`Excluir o alimento "${alimento.nome}"?`)) return;

      try {
        excluirAlimento(alimento.id);
        renderizarAlimentos();
        atualizarPainel();
      } catch (erro) {
        mostrarMensagem(secao, erro.message, "erro");
      }
    });

    item.append(conteudo, excluir);
    lista.append(item);
  });

  secao.append(lista);
  tela.append(secao);
  atualizarNavegacao("alimentos");
}

function atualizarNavegacao(telaAtiva) {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("ativo", item.dataset.tela === telaAtiva);
  });
}

function mostrarInicio() {
  $("#telaDinamica").hidden = true;

  document.querySelectorAll("#conteudo > section:not(#telaDinamica)").forEach(secao => {
    secao.hidden = false;
  });

  atualizarNavegacao("inicio");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirTela(tela) {
  if (tela === "inicio") {
    mostrarInicio();
    return;
  }

  if (tela === "alimentos") {
    document.querySelectorAll("#conteudo > section:not(#telaDinamica)").forEach(secao => {
      secao.hidden = true;
    });

    renderizarAlimentos();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  alert("Esta área será implementada na próxima etapa. ♡");
}

function configurarNavegacao() {
  document.querySelectorAll("[data-tela]").forEach(botao => {
    botao.addEventListener("click", () => {
      abrirTela(botao.dataset.tela);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarPainel();
  configurarNavegacao();
});

console.info("Minha Alimentação: interface de alimentos carregada.");

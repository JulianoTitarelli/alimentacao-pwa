
"use strict";

const CHAVE_DADOS = "minhaAlimentacao_dados_v1";

const catalogoNutricional = [
    // CEREAIS E TUBÉRCULOS
    { nome: "Arroz branco cozido", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 130.85, proteinas: 2.45, carboidratos: 30, gorduras: 0.35 } },
    { nome: "Cuscuz cozido", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 113.22, proteinas: 2.33, carboidratos: 24.81, gorduras: 0.31 } },
    { nome: "Macarrão cozido", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 157.64, proteinas: 5.53, carboidratos: 30.63, gorduras: 1.08 } },
    { nome: "Batata-doce cozida", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 77.38, proteinas: 0.69, carboidratos: 17.85, gorduras: 0.11 } },
    { nome: "Batata inglesa cozida", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 52, proteinas: 1.2, carboidratos: 12, gorduras: 0.1 } },
    { nome: "Mandioca cozida", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 125, proteinas: 0.6, carboidratos: 30, gorduras: 0.3 } },
    { nome: "Inhame cozido", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 97, proteinas: 2, carboidratos: 23, gorduras: 0.1 } },
    { nome: "Pão francês", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 270, proteinas: 9, carboidratos: 52, gorduras: 3 } },
    { nome: "Pão integral", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 270, proteinas: 10, carboidratos: 52, gorduras: 3 } },
    { nome: "Aveia", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 395, proteinas: 13.71, carboidratos: 67.14, gorduras: 8.57 } },
    { nome: "Polenta cozida", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 70, proteinas: 1.5, carboidratos: 15, gorduras: 0.5 } },
    { nome: "Tapioca (goma hidratada)", categoria: "Cereais e tubérculos", unidadeBase: "g", nutrientes: { kcal: 230, proteinas: 0, carboidratos: 56, gorduras: 0 } },

    // LEGUMINOSAS
    { nome: "Feijão cozido", categoria: "Leguminosas", unidadeBase: "g", nutrientes: { kcal: 76.7, proteinas: 4.75, carboidratos: 13.65, gorduras: 0.52 } },
    { nome: "Grão-de-bico cozido", categoria: "Leguminosas", unidadeBase: "g", nutrientes: { kcal: 164.1, proteinas: 8.93, carboidratos: 27.42, gorduras: 2.63 } },
    { nome: "Lentilha cozida", categoria: "Leguminosas", unidadeBase: "g", nutrientes: { kcal: 93.33, proteinas: 6.37, carboidratos: 15.93, gorduras: 0.44 } },
    { nome: "Proteína de soja preparada", categoria: "Leguminosas", unidadeBase: "g", nutrientes: { kcal: 103.7, proteinas: 15.19, carboidratos: 8.52, gorduras: 2.22 } },

    // PROTEÍNAS
    { nome: "Frango grelhado", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 159.07, proteinas: 31.11, carboidratos: 0, gorduras: 3.11 } },
    { nome: "Frango desfiado", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 160, proteinas: 31.6, carboidratos: 0, gorduras: 3.2 } },
    { nome: "Frango na sopa", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 159.09, proteinas: 30.91, carboidratos: 0, gorduras: 3.09 } },
    { nome: "Ovos inteiros", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 143, proteinas: 13, carboidratos: 0.7, gorduras: 9.5 } },
    { nome: "Ovo cozido", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 144, proteinas: 13, carboidratos: 0.8, gorduras: 9.6 } },
    { nome: "Sardinha em conserva", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 166.5, proteinas: 25.04, carboidratos: 0, gorduras: 7.23 } },
    { nome: "Atum em água escorrido", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 116.67, proteinas: 25, carboidratos: 0, gorduras: 1.1 } },
    { nome: "Carne moída magra", categoria: "Proteínas", unidadeBase: "g", nutrientes: { kcal: 190, proteinas: 25.91, carboidratos: 0, gorduras: 9.09 } },

    // LATICÍNIOS
    { nome: "Leite integral", categoria: "Laticínios", unidadeBase: "ml", nutrientes: { kcal: 61, proteinas: 3.25, carboidratos: 5, gorduras: 3.25 } },
    { nome: "Leite desnatado", categoria: "Laticínios", unidadeBase: "ml", nutrientes: { kcal: 35, proteinas: 3, carboidratos: 5, gorduras: 0 } },
    { nome: "Iogurte natural integral", categoria: "Laticínios", unidadeBase: "g", nutrientes: { kcal: 56.47, proteinas: 3.82, carboidratos: 4.71, gorduras: 2.35 } },
    { nome: "Iogurte natural", categoria: "Laticínios", unidadeBase: "g", nutrientes: { kcal: 56.47, proteinas: 3.82, carboidratos: 4.71, gorduras: 2.35 } },
    { nome: "Queijo branco", categoria: "Laticínios", unidadeBase: "g", nutrientes: { kcal: 262.5, proteinas: 17.5, carboidratos: 2.5, gorduras: 20 } },

    // FRUTAS
    { nome: "Banana", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 88.78, proteinas: 1.03, carboidratos: 22.67, gorduras: 0.16 } },
    { nome: "Maçã", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 56.15, proteinas: 0.31, carboidratos: 15, gorduras: 0.15 } },
    { nome: "Mamão", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 40, proteinas: 0.51, carboidratos: 10, gorduras: 0.11 } },
    { nome: "Laranja", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 42.86, proteinas: 0.86, carboidratos: 10.71, gorduras: 0.07 } },
    { nome: "Tangerina", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 46.43, proteinas: 0.79, carboidratos: 11.43, gorduras: 0.07 } },
    { nome: "Melancia", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 30, proteinas: 0.6, carboidratos: 7.5, gorduras: 0.1 } },
    { nome: "Melão", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 34, proteinas: 0.7, carboidratos: 8.5, gorduras: 0.1 } },
    { nome: "Abacaxi", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 50, proteinas: 0.53, carboidratos: 13, gorduras: 0.13 } },
    { nome: "Goiaba", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 68, proteinas: 2.6, carboidratos: 14, gorduras: 1 } },
    { nome: "Morango", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 32, proteinas: 0.67, carboidratos: 7.67, gorduras: 0.33 } },
    { nome: "Pera", categoria: "Frutas", unidadeBase: "g", nutrientes: { kcal: 57.14, proteinas: 0.36, carboidratos: 15, gorduras: 0.14 } },

    // VERDURAS E LEGUMES
    { nome: "Abóbora cabotiá cozida", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 48, proteinas: 1.4, carboidratos: 12, gorduras: 0.7 } },
    { nome: "Couve cozida", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 27, proteinas: 2.9, carboidratos: 4.3, gorduras: 0.5 } },
    { nome: "Alface", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 15, proteinas: 1.4, carboidratos: 2.9, gorduras: 0.2 } },
    { nome: "Cenoura cozida", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 35, proteinas: 0.8, carboidratos: 8.2, gorduras: 0.2 } },
    { nome: "Beterraba cozida", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 44, proteinas: 1.7, carboidratos: 10, gorduras: 0.2 } },
    { nome: "Abobrinha cozida", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 15, proteinas: 1.1, carboidratos: 3.1, gorduras: 0.3 } },
    { nome: "Brócolis cozido", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 25, proteinas: 2.1, carboidratos: 4.4, gorduras: 0.5 } },
    { nome: "Tomate", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 18, proteinas: 0.9, carboidratos: 3.9, gorduras: 0.2 } },
    { nome: "Legumes e verduras", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 36.5, proteinas: 1.75, carboidratos: 7.25, gorduras: 0.35 } },
    { nome: "Salada crua", categoria: "Verduras e legumes", unidadeBase: "g", nutrientes: { kcal: 20.87, proteinas: 1.22, carboidratos: 3.91, gorduras: 0.26 } },

    // OUTROS
    { nome: "Molho de tomate", categoria: "Outros", unidadeBase: "g", nutrientes: { kcal: 40, proteinas: 1.5, carboidratos: 8, gorduras: 0.5 } },
    { nome: "Sopa de legumes", categoria: "Outros", unidadeBase: "g", nutrientes: { kcal: 36, proteinas: 1.33, carboidratos: 7.2, gorduras: 0.48 } },
    { nome: "Amendoim torrado", categoria: "Outros", unidadeBase: "g", nutrientes: { kcal: 570, proteinas: 26, carboidratos: 16, gorduras: 49 } },
    { nome: "Azeite ou óleo", categoria: "Outros", unidadeBase: "ml", nutrientes: { kcal: 800, proteinas: 0, carboidratos: 0, gorduras: 90 } }
];

const dadosIniciais = {
  versao: 1,
  alimentos: [],
  pratos: [],
  semanas: [],
  consumos: [],
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
  consumos: Array.isArray(dados.consumos)
    ? dados.consumos
    : [],
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

function carregarCatalogoNutricional() {
    let alterou = false;

    catalogoNutricional.forEach(item => {
        const nomeNormalizado = item.nome.trim().toLowerCase();

        const jaExiste = dados.alimentos.some(alimento =>
            alimento.nome.trim().toLowerCase() === nomeNormalizado
        );

        if (jaExiste) return;

        dados.alimentos.push({
            id: crypto.randomUUID(),
            nome: item.nome,
            categoria: item.categoria,
            unidadeBase: item.unidadeBase,
            nutrientes: { ...item.nutrientes },
            origem: "catalogo",
            criadoEm: new Date().toISOString()
        });

        alterou = true;
    });

    if (alterou) {
        salvarDados();
    }
}

carregarCatalogoNutricional();

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
// =====================================================
// LISTA DE MERCADO
// =====================================================

function gerarListaMercado(semanaId) {
  const refeicoes = listarRefeicoes(semanaId);
  const totais = new Map();

  refeicoes.forEach(refeicao => {
    const prato = buscarPrato(refeicao.pratoId);

    if (!prato || !Array.isArray(prato.ingredientes)) {
      return;
    }

    const porcoes = Number(refeicao.porcoes) || 1;

    prato.ingredientes.forEach(ingrediente => {
      const alimento = buscarAlimento(ingrediente.alimentoId);

      if (!alimento) return;

      const quantidade = Number(ingrediente.quantidade) * porcoes;

      if (!Number.isFinite(quantidade)) return;

      if (totais.has(alimento.id)) {
        totais.get(alimento.id).quantidade += quantidade;
      } else {
        totais.set(alimento.id, {
          id: alimento.id,
          nome: alimento.nome,
          categoria: alimento.categoria,
          unidade: alimento.unidadeBase,
          quantidade
        });
      }
    });
  });

  return Array.from(totais.values()).sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR")
  );
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
function adicionarRefeicao({
  semanaId,
  data,
  tipo,
  pratoId,
  porcoes = 1
}) {
  const semana = dados.semanas.find(item => item.id === semanaId);

  if (!semana) {
    throw new Error("Semana não encontrada.");
  }

  const dataValida = new Date(data + "T12:00:00");
  const inicio = new Date(semana.inicio + "T12:00:00");
  const fim = new Date(inicio);
  fim.setDate(fim.getDate() + 6);

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(data) ||
    Number.isNaN(dataValida.getTime()) ||
    data < semana.inicio ||
    dataValida > fim
  ) {
    throw new Error("Escolha uma data dentro da semana selecionada.");
  }

  const prato = dados.pratos.find(item => item.id === pratoId);

  if (!prato) {
    throw new Error("Prato não encontrado.");
  }

  const quantidadePorcoes = numeroValido(porcoes, "Quantidade de porções");

  if (quantidadePorcoes <= 0) {
    throw new Error("Informe pelo menos uma porção.");
  }

  const tiposPermitidos = [
    "Café da manhã",
    "Lanche",
    "Almoço",
    "Jantar"
  ];

  if (!tiposPermitidos.includes(tipo)) {
    throw new Error("Tipo de refeição inválido.");
  }

  if (
    prato.origem === "semana" &&
    prato.semanaId !== semanaId
  ) {
    throw new Error("Este prato pertence a outra semana.");
  }

  const refeicao = {
    id: gerarId(),
    data,
    tipo,
    pratoId,
    porcoes: quantidadePorcoes,
    criadaEm: new Date().toISOString()
  };

  semana.refeicoes.push(refeicao);
  salvarDados();

  return copiar(refeicao);
}

function listarRefeicoes(semanaId) {
  const semana = dados.semanas.find(item => item.id === semanaId);

  if (!semana) {
    throw new Error("Semana não encontrada.");
  }

  return copiar(semana.refeicoes).sort((a, b) => {
    const comparacaoData = a.data.localeCompare(b.data);

    if (comparacaoData !== 0) return comparacaoData;

    return a.tipo.localeCompare(b.tipo, "pt-BR");
  });
}

function excluirRefeicao(semanaId, refeicaoId) {
  const semana = dados.semanas.find(item => item.id === semanaId);

  if (!semana) {
    throw new Error("Semana não encontrada.");
  }

  semana.refeicoes = semana.refeicoes.filter(
    refeicao => refeicao.id !== refeicaoId
  );

  salvarDados();
}
function obterInicioDaSemana(data) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    throw new Error("Data inválida. Use AAAA-MM-DD.");
  }

  const dataObj = new Date(data + "T12:00:00");

  if (Number.isNaN(dataObj.getTime())) {
    throw new Error("Data inválida.");
  }

  const dia = dataObj.getDay();
  dataObj.setDate(dataObj.getDate() - dia);

  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const diaMes = String(dataObj.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${diaMes}`;
}

function registrarConsumoPrato({
  semanaId,
  refeicaoId,
  porcoes
}) {
  const semana = dados.semanas.find(item => item.id === semanaId);

  if (!semana) {
    throw new Error("Semana não encontrada.");
  }

  const refeicao = semana.refeicoes.find(
    item => item.id === refeicaoId
  );

  if (!refeicao) {
    throw new Error("Refeição planejada não encontrada.");
  }

  const jaRegistrado = dados.consumos.some(
    item => item.refeicaoId === refeicaoId
  );

  if (jaRegistrado) {
    throw new Error("Esta refeição já foi registrada como consumida.");
  }

  const prato = buscarPrato(refeicao.pratoId);

  if (!prato) {
    throw new Error("Prato não encontrado.");
  }

  const quantidade = numeroValido(
    porcoes ?? refeicao.porcoes,
    "Porções consumidas"
  );

  if (quantidade <= 0) {
    throw new Error("Informe pelo menos uma porção.");
  }

  const consumo = {
    id: gerarId(),
    tipo: "prato",
    data: refeicao.data,
    semanaInicio: obterInicioDaSemana(refeicao.data),
    refeicaoId,
    pratoId: refeicao.pratoId,
    porcoes: quantidade,
    criadoEm: new Date().toISOString()
  };

  dados.consumos.push(consumo);
  salvarDados();

  return copiar(consumo);
}

function registrarConsumoAlimento({
  data,
  alimentoId,
  quantidade
}) {
  const alimento = buscarAlimento(alimentoId);

  if (!alimento) {
    throw new Error("Alimento não encontrado.");
  }

  const quantidadeValida = numeroValido(
    quantidade,
    "Quantidade consumida"
  );

  if (quantidadeValida <= 0) {
    throw new Error("Informe uma quantidade maior que zero.");
  }

  const consumo = {
    id: gerarId(),
    tipo: "alimento",
    data,
    semanaInicio: obterInicioDaSemana(data),
    alimentoId,
    quantidade: quantidadeValida,
    criadoEm: new Date().toISOString()
  };

  dados.consumos.push(consumo);
  salvarDados();

  return copiar(consumo);
}

function listarConsumos(semanaInicio = null) {
  return copiar(dados.consumos)
    .filter(consumo =>
      !semanaInicio || consumo.semanaInicio === semanaInicio
    )
    .sort((a, b) => {
      const comparacao = a.data.localeCompare(b.data);

      return comparacao !== 0
        ? comparacao
        : a.criadoEm.localeCompare(b.criadoEm);
    });
}

function excluirConsumo(id) {
  dados.consumos = dados.consumos.filter(
    consumo => consumo.id !== id
  );

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
  obterInicioDaSemana,
  registrarConsumoPrato,
  registrarConsumoAlimento,
  listarConsumos,
  excluirConsumo,
  adicionarRefeicao,
  listarRefeicoes,
  excluirRefeicao,
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

  // Data local de hoje no formato AAAA-MM-DD
  const agora = new Date();
  const hoje = [
    agora.getFullYear(),
    String(agora.getMonth() + 1).padStart(2, "0"),
    String(agora.getDate()).padStart(2, "0")
  ].join("-");

  if ($("#dataHoje")) {
    $("#dataHoje").textContent = agora.toLocaleDateString("pt-BR", {
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

  // Calcula somente os consumos registrados hoje
  const totais = {
    kcal: 0,
    proteinas: 0,
    carboidratos: 0,
    gorduras: 0
  };

  const consumosHoje = listarConsumos().filter(consumo => consumo.data === hoje);

  consumosHoje.forEach(consumo => {
    let nutrientes = null;
    let multiplicador = 1;

    if (consumo.tipo === "prato") {
      const prato = buscarPrato(consumo.pratoId);

      if (!prato) return;

      nutrientes = calcularNutrientes(prato.ingredientes);
      multiplicador = Number(consumo.porcoes) || 1;
    }

    if (consumo.tipo === "alimento") {
      nutrientes = calcularNutrientes([{
        alimentoId: consumo.alimentoId,
        quantidade: consumo.quantidade
      }]);
    }

    if (!nutrientes) return;

    Object.keys(totais).forEach(chave => {
      totais[chave] += (Number(nutrientes[chave]) || 0) * multiplicador;
    });
  });

  // Atualiza os números exibidos na tela inicial
  if ($("#totalKcal")) {
    $("#totalKcal").textContent = formatarNumero(totais.kcal);
  }

  if ($("#totalProteinas")) {
    $("#totalProteinas").textContent = formatarNumero(totais.proteinas) + " g";
  }

  if ($("#totalCarboidratos")) {
    $("#totalCarboidratos").textContent = formatarNumero(totais.carboidratos) + " g";
  }

  if ($("#totalGorduras")) {
    $("#totalGorduras").textContent = formatarNumero(totais.gorduras) + " g";
  }

  if ($("#textoKcal")) {
    $("#textoKcal").textContent = consumosHoje.length > 0
      ? "Nutrientes somados a partir do que você registrou hoje. ♡"
      : "Você ainda não registrou consumos hoje. ♡";
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
    atualizarPainel();
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

      if (tela === "consumo") {
    document.querySelectorAll("#conteudo > section:not(#telaDinamica)").forEach(secao => {
      secao.hidden = true;
    });

    renderizarConsumo();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (tela === "pratos") {
    document.querySelectorAll("#conteudo > section:not(#telaDinamica)").forEach(secao => {
      secao.hidden = true;
    });

    renderizarPratos();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (tela === "semanas") {
    document.querySelectorAll("#conteudo > section:not(#telaDinamica)").forEach(secao => {
      secao.hidden = true;
    });

    renderizarSemanas();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

      if (tela === "mercado") {
    document.querySelectorAll("#conteudo > section:not(#telaDinamica)").forEach(secao => {
      secao.hidden = true;
    });

    renderizarMercado();
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

/* =========================================
   CADASTRO E LISTAGEM DE PRATOS
========================================= */

function renderizarPratos() {
  const tela = $("#telaDinamica");
  tela.replaceChildren();
  tela.hidden = false;

  const secao = criarElemento("section", "tela-interna");
  const cabecalho = criarElemento("div", "cabecalho-tela");
  const titulo = document.createElement("div");

  titulo.append(criarElemento("p", "sobretitulo", "SUA COLEÇÃO"));
  titulo.append(criarElemento("h2", "", "Meus pratos"));
  titulo.append(criarElemento("p", "subtitulo", "Monte receitas com seus alimentos e veja os nutrientes por porção."));

  const voltar = criarElemento("button", "botao-voltar", "‹ Início");
  voltar.type = "button";
  voltar.addEventListener("click", mostrarInicio);

  cabecalho.append(titulo, voltar);
  secao.append(cabecalho);

  const cartao = criarElemento("div", "cartao-formulario");
  cartao.append(criarElemento("h3", "", "♡ Criar novo prato"));

  const formulario = document.createElement("form");

  const nome = criarCampo({
    rotulo: "Nome do prato",
    nome: "nomePrato",
    obrigatorio: true
  });

  const categoria = criarCampo({
    rotulo: "Tipo de refeição",
    nome: "categoriaPrato",
    obrigatorio: true,
    opcoes: [
      { valor: "Café da manhã", texto: "Café da manhã" },
      { valor: "Almoço", texto: "Almoço" },
      { valor: "Jantar", texto: "Jantar" },
      { valor: "Lanche", texto: "Lanche" },
      { valor: "Acompanhamento", texto: "Acompanhamento" },
      { valor: "Outros", texto: "Outros" }
    ]
  });

  formulario.append(nome.campo, categoria.campo);

  const ingredientesArea = criarElemento("div", "");
  ingredientesArea.append(criarElemento("h3", "", "Ingredientes"));

  const orientacao = criarElemento(
    "p",
    "texto-vazio",
    "As quantidades representam uma porção individual. Para alimentos cadastrados por 100 g ou 100 ml, informe a quantidade usada nessa porção."
  );

  ingredientesArea.append(orientacao);

  const linhas = criarElemento("div", "lista-cadastros");
  ingredientesArea.append(linhas);

  const alimentos = listarAlimentos();
  let contadorLinhas = 0;

  function adicionarLinha() {
    if (alimentos.length === 0) {
      mostrarMensagem(
        secao,
        "Cadastre pelo menos um alimento antes de montar um prato.",
        "erro"
      );
      return;
    }

    contadorLinhas++;

    const linha = criarElemento("div", "cartao-formulario");
    linha.style.marginBottom = "10px";
    linha.style.padding = "13px";

    const campoAlimento = criarCampo({
      rotulo: "Alimento",
      nome: "ingrediente" + contadorLinhas,
      obrigatorio: true,
      opcoes: alimentos.map(alimento => ({
        valor: alimento.id,
        texto: alimento.nome + (
          alimento.unidadeBase === "unidade"
            ? " (unidade)"
            : " (" + alimento.unidadeBase + ")"
        )
      }))
    });

    const campoQuantidade = criarCampo({
      rotulo: "Quantidade utilizada",
      nome: "quantidade" + contadorLinhas,
      tipo: "number",
      valor: "100",
      obrigatorio: true
    });

    campoQuantidade.entrada.min = "0.01";
    campoQuantidade.entrada.step = "any";

    const unidadeTexto = criarElemento("small", "", "");
    unidadeTexto.style.display = "block";
    unidadeTexto.style.marginTop = "6px";

    function atualizarUnidade() {
      const alimento = buscarAlimento(campoAlimento.entrada.value);

      if (!alimento) {
        unidadeTexto.textContent = "";
        return;
      }

      unidadeTexto.textContent = alimento.unidadeBase === "unidade"
        ? "Quantidade em unidades."
        : "Quantidade em " + alimento.unidadeBase + ".";
    }

    campoAlimento.entrada.addEventListener("change", atualizarUnidade);
    atualizarUnidade();

    const campos = criarElemento("div", "grade-campos");
    campos.append(campoAlimento.campo, campoQuantidade.campo);

    const remover = criarElemento("button", "botao-excluir", "Remover ingrediente");
    remover.type = "button";
    remover.addEventListener("click", () => linha.remove());

    linha.append(campos, unidadeTexto, remover);
    linha.dataset.ingrediente = "true";

    linhas.append(linha);
  }

  const adicionar = criarElemento("button", "botao-secundario", "+ Adicionar ingrediente");
  adicionar.type = "button";
  adicionar.addEventListener("click", adicionarLinha);

  ingredientesArea.append(adicionar);
  formulario.append(ingredientesArea);

  const campoPreparo = criarElemento("div", "campo");
  const labelPreparo = criarElemento("label", "", "Modo de preparo (opcional)");
  labelPreparo.htmlFor = "modoPreparo";

  const preparo = document.createElement("textarea");
  preparo.id = "modoPreparo";
  preparo.name = "modoPreparo";
  preparo.rows = 3;
  preparo.placeholder = "Como você prepara este prato?";
  preparo.style.width = "100%";
  preparo.style.padding = "12px";
  preparo.style.border = "1px solid var(--borda)";
  preparo.style.borderRadius = "13px";
  preparo.style.color = "var(--texto)";
  preparo.style.background = "#fbfdff";
  preparo.style.font = "inherit";

  campoPreparo.append(labelPreparo, preparo);
  formulario.append(campoPreparo);

  const salvar = criarElemento("button", "botao-principal", "♡ Salvar prato");
  salvar.type = "submit";
  formulario.append(salvar);

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
      const linhasIngredientes = Array.from(
        linhas.querySelectorAll('[data-ingrediente="true"]')
      );

      if (linhasIngredientes.length === 0) {
        throw new Error("Adicione pelo menos um ingrediente.");
      }

      const ingredientes = linhasIngredientes.map(linha => {
        const seletor = linha.querySelector("select");
        const quantidade = linha.querySelector('input[type="number"]');

        return {
          alimentoId: seletor.value,
          quantidade: numeroValido(
            quantidade.value,
            "Quantidade do ingrediente"
          )
        };
      });

      cadastrarPrato({
        nome: nome.entrada.value,
        categoria: categoria.entrada.value,
        ingredientes,
        origem: "colecao",
        preparo: preparo.value
      });

      renderizarPratos();
      atualizarPainel();

      mostrarMensagem(
        $("#telaDinamica .tela-interna"),
        "Prato salvo com sucesso! ♡",
        "sucesso"
      );
    } catch (erro) {
      mostrarMensagem(secao, erro.message, "erro");
    }
  });

  cartao.append(formulario);
  secao.append(cartao);

  secao.append(criarElemento("h3", "", "Pratos cadastrados"));

  const lista = criarElemento("div", "lista-cadastros");
  const pratos = listarPratos();

  if (pratos.length === 0) {
    lista.append(
      criarElemento(
        "div",
        "texto-vazio",
        "Você ainda não criou pratos. Quando salvar o primeiro, ele aparecerá aqui."
      )
    );
  }

  pratos.forEach(prato => {
    const item = criarElemento("article", "item-cadastro");
    const conteudo = criarElemento("div", "item-cadastro-conteudo");

    conteudo.append(criarElemento("span", "etiqueta", prato.categoria));
    conteudo.append(criarElemento("h4", "", prato.nome));

    conteudo.append(
      criarElemento(
        "p",
        "",
        `${formatarNumero(prato.nutrientes.kcal)} kcal · P ${formatarNumero(prato.nutrientes.proteinas)} g · C ${formatarNumero(prato.nutrientes.carboidratos)} g · G ${formatarNumero(prato.nutrientes.gorduras)} g`
      )
    );

    const ingredientesTexto = prato.ingredientes.map(ingrediente => {
      const alimento = buscarAlimento(ingrediente.alimentoId);

      if (!alimento) return "";

      const unidade = alimento.unidadeBase === "unidade"
        ? " un."
        : " " + alimento.unidadeBase;

      return `${alimento.nome}: ${formatarNumero(ingrediente.quantidade)}${unidade}`;
    }).filter(Boolean).join(" · ");

    conteudo.append(criarElemento("p", "", ingredientesTexto));

    if (prato.preparo) {
      conteudo.append(criarElemento("p", "", "Preparo: " + prato.preparo));
    }

    const excluir = criarElemento("button", "botao-excluir", "Excluir");
    excluir.type = "button";

    excluir.addEventListener("click", () => {
      if (!confirm(`Excluir o prato "${prato.nome}"?`)) return;

      try {
        excluirPrato(prato.id);
        renderizarPratos();
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
  atualizarNavegacao("pratos");

  if (alimentos.length === 0) {
    mostrarMensagem(
      secao,
      "Primeiro, entre em Meus alimentos e cadastre os ingredientes que você utiliza.",
      "erro"
    );
  }
}

/* =========================================
   CARDÁPIOS SEMANAIS
========================================= */


function renderizarSemanas() {
  const tela = $("#telaDinamica");
  tela.replaceChildren();
  tela.hidden = false;

  const secao = criarElemento("section", "tela-interna");
  const cabecalho = criarElemento("div", "cabecalho-tela");
  const titulo = document.createElement("div");

  titulo.append(criarElemento("p", "sobretitulo", "ORGANIZE SUA ROTINA"));
  titulo.append(criarElemento("h2", "", "Cardápios semanais"));
  titulo.append(
    criarElemento("p", "subtitulo", "Planeje suas refeições semana por semana.")
  );

  const voltar = criarElemento("button", "botao-voltar", "‹ Início");
  voltar.type = "button";
  voltar.addEventListener("click", mostrarInicio);

  cabecalho.append(titulo, voltar);
  secao.append(cabecalho);

  // CRIAR NOVA SEMANA

  const cartao = criarElemento("div", "cartao-formulario");
  cartao.append(criarElemento("h3", "", "♡ Criar nova semana"));

  const formulario = document.createElement("form");

  const nome = criarCampo({
    rotulo: "Nome do planejamento",
    nome: "nomeSemana",
    valor: "Minha semana",
    obrigatorio: true
  });

  const inicio = criarCampo({
    rotulo: "Primeiro dia da semana",
    nome: "inicioSemana",
    tipo: "date",
    obrigatorio: true
  });

  formulario.append(nome.campo, inicio.campo);

  const salvar = criarElemento("button", "botao-principal", "♡ Criar semana");
  salvar.type = "submit";
  formulario.append(salvar);

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
      criarSemana({
        nome: nome.entrada.value,
        inicio: inicio.entrada.value
      });

      renderizarSemanas();
      atualizarPainel();

      mostrarMensagem(
        $("#telaDinamica .tela-interna"),
        "Semana criada com sucesso! ♡",
        "sucesso"
      );
    } catch (erro) {
      mostrarMensagem(secao, erro.message, "erro");
    }
  });

  cartao.append(formulario);
  secao.append(cartao);

  // LISTAR SEMANAS

  secao.append(criarElemento("h3", "", "Minhas semanas"));

  const lista = criarElemento("div", "lista-cadastros");
  const semanas = listarSemanas();
  const resumo = obterResumo();

  if (semanas.length === 0) {
    lista.append(
      criarElemento(
        "div",
        "texto-vazio",
        "Você ainda não criou um planejamento semanal. Comece pelo formulário acima."
      )
    );
  }

  semanas.forEach(semana => {
    const item = criarElemento("article", "item-cadastro");
    const conteudo = criarElemento("div", "item-cadastro-conteudo");

    const dataInicio = new Date(semana.inicio + "T12:00:00");
    const dataFim = new Date(dataInicio);
    dataFim.setDate(dataFim.getDate() + 6);

    const periodo =
      dataInicio.toLocaleDateString("pt-BR") +
      " até " +
      dataFim.toLocaleDateString("pt-BR");

    if (semana.id === resumo.semanaAtiva?.id) {
      conteudo.append(criarElemento("span", "etiqueta", "Semana ativa ♡"));
    }

    conteudo.append(criarElemento("h4", "", semana.nome));
    conteudo.append(criarElemento("p", "", periodo));
    conteudo.append(
      criarElemento(
        "p",
        "",
        semana.refeicoes.length + " refeições planejadas"
      )
    );

    if (semana.id !== resumo.semanaAtiva?.id) {
      const ativar = criarElemento(
        "button",
        "botao-secundario",
        "Selecionar semana"
      );

      ativar.type = "button";

      ativar.addEventListener("click", () => {
        try {
          selecionarSemana(semana.id);
          renderizarSemanas();
          atualizarPainel();
        } catch (erro) {
          mostrarMensagem(secao, erro.message, "erro");
        }
      });

      item.append(conteudo, ativar);
    } else {
      item.append(conteudo);
    }

    lista.append(item);
  });

  secao.append(lista);

  // PLANEJAR REFEIÇÕES DA SEMANA ATIVA

  const semanaAtiva = resumo.semanaAtiva;

  if (semanaAtiva) {
    const cartaoRefeicoes = criarElemento("div", "cartao-formulario");

    cartaoRefeicoes.append(
      criarElemento("h3", "", "♡ Montar o cardápio")
    );

    cartaoRefeicoes.append(
      criarElemento("p", "subtitulo", "Semana: " + semanaAtiva.nome)
    );

    const formularioRefeicao = document.createElement("form");

    const dataInicio = new Date(semanaAtiva.inicio + "T12:00:00");
    const dataFim = new Date(dataInicio);
    dataFim.setDate(dataFim.getDate() + 6);

    const dataFimTexto =
      dataFim.getFullYear() +
      "-" +
      String(dataFim.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(dataFim.getDate()).padStart(2, "0");

    const data = criarCampo({
      rotulo: "Dia da refeição",
      nome: "dataRefeicao",
      tipo: "date",
      valor: semanaAtiva.inicio,
      obrigatorio: true
    });

    data.entrada.min = semanaAtiva.inicio;
    data.entrada.max = dataFimTexto;

    const tipo = criarCampo({
      rotulo: "Tipo de refeição",
      nome: "tipoRefeicao",
      obrigatorio: true,
      opcoes: [
        { valor: "Café da manhã", texto: "Café da manhã" },
        { valor: "Lanche", texto: "Lanche" },
        { valor: "Almoço", texto: "Almoço" },
        { valor: "Jantar", texto: "Jantar" }
      ]
    });

    const pratos = listarPratos({ semanaId: semanaAtiva.id });

    const campoPrato = criarElemento("div", "campo");
    const labelPrato = criarElemento("label", "", "Prato");
    labelPrato.htmlFor = "pratoRefeicao";

    const seletorPrato = document.createElement("select");
    seletorPrato.id = "pratoRefeicao";
    seletorPrato.name = "pratoRefeicao";
    seletorPrato.required = true;

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione um prato";
    seletorPrato.append(opcaoInicial);

    pratos.forEach(prato => {
      const opcao = document.createElement("option");
      opcao.value = prato.id;
      opcao.textContent = prato.nome;
      seletorPrato.append(opcao);
    });

    campoPrato.append(labelPrato, seletorPrato);

    const porcoes = criarCampo({
      rotulo: "Quantidade de porções",
      nome: "porcoesRefeicao",
      tipo: "number",
      valor: "1",
      obrigatorio: true
    });

    porcoes.entrada.min = "0.01";
    porcoes.entrada.step = "0.01";

    formularioRefeicao.append(
      data.campo,
      tipo.campo,
      campoPrato,
      porcoes.campo
    );

    const adicionar = criarElemento(
      "button",
      "botao-principal",
      "♡ Adicionar ao cardápio"
    );

    adicionar.type = "submit";
    formularioRefeicao.append(adicionar);

    formularioRefeicao.addEventListener("submit", evento => {
      evento.preventDefault();

      try {
        adicionarRefeicao({
          semanaId: semanaAtiva.id,
          data: data.entrada.value,
          tipo: tipo.entrada.value,
          pratoId: seletorPrato.value,
          porcoes: porcoes.entrada.value
        });

        renderizarSemanas();

        mostrarMensagem(
          $("#telaDinamica .tela-interna"),
          "Refeição adicionada ao cardápio! ♡",
          "sucesso"
        );
      } catch (erro) {
        mostrarMensagem(secao, erro.message, "erro");
      }
    });

    cartaoRefeicoes.append(formularioRefeicao);
    secao.append(cartaoRefeicoes);

    // REFEIÇÕES PLANEJADAS

    secao.append(criarElemento("h3", "", "Refeições da semana"));

    const listaRefeicoes = criarElemento("div", "lista-cadastros");
    const refeicoes = listarRefeicoes(semanaAtiva.id);

    if (refeicoes.length === 0) {
      listaRefeicoes.append(
        criarElemento(
          "div",
          "texto-vazio",
          "Seu cardápio ainda está vazio. Adicione a primeira refeição acima. ♡"
        )
      );
    }

    refeicoes.forEach(refeicao => {
      const prato = buscarPrato(refeicao.pratoId);

      if (!prato) return;

      const item = criarElemento("article", "item-cadastro");
      const conteudo = criarElemento("div", "item-cadastro-conteudo");

      const dataFormatada = new Date(
        refeicao.data + "T12:00:00"
      ).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit"
      });

      conteudo.append(
        criarElemento("span", "etiqueta", refeicao.tipo)
      );

      conteudo.append(
        criarElemento("h4", "", prato.nome)
      );

      conteudo.append(
        criarElemento(
          "p",
          "",
          dataFormatada + " · " + formatarNumero(refeicao.porcoes) +
          (refeicao.porcoes === 1 ? " porção" : " porções")
        )
      );

      const excluir = criarElemento(
        "button",
        "botao-excluir",
        "Remover do cardápio"
      );

      excluir.type = "button";

      excluir.addEventListener("click", () => {
        if (!confirm("Remover esta refeição do cardápio?")) return;

        excluirRefeicao(semanaAtiva.id, refeicao.id);
        renderizarSemanas();
      });

      item.append(conteudo, excluir);
      listaRefeicoes.append(item);
    });

    secao.append(listaRefeicoes);

    if (pratos.length === 0) {
      mostrarMensagem(
        cartaoRefeicoes,
        "Você ainda não tem pratos disponíveis. Cadastre pratos em Meus pratos para começar a montar o cardápio.",
        "erro"
      );
    }
  }

  tela.append(secao);
  atualizarNavegacao("semanas");
}


function renderizarConsumo(dataSelecionada = null) {
  const tela = $("#telaDinamica");
  tela.replaceChildren();
  tela.hidden = false;

  const secao = criarElemento("section", "tela-interna");
  const cabecalho = criarElemento("div", "cabecalho-tela");
  const titulo = document.createElement("div");

  titulo.append(criarElemento("p", "sobretitulo", "ACOMPANHE SUA ALIMENTAÇÃO"));
  titulo.append(criarElemento("h2", "", "Meu consumo"));
  titulo.append(
    criarElemento("p", "subtitulo", "Registre o que você realmente consumiu.")
  );

  const voltar = criarElemento("button", "botao-voltar", "‹ Início");
  voltar.type = "button";
  voltar.addEventListener("click", mostrarInicio);

  cabecalho.append(titulo, voltar);
secao.append(cabecalho);

const resumo = obterResumo();
const semanaAtiva = resumo.semanaAtiva;

const hoje = new Date();
const hojeFormatado =
  hoje.getFullYear() + "-" +
  String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
  String(hoje.getDate()).padStart(2, "0");

const dataConsulta = dataSelecionada || hojeFormatado;

const consumos = listarConsumos().filter(
  consumo => consumo.data === dataConsulta
);

const cartaoData = criarElemento("div", "cartao-formulario");
cartaoData.append(
  criarElemento("h3", "", "♡ Consultar um dia")
);

const campoData = criarCampo({
  rotulo: "Data do consumo",
  nome: "dataConsulta",
  tipo: "date",
  valor: dataConsulta,
  obrigatorio: true
});

campoData.entrada.addEventListener("change", () => {
  if (campoData.entrada.value) {
    renderizarConsumo(campoData.entrada.value);
  }
});

cartaoData.append(campoData.campo);
secao.append(cartaoData);
    
  // RESUMO NUTRICIONAL

  const totais = {
    kcal: 0,
    proteinas: 0,
    carboidratos: 0,
    gorduras: 0
  };

  consumos.forEach(consumo => {
    let nutrientes;

    if (consumo.tipo === "prato") {
      const prato = buscarPrato(consumo.pratoId);
      if (!prato) return;

      nutrientes = calcularNutrientes(prato.ingredientes);

      Object.keys(totais).forEach(chave => {
        totais[chave] += nutrientes[chave] * consumo.porcoes;
      });
    }

    if (consumo.tipo === "alimento") {
      nutrientes = calcularNutrientes([{
        alimentoId: consumo.alimentoId,
        quantidade: consumo.quantidade
      }]);

      Object.keys(totais).forEach(chave => {
        totais[chave] += nutrientes[chave];
      });
    }
  });

  const cartaoResumo = criarElemento("div", "cartao-formulario");

  cartaoResumo.append(
    criarElemento("h3", "", "♡ Resumo nutricional")
  );

  cartaoResumo.append(
    criarElemento(
      "p",
      "subtitulo",
      "Dia: " + new Date(dataConsulta + "T12:00:00").toLocaleDateString("pt-BR")
    )
  );

  const gradeNutrientes = criarElemento("div", "lista-cadastros");

  [
    ["Calorias", totais.kcal, "kcal"],
    ["Proteínas", totais.proteinas, "g"],
    ["Carboidratos", totais.carboidratos, "g"],
    ["Gorduras", totais.gorduras, "g"]
  ].forEach(([nome, valor, unidade]) => {
    const item = criarElemento("article", "item-cadastro");
    item.append(criarElemento("h4", "", nome));
    item.append(
      criarElemento("p", "", formatarNumero(valor) + " " + unidade)
    );
    gradeNutrientes.append(item);
  });

  cartaoResumo.append(gradeNutrientes);
  secao.append(cartaoResumo);

  // REGISTRAR PRATO PLANEJADO

  const cartaoPrato = criarElemento("div", "cartao-formulario");
  cartaoPrato.append(
    criarElemento("h3", "", "♡ Registrar refeição planejada")
  );

  if (semanaAtiva) {
    const refeicoes = listarRefeicoes(semanaAtiva.id);

    const formularioPrato = document.createElement("form");

    const campoRefeicao = criarElemento("div", "campo");
    const labelRefeicao = criarElemento("label", "", "Refeição do cardápio");

    const seletorRefeicao = document.createElement("select");
    seletorRefeicao.name = "refeicaoConsumo";
    seletorRefeicao.required = true;

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione uma refeição";
    seletorRefeicao.append(opcaoInicial);

    refeicoes.forEach(refeicao => {
      const jaRegistrado = consumos.some(
        consumo => consumo.refeicaoId === refeicao.id
      );

      if (jaRegistrado) return;

      const prato = buscarPrato(refeicao.pratoId);
      if (!prato) return;

      const opcao = document.createElement("option");
      opcao.value = refeicao.id;

      opcao.textContent =
        new Date(refeicao.data + "T12:00:00").toLocaleDateString("pt-BR") +
        " · " + refeicao.tipo + " · " + prato.nome;

      seletorRefeicao.append(opcao);
    });

    campoRefeicao.append(labelRefeicao, seletorRefeicao);

    const porcoes = criarCampo({
      rotulo: "Porções realmente consumidas",
      nome: "porcoesConsumidas",
      tipo: "number",
      valor: "1",
      obrigatorio: true
    });

    porcoes.entrada.min = "0.01";
    porcoes.entrada.step = "0.01";

    formularioPrato.append(campoRefeicao, porcoes.campo);

    const registrar = criarElemento(
      "button",
      "botao-principal",
      "♡ Registrar consumo"
    );

    registrar.type = "submit";
    formularioPrato.append(registrar);

    formularioPrato.addEventListener("submit", evento => {
      evento.preventDefault();

      try {
        const refeicao = refeicoes.find(
          item => item.id === seletorRefeicao.value
        );

        if (!refeicao) {
          throw new Error("Selecione uma refeição válida.");
        }

        registrarConsumoPrato({
          semanaId: semanaAtiva.id,
          refeicaoId: refeicao.id,
          porcoes: porcoes.entrada.value
        });

        renderizarConsumo();
        atualizarPainel();

        mostrarMensagem(
          $("#telaDinamica .tela-interna"),
          "Consumo registrado com sucesso! ♡",
          "sucesso"
        );
      } catch (erro) {
        mostrarMensagem(secao, erro.message, "erro");
      }
    });

    if (refeicoes.length === 0) {
      cartaoPrato.append(
        criarElemento(
          "p",
          "texto-vazio",
          "Esta semana ainda não possui refeições planejadas."
        )
      );
    } else {
      formularioPrato.querySelector("button").disabled =
        seletorRefeicao.options.length <= 1;

      cartaoPrato.append(formularioPrato);
    }
  } else {
    cartaoPrato.append(
      criarElemento(
        "p",
        "texto-vazio",
        "Crie uma semana e planeje suas refeições para registrar pratos consumidos."
      )
    );
  }

  secao.append(cartaoPrato);

  // REGISTRAR ALIMENTO AVULSO

  const cartaoAlimento = criarElemento("div", "cartao-formulario");

  cartaoAlimento.append(
    criarElemento("h3", "", "♡ Registrar alimento avulso")
  );

  const formularioAlimento = document.createElement("form");

  const campoAlimento = criarElemento("div", "campo");
  const labelAlimento = criarElemento("label", "", "Alimento");

  const seletorAlimento = document.createElement("select");
  seletorAlimento.required = true;

  const opcaoAlimento = document.createElement("option");
  opcaoAlimento.value = "";
  opcaoAlimento.textContent = "Selecione um alimento";
  seletorAlimento.append(opcaoAlimento);

  listarAlimentos().forEach(alimento => {
    const opcao = document.createElement("option");
    opcao.value = alimento.id;
    opcao.textContent = alimento.nome;
    seletorAlimento.append(opcao);
  });

  campoAlimento.append(labelAlimento, seletorAlimento);

  const quantidade = criarCampo({
    rotulo: "Quantidade consumida",
    nome: "quantidadeConsumida",
    tipo: "number",
    obrigatorio: true
  });

  quantidade.entrada.min = "0.01";
  quantidade.entrada.step = "0.01";

  const dataAlimento = criarCampo({
    rotulo: "Data do consumo",
    nome: "dataConsumo",
    tipo: "date",
    valor: new Date().getFullYear() + "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") + "-" +
      String(new Date().getDate()).padStart(2, "0"),
    obrigatorio: true
  });

  formularioAlimento.append(
    campoAlimento,
    quantidade.campo,
    dataAlimento.campo
  );

  const registrarAlimento = criarElemento(
    "button",
    "botao-principal",
    "♡ Adicionar alimento"
  );

  registrarAlimento.type = "submit";
  formularioAlimento.append(registrarAlimento);

  formularioAlimento.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
      registrarConsumoAlimento({
        data: dataAlimento.entrada.value,
        alimentoId: seletorAlimento.value,
        quantidade: quantidade.entrada.value
      });

      renderizarConsumo();
      atualizarPainel();

      mostrarMensagem(
        $("#telaDinamica .tela-interna"),
        "Alimento registrado com sucesso! ♡",
        "sucesso"
      );
    } catch (erro) {
      mostrarMensagem(secao, erro.message, "erro");
    }
  });


  cartaoAlimento.append(formularioAlimento);
  secao.append(cartaoAlimento);

    

  // HISTÓRICO

  secao.append(
    criarElemento("h3", "", "Histórico de consumo do dia")
  );

  const lista = criarElemento("div", "lista-cadastros");

  if (consumos.length === 0) {
    lista.append(
      criarElemento(
        "div",
        "texto-vazio",
        ""Nenhum consumo registrado neste dia. Comece adicionando sua primeira refeição! ♡""
      )
    );
  }

  consumos.forEach(consumo => {
    const item = criarElemento("article", "item-cadastro");
    const conteudo = criarElemento("div", "item-cadastro-conteudo");

    const dataFormatada = new Date(
      consumo.data + "T12:00:00"
    ).toLocaleDateString("pt-BR");

    conteudo.append(
      criarElemento(
        "span",
        "etiqueta",
        consumo.tipo === "prato" ? "Refeição planejada" : "Alimento avulso"
      )
    );

    let nome = "";
    let nutrientes;

    if (consumo.tipo === "prato") {
      const prato = buscarPrato(consumo.pratoId);
      if (!prato) return;

      nome = prato.nome;
      nutrientes = calcularNutrientes(prato.ingredientes);

      Object.keys(nutrientes).forEach(chave => {
        nutrientes[chave] *= consumo.porcoes;
      });

      conteudo.append(
        criarElemento("h4", "", nome)
      );

      conteudo.append(
        criarElemento(
          "p",
          "",
          formatarNumero(consumo.porcoes) + " porções · " + dataFormatada
        )
      );
    } else {
      const alimento = buscarAlimento(consumo.alimentoId);
      if (!alimento) return;

      nome = alimento.nome;
      nutrientes = calcularNutrientes([{
        alimentoId: consumo.alimentoId,
        quantidade: consumo.quantidade
      }]);

      conteudo.append(
        criarElemento("h4", "", nome)
      );

      conteudo.append(
        criarElemento(
          "p",
          "",
          formatarNumero(consumo.quantidade) + " " +
          alimento.unidadeBase + " · " + dataFormatada
        )
      );
    }

    conteudo.append(
      criarElemento(
        "p",
        "",
        formatarNumero(nutrientes.kcal) + " kcal · P " +
        formatarNumero(nutrientes.proteinas) + " g · C " +
        formatarNumero(nutrientes.carboidratos) + " g · G " +
        formatarNumero(nutrientes.gorduras) + " g"
      )
    );

    const excluir = criarElemento(
      "button",
      "botao-excluir",
      "Excluir registro"
    );

    excluir.type = "button";

    excluir.addEventListener("click", () => {
      if (!confirm("Excluir este registro de consumo?")) return;

     excluirConsumo(consumo.id);
renderizarConsumo(dataConsulta);
atualizarPainel();
    });

    item.append(conteudo, excluir);
    lista.append(item);
  });

  secao.append(lista);

  tela.append(secao);
  atualizarNavegacao("consumo");
}

// =====================================================
// TELA: LISTA DE MERCADO
// =====================================================

function renderizarMercado() {
  const tela = $("#telaDinamica");
  tela.replaceChildren();
  tela.hidden = false;

  const secao = criarElemento("section", "tela-interna");
  const cabecalho = criarElemento("div", "cabecalho-tela");
  const titulo = document.createElement("div");

  titulo.append(
    criarElemento("p", "sobretitulo", "ORGANIZE SUAS COMPRAS")
  );

  titulo.append(
    criarElemento("h2", "", "Lista de mercado")
  );

  titulo.append(
    criarElemento(
      "p",
      "subtitulo",
      "Tudo o que você precisa para preparar sua semana."
    )
  );

  const voltar = criarElemento("button", "botao-voltar", "‹ Início");
  voltar.type = "button";
  voltar.addEventListener("click", mostrarInicio);

  cabecalho.append(titulo, voltar);
  secao.append(cabecalho);

  const resumo = obterResumo();
  const semanaAtiva = resumo.semanaAtiva;

  if (!semanaAtiva) {
    secao.append(
      criarElemento(
        "div",
        "texto-vazio",
        "Você ainda não selecionou uma semana. Crie ou selecione um cardápio semanal para gerar sua lista de mercado. ♡"
      )
    );

    tela.append(secao);
    atualizarNavegacao("mercado");
    return;
  }

  const cartao = criarElemento("div", "cartao-formulario");

  cartao.append(
    criarElemento("h3", "", "♡ Compras da semana")
  );

  cartao.append(
    criarElemento("p", "subtitulo", "Planejamento: " + semanaAtiva.nome)
  );

  const ingredientes = gerarListaMercado(semanaAtiva.id);

  if (ingredientes.length === 0) {
    cartao.append(
      criarElemento(
        "div",
        "texto-vazio",
        "Seu cardápio ainda não possui refeições com ingredientes cadastrados. Adicione pratos ao planejamento para gerar sua lista. ♡"
      )
    );

    secao.append(cartao);
    tela.append(secao);
    atualizarNavegacao("mercado");
    return;
  }

  cartao.append(
    criarElemento(
      "p",
      "texto-apoio",
      ingredientes.length + " ingredientes diferentes no planejamento."
    )
  );

  const categorias = new Map();

  ingredientes.forEach(ingrediente => {
    const categoria = ingrediente.categoria || "Outros";

    if (!categorias.has(categoria)) {
      categorias.set(categoria, []);
    }

    categorias.get(categoria).push(ingrediente);
  });

  categorias.forEach((itens, categoria) => {
    cartao.append(
      criarElemento("h3", "", categoria)
    );

    const lista = criarElemento("div", "lista-cadastros");

      if (consumos.length > 0) {
  const excluirTodos = criarElemento(
    "button",
    "botao-excluir",
    "Excluir todos os registros deste dia"
  );

  excluirTodos.type = "button";

  excluirTodos.addEventListener("click", () => {
    if (!confirm(
      "Tem certeza que deseja excluir TODOS os registros deste dia? Essa ação não poderá ser desfeita."
    )) return;

    consumos.forEach(consumo => {
      excluirConsumo(consumo.id);
    });

    renderizarConsumo(dataConsulta);
    atualizarPainel();
  });

  secao.append(excluirTodos);
}

    itens.forEach(ingrediente => {
      const item = criarElemento("article", "item-cadastro");
      const conteudo = criarElemento("div", "item-cadastro-conteudo");

      conteudo.append(
        criarElemento("h4", "", ingrediente.nome)
      );

      conteudo.append(
        criarElemento(
          "p",
          "",
          formatarNumero(ingrediente.quantidade) + " " + ingrediente.unidade
        )
      );

      item.append(conteudo);
      lista.append(item);
    });

    cartao.append(lista);
  });

  secao.append(cartao);
  tela.append(secao);

  atualizarNavegacao("mercado");
}

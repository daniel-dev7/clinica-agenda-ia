const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const engine = {
  identificarTipo(texto) {
    const textoLower = texto.toLowerCase();
    const palavrasExame = ['exame', 'ultrassonografia', 'ultrasonografia', 'tomografia', 'ressonância', 'raio-x', 'rx', 'laboratório', 'hemograma', 'glicemia', 'colesterol', 'triglicerídeos', 'creatinina', 'urea', 'tsh', 't4', 't3', 'ecg', 'holter', 'mapa', 'doppler', 'biópsia', 'colposcopia', 'preventivo', 'papanicolau', 'parasitológico', 'cultura', 'swab', 'teste', 'prova'];
    const palavrasReceita = ['receita', 'medicamento', 'cp', 'comp', 'drg', 'drops', 'ml', 'mg', 'aplicar', 'tomar', 'usar', 'aplicação', 'iny', 'injetável'];

    let countExame = 0;
    let countReceita = 0;

    palavrasExame.forEach(palavra => {
      if (textoLower.includes(palavra)) countExame++;
    });

    palavrasReceita.forEach(palavra => {
      if (textoLower.includes(palavra)) countReceita++;
    });

    return countExame > countReceita ? 'Pedido de Exame' : 'Receita';
  },

  extrairMedicamentos(texto) {
    const linhas = texto.split('\n').filter(l => l.trim());
    const medicamentos = [];
    const seen = new Set();

    const padroes = [
      /^(?:receita|r\.?\s*)?\s*(\d+)?\s*(.+?)\s+(\d+)\s*(?:mg|mcg|g|ml|%|comp|cáps|cp|caps?|drg|gotas?|fl|amp)\.?(?:\s+[\d,\.]+\s*(?:mg|mcg|g|ml|%|comp|cáps|cp|caps?|drg|gotas?|fl|amp))?/i,
      /^(\d+)?\s*(.+?)\s+(\d+[\d,\.]*)\s*(?:mg|mcg|g|ml|%|comp|cáps?|cp|caps?|drg|gotas?|fl|amp)/i,
      /^(?:tomar|tomar\s+\d+|usar|aplicar|aplicar\s+\d+)\s+(.+?)\s+(\d+)\s*(?:mg|mcg|g|ml|%|comp|cáps?|cp|caps?|drg|gotas?|fl|amp)/i
    ];

    for (const linha of linhas) {
      let encontrado = false;

      for (const padrao of padroes) {
        const match = linha.match(padrao);
        if (match) {
          const nome = (match[2] || match[1]).trim();
          const dose = (match[3] || match[2]).trim();

          if (nome.length > 2 && !seen.has(nome.toLowerCase())) {
            seen.add(nome.toLowerCase());
            medicamentos.push({
              nome: nome,
              linhaOriginal: linha.trim()
            });
            encontrado = true;
            break;
          }
        }
      }

      if (!encontrado) {
        const palavras = linha.match(/\b[A-Z][a-zA-Zà-ÿ]+(?:\s+[A-Z][a-zA-Zà-ÿ]+)*\b/g);
        if (palavras && palavras.length <= 4 && linha.length < 80) {
          const nome = linha.trim();
          if (nome.length > 3 && !seen.has(nome.toLowerCase()) && !/^\d+$/.test(nome)) {
            seen.add(nome.toLowerCase());
            medicamentos.push({
              nome: nome,
              linhaOriginal: linha.trim()
            });
          }
        }
      }
    }

    return medicamentos;
  },

  extrairExames(texto) {
    const linhas = texto.split('\n').filter(l => l.trim());
    const exames = [];
    const seen = new Set();

    const palavrasExame = [
      'ultrassonografia', 'ultrasonografia', 'tomografia', 'ressonância', 'ressonancia',
      'raio-x', 'raio x', 'rx', 'laboratório', 'laboratorio', 'hemograma', 'glicemia',
      'colesterol', 'triglicerídeos', 'triglicerideos', 'creatinina', 'ureia', 'urea',
      'tsh', 't4', 't3', 'ecg', 'holter', 'mapa', 'doppler', 'biópsia', 'biopsia',
      'colposcopia', 'preventivo', 'papanicolau', 'parasitológico', 'parasitologico',
      'cultura', 'swab', 'teste', 'prova', 'lipidograma', 'HbA1c', 'hemoglobina glicada',
      'eletrólitos', 'eletrolitos', 'sódio', 'sodio', 'potássio', 'potassio', 'magnésio',
      'magnesio', 'fosfatase', 'gama gt', 'tgo', 'tgp', 'transaminases', 'bilirrubina',
      'albumina', 'proteínas', 'proteinas', 'coagulograma', 'tp', 'ttpa', 'ferro', 'ferritina',
      'transferritina', 'vitamina d', 'vitamina b12', 'ácido fólico', 'acido folico',
      'ca 125', 'ca 19.9', 'cea', 'psa', 'afp', 'beta hcg', 'densitometria', 'mamografia',
      'elastografia', 'broncoscopia', 'endoscopia', 'colonoscopia', 'retossigmoidoscopia',
      'spirometria', 'espirometria', 'pefr', 'teste esforço', 'prova função', 'função hepática',
      'função renal', 'clearance', 'proteinúria', 'proteinuria', 'easo', 'esfregaço'
    ];

    for (const linha of linhas) {
      const linhaLower = linha.toLowerCase();

      for (const exame of palavrasExame) {
        if (linhaLower.includes(exame)) {
          let nomeExame = linha.trim();
          const matchQtd = nomeExame.match(/^(\d+[\.\)]\s*)?(.+)/);
          if (matchQtd) {
            nomeExame = matchQtd[2].trim();
          }

          if (!seen.has(nomeExame.toLowerCase())) {
            seen.add(nomeExame.toLowerCase());
            exames.push({
              nome: nomeExame,
              linhaOriginal: linha.trim()
            });
          }
          break;
        }
      }
    }

    return exames;
  },

  extrairDosagens(texto) {
    const dosagens = [];
    const padrao = /(\d+[\d,\.]*)\s*(?:mg|mcg|g|ml|%|comp|cáps?|cp|caps?|drg|gotas?|fl|amp)/gi;
    let match;

    while ((match = padrao.exec(texto)) !== null) {
      dosagens.push({
        valor: match[1],
        unidade: match[2]
      });
    }

    return dosagens;
  },

  extrairFrequencia(texto) {
    const frequencias = [];
    const padroesFrequencia = [
      /\b(\d+)[\/\-](\d+)h\b/i,
      /\bde\s+(\d+)h?\s*a\s+(\d+)h\b/i,
      /\ba\s+cada\s+(\d+)\s*(?:horas?|h)\b/i,
      /\b(\d+)x?\s*(?:ao|dia|por)\s*dia\b/i,
      /\b(\d+)\s*(?:vez|vezes)\s*(?:ao|dia|por)\s*dia\b/i,
      /\btomar?\s+(?:de\s+)?(\d+)\s*a\s+(\d+)\s*(?:comp|cáps?|cp|caps?|vez|dose)/i,
      /\busar\s+(?:de\s+)?(\d+)\s*a\s+(\d+)\s*(?:vez|aplicações?|aplic)/i,
      /\b(\d+)\s*(?:em|vezes)\s*(\d+)\s*h\b/i,
      /\b(manhã|tarde|noite|manhãs|tardes|noites)\b/i,
      /\b(jejum|em jejum|apsjx jejum)\b/i,
      /\b(antes das|refeições|após|refeição|almoço|jantar|café|lanche)\b/i
    ];

    for (const linha of texto.split('\n')) {
      for (const padrao of padroesFrequencia) {
        const match = linha.match(padrao);
        if (match) {
          frequencias.push({
            texto: linha.trim(),
            match: match[0]
          });
          break;
        }
      }
    }

    return frequencias;
  },

  detectarIncertezas(texto) {
    const incertezas = [];
    const palavrasIndecisas = ['?', 'ilegível', 'ilegivél', 'incompreensível', 'duvidoso', 'provável', 'provavel', 'talvez', 'aparenta', 'parece', '??', 'xxx'];

    const linhas = texto.split('\n');
    linhas.forEach((linha, i) => {
      for (const palavra of palavrasIndecisas) {
        if (linha.toLowerCase().includes(palavra)) {
          incertezas.push({
            linha: i + 1,
            texto: linha.trim(),
            motivo: 'Termo ambíguo ou ilegível detectado'
          });
          break;
        }
      }
    });

    return incertezas;
  },

  processar(texto) {
    const tipo = this.identificarTipo(texto);
    const itens = tipo === 'Receita' ? this.extrairMedicamentos(texto) : this.extrairExames(texto);
    const dosagens = this.extrairDosagens(texto);
    const frequencias = this.extrairFrequencia(texto);
    const incertezas = this.detectarIncertezas(texto);

    return {
      tipo,
      itens,
      dosagens,
      frequencias,
      incertezas,
      textoOriginal: texto
    };
  },

  formatarSaida(dados) {
    let saida = `═══════════════════════════════════════\n`;
    saida += `       ANÁLISE DE DOCUMENTO MÉDICO\n`;
    saida += `═══════════════════════════════════════\n\n`;

    saida += `📋 TIPO: ${dados.tipo}\n\n`;

    saida += `──────────────────\n`;
    saida += `ITENS IDENTIFICADOS\n`;
    saida += `──────────────────\n`;

    if (dados.itens.length === 0) {
      saida += `⚠️ Nenhum item identificado com certeza\n`;
    } else {
      dados.itens.forEach((item, i) => {
        saida += `\n${i + 1}. ${item.nome}\n`;
        saida += `   📄 Original: "${item.linhaOriginal}"\n`;
      });
    }

    if (dados.dosagens.length > 0) {
      saida += `\n──────────────────\n`;
      saida += `DOSAGENS ENCONTRADAS\n`;
      saida += `──────────────────\n`;
      dados.dosagens.forEach(d => {
        saida += `• ${d.valor} ${d.unidade}\n`;
      });
    }

    if (dados.frequencias.length > 0) {
      saida += `\n──────────────────\n`;
      saida += `FREQUÊNCIA DE USO\n`;
      saida += `──────────────────\n`;
      dados.frequencias.forEach(f => {
        saida += `• ${f.texto}\n`;
      });
    }

    if (dados.incertezas.length > 0) {
      saida += `\n──────────────────\n`;
      saida += `⚠️ ITENS INCERTOS\n`;
      saida += `──────────────────\n`;
      dados.incertezas.forEach(inc => {
        saida += `\n⚠️ Linha ${inc.linha}: "${inc.texto}"\n`;
        saida += `   Motivo: ${inc.motivo}\n`;
      });
    }

    saida += `\n═══════════════════════════════════════\n`;
    saida += `        INFORMAÇÕES IMPORTANTES\n`;
    saida += `═══════════════════════════════════════\n`;
    saida += `• Este é apenas um auxiliares de leitura\n`;
    saida += `• Confirme todos os dados com o paciente\n`;
    saida += `• Não forneça diagnósticos médicos\n`;
    saida += `• Verifique doses antes da administração\n`;
    saida += `═══════════════════════════════════════\n`;

    return saida;
  }
};

app.post('/api/processar', (req, res) => {
  const { texto } = req.body;

  if (!texto || texto.trim().length === 0) {
    return res.status(400).json({ erro: 'Texto não fornecido' });
  }

  const dados = engine.processar(texto);
  const formatado = engine.formatarSaida(dados);

  res.json({
    sucesso: true,
    dados,
    formatado
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏥 Clínica Agenda IA - Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});
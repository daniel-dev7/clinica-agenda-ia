# 🏥 Clínica Agenda IA

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/Node.js-18+-green.svg" alt="Node.js">
</p>

Sistema de inteligência artificial para leitura e interpretação de receitas e pedidos médicos, desenvolvido para auxiliar no atendimento de clínicas populares via WhatsApp.

---

## ✨ Funcionalidades

| Ícone | Recurso | Descrição |
|-------|---------|-----------|
| 📷 | **OCR de Imagens** | Extrai texto de fotos usando Tesseract.js |
| 🔍 | **Análise Automática** | Identifica medicamentos, exames, dosagens |
| 🏷️ | **Classificação** | Detecta se é Receita ou Pedido de Exame |
| ⚠️ | **Detecção de Incertezas** | Sinaliza termos ilegíveis para revisão |
| 📋 | **Formatação Estruturada** | Organiza informações de forma clara |
| 📱 | **WhatsApp Ready** | Saída otimizada para envio via WhatsApp |

---

## 🚀 Como Usar

### Opção 1: Uso Direto no Navegador

```bash
# Clone o repositório
git clone https://github.com/daniel-dev7/clinica-agenda-ia.git

# Abra index.html no navegador
```

### Opção 2: Versão com Servidor

```bash
# Instale as dependências
npm install

# Inicie o servidor
npm start

# Acesse http://localhost:3000
```

---

## 📖 Utilização

### 1. Envie uma Imagem
- Arraste ou clique para selecionar
- Formatos: JPG, PNG, WEBP (máx. 10MB)
- O OCR processa automaticamente

### 2. Revise o Texto
- Edite o texto extraído se necessário
- Ou cole o texto diretamente

### 3. Analise
- Clique em "Analisar Documento"
- Receba a análise estruturada

### 4. Copie e Envie
- Copie o resultado formatado
- Envie via WhatsApp

---

## 📊 Exemplo de Saída

```
═══════════════════════════════════════
       ANÁLISE DE DOCUMENTO MÉDICO
═══════════════════════════════════════

📋 TIPO: Receita

──────────────────
ITENS IDENTIFICADOS
──────────────────

1. Metformina - 850mg
   📄 "Metformina 850mg - tomar 1cp 3x/dia"

2. Glibenclamida - 5mg
   📄 "Glibenclamida 5mg - 1cp 2x/dia"

──────────────────
FREQUÊNCIA DE USO
──────────────────
• 3 vezes ao dia, junto às refeições
• pela manhã
• à noite

═══════════════════════════════════════
```

---

## 🛠️ Tecnologias

| Tecnologia | Finalidade |
|------------|------------|
| HTML5/CSS3 | Interface responsiva |
| JavaScript (ES6+) | Lógica de processamento |
| Tesseract.js | OCR open source |
| Node.js | Servidor backend |
| Express.js | API REST |

---

## ⚠️ Regras de Uso

- ✅ **Faz**: Auxilia na leitura de documentos
- ✅ **Faz**: Detecta itens incertos para revisão
- ❌ **Não faz**: Fornece diagnósticos médicos
- ❌ **Não faz**: Substitui orientação profissional
- ❌ **Não faz**: Altera nomes de medicamentos

> **Importante**: Sempre confirme informações com o paciente e profissionais de saúde.

---

## 🔌 Integração com WhatsApp

Para integrar com WhatsApp Business:

- **WhatsApp Business API** - Integração oficial Meta
- **Z-API** - Plataforma brasileira
- **Twilio** - Serviço de comunicação
- **Venom API** - Biblioteca Node.js

---

## 📁 Estrutura do Projeto

```
clinica-agenda-ia/
├── index.html              # Versão standalone
├── server.js               # Servidor Node.js
├── package.json            # Dependências
├── public/
│   └── index.html         # Versão para servidor
├── .github/
│   └── workflows/
│       └── deploy.yml     # Deploy automático
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🤝 Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit (`git commit -m 'Adiciona funcionalidade'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

---

<p align="center">
  Desenvolvido com ❤️ para clínicas populares
</p>

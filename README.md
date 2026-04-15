# 🏥 Clínica Agenda IA

Sistema de inteligência artificial para leitura e interpretação de receitas e pedidos médicos, desenvolvido para auxiliar no atendimento de clínicas populares via WhatsApp.

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## ✨ Funcionalidades

- 📷 **Análise de Imagens (OCR)** - Extrai texto de fotos de receitas e pedidos médicos usando Tesseract.js
- 📝 **Processamento de Texto** - Identifica medicamentos, exames, dosagens e frequências
- 🔍 **Identificação Automática** - Detecta automaticamente se o documento é uma Receita ou Pedido de Exame
- ⚠️ **Detecção de Incertezas** - Sinaliza termos ilegíveis ou ambíguos para revisão
- 📋 **Formatação Estruturada** - Organiza informações de forma clara e padronizada
- 📱 **WhatsApp Ready** - Saída formatada para facilitar o envio via WhatsApp
- 🌐 **Português e Inglês** - Suporte multilíngue para OCR

## 🚀 Começando

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Node.js 18+ (opcional, apenas para versão com servidor)

### Instalação

#### Opção 1: Uso Direto no Navegador (Recomendado)

1. Baixe o arquivo `index.html`
2. Abra diretamente no navegador

```bash
# Ou clone o repositório
git clone https://github.com/seu-usuario/clinica-agenda-ia.git
cd clinica-agenda-ia
# Abra index.html no navegador
```

#### Opção 2: Versão com Servidor

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/clinica-agenda-ia.git
cd clinica-agenda-ia

# Instale as dependências
npm install

# Inicie o servidor
npm start

# Acesse http://localhost:3000
```

## 📖 Como Usar

### 1. EnviarImagem

- Clique na área de upload ou arraste uma imagem
- Formatos aceitos: JPG, PNG, WEBP (máx. 10MB)
- O OCR processará automaticamente a imagem

### 2. Texto Manual

- Cole o texto extraído via OCR
- Ou digite/paste o texto diretamente
- Você pode editar o texto antes da análise

### 3. Analisar

- Clique em "Analisar Documento"
- O sistema identificará automaticamente o tipo de documento
- Extrairá medicamentos ou exames conforme apropriado

### 4. Resultado

- Visualize o resultado formatado
- Copie para enviar via WhatsApp
- Itens incertos são destacados para revisão

## 📋 Formato de Saída

```
═══════════════════════════════════════
       ANÁLISE DE DOCUMENTO MÉDICO
═══════════════════════════════════════

📋 TIPO: Receita

──────────────────
ITENS IDENTIFICADOS
──────────────────

1. Metformina - 850mg
   📄 "Metformina 850mg - tomar 1 comprimido..."

──────────────────
FREQUÊNCIA DE USO
──────────────────
• 3 vezes ao dia, junto às refeições
• pela manhã

⚠️ ITENS INCERTOS (se houver)
──────────────────
⚠️ Linha 5: "Losartana 50?mg"
   Motivo: Termo ambíguo detectado

═══════════════════════════════════════
        INFORMAÇÕES IMPORTANTES
═══════════════════════════════════════
• Este é apenas um auxiliar de leitura
• Confirme todos os dados com o paciente
• Não forneça diagnósticos médicos
• Verifique doses antes da administração
═══════════════════════════════════════
```

## 🔧 Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| HTML5/CSS3 | Interface responsiva |
| JavaScript (ES6+) | Lógica de processamento |
| Tesseract.js | OCR para extração de texto |
| Node.js (opcional) | Servidor backend |
| Express.js (opcional) | API REST |

## 📁 Estrutura do Projeto

```
clinica-agenda-ia/
├── index.html          # Versão standalone (uso direto)
├── server.js           # Servidor Node.js com API
├── package.json        # Dependências Node.js
├── public/
│   └── index.html      # Versão para servidor
├── README.md           # Este arquivo
├── LICENSE             # Licença MIT
└── .gitignore          # Arquivos ignorados pelo Git
```

## ⚠️ Regras e Limitações

- ❌ **Não fornece diagnósticos médicos**
- ❌ **Não altera nomes de medicamentos ou exames**
- ❌ **Não inventa informações**
- ✅ **Sinaliza itens incertos para revisão humana**
- ✅ **Sempre confirma informações com o paciente**

### Precisão do OCR

A precisão do OCR depende de:
- Qualidade da imagem
- Iluminação adequada
- Texto legível (impresso funciona melhor que manuscrito)
- Resolução da imagem

## 🔌 Integração com WhatsApp

Para integrar com WhatsApp Business API:

1. **WhatsApp Business API** - Integração oficial da Meta
2. **Z-API** - Plataforma brasileira
3. **Twilio** - Serviço de comunicação
4. **Venom API** - Biblioteca Node.js

A saída formatada pode ser copiada e enviada diretamente para pacientes.

## 🤝 Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Clínica Agenda IA**

---

⭐ Se este projeto foi útil, deixe uma estrela!

# 🚀 Guia de Deploy - Clínica Agenda IA

## Passo 1: Criar o Repositório no GitHub

1. Acesse: https://github.com/new
2. **Repository name:** `clinica-agenda-ia`
3. **Description:** `Sistema de IA para leitura de receitas e pedidos médicos`
4. Selecione **Público** ou **Privado**
5. **NÃO marque** "Add a README file" (já temos um)
6. Clique em **Create repository**

## Passo 2: Configurar o Git no seu PC

Abra o **PowerShell** ou **Prompt de Comando** na pasta do projeto e execute:

```powershell
cd "c:\Users\arrud\OneDrive\Desktop\projeto 1"

# 1. Inicializar Git (se já não estiver)
git init

# 2. Configurar branch principal
git branch -M main

# 3. Adicionar remote (substitua pelo seu usuário)
git remote add origin https://github.com/daniel-dev7/clinica-agenda-ia.git

# 4. Adicionar todos os arquivos
git add .

# 5. Fazer o primeiro commit
git commit -m "feat: Clínica Agenda IA - Sistema de leitura de receitas e pedidos médicos"

# 6. Enviar para o GitHub
git push -u origin main
```

## Passo 3: Ativar GitHub Pages (Deploy Automático)

1. No GitHub, vá em **Settings** → **Pages**
2. Em "Source", selecione **GitHub Actions**
3. O workflow `.github/workflows/deploy.yml` executará automaticamente

## ✅ Pronto!

Seu projeto estará em:
`https://github.com/daniel-dev7/clinica-agenda-ia`

E o site (quando configurado) em:
`https://daniel-dev7.github.io/clinica-agenda-ia`

## 📝 Atualizar o Projeto

Após fazer modificações, execute:

```powershell
cd "c:\Users\arrud\OneDrive\Desktop\projeto 1"
git add .
git commit -m "Descrição da alteração"
git push
```

Ou simplesmente execute o script `deploy.bat` que criamos!

## ⚠️ Se der Erro de Permissão

Pode ser que o Git não esteja configurado. Execute:

```powershell
git config --global user.name "Daniel Santos"
git config --global user.email "seu-email@email.com"
```

Substitua com seu nome e email do GitHub.

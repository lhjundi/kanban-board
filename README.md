# Kanban to-do list

Aplicação de quadro Kanban desenvolvida com React, Node.js, Fastify e MongoDB.

## Como executar

1. Clone o respositório
```bash
git clone https://github.com/lhjundi/kanban-board.git
cd kanban-board
```

2. Backend
```bash
cd backend

npm install

# Configurar variáveis de ambiente
# Criar arquivo .env com as seguintes variáveis:
MONGODB_URI=sua_string_de_conexao_mongodb
DB_NAME=kanban
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Iniciar o servidor em modo desenvolvimento
npm run dev

# O servidor estará rodando em http://localhost:3001
```

3. Frontend
```bash
# Em outro terminal, entrar no diretório do frontend
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Criar arquivo .env com:
VITE_API_URL=http://localhost:3001

# Iniciar a aplicação em modo desenvolvimento
npm run dev

# A aplicação estará disponível em http://localhost:5173
```
   

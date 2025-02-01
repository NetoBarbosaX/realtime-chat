# Realtime Chat API - Node.js, Express, Prisma e Socket.io

Bem-vindo à demonstração prática de uma aplicação de chat em tempo real, onde exploramos a integração perfeita entre WebSockets e uma API REST moderna. Este projeto serve como um guia hands-on para desenvolvedores que desejam compreender a implementação de comunicação bidirecional em suas aplicações Node.js.

Através de uma arquitetura robusta e bem organizada, demonstramos como o Socket.io trabalha em harmonia com Express e Prisma para criar uma experiência de chat fluida e responsiva. A aplicação permite que usuários troquem mensagens instantaneamente em diferentes salas de chat, ilustrando conceitos essenciais como conexões persistentes, broadcasts e gerenciamento de eventos em tempo real.

Além da comunicação em tempo real, o projeto apresenta uma estrutura de código limpo e modular, facilitando não apenas o entendimento dos conceitos, mas também sua aplicação em projetos reais. Utilizamos as melhores práticas de desenvolvimento, incluindo separação de responsabilidades, gerenciamento eficiente de banco de dados com Prisma e uma arquitetura escalável pronta para crescer junto com suas necessidades.

## Índice

- Visão Geral do Projeto
- Tecnologias Principais
- Estrutura de Pastas
- Configuração do Ambiente
- Rodando a Aplicação
- Usando a API via HTTP (REST)
  - Criar Usuário
  - Criar Sala (Room)
  - Enviar Mensagem (via HTTP)
- Uso do WebSocket (Socket.io)
  - Testando com Script Node (socket.io-client)
  - Testando com Postman (WebSocket Request)
- Testes Automatizados (Jest)
- Possíveis Extensões
- Licença

## Visão Geral do Projeto

Este projeto simula um chat em tempo real, com:

- Users (usuários)
- Rooms (salas)
- Messages (mensagens)

Cada mensagem está vinculada a um usuário e a uma sala. O objetivo é demonstrar como:

- Criar uma API REST para gerenciar entidades (Users, Rooms e Mensagens).
- Implementar WebSockets para troca de mensagens em tempo real, usando Socket.io.
- Estruturar o projeto de forma organizada e escalável.
- Utilizar Prisma como camada de acesso a dados.
- Configurar testes (unitários e de integração) com Jest.

## Tecnologias Principais

- Node.js v20
- Express
- Prisma
- Socket.io
- MySQL (pode usar outro DB compatível com Prisma, se quiser)
- Jest (para testes)


## Estrutura de Pastas

```
realtime-chat
├── prisma
│   ├── migrations/
│   │   └── schema.prisma
│   ├── src
│   │   ├── config
│   │   │   ├── env.js
│   │   │   └── index.js
│   │   ├── database
│   │   │   ├── index.js
│   │   │   └── prismaClient.js
│   │   ├── modules
│   │   │   ├── chat
│   │   │   │   ├── chat.gateway.js
│   │   │   │   ├── chat.controller.js
│   │   │   │   ├── chat.service.js
│   │   │   │   └── chat.routes.js
│   │   │   ├── user
│   │   │   │   ├── user.controller.js
│   │   │   │   ├── user.service.js
│   │   │   │   └── user.routes.js
│   │   │   ├── room
│   │   │   │   ├── room.controller.js
│   │   │   │   ├── room.service.js
│   │   │   │   └── room.routes.js
│   │   │   └── index.js
│   │   ├── middlewares
│   │   │   └── authMiddleware.js
│   │   ├── utils
│   │   │   ├── logger.js
│   │   │   └── index.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests
│   │   ├── unit
│   │   │   ├── user.test.js
│   │   │   ├── room.test.js
│   │   │   └── chat.test.js
│   │   ├── integration
│   │   │   └── ...
│   │   └── e2e
│   │       └── ...
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   └── docker-compose.yml
├── package.json
└── README.md
```

## Configuração do Ambiente

1. **Clonar este repositório:**

   ```bash
   git clone 
   cd realtime-chat
   ```

2. **Instalar dependências:**

   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configurar variáveis de ambiente:**

   - Copie o arquivo `.env.example` para `.env`.
   - Ajuste a variável `DATABASE_URL` para apontar para seu banco MySQL (ou outro).
   - Exemplo:

     ```plaintext
     DATABASE_URL=mysql://root:@localhost:3306/realtime_chat
     PORT=3000
     ```


4. **Rodar migrações para criar as tabelas no banco:**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

   Isso irá criar as tabelas (User, Room, Message) de acordo com o `schema.prisma`.

## Rodando a Aplicação

1. **Iniciar o servidor:**

   ```bash
   npm start
   ```

   Ou, se quiser rodar em modo de desenvolvimento com "hot reload" (caso use nodemon):

   ```bash
   npm run dev
   ```

2. **Acesse no navegador (ou via Postman):**

   ```plaintext
   http://localhost:3000/
   ```

   Você deverá ver algo como "Welcome to my real-time chat API!".

## Usando a API via HTTP (REST)

1. **Criar Usuário**

   - **POST** `http://localhost:3000/api/users`
   - Body (JSON):

     ```json
     {
       "username": "alice"
     }
     ```

   - Resposta (201):

     ```json
     {
       "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
       "username": "alice"
     }
     ```

2. **Criar Sala (Room)**

   - **POST** `http://localhost:3000/api/rooms`
   - Body (JSON):

     ```json
     {
       "name": "Sala Teste"
     }
     ```

   - Resposta (201):

     ```json
     {
       "id": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
       "name": "Sala Teste"
     }
     ```

3. **Enviar Mensagem (via HTTP)**

   Este endpoint depende de como você definiu em `chat.routes.js`. Exemplo:

   - **POST** `http://localhost:3000/api/chat/messages`
   - Body (JSON):

     ```json
     {
       "userId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
       "roomId": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
       "content": "Olá, mundo!"
     }
     ```

   - Resposta (201):

     ```json
     {
       "id": "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz",
       "userId": "...",
       "roomId": "...",
       "content": "Olá, mundo!",
       "createdAt": "2025-02-01T15:00:00.000Z"
     }
     ```

   Você pode também listar mensagens de uma sala (ex.: `GET /api/chat/messages/:roomId`) se implementou um endpoint assim no `chat.routes.js`.

## Uso do WebSocket (Socket.io)

O servidor expõe uma conexão Socket.io em `http://localhost:3000`. O fluxo principal é:

- Conectar ao Socket no cliente.
- Entrar em uma sala (`joinRoom`).
- Enviar mensagens (`message`), que serão recebidas por todos na sala.

### Exemplo de Eventos

No `chat.gateway.js` (ou similar), geralmente temos:

- `socket.on("joinRoom", (roomId) => { ... })`
- `socket.on("message", (data) => { ... })`
- `io.to(roomId).emit("newMessage", savedMessage)`

### Testando com Script Node (socket.io-client)

1. **Instale no projeto de teste:**

   ```bash
   npm install socket.io-client
   ```

2. **Crie um arquivo `testSocket.js`:**

   ```javascript
   const { io } = require("socket.io-client");

   const socket = io("http://localhost:3000", {
     transports: ["websocket"],
   });

   socket.on("connect", () => {
     console.log("Conectado! ID:", socket.id);

     // Entra na sala
     socket.emit("joinRoom", "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy");

     // Envia mensagem
     socket.emit("message", {
       roomId: "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
       userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
       content: "Olá via socket.io-client!"
     });
   });

   socket.on("newMessage", (msg) => {
     console.log("Nova mensagem:", msg);
   });

   socket.on("disconnect", () => {
     console.log("Desconectado");
   });
   ```

3. **Execute:**

   ```bash
   node testSocket.js
   ```

   Observe logs no console do servidor e no terminal do `testSocket`.

### Testando com Postman (WebSocket Request)

1. **New > WebSocket Request no Postman.**
2. **Conecte em:**

   ```plaintext
   ws://localhost:3000/socket.io/?EIO=4&transport=websocket
   ```

3. **Para emitir um evento, digite no campo de mensagem (antes de dar "Send"):**

   ```plaintext
   42["joinRoom","yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"]
   ```

   O `42` é parte do protocolo Socket.io (4 = mensagem, 2 = evento).
   Você pode então enviar um evento "message" com payload:

   ```plaintext
   42["message",{"roomId":"...","userId":"...","content":"Olá do Postman!"}]
   ```

   Caso o servidor emita algo como `io.to(roomId).emit("newMessage", data)`, você o verá como:

   ```plaintext
   42["newMessage",{"id":"...","roomId":"...","content":"Olá"}]
   ```

   no painel de mensagens do Postman.

## Testes Automatizados (Jest)

Este projeto inclui testes unitários em `tests/unit`. Os testes mockam o Prisma para não acessar o banco real.

- `tests/unit/user.test.js`: Testa `user.service.js`.
- `tests/unit/room.test.js`: Testa `room.service.js`.
- `tests/unit/chat.test.js`: Testa `chat.service.js`.

### Rodando Testes

```bash
npm test
```

ou, caso tenha especificado scripts diferentes:

```bash
npm run test
```

Você deve ver algo como:

```plaintext
 PASS  tests/unit/user.test.js
 PASS  tests/unit/room.test.js
 PASS  tests/unit/chat.test.js
```

## Possíveis Extensões

- **Autenticação & Autorização**: Adicionar JWT, roles (admin, user), etc.
- **File Upload**: Envio de imagens/vídeos nos chats (armazena em S3, Cloudinary, etc.).
- **Notificações**: Integrar push notifications ou web push.
- **Monitoramento & Logs Avançados**: Winston/Pino + Kibana, Prometheus, etc.
- **Microserviços**: Separar User, Chat, Room em serviços distintos e usar mensageria.

## Licença

Este projeto está disponível sob a MIT License.
Sinta-se livre para usar, estudar, modificar e distribuir, desde que mantenha os devidos créditos.

Obrigado por conferir!
Qualquer dúvida ou sugestão, fique à vontade para abrir uma issue ou enviar um pull request. Bons estudos e boa codificação!

# Destaques

- **prisma/schema.prisma**: Define as entidades User, Room e Message.
- **src/modules/**: Cada módulo possui um service, controller, routes (para HTTP) e, se necessário, um gateway (para Socket.io).
- **server.js**: Inicializa o servidor e o Socket.io.
- **tests/**: Contém testes unitários e de integração/e2e (separados).
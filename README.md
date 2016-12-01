# Cooper Comics

A Cooper Comics é uma loja de leilão de quadrinhos fictícia.

Clientes que desejam vender seus quadrinhos podem deixá-­los conosco, onde eles serão mostrados para os visitantes da loja que por sua vez podem ofertar um valor a um determinado quadrinho.

Após um período pré-­definido, o leilão de um quadrinho acaba e contatamos a pessoa que ofertou o maior valor, para entregar­-lhe o quadrinho.

#### Para desenvolver, siga as seguintes etapas: ####
* Instale o [Node.js](https://nodejs.org/en/download/).
* Estamos usando banco de dados, mas não está sendo usado uma versão local, e sim conectando à um banco externo, logo não é necessário instalar o MongoDB em sua máquina. Variável MONGODB_URI define o endereço.
* Após receber todo o repositório, abra a pasta do projeto em um terminal e execute o comando "_npm install_". (Para usuários Windows, entrem na pasta do projeto e pressionem shift+botão direito. No menu de contexto, a opção de abrir a pasta via terminal aparecerá.).
* Agora, você possui todas as dependências instaladas e está pronto para desenvolver. Execute npm start.
* As variáveis do ambiente devem ficar no arquivo .env, no root do repositório. Lá está definida em qual porta o servidor funciona, e outras variáveis que afetam o comportamento do servidor.

#### .env
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cc
ROOT_URL=https://coopercomics.herokuapp.com

SESSION_SECRET=eunaotenhosegredos
SMTP_EMAIL=
SMTP_PASSW=
```

---
Instruções por [Francisco Knebel](https://github.com/franciscoknebel).

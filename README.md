<h1 align="center">Serverless Wallet</h1>

<p align="center">API criada para realização do Desafio Técnico Backend</p>

### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)

```bash
### Passo a passo!

# Clone este repositório
$ git clone <https://github.com/The-Kevin/serverless-wallet>

# Acesse a pasta do projeto no terminal/cmd
$ cd serverless-wallet/

# Instale as dependências
$ yarn

# Adicione as variaveis ambiente

$ nano .env

# As variaveis requeridas podem ser encontradas em .env.example

# Execute a aplicação em modo de desenvolvimento
$ yarn local

# O servidor inciará na porta:3001 - acesse <http://localhost:3001/>


# Você também pode criar um container Docker para utilizar da aplicação
$  docker-compose up

# Será criada juntamente a aplicação um banco de dados MongoDb utilizando a porta 27017 por uma rede interna (ilia-network)


## OBS: a utilização desta API requer um usuario criado pela plataforma de usuario
## https://github.com/The-Kevin/microservice-users
```

### Autor

<p>Kevin S. Almeida</p>
<p>(https://www.linkedin.com/in/kevin-almeida-57258b1b4/)</p>

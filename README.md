# Campanhas

Campanhas é uma aplicação em que você pode criar uma campanha na forma de votação a partir de hashtags escolhidas por você utilizadas por usuários do mundo todo no Twitter.

## Instalação

### Pré requisitos

- NodeJS versão v4.6.1: https://nodejs.org/download/release/v4.6.1/
- npm
- mongoDB: https://www.mongodb.com/download-center#community

### Passos seguintes

Primeiramente, inicie o servidor do mongoDB na porta 27017:

    mkdir data
    mongod --dbpath=data

Depois, clone este repositório:

    git clone https://github.com/yagotome/campanhas-enquetes.git

Então, vá na pasta desse repositório e execute:

    npm install -g gulp bower
    cd webservice
    npm install
    npm start

Em outro instância do terminal, na pasta desse repositório, execute:

    cd webapp
    npm install
    bower install
    gulp serve

Agora, você pode acessar a aplicação através de http://localhost:3001/
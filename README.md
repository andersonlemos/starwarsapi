# Starwars Api #

Este projeto consiste em uma simples api para cadastros de planetas.
Possui integração com a [SWAPI - The Star Wars API](https://swapi.co/), obtendo automaticamente no momento do cadastro, a quantidade de filmes que o planeta é citado.

## Tecnologia Utilizada ##

* [NestJs](https://nestjs.com/)
* [MongoDb](https://www.mongodb.com/)

## Pré-requisitos ##

* [NPM](https://www.npmjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [GIT](https://git-scm.com/)
* [MongoDb](https://www.mongodb.com/) - (_executando na porta padrão 27017_)

## Instalação ##

Se já possui os pacotes necessários instalados,
clone o projeto do repositório.

    git clone https://github.com/andersonlemos/starwars.git

Caso contrário instale primeiramente os pacotes necessários conforme configuração sugerida em suas documentações.

Após clonar o projeto, entre na pasta da solução e execute o comando:

    npm install

Isso efetuará o download e a instalação dos pacotes necessários para o seu funcionamento.

Concluída a instalação é hora de executar a aplicação.
Execute:

    npm run start:dev       Inicia opções de desenvolvimento carregamento da aplicação, sempre que um arquivo for alterado
    npm run start:prod      Inicia a apliação somente com os logs de console.
    npm run test:e2e        Compila o arquivo app.e2e-spec.ts da pasta /test e inicia um teste básico das rotas. 


### Preview ###

Por padrão a aplicação está disponível em http://localhost:3000/v1/planets mas isso pode ser alterado no arquivo  _environments.ts_ no diretório raiz.

Endpoints:

    GET         v1/planets                       async get(@Query()  options: QueryDto) 
    GET         v1/planets/:planetid             async getById(@Param('planetId') planetId: string)
    GET         v1/planets/name/:planetName      async getByName(@Param('planetName') planetName: string)
    POST        v1/planets                       async post(@Body() model: CreatePlanetDto)
    DELETE      v1/planets/:planetId             async delete(@Param('planetId') planetId: string)

Se quisermos paginar os resultados, estão disponíveis as opções, skip, take e sort.
Onde:
- *Skip*: pula a quantidade de registros informada
- *Take*: retorna a quantidade de registros informada
- *Sort*: ordena os resultados pelo campo informado

Exemplos:

    planets/?skip=2
    planets/?take=1
    planets/?sort=+name
    planets/?sort=-name

Documentação das rotas disponível também em http://localhost:3000/docs



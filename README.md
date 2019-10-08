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

### Preview ###

Endpoints:

    GET         /planets                       async get(@Query()  options: QueryDto) 
    GET         /planets/:planetid             async getById(@Param('planetId') planetId: string)
    GET         /planets/name/:planetName      async getByName(@Param('planetName') planetName: string)
    POST        /planets                       async post(@Body() model: CreatePlanetDto)
    DELETE      /planets/:planetId             async delete(@Param('planetId') planetId: string)

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


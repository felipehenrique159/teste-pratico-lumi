## Aplicação back-end Teste Prático Lumi

## Instruções para rodar a aplicação em docker

- Na raiz do projeto execute o comando: **docker-compose up --build** para subir os contêiner

### Sobre a aplicação

A aplicação consiste em faturas da cemig que esta em pdf e captar dados relavantes, realizando persistencia dos mesmo no banco de dados postgres SQL e apresentar resultados em graficos!

### Algumas das tecnologias e bibliotecas utilizadas

- ### Express
- ### Typescript
- ### React
- ### Postgres
- ### ChartJs
- ### Jest
- ### Pdf-Parse
- ### Docker

### Rotas da aplicação

### POST http://localhost:3001/api/process-pdf

- Upload e processamento de pdf
- Formulario formdata, propriedade "files"

### GET http://localhost:3001/api/list-all-invoices

- Listar todas as faturas

### GET http://localhost:3001/api/list-all-customers

- Listar todas os clientes
  
### GET http://localhost:3001/api/download/path/:file

- Realiza download de fatura

### GET http://localhost:3001/api/list-dash-energy-consumed

- Listar dashboard referente ao consumo eletrico

### GET http://localhost:3001/api/list-dash-energy-economy

- Listar dashboard referente a economia eletrica


## Aplicação back-end Teste Prático Lumi

<img src="https://private-user-images.githubusercontent.com/43323183/333892506-616c8afa-548c-4b4e-871a-5329d9e2a216.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTY3Mzg5MjgsIm5iZiI6MTcxNjczODYyOCwicGF0aCI6Ii80MzMyMzE4My8zMzM4OTI1MDYtNjE2YzhhZmEtNTQ4Yy00YjRlLTg3MWEtNTMyOWQ5ZTJhMjE2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTI2VDE1NTAyOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJiYTc3YjFmNDM3NmIyMTM1ZWUzMzc0ODRiNmJjNzRlNjU4N2Q3YjhkNDE3MzdjYjY2YTRiNGNjOWQzNGVkNjQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.j6uG-TdC_C_lUfLIiiqTju55g5RMybltgBtV1Z5YZBA">

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


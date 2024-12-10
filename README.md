# Sistema de Gestão de Matrículas

## Contextualização
Este projeto foi desenvolvido para atender as necessidades de uma **Instituição de Ensino Superior**, permitindo o gerenciamento do cadastro de alunos e suas matrículas em turmas online. Antes de realizar a matrícula, é necessário que o cadastro do aluno esteja concluído.

---

## Arquitetura da Solução

### Back-end
O back-end é responsável pelas regras de negócio e pela persistência de dados.

#### Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework web para criação de APIs.
- **MySQL**: Banco de dados relacional.
- **JWT (JSON Web Token)**: Autenticação e segurança.
- **Bcrypt.js**: Hashing de senhas.
- **Jest**: Testes automatizados.

#### Estrutura
```plaintext
back-end/
├── src/
│   ├── controllers/      
│   ├── routes/            
│   ├── models/           
│   ├── middlewares/      
│   ├── utils/             
│   └── config/     
├── index.js              
├── package.json   
```` 
### Front-end
O front-end fornece uma interface responsiva e amigável para os usuários.

#### Tecnologias Utilizadas
- **Vue.js**: Framework JavaScript para construção de interfaces.
- **Vuetify**: Framework de UI baseado em Material Design.
- **Axios**: Cliente HTTP para consumo da API.

#### Estrutura
````plaintext
vuetify-project/
├── src/
│   ├── components/    
│   ├── pages/   
│   ├── router/            
│   ├── layouts/  
|   └── utils/     
├── package.json
````

## Como Rodar o Projeto

### Pré-requisitos
Antes de iniciar, você precisa:
- **Node.js** instalado na máquina.
- O arquivo `.env` com as credenciais de banco de dados.

---

### Back-end
1. Navegue até a pasta do back-end:
```bash
cd back-end
```
2. Coloque o arquivo .env na raiz do projeto.
3. Instale as dependências:
```bash
npm install
```
4. Inicie o servidor:
```bash
npm run dev
```

### Front-end
1. Navegue até a pasta do front-end:
```bash
cd front-end
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor:
```bash
npm run dev
```

### Testes
1. Navegue até a pasta do back-end:
```bash
cd back-end
```
2. Rode os testes:
```bash
npm run test
```

### Observações
Certifique-se de que o back-end esteja rodando antes de iniciar o front-end.
O banco de dados já está configurado e online, portanto não é necessário criar tabelas ou configurar o banco localmente.



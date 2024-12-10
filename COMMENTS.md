# Comentários sobre o Projeto

## Decisão da Arquitetura Utilizada
A arquitetura foi baseada em uma separação clara entre o **front-end** e o **back-end**, visando uma aplicação escalável e de fácil manutenção:
- **Back-end**: Construído com **Node.js** e **Express**, utilizando uma API RESTful para comunicação. O banco de dados **MySQL** foi escolhido por sua confiabilidade e capacidade de lidar com dados relacionais.
- **Front-end**: Desenvolvido em **Vue.js** com **Vuetify** para fornecer uma interface moderna e responsiva.

---

## Lista de Bibliotecas de Terceiros Utilizadas

### Back-end:
- **bcryptjs**: Para hashing de senhas.
- **body-parser**: Para parsing do corpo das requisições.
- **cors**: Para habilitar o compartilhamento de recursos entre diferentes origens.
- **dotenv**: Para gerenciar variáveis de ambiente.
- **express**: Framework para construção da API.
- **express-validator**: Para validação e sanitização de dados de entrada.
- **jsonwebtoken**: Para autenticação via tokens JWT.
- **mysql2**: Para interação com o banco de dados MySQL.
- **jest** (dev): Para testes unitários.
- **nodemon** (dev): Para monitorar alterações no código durante o desenvolvimento.

### Front-end:
- **axios**: Para comunicação com a API.
- **vue**: Framework principal para o desenvolvimento do front-end.
- **vuetify**: Framework de UI para estilização e componentes pré-prontos.
- **vue-router**: Para roteamento no front-end.
- **vite**: Ferramenta de build para desenvolvimento rápido.

---

## O que Melhoraria com Mais Tempo
1. **Cobertura de Testes**: Faria todos os testes necessários. Atualmente, apenas parte dos testes do **back-end** foi implementada, e estão incompletos.
2. **Componentização do Front-end**: Melhoraria a estrutura de componentes no **front-end**, separando responsabilidades de maneira mais eficiente.
3. **Refinamento do Front-end**: Otimizaria a interface e a usabilidade para oferecer uma experiência mais fluida ao usuário.

---

## Requisitos Obrigatórios que Não Foram Entregues
Nenhum requisito obrigatório ficou pendente. Todos os critérios de aceitação foram atendidos.

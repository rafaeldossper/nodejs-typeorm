### Atividade Avaliativa


API para gerenciar informações sobre times de futebol e partidas.

Avaliação e materiais fornecidos pelo <a href="https://github.com/arleysouza"> Profº Arley Souza</a> na disciplina de Programação de Scripts do curso de Análise e Desenvolvimento de Sistemas da Fatec Jessen Vidal.

-  ### Instalação
```
Clone o repositório: git clone https://github.com/rafaeldossper/nodejs-typeorm.git
Navegue até o diretório do projeto: cd nodejs-typeorm
Instale as dependências: npm install 
```
-  ### Configuração
```
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
PORT = 3004
```
- ### Uso
```
Inicie o servidor localmente: npm start
A API estará disponível em: http://localhost:3004
```


### Utilize qualquer aplicativo de requisições HTTP de sua preferência.
-  ### Rotas 
    ##### Para as rotas que utilizam um body JSON, clique <a href="https://github.com/rafaeldossper/nodejs-typeorm/blob/main/instructions/Atividade%20de%20avaliação%204%20-%20TypeORM.pdf">AQUI</a> e verifique o PDF com as instruções para cada requisição.
    <details>
    <summary>Times de Futebol</summary>
    <pre>
    <code>
    
    GET /team  &nbsp;&nbsp;&nbsp; Retorna todos os times cadastrados.<br /> 
    GET /team/:id &nbsp;&nbsp;&nbsp; Retorna um time específico com base no ID.<br /> 
    POST /team  &nbsp;&nbsp;&nbsp; Cria um novo time. Requer um corpo JSON contendo o nome do time.<br /> 
    PUT /team/:id &nbsp;&nbsp;&nbsp;Atualiza as informações de um time existente. Requer um corpo JSON contendo o nome do time.<br /> 
    DELETE /team/:id   &nbsp;&nbsp;&nbsp; Exclui um time específico com base no ID.<br /> 
    </code>
    </pre>
    </details>
    
    <details>
    <summary>Partidas de Futebol</summary>
    <pre>
    <code>
    GET /match &nbsp;&nbsp;&nbsp; Retorna todas as partidas cadastradas.<br /> 
    GET /match/:id &nbsp;&nbsp;&nbsp; Retorna uma partida específica com base no ID do visitor ou host.<br /> 
    POST /match &nbsp;&nbsp;&nbsp; Cria uma nova partida. Requer um corpo JSON contendo os IDs dos times e a data da partida.<br /> 
    PUT /match/:id &nbsp;&nbsp;&nbsp; Atualiza as informações. Requer um corpo JSON contendo os IDs dos times e a data da partida.<br /> 
    DELETE /match/:id &nbsp;&nbsp;&nbsp; Exclui uma partida específica com base no ID.<br />
    </code>
    </pre>
    </details>
    
#### Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL



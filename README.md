# Versões dos softwares utilizados:  
  - node v16.17.0 
  - yarn 1.22.19  
  - npm v8.15.0  
  - docker 20.10.17  
  - docker-compose 2.10.2  
  
# Como utilizar
1 -  Crie o banco de dados com o nome ``employee`` ou execute o comando ``docker-compose up -d`` na pasta raiz do projeto  
  Obs: No desenvolvimento foi utilizado o banco de dados PosgreSQL
  
2 - Dentro do arquivo .env está as variaveis de ambiente para a conexão com o banco de dados (Por padrão está as configurações para acessar o banco de dados
docker-compose)
  - DB_HOST: Host utilizado para acessar o banco de dados
  - DB_DATABASE: Nome do banco de dados
  - DB_USER: Usuário ADM que terá acesso ao banco 
  - DB_PASSWORD: Senha do usuario

  ``Para fins didáticos foi 'commitado' o .env, entretanto em repositorio de projeto real não se deve commitar o .env com as variaveis de acesso
  as informações do servidor, como banco de dados e regras de negócio``
  
  
3 - Rode a query SQL no banco de dados para criar a tabela 'employees':  
  ```sql
    CREATE TABLE public.employees (
      id varchar(50) NOT NULL,
      nome varchar(150) NOT NULL,
      idade int4 NOT NULL,
      cargo varchar(80) NOT NULL,
      CONSTRAINT id_pk PRIMARY KEY (id)
    );
  ```

4 - Rode o comando na pasta raiz do projeto:  
  - ```yarn```  
  
  Nota: Este comando irá baixar as dependencias das bibliotecas (node_modules)  
  
  
5 - Rode o commando na pasta raiz do projeto:  
  - ```yarn serverless offline```  
  
  Nota: Este comando irá iniciar o backend  
  
  # Sobre o Projeto
  
  - O Projeto foi desenvolvido utilizando o TypeScript que busca melhorar a busca de erros e bugs dentro do código, além de melhorar a consistência e escabilidade do mesmo. 
  - Banco de dados utilizado: *PostgreSQL* 
  - Dentro do projeto existe um arquivo de documentação da API desenvolvido no Postman chamado: *Employee.postman_collection.json*  

  
  
## Documentação da API 

Todas as requisições devem ser feitas com a header Content-Type: application/json.  
As respostas são codificadas em JSON. 


### POST

#### Cadastro de um funcionário

```bash
POST /employee
```

Body  
```json
{
	"nome": "John",
	"idade": 21,
	"cargo": "TI"
}
```


### GET

#### Lista de funcionários

```bash
GET /employee
```

#### Informações de um funcionário
```bash
GET /employee/:id
```


### PUT

#### Atualizar informações um funcionário

```bash
PUT /employee/:id
```

Body  
```json
{
	"nome": "John",
	"idade": 21,
	"cargo": "TI"
}
```

### DELETE

#### Deletar funcionário

```bash
DELETE /employee/:id
```



  

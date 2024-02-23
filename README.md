# Desafio FullCycle3.0 - Docker

Desafio Docker retornando, pelo nginx porta 8080, a string **Full Cycle Rocks!!!** e nomes aleatórios persistidos no banco mysql pelo node.js.

Certifique-se de que o Docker está sendo executado na máquina antes de seguir os passos abaixo.

**Clonar o projeto**

Clone o projeto utilizando o terminal:

<kbd>git clone https://github.com/Bruccedf/nginx_node_mysql.git</kbd>

Na sequencia, acesse a pasta criada:

<kbd>cd nginx_node_mysql </kbd>

**Buildar o projeto:**

<kbd>docker compose up -d </kbd>

**Ver o resultado:**

<kbd>http://localhost:8080</kbd>

Dica: Pressione **F5** para atualizar a página, novos nomes serão acrescentados
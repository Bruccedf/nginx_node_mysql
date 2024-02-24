const express = require('express')
const app = express()
const faker = require('faker')
const port = process.env.APP_PORT || 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)
connection.query('CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, nome varchar(255), PRIMARY KEY (id))')

app.get('/', (req, res) => {
    const nameFaker = faker.name.findName()
    const traitName = connection.escape(nameFaker); //Trata nomes com apóstrofos
    connection.query(`INSERT INTO people (nome) VALUES (${traitName})`)
    connection.query(`SELECT nome FROM people ORDER BY nome ASC`, (error, results, fields) => {
        const sanitizedResults = results.map(el => {
            return { nome: el.nome.replace(/\\/g, '') }; // Remove barras invertidas de nomes com apóstrofos, por exemplo: O\'Connor
        });
        const totalNames = sanitizedResults.length; // Calcula o número total de nomes cadastrados
        res.send(`
        <h1>Full Cycle Rocks!!!</h1>
        <h5>Refresh page to insert a random name.</h5>
        <p>Registrations: ${totalNames}</p>
        <ul>
        ${sanitizedResults.map(el => `<li>${el.nome}</li>`).join('')}
        </ul>
    `)
    })
})

app.listen(port, () => {
    console.log('Porta ativa:', port);
})
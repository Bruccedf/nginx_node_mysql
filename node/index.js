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
    connection.query(`INSERT INTO people (nome) VALUES ('${nameFaker}')`)
    connection.query(`SELECT nome FROM people ORDER BY nome ASC`, (error, results, fields) => {
        res.send(`
        <h1>Full Cycle Rocks!!!</h1>
        <h5>Refresh page to insert randomic name.</h5>
        <ul>
        ${results.map(el => `<li>${el.nome}</li>`).join('')}
        </ul>
    `)
    })
})

app.listen(port, () => {
    console.log('Porta ativa:', port);
})
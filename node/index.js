const express = require('express')
const faker = require('faker')
const app = express()
const port = process.env.APP_PORT || 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const nameFaker = faker.name.findName()

    connection.query(`INSERT INTO people (nome) VALUES ('${nameFaker}')`)

    connection.query(`SELECT nome FROM people ORDER BY nome ASC`, (error, results, fields) => {
        res.send(`
        <h1>Full Cycle Rocks!!!</h1>
        <ul>
        ${results.map(el => `<li>${el.nome}</li>`).join('')}
        </ul>
    `)
    })
})

app.listen(port, () => {
    console.log('Up on:', port);
})
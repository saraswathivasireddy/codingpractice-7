const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

app = express()

const dbPath = path.join(__dirname, 'cricketMatchDetils.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

//Returns a list of all the players in the player table

app.get('/players/', async (request, response) => {
  const getSQLQuery = `
    SELECT * 
    FROM player_details;
    `
  const players = await db.all(getSQLQuery)
  response.send(players)
})

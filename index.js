const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
// C - Create
server.post('/api/zoos', async (req, res) => {
  const newRecord = req.body;
  
  try {
    if (!newRecord.name || newRecord.name === '') {
      res
        .status(400)
        .json({
          errorMessage: 'Please provide a name for the new record'
        });
    } else {
      let newId = await db.insert(newRecord).into('zoos');
      
      newId ?
        res
          .status(201)
          .json(newId[0])
      :
        res
          .status(500)
          .json({
          errorMessage: 'Houston we have a problem'
        });
      
    }
  } catch (err) {
    res
      .status(500)
      .json({
        errorMessage: 'Houston we have a problem'
      });
  }
});

// R - Read 
// All
server.get('/api/zoos', async (req, res) => {
  
  try {
    const zoos = await db('zoos')

    zoos.length > 0 ?
      res
        .status(200)
        .json(zoos)
      :
      res
        .status(404)
        .json({
          errorMessage: 'There are no zoos found'
        })
  } catch (err) {
    res
      .status(500)
      .json({
        errorMessage: 'Houston we have a problem'
      });
  }
});

// Unique
server.get('/api/zoos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const zoo = await db('zoos').where({
      id: id
    })

    zoo ?
      res
      .status(200)
      .json(zoo) :
      res
      .status(404)
      .json({
        errorMessage: 'There is no zoo found'
      })
  } catch (err) {
    res
      .status(500)
      .json({
        errorMessage: 'Houston we have a problem'
      });
  }
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

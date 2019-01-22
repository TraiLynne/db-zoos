const knex = require('knex');

const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

// C - Create 
const create = zoo => db('zoos').insert(zoo);

// R - Read
// All
const readAll = () => db('zoos');

// Unique
const findById = id => db('zoos').where({ id }).first();


// U - Update
const update = (id, zoo) => db('zoos').where({ id }).update(zoo);

// D - Destroy
const destroy = id => db('zoos').where({ id }).del();

module.exports = {
    create,
    readAll,
    findById,
    update,
    destroy
}
const knex = require('knex');

const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

// C - Create 
const create = zoo => db('bears').insert(zoo);

// R - Read
// All
const readAll = () => db('bears');

// Unique
const findById = id => db('bears').where({
    id
}).first();


// U - Update
const update = (id, zoo) => db('bears').where({
    id
}).update(zoo);

// D - Destroy
const destroy = id => db('bears').where({
    id
}).del();

module.exports = {
    create,
    readAll,
    findById,
    update,
    destroy
}
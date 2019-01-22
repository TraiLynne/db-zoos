const knex = require('knex');

const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

module.exports = {
    create,
    readAll,
    findById,
    update,
    destroy
}

function create(zoo) {
    return db('zoos')
        .insert(zoo);
}

function readAll() {
    return db('zoos');
}

function findById(id) {
    return db('zoos')
        .where({
            id: id
        })
        .first();
}

function update(id, zoo) {
    return db('zoos')
        .where({
            id
        })
        .update(zoo);
}

function destroy(id) {
    return db('zoos')
        .where({
            id
        })
        .del();
}
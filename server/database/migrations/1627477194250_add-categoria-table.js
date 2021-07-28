/* eslint-disable camelcase */

exports.shorthands  = undefined;

exports.up = pgm => {
    pgm.createTable('categoria',{
        categoria_id: 'id',
        nome: { type: 'varchar(255)', notNull: true},
    })
};

exports.down = pgm => {};

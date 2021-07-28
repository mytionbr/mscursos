exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('curso',{
        categoria_Id: {
            type: 'integer', 
            references: '"categoria"'
        }
    })
    pgm.createIndex('curso', 'categoria_Id')
};

exports.down = pgm => {};
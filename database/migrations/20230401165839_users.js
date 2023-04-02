
exports.up = function (knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            users
                .string('name', 80)
                .notNullable()
            users
                .string('email', 80)
                .notNullable()
            users
                .string('password')
                .notNullable()
            users
                .boolean('is_admin').notNullable().defaultTo(false)
            users
                .string('status', 20).notNullable().defaultTo('active')
            users
                .timestamps(); // will create two columns: created_at, updated_at
        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('users')
};

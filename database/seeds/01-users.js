exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Gonz', email: 'gonza@gmail.com', password: 'U9PQxzHvkX', is_admin: true, status: 'active' },
        { name: 'Brenda', email: 'brenda@gmail.com', password: 'qQcsoQbr5G', is_admin: false, status: 'active' },
        { name: 'Lupe', email: `lupe@gmail.com.`, password: '4T4Acf', is_admin: false, status: 'inactive' },
      ]);
    });
};

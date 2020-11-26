const properties = require('./json/properties.json');
const users = require('./json/users.json');


const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
  const queryString = `
  SELECT * FROM users
  WHERE email = $1;
  `;
  return pool.query(queryString, [email])
  .then(res => res.rows[0]);  
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);
  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;
  return pool.query(queryString, [id])
  .then(res => res.rows[0]);  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const values = [user.name, user.email, user.password]
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  return pool.query(queryString, values)
  .then(res => res.rows[0]); 

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  //return getAllProperties(null, 2);

  const values = [guest_id, limit]
  const queryString = `
  SELECT a.*, properties.*
  , (SELECT AVG(rating) FROM property_reviews b WHERE a.property_id = b.property_id)
FROM users
JOIN reservations a ON users.id = guest_id
JOIN properties ON properties.id = property_id
WHERE end_date < now() and a.guest_id = $1
ORDER BY start_date
LIMIT $2;
  `;
  return pool.query(queryString, values)
  .then(res => res.rows);

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const optionsMap = {
    city: 'city LIKE $',
    owner_id : 'owner_id = $',
    minimum_price_per_night: 'cost_per_night > 100 * $',
    maximum_price_per_night: 'cost_per_night < 100 * $',
  };

  const searchStrings = [];
  const values = [];

  let num = 1;
  for (const key in options) {
    if (options[key] && key !== 'minimum_rating') {
      searchStrings.push(optionsMap[key] + num);
      values.push((key === 'city') ? '%' + options[key] + '%' : options[key]);
      num++;
    }
  }
  const search = (searchStrings.length > 0) ? 'WHERE ' + searchStrings.join(' AND ') : '';

  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  ${search}
  GROUP BY properties.id
  `;
  
  if (options.minimum_rating) {
    values.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) > $${values.length}`;
  }

  values.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${values.length};
  `;

  return pool.query(queryString, values)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;

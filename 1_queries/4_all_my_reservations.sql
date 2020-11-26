SELECT a.*, properties.*
  , (SELECT AVG(rating) FROM property_reviews b WHERE a.property_id = b.property_id)
FROM users
JOIN reservations a ON users.id = guest_id
JOIN properties ON properties.id = property_id
WHERE end_date < now() and a.guest_id = 1
ORDER BY start_date
LIMIT 10;

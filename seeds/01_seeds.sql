INSERT INTO users (name, email, password)
VALUES ('Jane Smith', 'janesmith@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('John Doe', 'johntheowner@hotmai.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ron Seagul', 'ronseag76@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jeremy Black', 'jblack2000@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Amanda Green', 'iamandag@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Casa Rosa', 'description', 'https://qazxsw.com/fakephoto1.png?compress', 'https://qazxsw.com/fakephoto1.png', 150, 2, 2, 2, 'Canada', '66 Oak', 'Bikin', 'ON', '3B5 6T8', 'true'),
(3, 'Super house', 'description', 'https://qazxsw.com/fakephoto2.png?compress', 'https://qazxsw.com/fakephoto2.png', 25, 0, 1, 1, 'Canada', '115 Fett', 'Amursk', 'BC', '5T7 6T8', 'true'),
(1, 'The Hut', 'description', 'https://qazxsw.com/fakephoto3.png?compress', 'https://qazxsw.com/fakephoto3.png', 50, 1, 1, 1, 'Canada', '1178 Bow', 'Khabarovsk', 'NS', '3B5 9I5', 'true'),
(4, 'Lux Shelter', 'description', 'https://qazxsw.com/fakephoto4.png?compress', 'https://qazxsw.com/fakephoto4.png', 60, 2, 1, 1, 'Canada', '356 Utapau', 'Ulan-Ude', 'BC', '0P4 6T8', 'true'),
(5, 'Shiny Suite','description',  'https://qazxsw.com/fakephoto5.png?compress','https://qazxsw.com/fakephoto5.png', 85, 2, 1, 2, 'Canada', '907 Arkaim', 'Ulan-Bator', 'BC', '7Y5 1N6', 'true');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2010-11-09', '2010-11-19', 1, 3),
('2013-05-05', '2013-05-25', 4, 3),
('2023-08-19', '2023-08-27', 1, 5),
('2019-10-11', '2019-10-16', 3, 2),
('2019-12-14', '2019-12-31', 4, 2),
('2017-10-12', '2017-10-14', 2, 4),
('2015-10-23', '2015-10-28', 5, 1),
('2014-01-12', '2014-01-22', 3, 2),
('2020-01-10', '2020-02-15', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES(3, 1, 1, 4, 'messages'),
(3, 4, 2, 4, 'messages'),
(5, 1, 3, 4, 'messages'),
(2, 3, 4, 4, 'messages'),
(2, 4, 5, 4, 'messages'),
(4, 2, 6, 4, 'messages'),
(1, 5, 7, 4, 'messages'),
(2, 3, 8, 4, 'messages'),
(3, 3, 9, 4, 'messages');
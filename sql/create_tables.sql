
CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   firstname VARCHAR(250) NOT NULL,
   lastname VARCHAR(250) NOT NULL,
   email VARCHAR(250) NOT NULL,
   password VARCHAR(72) NOT NULL,
   -- https://www.postgresqltutorial.com/postgresql-time/
   created TIME DEFAULT now()
);
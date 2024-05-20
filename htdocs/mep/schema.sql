CREATE DATABASE thermikjunkies;
USE thermikjunkies;
CREATE TABLE members(
    id int AUTO_INCREMENT PRIMARY KEY,
    uname text NOT NULL,
    email text NOT NULL,
    shvNum text NOT NULL,
    birthdate date NOT NULL,
    entryDate date NOT NULL
);

-- Testdaten einfügen
INSERT INTO `members` (`id`, `uname`, `email`, `shvNum`, `birthdate`, `entryDate`) VALUES
(NULL, 'Markus Kurvenflug', 'markus.k@ichwillfliegen.ch', '12396', '1980-01-01', '2014-06-14'),
(NULL, 'Lara Wolken', 'wolken_l@flugmail.com', '65342', '1995-04-13', '2014-06-14'),
(NULL, 'Peter Aramid', 'peter.aramid@gmail.com', '9873', '1964-01-10', '2014-06-14');

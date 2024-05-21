CREATE DATABASE thermikjunkies;
USE thermikjunkies;
CREATE TABLE members(
    id int AUTO_INCREMENT PRIMARY KEY,
    uname text NOT NULL,
    email text NOT NULL,
    shvNum text NOT NULL,
    birthdate date NOT NULL,
    entryDate date NOT NULL,
    createdBy text
);

ALTER TABLE members
ADD CONSTRAINT unique_email UNIQUE (email);

-- Testdaten einfügen
INSERT INTO `members` (`id`, `uname`, `email`, `shvNum`, `birthdate`, `entryDate`) VALUES
(NULL, 'Markus Kurvenflug', 'markus.k@ichwillfliegen.ch', '12396', '1980-01-01', '2014-06-14'),
(NULL, 'Lara Wolken', 'wolken_l@flugmail.com', '65342', '1995-04-13', '2014-06-14'),
(NULL, 'Peter Aramid', 'peter.aramid@gmail.com', '9873', '1964-01-10', '2014-06-14'),
(NULL, 'Ines Wasser', 'iwa@bluewin.ch', '12847', '1974-11-23', '2016-03-01'),
(NULL, 'Mathilda Stierli', 'mathilda.stierli@gmx.net', '24831', '1989-07-12', '2023-05-11'),
(NULL, 'Fabio Stefan', 'fabio.s@icloud.com', '68944', '1999-02-01', '2018-02-02'),
(NULL, 'Dora Winkelmann', '1579.dora@msn.de', '22561', '1953-11-25', '2015-06-30'),
(NULL, 'Mona Regen', 'm.regen@hotmail.com', '68315', '2000-08-11', '2019-04-21'),
(NULL, 'Markus Vogelsang', 'zwitscher.m@gmail.com', '15522', '1983-03-28', '2016-12-01'),
(NULL, 'Valentin Segler', 'vs1993@outlook.de', '38741', '1993-05-15', '2015-05-05');


-- Mehr Testdaten einfügen (optional)
INSERT INTO `members` (`id`, `uname`, `email`, `shvNum`, `birthdate`, `entryDate`) VALUES
(NULL, 'Testee McTestface', 'testee0@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee1@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee2@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee3@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee4@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee5@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee6@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee7@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee8@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee9@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee10@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee11@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee12@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee13@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee14@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee15@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee16@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee17@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee18@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee19@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee20@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee21@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee22@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee23@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee24@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee25@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee26@test.ch', '123456', '1980-01-01', '2017-01-01'),
(NULL, 'Testee McTestface', 'testee27@test.ch', '123456', '1980-01-01', '2017-01-01');
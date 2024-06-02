CREATE DATABASE thermikjunkies;
USE thermikjunkies;
CREATE TABLE members(
    id int AUTO_INCREMENT PRIMARY KEY,
    uname text NOT NULL,
    email text NOT NULL,
    shvNum text NOT NULL,
    birthdate date NOT NULL,
    entryDate date NOT NULL,
    hidden tinyint(1) NOT NULL DEFAULT 0,
    createdBy text
);

ALTER TABLE members
ADD CONSTRAINT unique_email UNIQUE (email);

-- Testdaten einfügen
INSERT INTO `members` (`id`, `uname`, `email`, `shvNum`, `birthdate`, `entryDate`, `createdBy`) VALUES
(NULL, 'Markus Kurvenflug', 'markus.k@ichwillfliegen.ch', '12396', '1980-01-01', '2014-06-14', 'Admin'),
(NULL, 'Lara Wolken', 'wolken_l@flugmail.com', '65342', '1995-04-13', '2014-06-14', 'Admin'),
(NULL, 'Peter Aramid', 'peter.aramid@gmail.com', '9873', '1964-01-10', '2014-06-14', 'Admin'),
(NULL, 'Ines Wasser', 'iwa@bluewin.ch', '12847', '1974-11-23', '2016-03-01', 'Admin'),
(NULL, 'Mathilda Stierli', 'mathilda.stierli@gmx.net', '24831', '1989-07-12', '2023-05-11', 'Admin'),
(NULL, 'Fabio Stefan', 'fabio.s@icloud.com', '68944', '1999-02-01', '2018-02-02', 'Admin'),
(NULL, 'Dora Winkelmann', '1579.dora@msn.de', '22561', '1953-11-25', '2015-06-30', 'Admin'),
(NULL, 'Mona Regen', 'm.regen@hotmail.com', '68315', '2000-08-11', '2019-04-21', 'Admin'),
(NULL, 'Markus Vogelsang', 'zwitscher.m@gmail.com', '15522', '1983-03-28', '2016-12-01', 'Admin'),
(NULL, 'Valentin Segler', 'vs1993@outlook.de', '38741', '1993-05-15', '2015-05-05', 'Admin');


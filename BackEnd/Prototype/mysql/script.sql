DROP SCHEMA IF EXISTS `cn_userdatabase`;
CREATE SCHEMA `cn_userdatabase`;

USE `cn_userdatabase`;
CREATE TABLE `user` (
    `iduser` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `isAdmin` TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY(`iduser`)
);

INSERT INTO `user` (`username`, `password`, `isAdmin`) VALUES ("admin", "admin", "1");
INSERT INTO `user` (`username`, `password`, `isAdmin`) VALUES ("testid", "testpw","0");

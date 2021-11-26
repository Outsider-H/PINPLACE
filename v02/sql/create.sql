DROP SCHEMA IF EXISTS `placeserv`;
CREATE DATABASE `placeserv`;
USE `placeserv`;

CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb3 NOT NULL,
  `password` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uimage` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '/assets/user1.svg',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `place` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `internal` varchar(16) CHARACTER SET utf8mb3 NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb3 NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `place_pop` (
  `daily` int(11) DEFAULT 0,
  `weekly` int(11) DEFAULT 0,
  `monthly` int(11) DEFAULT 0,
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`pid`),
  CONSTRAINT `place_pop_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `place` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `image` (
  `imageid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `path` varchar(256) CHARACTER SET utf8mb3 NOT NULL,
  PRIMARY KEY (`imageid`),
  KEY `image_ibfk_2` (`pid`),
  KEY `fk_image_1_idx` (`uid`),
  CONSTRAINT `fk_image_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `image_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `place` (`pid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;







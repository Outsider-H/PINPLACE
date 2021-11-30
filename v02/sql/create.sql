DROP SCHEMA IF EXISTS `placeserv`;
CREATE DATABASE `placeserv`;
USE `placeserv`;

CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb3 NOT NULL,
  `password` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uimage` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '/css/assets/user1.svg',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `place` (
  `pid` int(11) NOT NULL,
  `internal` varchar(16) CHARACTER SET utf8mb3 NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb3 NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `place_pop` (
  `daily` int(11) DEFAULT 0,
  `weekly` int(11) DEFAULT 0,
  `monthly` int(11) DEFAULT 0,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`pid`),
  CONSTRAINT `place_pop_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `place` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `image` (
  `imageid` int(11) NOT NULL auto_increment,
  `uid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `path` varchar(256) CHARACTER SET utf8mb3 NOT NULL,
  PRIMARY KEY (`imageid`),
  KEY `image_ibfk_2` (`pid`),
  KEY `fk_image_1_idx` (`uid`),
  CONSTRAINT `fk_image_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `image_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `place` (`pid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `place` (`pid`, `internal`, `name`) VALUES
(0,'ddp','Dongdaemun Design Plaza'),
(1,'gyeongui','Gyeongui Line Forest Park'),
(2,'naksan','Naksan Park'),
(3,'namsan','N Seoul Tower'),
(4,'hyundai','The Hyundai Seoul'),
(5,'myeongdong','Myeongdong Cathedral'),
(6,'ikseon','Ikseon-dong Hanok Village'),
(7,'jamsil','Lotte World Tower'),
(8,'sebit','Sebitseom'),
(9,'haebangchon','Haebangchon');

/*Random values*/
INSERT INTO `place_pop` (`daily`, `weekly`, `monthly`, `pid`) VALUES
(705,407,200,0),
(998,947,790,1),
(219,198,120,2),
(811,592,242,3),
(642,301,56,4),
(548,779,239,5),
(11,267,410,6),
(983,427,266,7),
(229,264,278,8),
(207,259,678,9);





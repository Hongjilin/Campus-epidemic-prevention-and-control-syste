/*
SQLyog Enterprise v12.08 (64 bit)
MySQL - 5.5.36 : Database - myschooldb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`myschooldb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `myschooldb`;

/*Table structure for table `grade` */

DROP TABLE IF EXISTS `grade`;

CREATE TABLE `grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `GradeName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `result` */

DROP TABLE IF EXISTS `result`;

CREATE TABLE `result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `StudentId` varchar(50) NOT NULL,
  `SubjectId` int(11) NOT NULL,
  `StudentResult` int(11) NOT NULL DEFAULT '0',
  `ExamDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SubjectId` (`SubjectId`),
  KEY `StudentId` (`StudentId`),
  CONSTRAINT `StudentId` FOREIGN KEY (`StudentId`) REFERENCES `student` (`StudentNo`),
  CONSTRAINT `SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subject` (`SubjectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `StudentNo` varchar(50) NOT NULL,
  `LoginPws` varchar(20) NOT NULL DEFAULT '888888',
  `StudentName` varchar(50) DEFAULT NULL,
  `Sex` char(2) NOT NULL,
  `GradeId` int(11) NOT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `BornDate` datetime DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`StudentNo`),
  KEY `GradeId1` (`GradeId`),
  CONSTRAINT `GradeId1` FOREIGN KEY (`GradeId`) REFERENCES `grade` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `subject` */

DROP TABLE IF EXISTS `subject`;

CREATE TABLE `subject` (
  `SubjectId` int(11) NOT NULL AUTO_INCREMENT,
  `SubjectName` varchar(20) NOT NULL,
  `ClassHour` int(11) NOT NULL DEFAULT '0',
  `GradeId` int(11) NOT NULL,
  PRIMARY KEY (`SubjectId`),
  KEY `GradeId` (`GradeId`),
  CONSTRAINT `GradeId` FOREIGN KEY (`GradeId`) REFERENCES `grade` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

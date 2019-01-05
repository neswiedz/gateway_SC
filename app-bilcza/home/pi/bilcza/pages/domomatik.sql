-- MySQL dump 10.9
--
-- Host: localhost    Database: domomatik
-- ------------------------------------------------------
-- Server version	4.1.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actor`
--

DROP TABLE IF EXISTS `actor`;
CREATE TABLE `actor` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `element_id` int(9) unsigned NOT NULL default '0',
  `room_id` int(9) unsigned NOT NULL default '0',
  `coords` varchar(45) collate utf8_polish_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `actor`
--

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES (1,'LAM_E',3,11,'730,270'),(2,'LAM_U',1,17,'300,310'),(3,'LAM_G',1,3,'666,410'),(4,'LAM_H',1,3,'738,581'),(5,'LAM_K',1,6,'522,624'),(6,'LAM_J',1,2,'699,775'),(7,'LAM_L',1,4,'389,423'),(8,'LAM_W',1,2,'764,837'),(9,'LAM_N',1,5,'368,670'),(10,'LAM_P',1,1,'518,812'),(11,'LAM_R',1,8,'367,809'),(12,'LAM_D',1,10,'116,270'),(13,'LAM_S',1,9,'540,900'),(14,'LAM_T',4,9,'179,900'),(15,'LAM_36',1,15,'390,534'),(16,'LAM_37',2,14,'650,537'),(17,'LAM_38',1,13,'684,244'),(18,'LAM_39',1,16,'527,354'),(19,'LAM_40',2,12,'415,120'),(20,'LAM_41',1,19,'540,660'),(21,'K2',11,4,NULL),(22,'K3',11,11,NULL),(23,'K4',11,2,''),(24,'K1',11,3,NULL),(25,'BRAMA_BRAZOWY',11,9,NULL),(26,'BRAMA_SZARY',11,9,NULL),(27,'BRAMA_CZARNY',11,9,NULL),(28,'OGROD_BRAZOWY',11,10,NULL),(29,'OGROD_SZARY',11,10,NULL),(30,'OGRÓD_CZARNY',11,10,NULL),(31,'ROL_TARAS',25,11,NULL),(32,'Rynny',20,9,'880,530'),(33,'S1',11,18,NULL),(34,'S2',11,12,NULL),(35,'S3',11,12,NULL),(36,'S4',11,13,NULL),(37,'S5',11,13,NULL),(38,'S6',11,14,NULL),(39,'S7',11,14,NULL),(40,'S8',11,14,NULL),(41,'S9',11,19,NULL);
/*!40000 ALTER TABLE `actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actor_status`
--

DROP TABLE IF EXISTS `actor_status`;
CREATE TABLE `actor_status` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `actor_id` int(9) unsigned NOT NULL default '0',
  `channel_id` int(5) unsigned NOT NULL default '0',
  `status` varchar(10) collate utf8_polish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `actor_status`
--

LOCK TABLES `actor_status` WRITE;
/*!40000 ALTER TABLE `actor_status` DISABLE KEYS */;
INSERT INTO `actor_status` VALUES (2,1,1,'255'),(3,2,1,'0'),(4,3,1,'0'),(5,4,1,'0'),(6,5,1,'0'),(7,6,1,'0'),(8,7,1,'0'),(9,8,1,'255'),(10,9,1,'0'),(11,10,1,'0'),(12,11,1,'0'),(13,12,1,'0'),(14,13,1,'0'),(15,14,1,'0'),(16,14,2,'0'),(17,15,1,'0'),(18,16,1,'0'),(19,16,2,'0'),(20,17,1,'0'),(21,18,1,'0'),(22,19,1,'0'),(23,19,2,'0'),(24,20,1,'0'),(25,21,1,'0'),(26,22,1,'0'),(27,23,1,'0'),(28,24,1,'0'),(29,25,1,'0'),(30,26,1,'255'),(31,27,1,'0'),(32,28,1,'0'),(33,29,1,'0'),(34,30,1,'0'),(35,31,1,'0'),(36,32,1,'0'),(37,33,1,'0'),(38,34,1,'0'),(39,35,1,'0'),(40,36,1,'0'),(41,37,1,'0'),(42,38,1,'0'),(43,39,1,'0'),(44,41,1,'0');
/*!40000 ALTER TABLE `actor_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connection`
--

DROP TABLE IF EXISTS `connection`;
CREATE TABLE `connection` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `device_id` int(9) unsigned NOT NULL default '0',
  `device_channel` int(5) unsigned NOT NULL default '0',
  `element_type` enum('ACTOR','SENSOR') collate utf8_polish_ci NOT NULL default 'ACTOR',
  `element_id` int(9) unsigned NOT NULL default '0',
  `element_channel` int(5) unsigned NOT NULL default '0',
  `connection_type` enum('NC','NO') collate utf8_polish_ci NOT NULL default 'NC',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `connection`
--

LOCK TABLES `connection` WRITE;
/*!40000 ALTER TABLE `connection` DISABLE KEYS */;
INSERT INTO `connection` VALUES (1,1,1,'ACTOR',21,1,'NC'),(2,1,2,'ACTOR',22,1,'NC'),(3,1,3,'ACTOR',23,1,'NC'),(4,1,4,'ACTOR',24,1,'NC'),(5,1,5,'ACTOR',25,1,'NC'),(6,1,6,'ACTOR',26,1,'NC'),(7,2,1,'ACTOR',27,1,'NC'),(8,2,2,'ACTOR',28,1,'NC'),(9,2,3,'ACTOR',29,1,'NC'),(10,2,4,'ACTOR',30,1,'NC'),(11,2,5,'ACTOR',14,1,'NC'),(12,2,6,'ACTOR',14,2,'NC'),(13,3,1,'ACTOR',12,1,'NC'),(14,3,2,'ACTOR',5,1,'NC'),(15,3,3,'ACTOR',7,1,'NC'),(16,3,4,'ACTOR',11,1,'NC'),(17,3,5,'ACTOR',1,1,'NC'),(18,3,6,'ACTOR',8,1,'NC'),(19,4,1,'ACTOR',6,1,'NC'),(20,4,2,'ACTOR',9,1,'NC'),(21,4,3,'ACTOR',2,1,'NC'),(22,4,4,'ACTOR',32,1,'NC'),(23,4,5,'ACTOR',13,1,'NC'),(24,4,6,'ACTOR',10,1,'NC'),(25,5,1,'ACTOR',31,1,'NC'),(26,6,1,'ACTOR',3,1,'NC'),(27,7,1,'ACTOR',4,1,'NC'),(28,9,1,'SENSOR',13,1,'NC'),(29,9,2,'SENSOR',13,2,'NC'),(30,9,3,'SENSOR',12,1,'NC'),(31,9,4,'SENSOR',12,2,'NC'),(32,9,5,'SENSOR',11,1,'NC'),(33,9,6,'SENSOR',11,2,'NC'),(34,10,1,'SENSOR',14,1,'NC'),(35,10,2,'SENSOR',14,2,'NC'),(36,10,3,'SENSOR',9,1,'NC'),(37,10,4,'SENSOR',8,1,'NC'),(38,10,5,'SENSOR',9,2,'NC'),(39,10,6,'SENSOR',16,1,'NC'),(40,11,1,'SENSOR',2,1,'NC'),(41,11,2,'SENSOR',2,2,'NC'),(42,11,3,'SENSOR',1,1,'NC'),(43,11,4,'SENSOR',1,2,'NC'),(44,11,5,'SENSOR',1,3,'NC'),(45,11,6,'SENSOR',3,1,'NC'),(46,12,1,'SENSOR',18,1,'NC'),(47,12,2,'SENSOR',18,2,'NC'),(48,12,3,'SENSOR',15,1,'NC'),(49,12,4,'SENSOR',15,2,'NC'),(50,12,5,'SENSOR',15,3,'NC'),(51,12,6,'SENSOR',25,1,'NC'),(52,13,1,'SENSOR',4,1,'NC'),(53,13,2,'SENSOR',5,1,'NC'),(54,13,3,'SENSOR',17,1,'NC'),(55,14,2,'SENSOR',6,1,'NC'),(56,14,3,'SENSOR',7,1,'NC'),(57,14,4,'SENSOR',7,2,'NC'),(58,14,5,'SENSOR',10,1,'NC'),(59,16,1,'ACTOR',19,1,'NC'),(60,16,2,'ACTOR',19,2,'NC'),(61,16,3,'ACTOR',16,1,'NC'),(62,16,4,'ACTOR',18,1,'NC'),(63,16,5,'ACTOR',16,2,'NC'),(64,16,6,'ACTOR',17,1,'NC'),(65,17,1,'ACTOR',15,1,'NC'),(66,17,2,'ACTOR',20,1,'NC'),(81,19,6,'SENSOR',20,2,'NC'),(80,19,5,'SENSOR',20,1,'NC'),(79,19,4,'SENSOR',23,2,'NC'),(78,19,3,'SENSOR',23,1,'NC'),(77,19,2,'SENSOR',21,2,'NC'),(76,19,1,'SENSOR',21,1,'NC'),(73,20,1,'SENSOR',22,1,'NC'),(74,20,2,'SENSOR',19,1,'NC'),(75,20,3,'SENSOR',24,1,'NC');
/*!40000 ALTER TABLE `connection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
CREATE TABLE `device` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `device_type_id` int(9) unsigned NOT NULL default '0',
  `description` varchar(16) collate utf8_polish_ci NOT NULL default '',
  `group_id` int(3) unsigned NOT NULL default '0',
  `item_id` int(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,3,'T1.1.1',1,1),(2,3,'T1.1.2',1,2),(3,3,'T1.1.3',1,3),(4,3,'T1.1.4',1,4),(5,6,'T1.2.3',2,3),(6,8,'T1.2.4',2,4),(7,8,'T1.2.5',2,5),(8,17,'Sypialnia IT',3,1),(9,1,'T1.4.1',4,1),(10,1,'T1.4.2',4,2),(11,1,'T1.4.3',4,3),(12,1,'T1.4.4',4,4),(13,1,'T1.4.5',4,5),(14,1,'T1.4.6',4,6),(15,6,'T1.4.7',4,7),(16,3,'T2.1.1',5,1),(17,3,'T2.1.2',5,2),(18,3,'T2.3.1',6,1),(19,1,'T2.3.2',6,2),(20,1,'T.2.3',6,3);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_action`
--

DROP TABLE IF EXISTS `device_action`;
CREATE TABLE `device_action` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `device_id` int(9) unsigned NOT NULL default '0',
  `trigger_id` int(9) unsigned NOT NULL default '0',
  `trigger_type` enum('ACTOR','SENSOR') collate utf8_polish_ci NOT NULL default 'ACTOR',
  `channel_id` int(5) unsigned NOT NULL default '0',
  `delay` int(5) unsigned NOT NULL default '0',
  `action_id` int(5) unsigned NOT NULL default '0',
  `action_params` varchar(255) collate utf8_polish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `device_action`
--

LOCK TABLES `device_action` WRITE;
/*!40000 ALTER TABLE `device_action` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_info`
--

DROP TABLE IF EXISTS `device_info`;
CREATE TABLE `device_info` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `device_id` int(9) unsigned NOT NULL default '0',
  `device_attribute` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `device_value` varchar(255) collate utf8_polish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=141 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `device_info`
--

LOCK TABLES `device_info` WRITE;
/*!40000 ALTER TABLE `device_info` DISABLE KEYS */;
INSERT INTO `device_info` VALUES (1,1,'TYPE','0x3000'),(2,1,'FIRMWARE','1.0.2.1'),(3,1,'BOOTLOADER','2.6'),(4,1,'UNIV_VERSION','1.0 rev.9'),(5,1,'DESCRIPTION','przekaznik M 6ch'),(6,1,'PROCESSOR_ID','0000020a'),(7,1,'VOLTAGE','11.5679374389052'),(8,2,'TYPE',''),(9,2,'FIRMWARE',''),(10,2,'BOOTLOADER',''),(11,2,'UNIV_VERSION',''),(12,2,'DESCRIPTION',''),(13,2,'PROCESSOR_ID',''),(14,2,'VOLTAGE',''),(15,3,'TYPE','0x3000'),(16,3,'FIRMWARE','1.0.2.1'),(17,3,'BOOTLOADER','2.6'),(18,3,'UNIV_VERSION','1.0 rev.9'),(19,3,'DESCRIPTION','przekaznik M 6ch'),(20,3,'PROCESSOR_ID','0000020a'),(21,3,'VOLTAGE','11.5679374389052'),(22,4,'TYPE',''),(23,4,'FIRMWARE',''),(24,4,'BOOTLOADER',''),(25,4,'UNIV_VERSION',''),(26,4,'DESCRIPTION',''),(27,4,'PROCESSOR_ID',''),(28,4,'VOLTAGE',''),(29,5,'TYPE',''),(30,5,'FIRMWARE',''),(31,5,'BOOTLOADER',''),(32,5,'UNIV_VERSION',''),(33,5,'DESCRIPTION',''),(34,5,'PROCESSOR_ID',''),(35,5,'VOLTAGE',''),(36,6,'TYPE',''),(37,6,'FIRMWARE',''),(38,6,'BOOTLOADER',''),(39,6,'UNIV_VERSION',''),(40,6,'DESCRIPTION',''),(41,6,'PROCESSOR_ID',''),(42,6,'VOLTAGE',''),(43,7,'TYPE',''),(44,7,'FIRMWARE',''),(45,7,'BOOTLOADER',''),(46,7,'UNIV_VERSION',''),(47,7,'DESCRIPTION',''),(48,7,'PROCESSOR_ID',''),(49,7,'VOLTAGE',''),(50,8,'TYPE','0x3000'),(51,8,'FIRMWARE','1.0.3.0'),(52,8,'BOOTLOADER','2.6'),(53,8,'UNIV_VERSION','1.0 rev.9'),(54,8,'DESCRIPTION','IR-odbiornik\0\0\0\0'),(55,8,'PROCESSOR_ID','000001d6'),(56,8,'VOLTAGE','11.3294232649071'),(57,9,'TYPE','0x3000'),(58,9,'FIRMWARE','1.0.1.0'),(59,9,'BOOTLOADER','2.6'),(60,9,'UNIV_VERSION','1.0 rev.9'),(61,9,'DESCRIPTION','Przycisk-6\0\0\0\0\0\0'),(62,9,'PROCESSOR_ID','000001da'),(63,9,'VOLTAGE','11.2399804496579'),(64,10,'TYPE',''),(65,10,'FIRMWARE',''),(66,10,'BOOTLOADER',''),(67,10,'UNIV_VERSION',''),(68,10,'DESCRIPTION',''),(69,10,'PROCESSOR_ID',''),(70,10,'VOLTAGE',''),(71,11,'TYPE',''),(72,11,'FIRMWARE',''),(73,11,'BOOTLOADER',''),(74,11,'UNIV_VERSION',''),(75,11,'DESCRIPTION',''),(76,11,'PROCESSOR_ID',''),(77,11,'VOLTAGE',''),(78,12,'TYPE',''),(79,12,'FIRMWARE',''),(80,12,'BOOTLOADER',''),(81,12,'UNIV_VERSION',''),(82,12,'DESCRIPTION',''),(83,12,'PROCESSOR_ID',''),(84,12,'VOLTAGE',''),(85,13,'TYPE',''),(86,13,'FIRMWARE',''),(87,13,'BOOTLOADER',''),(88,13,'UNIV_VERSION',''),(89,13,'DESCRIPTION',''),(90,13,'PROCESSOR_ID',''),(91,13,'VOLTAGE',''),(92,14,'TYPE',''),(93,14,'FIRMWARE',''),(94,14,'BOOTLOADER',''),(95,14,'UNIV_VERSION',''),(96,14,'DESCRIPTION',''),(97,14,'PROCESSOR_ID',''),(98,14,'VOLTAGE',''),(99,15,'TYPE',''),(100,15,'FIRMWARE',''),(101,15,'BOOTLOADER',''),(102,15,'UNIV_VERSION',''),(103,15,'DESCRIPTION',''),(104,15,'PROCESSOR_ID',''),(105,15,'VOLTAGE',''),(106,16,'TYPE',''),(107,16,'FIRMWARE',''),(108,16,'BOOTLOADER',''),(109,16,'UNIV_VERSION',''),(110,16,'DESCRIPTION',''),(111,16,'PROCESSOR_ID',''),(112,16,'VOLTAGE',''),(113,17,'TYPE',''),(114,17,'FIRMWARE',''),(115,17,'BOOTLOADER',''),(116,17,'UNIV_VERSION',''),(117,17,'DESCRIPTION',''),(118,17,'PROCESSOR_ID',''),(119,17,'VOLTAGE',''),(120,18,'TYPE',''),(121,18,'FIRMWARE',''),(122,18,'BOOTLOADER',''),(123,18,'UNIV_VERSION',''),(124,18,'DESCRIPTION',''),(125,18,'PROCESSOR_ID',''),(126,18,'VOLTAGE',''),(127,19,'TYPE',''),(128,19,'FIRMWARE',''),(129,19,'BOOTLOADER',''),(130,19,'UNIV_VERSION',''),(131,19,'DESCRIPTION',''),(132,19,'PROCESSOR_ID',''),(133,19,'VOLTAGE',''),(134,20,'TYPE',''),(135,20,'FIRMWARE',''),(136,20,'BOOTLOADER',''),(137,20,'UNIV_VERSION',''),(138,20,'DESCRIPTION',''),(139,20,'PROCESSOR_ID',''),(140,20,'VOLTAGE','');
/*!40000 ALTER TABLE `device_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_schedule`
--

DROP TABLE IF EXISTS `device_schedule`;
CREATE TABLE `device_schedule` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `device_id` int(9) unsigned NOT NULL default '0',
  `start_at` int(9) unsigned NOT NULL default '0',
  `code` varchar(16) collate utf8_polish_ci NOT NULL default '',
  `status` enum('DONE','WAITING') collate utf8_polish_ci NOT NULL default 'WAITING',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `device_schedule`
--

LOCK TABLES `device_schedule` WRITE;
/*!40000 ALTER TABLE `device_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_status`
--

DROP TABLE IF EXISTS `device_status`;
CREATE TABLE `device_status` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `device_id` int(9) unsigned NOT NULL default '0',
  `channel_id` int(5) unsigned NOT NULL default '0',
  `status` varchar(10) collate utf8_polish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `device_status`
--

LOCK TABLES `device_status` WRITE;
/*!40000 ALTER TABLE `device_status` DISABLE KEYS */;
INSERT INTO `device_status` VALUES (1,1,1,'0'),(2,1,2,'0'),(3,1,3,'0'),(4,1,4,'0'),(5,1,5,'0'),(6,1,6,'255'),(7,2,1,'0'),(8,2,2,'0'),(9,2,3,'0'),(10,2,4,'0'),(11,2,5,'0'),(12,2,6,'0'),(13,3,1,'0'),(14,3,2,'0'),(15,3,3,'0'),(16,3,4,'0'),(17,3,5,'255'),(18,3,6,'255'),(19,4,1,'0'),(20,4,2,'0'),(21,4,3,'0'),(22,4,4,'0'),(23,4,5,'0'),(24,4,6,'0'),(25,5,1,'0'),(26,5,2,'0'),(27,5,3,'0'),(28,5,4,'0'),(29,6,1,'0'),(30,7,1,'0'),(31,8,1,'0'),(32,9,1,'0'),(33,9,2,'0'),(34,9,3,'0'),(35,9,4,'0'),(36,9,5,'255'),(37,9,6,'255'),(38,10,1,'0'),(39,10,2,'0'),(40,10,3,'0'),(41,10,4,'0'),(42,10,5,'0'),(43,10,6,'0'),(44,11,1,'0'),(45,11,2,'0'),(46,11,3,'0'),(47,11,4,'0'),(48,11,5,'0'),(49,11,6,'0'),(50,12,1,'0'),(51,12,2,'0'),(52,12,3,'0'),(53,12,4,'0'),(54,12,5,'0'),(55,12,6,'0'),(56,13,1,'0'),(57,13,2,'0'),(58,13,3,'0'),(59,13,4,'0'),(60,13,5,'0'),(61,13,6,'0'),(62,14,1,'0'),(63,14,2,'0'),(64,14,3,'0'),(65,14,4,'0'),(66,14,5,'0'),(67,14,6,'0'),(68,15,1,'0'),(69,15,2,'0'),(70,15,3,'0'),(71,15,4,'0'),(72,16,1,'0'),(73,16,2,'0'),(74,16,3,'0'),(75,16,4,'0'),(76,16,5,'0'),(77,16,6,'0'),(78,17,1,'0'),(79,17,2,'0'),(80,17,3,'0'),(81,17,4,'0'),(82,17,5,'0'),(83,17,6,'0'),(84,18,1,'0'),(85,18,2,'0'),(86,18,3,'0'),(87,18,4,'0'),(88,18,5,'0'),(89,18,6,'0'),(90,19,1,'0'),(91,19,2,'0'),(92,19,3,'0'),(93,19,4,'0'),(94,19,5,'0'),(95,19,6,'0'),(96,20,1,'0'),(97,20,2,'0'),(98,20,3,'0'),(99,20,4,'0'),(100,20,5,'0'),(101,20,6,'0');
/*!40000 ALTER TABLE `device_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_type`
--

DROP TABLE IF EXISTS `device_type`;
CREATE TABLE `device_type` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `icon` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `channels` int(5) unsigned NOT NULL default '0',
  `type` enum('ACTOR','SENSOR','LOGIC') collate utf8_polish_ci NOT NULL default 'ACTOR',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `device_type`
--

LOCK TABLES `device_type` WRITE;
/*!40000 ALTER TABLE `device_type` DISABLE KEYS */;
INSERT INTO `device_type` VALUES (1,'BUTTON 3CH DIN','mod_wej3ch_din',6,'SENSOR'),(2,'RELAY 2CH 230V DIN','mod_wyj2ch_din',2,'ACTOR'),(3,'RELAY 6CH 230V DIN','mod_wyj6ch_din',6,'ACTOR'),(4,'RELAY 6CH 10V DIN','mod_wyj6ch_10_din',6,'ACTOR'),(5,'IT IR DIN','mod_it_ir_din',1,'SENSOR'),(6,'BLIND 4CH DIN','mod_blind_din',4,'ACTOR'),(7,'TEMPERATURE DIN','mod_temp_din',1,'SENSOR'),(8,'DIMMER DIN','mod_dimmer_din',1,'ACTOR'),(9,'MOD_WWW DIN','mod_www_din',1,'LOGIC'),(10,'MOD_GSM DIN','mod_gsm_din',1,'LOGIC'),(11,'BUTTON 8CH KM','mod_wej8ch_km',8,'SENSOR'),(12,'RELAY 1CH 230V KM','mod_wyj_km',1,'ACTOR'),(13,'RELAY 2CH 230V KM','mod_wyj2ch_km',2,'ACTOR'),(14,'RELAY 1CH 10V KM','mod_wyj_10_km',1,'ACTOR'),(15,'RELAY 2CH 10V KM','mod_wyj2ch_10_km',2,'ACTOR'),(16,'TEMPERATURE KM','mod_temp_km',1,'SENSOR'),(17,'IT IR KM','mod_it_ir_km',1,'SENSOR');
/*!40000 ALTER TABLE `device_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `element`
--

DROP TABLE IF EXISTS `element`;
CREATE TABLE `element` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `type` enum('ACTOR','SENSOR') collate utf8_polish_ci NOT NULL default 'ACTOR',
  `icon` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `channels` int(3) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `element`
--

LOCK TABLES `element` WRITE;
/*!40000 ALTER TABLE `element` DISABLE KEYS */;
INSERT INTO `element` VALUES (1,'Lampa sufitowa 1CH','ACTOR','actor_lamp_suf_1',1),(2,'Lampa sufitowa 2CH','ACTOR','actor_lamp_suf_2',2),(3,'Kinkiet 1CH','ACTOR','actor_lamp_kin_1',1),(4,'Kinkiet 2CH','ACTOR','actor_lamp_kin_2',2),(5,'Lampa stojąca 1CH','ACTOR','actor_lamp_sto_1',1),(6,'Lampa stojąca 2CH','ACTOR','actor_lamp_sto_2',2),(7,'Lampa RGB','ACTOR','actor_lamp_rgb',1),(8,'Lampa R','ACTOR','actor_lamp_r',1),(9,'Lampa G','ACTOR','actor_lamp_g',1),(10,'Lampa B','ACTOR','actor_lamp_b',1),(11,'Kontakt 1CH','ACTOR','actor_kontakt_1',1),(12,'Kontakt 2CH','ACTOR','actor_kontakt_2',2),(13,'Telewizor','ACTOR','actor_telewizor',1),(14,'Odtwarzacz video','ACTOR','actor_video',1),(15,'Wieża Hi-Fi','ACTOR','actor_radio',1),(16,'Sprzet audio-video','ACTOR','actor_sprzet_hifi',1),(17,'Kamera','ACTOR','actor_kamera',1),(18,'Wentylator','ACTOR','actor_wentylator',1),(19,'Klimatyzator','ACTOR','actor_klimatyzator',1),(20,'Kaloryfer','ACTOR','actor_kaloryfer',1),(21,'Piec grzewczy','ACTOR','actor_piec',1),(22,'Zawór ciepła','ACTOR','actor_zawor',1),(23,'Pompa','ACTOR','actor_pompa',1),(24,'Markiza','ACTOR','actor_markiza',1),(25,'Rolety','ACTOR','actor_rolety',1),(26,'Żaluzje','ACTOR','actor_zaluzje',1),(27,'Zraszacz','ACTOR','actor_zraszacz',1),(28,'Brama garażowa','ACTOR','actor_brama_garazowa',1),(29,'Brama skrzydłowa','ACTOR','actor_brama_skrzydlowa',1),(30,'Brama suwana','ACTOR','actor_brama_suwana',1),(31,'Włącznik 1CH','SENSOR','sensor_wlacz_1ch',1),(32,'Włącznik 2CH','SENSOR','sensor_wlacz_2ch',2),(33,'Włącznik 3CH','SENSOR','sensor_wlacz_3ch',3),(34,'Włącznik regulowany','SENSOR','sensor_wlacz_regul',1),(35,'Czujnik ruchu','SENSOR','sensor_czuj_ruchu',1),(36,'Czujnik dymu','SENSOR','sensor_czuj_dymu',1),(37,'Czujnik gazu','SENSOR','sensor_czuj_gazu',1),(38,'Czujnik zalania','SENSOR','sensor_czuj_zalania',1),(39,'Czujnik temperatory','SENSOR','sensor_czuj_temp',1),(40,'Alarm centrala','SENSOR','sensor_alarm',1),(41,'Alarm manipulator','SENSOR','sensor_alarm_klaw',1),(42,'Czytnik kart','SENSOR','sensor_alarm_czytnik',1),(43,'Odbiornik podczerwieni','SENSOR','sensor_odbiornik_it',1);
/*!40000 ALTER TABLE `element` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_room`
--

DROP TABLE IF EXISTS `group_room`;
CREATE TABLE `group_room` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `item_order` int(9) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `group_room`
--

LOCK TABLES `group_room` WRITE;
/*!40000 ALTER TABLE `group_room` DISABLE KEYS */;
INSERT INTO `group_room` VALUES (1,'Parter',1),(2,'I piętro',2),(3,'Na zewnątrz',3);
/*!40000 ALTER TABLE `group_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `icon` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `group_id` int(9) unsigned NOT NULL default '0',
  `group_order` int(9) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Wiatrołap','room_korytarz',1,1),(2,'Kuchnia','room_kuchnia',1,2),(3,'Salon','room_salon',1,3),(4,'Sypialnia','room_sypialnia',1,4),(5,'Łazienka','room_lazienka',1,5),(6,'Korytarz','room_korytarz',1,6),(7,'Garaż','room_garaz',1,7),(8,'Pomieszczenie gospodarcze','room_inne',1,8),(9,'Ogród przed domem','room_ogrod',3,1),(10,'Ogród za domem','room_ogrod',3,2),(11,'Taras','room_balkon',3,3),(12,'Mała sypialnia','room_sypialnia',2,1),(13,'Duża sypialnia','room_sypialnia',2,2),(14,'Sypialnia rodziców','room_salon',2,3),(15,'Łazienka','room_lazienka',2,4),(16,'Korytarz','room_korytarz',2,5),(17,'Schody','room_inne',2,6),(18,'Schowek','room_inne',2,7),(19,'Balkon południowy','room_balkon',2,8);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor`
--

DROP TABLE IF EXISTS `sensor`;
CREATE TABLE `sensor` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `element_id` int(9) unsigned NOT NULL default '0',
  `room_id` int(9) unsigned NOT NULL default '0',
  `coords` varchar(45) collate utf8_polish_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `sensor`
--

LOCK TABLES `sensor` WRITE;
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;
INSERT INTO `sensor` VALUES (1,'KL001',33,1,NULL),(2,'KL002',32,1,NULL),(3,'KL003',31,1,NULL),(4,'KL004',31,1,NULL),(5,'KL005',31,8,NULL),(6,'KL006',31,5,NULL),(7,'KL007',32,6,NULL),(8,'KL008',31,3,NULL),(9,'KL008a',34,3,NULL),(10,'KL009',31,3,NULL),(11,'KL010',34,3,NULL),(12,'KL011',32,3,NULL),(13,'KL012',34,3,NULL),(14,'KL013',32,3,NULL),(15,'KL013a',33,3,NULL),(16,'KL015',31,4,NULL),(17,'KL016',31,4,NULL),(18,'KL024',32,2,NULL),(19,'KL030',31,6,NULL),(20,'KL031',32,15,NULL),(21,'KL032',32,14,NULL),(22,'KL033',31,13,NULL),(23,'KL034',32,12,NULL),(24,'KL035',31,14,NULL),(25,'KL_KOT',31,7,NULL);
/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_status`
--

DROP TABLE IF EXISTS `sensor_status`;
CREATE TABLE `sensor_status` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `sensor_id` int(9) unsigned NOT NULL default '0',
  `channel_id` int(5) unsigned NOT NULL default '0',
  `status` varchar(10) collate utf8_polish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `sensor_status`
--

LOCK TABLES `sensor_status` WRITE;
/*!40000 ALTER TABLE `sensor_status` DISABLE KEYS */;
INSERT INTO `sensor_status` VALUES (1,1,1,'0'),(2,1,2,'0'),(3,1,3,'0'),(4,2,1,'0'),(5,2,2,'0'),(6,3,1,'0'),(7,4,1,'0'),(8,5,1,'0'),(9,6,1,'0'),(10,7,1,'0'),(11,7,2,'0'),(12,8,1,'0'),(13,9,1,'0'),(14,10,1,'0'),(15,11,1,'255'),(16,12,1,'0'),(17,12,2,'0'),(18,13,1,'0'),(19,14,1,'0'),(20,14,2,'0'),(21,15,1,'0'),(22,15,2,'0'),(23,15,3,'0'),(24,16,1,'0'),(25,17,1,'0'),(26,18,1,'0'),(27,18,2,'0'),(28,19,1,'0'),(29,20,1,'0'),(30,20,2,'0'),(31,21,1,'0'),(32,21,2,'0'),(33,22,1,'0'),(34,23,1,'0'),(35,23,2,'0'),(36,24,1,'0'),(37,25,1,'0');
/*!40000 ALTER TABLE `sensor_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `name` varchar(255) collate utf8_polish_ci NOT NULL default '',
  `value` varchar(255) collate utf8_polish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(9) unsigned NOT NULL auto_increment,
  `login` varchar(45) collate utf8_polish_ci NOT NULL default '',
  `password` varchar(45) collate utf8_polish_ci NOT NULL default '',
  `username` varchar(255) collate utf8_polish_ci NOT NULL default '',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'domomatik','13e6d8687650dfcc4f1ea9bdc90507f1','Domomatik - konto Super'),(2,'admin','13e6d8687650dfcc4f1ea9bdc90507f1','Administrator');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


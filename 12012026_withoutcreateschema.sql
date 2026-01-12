-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: 3imedtech_production
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `about_content`
--

DROP TABLE IF EXISTS `about_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `button_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_content`
--

LOCK TABLES `about_content` WRITE;
/*!40000 ALTER TABLE `about_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_hero`
--

DROP TABLE IF EXISTS `about_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `background_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_hero`
--

LOCK TABLES `about_hero` WRITE;
/*!40000 ALTER TABLE `about_hero` DISABLE KEYS */;
INSERT INTO `about_hero` VALUES (1,'About 3i Medical Technologies','3i Med Tech is an esteemed player in the medical devices industry with a core competency in the manufacturing of sophisticated diagnostic imaging equipment such as Digital X-rays, MRI machines, Digital C-arm.','/uploads/images/image-1766928209065-528554872.jpg',1,'2025-12-28 09:00:49','2025-12-30 11:49:20',0,NULL);
/*!40000 ALTER TABLE `about_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_journey`
--

DROP TABLE IF EXISTS `about_journey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_journey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `image` text COLLATE utf8mb4_unicode_ci,
  `images` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_journey`
--

LOCK TABLES `about_journey` WRITE;
/*!40000 ALTER TABLE `about_journey` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_journey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_redefining_healthcare`
--

DROP TABLE IF EXISTS `about_redefining_healthcare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_redefining_healthcare` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `button_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_redefining_healthcare`
--

LOCK TABLES `about_redefining_healthcare` WRITE;
/*!40000 ALTER TABLE `about_redefining_healthcare` DISABLE KEYS */;
INSERT INTO `about_redefining_healthcare` VALUES (1,'Redefining Healthcare Through Innovation','[\"3i Medical Technologies is a leading provider of advanced diagnostic imaging solutions, dedicated to improving healthcare accessibility and quality. With a strong emphasis on cost-effective innovation, we offer a comprehensive range of products, including X-ray systems, digital radiography, C-arms, mammography equipment, and pre-owned MRI scanners.\"]','Download Our Brochure','/uploads/documents/document-1766928371664-65454259.pdf','fa fa-2x fa-cloud-download',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 13:43:58');
/*!40000 ALTER TABLE `about_redefining_healthcare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_refex_group`
--

DROP TABLE IF EXISTS `about_refex_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_refex_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_paragraph1` text COLLATE utf8mb4_unicode_ci,
  `description_paragraph2` text COLLATE utf8mb4_unicode_ci,
  `button_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_refex_group`
--

LOCK TABLES `about_refex_group` WRITE;
/*!40000 ALTER TABLE `about_refex_group` DISABLE KEYS */;
INSERT INTO `about_refex_group` VALUES (1,'Explore Refex Group','[\"3i MedTech, part of the Refex Group, is rapidly emerging as one of India’s leading MedTech companies. With ambitious growth strategies, the company has strengthened its position in the diagnostic imaging sector through the acquisition of Cura and Adonis Medical Systems—both highly reputed companies with over two decades of expertise.\\n\",\"Refex Group is among the leading business conglomerates of India and it has expanded during the past 2 decades of its operation across multiple business verticals – Renewables (Solar IPP), Chemicals (refilling of environment friendly refrigerant gases), Medical Technologies (manufacturing Digital X-rays, Flat Panel Detectors, and refurbishing MRI machines), Pharma (API manufacturing pertaining to the Central Nervous System), Green Mobility (offering 4 wheeler EV as a technology backed service), Ash handling (mitigating environmental pollution from the thermal power plants by handling the ash), and Airport operations among other such business verticals.\"]','','Explore Refex Group','https://www.refex.group',1,0,NULL,'2025-12-28 09:00:49','2025-12-30 12:19:44');
/*!40000 ALTER TABLE `about_refex_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_sections`
--

DROP TABLE IF EXISTS `about_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_sections`
--

LOCK TABLES `about_sections` WRITE;
/*!40000 ALTER TABLE `about_sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `about_vision_mission`
--

DROP TABLE IF EXISTS `about_vision_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_vision_mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vision_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vision_description` text COLLATE utf8mb4_unicode_ci,
  `vision_image` text COLLATE utf8mb4_unicode_ci,
  `mission_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mission_image` text COLLATE utf8mb4_unicode_ci,
  `mission_points_json` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_vision_mission`
--

LOCK TABLES `about_vision_mission` WRITE;
/*!40000 ALTER TABLE `about_vision_mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `about_vision_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capabilities_facility`
--

DROP TABLE IF EXISTS `capabilities_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capabilities_facility` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `established` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `capabilities` json DEFAULT NULL,
  `approvals` json DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capabilities_facility`
--

LOCK TABLES `capabilities_facility` WRITE;
/*!40000 ALTER TABLE `capabilities_facility` DISABLE KEYS */;
/*!40000 ALTER TABLE `capabilities_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capabilities_hero`
--

DROP TABLE IF EXISTS `capabilities_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capabilities_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sub_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `background_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capabilities_hero`
--

LOCK TABLES `capabilities_hero` WRITE;
/*!40000 ALTER TABLE `capabilities_hero` DISABLE KEYS */;
/*!40000 ALTER TABLE `capabilities_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capabilities_research`
--

DROP TABLE IF EXISTS `capabilities_research`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capabilities_research` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `api_card` json DEFAULT NULL,
  `fdf_card` json DEFAULT NULL,
  `promise` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capabilities_research`
--

LOCK TABLES `capabilities_research` WRITE;
/*!40000 ALTER TABLE `capabilities_research` DISABLE KEYS */;
/*!40000 ALTER TABLE `capabilities_research` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_form`
--

DROP TABLE IF EXISTS `contact_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_form`
--

LOCK TABLES `contact_form` WRITE;
/*!40000 ALTER TABLE `contact_form` DISABLE KEYS */;
INSERT INTO `contact_form` VALUES (1,'Get in Touch','Fill out the form below and we\'ll get back to you as soon as possible.',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `contact_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_hero`
--

DROP TABLE IF EXISTS `contact_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_hero`
--

LOCK TABLES `contact_hero` WRITE;
/*!40000 ALTER TABLE `contact_hero` DISABLE KEYS */;
INSERT INTO `contact_hero` VALUES (1,'Contact Us',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `contact_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_info`
--

DROP TABLE IF EXISTS `contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `info_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_info`
--

LOCK TABLES `contact_info` WRITE;
/*!40000 ALTER TABLE `contact_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_info_card`
--

DROP TABLE IF EXISTS `contact_info_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_info_card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_info_card`
--

LOCK TABLES `contact_info_card` WRITE;
/*!40000 ALTER TABLE `contact_info_card` DISABLE KEYS */;
INSERT INTO `contact_info_card` VALUES (1,'registered-office','ri-map-pin-line','Registered Office','Second Floor, Refex Towers, Sterling Road Signal, 313, Valluvar Kottam High Road, Nungambakkam, Chennai – 600034, Tamil Nadu','https://maps.google.com',1,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(2,'corporate-office','ri-building-line','Corporate Office','Refex Building, 67, Bazullah Road, Parthasarathy Puram, T Nagar, Chennai – 600017','https://maps.google.com',2,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(3,'phone','ri-phone-line','Phone','+91 94440 26307','tel:+919444026307',3,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(4,'email','ri-mail-line','Email','info@3imedtech.com','mailto:info@3imedtech.com',4,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `contact_info_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_map`
--

DROP TABLE IF EXISTS `contact_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `map_url` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_map`
--

LOCK TABLES `contact_map` WRITE;
/*!40000 ALTER TABLE `contact_map` DISABLE KEYS */;
INSERT INTO `contact_map` VALUES (1,'https://www.google.com/maps/embed?pb=...',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `contact_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_solutions`
--

DROP TABLE IF EXISTS `digital_solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_solutions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_solutions`
--

LOCK TABLES `digital_solutions` WRITE;
/*!40000 ALTER TABLE `digital_solutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `digital_solutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_settings`
--

DROP TABLE IF EXISTS `email_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `smtp_host` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtp_port` int DEFAULT NULL,
  `smtp_secure` tinyint(1) NOT NULL DEFAULT '1',
  `smtp_user` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtp_password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `from_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_settings`
--

LOCK TABLES `email_settings` WRITE;
/*!40000 ALTER TABLE `email_settings` DISABLE KEYS */;
INSERT INTO `email_settings` VALUES (1,'smtp.gmail.com',587,0,'sivagami.n@refex.co.in','iwxzlygzarwaqzlc','sivagami.n@refex.co.in','3i MedTech','sivagami.n@refex.co.in',1,'2025-12-29 05:47:29','2025-12-29 05:47:29');
/*!40000 ALTER TABLE `email_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flat_panel_hero`
--

DROP TABLE IF EXISTS `flat_panel_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flat_panel_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flat_panel_hero`
--

LOCK TABLES `flat_panel_hero` WRITE;
/*!40000 ALTER TABLE `flat_panel_hero` DISABLE KEYS */;
INSERT INTO `flat_panel_hero` VALUES (1,'Flat Panel Detectors',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `flat_panel_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flat_panel_products`
--

DROP TABLE IF EXISTS `flat_panel_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flat_panel_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` text COLLATE utf8mb4_unicode_ci,
  `features` text COLLATE utf8mb4_unicode_ci,
  `benefits` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'left',
  `background_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'from-gray-50 to-white',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flat_panel_products`
--

LOCK TABLES `flat_panel_products` WRITE;
/*!40000 ALTER TABLE `flat_panel_products` DISABLE KEYS */;
INSERT INTO `flat_panel_products` VALUES (2,'Glass-Free Flat Panel Detector','The new generation glass-free flat panel detector offers high DQE for excellent image quality with robust construction designed to handle up to 150 kg.','[\"17″×17″ and 14″×17″ sizes available\",\"Wired and wireless CSI Technology\",\"Unprecedented weight of 3 kg\",\"Advanced software technology for easy deployment\"]','Provides unmatched image quality and durability, ideal for a wide range of clinical applications.','/uploads/images/image-1766988441640-59480045.jpg','glassfreeflatpaneldetector','left','from-gray-50 to-white',1,1,0,NULL,'2025-12-28 15:57:00','2025-12-29 06:07:24'),(3,'Retrofit Mammography Panel','This slim cassette-type digital mammography upgrade solution is designed by radiologists to provide an optimal user experience.','[\"18×24 cm and 24×30 cm sizes available\",\"76-micron pixel size for excellent image quality\",\"High DQE/low noise\",\"Mobile application for easy use\"]','Offers a cost-effective solution for upgrading existing mammography systems to digital without the need for a complete overhaul.','/uploads/images/image-1766988462630-594165655.jpg','retrofitmammographypanel','right','from-white to-gray-50',2,1,0,NULL,'2025-12-28 15:57:00','2025-12-29 06:07:45');
/*!40000 ALTER TABLE `flat_panel_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fpd_carm_content`
--

DROP TABLE IF EXISTS `fpd_carm_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fpd_carm_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `overview` text COLLATE utf8mb4_unicode_ci,
  `features` text COLLATE utf8mb4_unicode_ci,
  `benefits` text COLLATE utf8mb4_unicode_ci,
  `product_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fpd_carm_content`
--

LOCK TABLES `fpd_carm_content` WRITE;
/*!40000 ALTER TABLE `fpd_carm_content` DISABLE KEYS */;
INSERT INTO `fpd_carm_content` VALUES (1,'A Made-in-India advanced imaging system offering high-resolution, low-dose imaging for a wide range of surgical procedures.','[\"CsI Flat Panel Detector\",\"Large Field of View\",\"ADONIS TIALIC low-dose technology\",\"Wireless connectivity with PACS\",\"Compact, space-saving design\"]','[\"Clear, detailed images\",\"Reduced radiation exposure\",\"Faster, smoother workflow\",\"Suitable for multiple surgical specialties\",\"Easy hospital system integration\"]','/uploads/images/image-1766935068619-601517481.jpg',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 15:19:24');
/*!40000 ALTER TABLE `fpd_carm_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fpd_carm_hero`
--

DROP TABLE IF EXISTS `fpd_carm_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fpd_carm_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FPD C-ARM',
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `background_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fpd_carm_hero`
--

LOCK TABLES `fpd_carm_hero` WRITE;
/*!40000 ALTER TABLE `fpd_carm_hero` DISABLE KEYS */;
INSERT INTO `fpd_carm_hero` VALUES (1,'FPD C-ARM','  ',' ','',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 15:20:16');
/*!40000 ALTER TABLE `fpd_carm_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `header_footer`
--

DROP TABLE IF EXISTS `header_footer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `header_footer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `component_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registered_office` text COLLATE utf8mb4_unicode_ci,
  `corporate_office` text COLLATE utf8mb4_unicode_ci,
  `social_links` text COLLATE utf8mb4_unicode_ci,
  `copyright` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `phone_icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `navigation_links` text COLLATE utf8mb4_unicode_ci,
  `navigation_columns` text COLLATE utf8mb4_unicode_ci,
  `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `header_footer`
--

LOCK TABLES `header_footer` WRITE;
/*!40000 ALTER TABLE `header_footer` DISABLE KEYS */;
INSERT INTO `header_footer` VALUES (1,'header','/uploads/images/image-1766927055283-965562148.png','+91 94440 26307','info@3imedtech.com',NULL,NULL,NULL,NULL,1,'2025-12-28 09:00:49','2025-12-28 13:19:17',0,NULL,'/uploads/images/image-1766927103006-218244369.png','[{\"label\":\"Home\",\"link\":\"/\",\"order\":1,\"external\":false},{\"label\":\"About\",\"link\":\"/about\",\"order\":2,\"external\":false},{\"label\":\"Products\",\"link\":\"/products\",\"order\":3,\"external\":false},{\"label\":\"Why Choose Us\",\"link\":\"/why-choose-us\",\"order\":4,\"external\":false},{\"label\":\"Contact\",\"link\":\"/contact\",\"order\":5,\"external\":false}]',NULL,NULL,NULL),(2,'footer','/uploads/images/image-1766927322894-536458977.png','+91 94440 26307','info@3imedtech.com','Second Floor, Refex Towers, Sterling Road Signal, 313, Valluvar Kottam High Road, Nungambakkam, Chennai – 600034, Tamil Nadu','Refex Building, 67, Bazullah Road, Parthasarathy Puram, T Nagar, Chennai – 600017','[{\"platform\":\"LinkedIn\",\"url\":\"https://www.linkedin.com/company/3i-medtech/\",\"icon\":\"fa-linkedin\",\"order\":1},{\"platform\":\"Facebook\",\"url\":\"https://www.facebook.com/3imedtech\",\"icon\":\"fa-facebook\",\"order\":2},{\"platform\":\"Twitter\",\"url\":\"https://x.com/GroupRefex\",\"icon\":\"/uploads/images/image-1767101010123-396511672.png\",\"order\":3},{\"platform\":\"YouTube\",\"url\":\"https://www.youtube.com/@refexgroup\",\"icon\":\"/uploads/images/image-1767101707474-824620881.png\",\"order\":4},{\"platform\":\"Instagram\",\"url\":\"https://www.instagram.com/refexgroup/\",\"icon\":\"fa-instagram\",\"order\":5}]','Copyright © 2024 3i Medical Technologies',1,'2025-12-28 09:00:49','2025-12-30 13:35:09',0,NULL,NULL,NULL,'[{\"title\":\"About 3i MedTech\",\"links\":[{\"label\":\"About\",\"link\":\"/about\",\"order\":1,\"external\":false},{\"label\":\"Mission & Vision\",\"link\":\"/mission-vision-and-values\",\"order\":2,\"external\":false},{\"label\":\"Why Choose Us\",\"link\":\"/why-choose-us\",\"order\":3,\"external\":false}],\"order\":1},{\"title\":\"Know More\",\"links\":[{\"label\":\"Radiography Systems\",\"link\":\"/radiography-systems\",\"order\":1,\"external\":false},{\"label\":\"Portable X-Ray Solutions\",\"link\":\"/portable-x-ray-solutions\",\"order\":2,\"external\":false},{\"label\":\"Mammography Systems\",\"link\":\"/mammography-systems\",\"order\":3,\"external\":false},{\"label\":\"Flat Panel Detectors\",\"link\":\"/flat-panel-detectors\",\"order\":4,\"external\":false},{\"label\":\"Imaging Accessories\",\"link\":\"/imaging-accessories\",\"order\":5,\"external\":false},{\"label\":\"Refurbished MRI Systems\",\"link\":\"/refurbished-mri-systems\",\"order\":6,\"external\":false},{\"label\":\"Anamaya\",\"link\":\"https://anamaya.3imedtech.com/\",\"order\":7,\"external\":true}],\"order\":2}]','IMAGING • INFORMATION • INSIGHTS','a refex group company');
/*!40000 ALTER TABLE `header_footer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_slides`
--

DROP TABLE IF EXISTS `hero_slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_slides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_slides`
--

LOCK TABLES `hero_slides` WRITE;
/*!40000 ALTER TABLE `hero_slides` DISABLE KEYS */;
/*!40000 ALTER TABLE `hero_slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_about_section`
--

DROP TABLE IF EXISTS `home_about_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_about_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `background_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_about_section`
--

LOCK TABLES `home_about_section` WRITE;
/*!40000 ALTER TABLE `home_about_section` DISABLE KEYS */;
INSERT INTO `home_about_section` VALUES (1,'About Us','Your Partner for Clinically Relevant and Viable Imaging Technologies','As a dedicated healthcare technology provider, 3i MedTech is committed to revolutionizing diagnostic imaging. We specialize in developing innovative and affordable solutions, including Digital X-Rays, MRI machines, and Digital C-Arms, designed to enhance patient care and improve healthcare outcomes. By leveraging advanced technologies and focusing on customer convenience, product life cycle cost management, exceptional service, and faster turnaround times, we aim to be a trusted partner for healthcare providers worldwide.',1,'2025-12-28 09:00:49','2025-12-29 05:22:07','#2879b6',NULL,0);
/*!40000 ALTER TABLE `home_about_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_commitment`
--

DROP TABLE IF EXISTS `home_commitment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_commitment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cards` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `background_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `footer_text` text COLLATE utf8mb4_unicode_ci,
  `footer_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `footer_link_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_commitment`
--

LOCK TABLES `home_commitment` WRITE;
/*!40000 ALTER TABLE `home_commitment` DISABLE KEYS */;
INSERT INTO `home_commitment` VALUES (1,'Our Commitment','Redefining Healthcare Through Innovation','[{\"title\":\"Affordable Excellence\",\"icon\":\"/uploads/images/image-1766922942321-667765028.png\",\"description\":\"Delivering world-class medical technology at accessible prices\",\"link\":\"/about\",\"linkText\":\"Explore Our Products\",\"order\":1,\"isActive\":true},{\"title\":\"Comprehensive Solutions\",\"icon\":\"/uploads/images/image-1766923084162-866133124.png\",\"description\":\"Providing end-to-end solutions for optimal patient care\",\"link\":\"/about\",\"linkText\":\"Discover Our Services\",\"order\":2,\"isActive\":true},{\"title\":\"Unwavering Support\",\"icon\":\"/uploads/images/image-1766923168777-737856245.png\",\"description\":\"Committed to customer satisfaction through exceptional service\",\"link\":\"/contact\",\"linkText\":\"Contact Us Today\",\"order\":3,\"isActive\":true}]',1,'2025-12-28 09:00:49','2025-12-29 05:30:40','#F5F5F5','','/about','About Us',NULL,0);
/*!40000 ALTER TABLE `home_commitment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_hero`
--

DROP TABLE IF EXISTS `home_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `background_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `badge_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `badge_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `badge_alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gradient_overlay` text COLLATE utf8mb4_unicode_ci,
  `height` text COLLATE utf8mb4_unicode_ci,
  `deleted_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_hero`
--

LOCK TABLES `home_hero` WRITE;
/*!40000 ALTER TABLE `home_hero` DISABLE KEYS */;
INSERT INTO `home_hero` VALUES (1,'Affordable Diagnostic Imaging Solutions','/uploads/images/image-1766922330163-988619776.jpg','','https://anamaya.3imedtech.com/',1,'2025-12-28 09:00:49','2025-12-28 11:46:27','New Product','{\"from\":\"#0066A1\",\"to\":\"#7AB730\"}','{\"mobile\":600,\"desktop\":700}',NULL,0);
/*!40000 ALTER TABLE `home_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_image_boxes`
--

DROP TABLE IF EXISTS `home_image_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_image_boxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `link_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Discover Now',
  `deleted_at` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_image_boxes`
--

LOCK TABLES `home_image_boxes` WRITE;
/*!40000 ALTER TABLE `home_image_boxes` DISABLE KEYS */;
INSERT INTO `home_image_boxes` VALUES (1,'Imaging Equipment Experts','Core competency in manufacturing diagnostic imaging equipment','/uploads/images/image-1766922535193-630416563.jpg','/contact',1,1,'2025-12-28 09:00:49','2025-12-29 05:23:01','Discover Now',NULL,0,' '),(2,'Trusted Healthcare Partner','Strong reputation in the competitive healthcare market','/uploads/images/image-1766922576225-577098586.jpg','/why-choose-us',2,1,'2025-12-28 09:00:49','2025-12-29 05:24:09','Learn More',NULL,0,''),(3,'Enhancing Healthcare Access','Commitment to healthcare efficiency and accessibility','/uploads/images/image-1766922633468-215873006.jpg','/about',3,1,'2025-12-28 09:00:49','2025-12-29 05:25:16','Read More',NULL,0,''),(4,'testing the image box','hiii','','',4,1,'2025-12-28 12:01:21','2025-12-28 16:32:31','Discover Now hello','2025-12-28 16:32:31',1,'hiii buddys '),(5,'Radiography Systems','Advanced Radiography Solutions','','/radiography-systems',1,1,'2025-12-28 15:30:41','2025-12-28 16:32:52','Discover Now','2025-12-28 16:32:52',1,'State-of-the-art radiography systems for superior diagnostic imaging'),(6,'Portable X-Ray','Portable X-Ray Solutions','','/portable-x-ray-solutions',2,1,'2025-12-28 15:30:41','2025-12-28 16:32:25','Discover Now','2025-12-28 16:32:25',1,'Mobile and flexible X-ray systems for point-of-care imaging'),(7,'Mammography','Mammography Systems','','/mammography-systems',3,1,'2025-12-28 15:30:41','2025-12-28 16:32:29','Discover Now','2025-12-28 16:32:29',1,'Advanced mammography solutions for breast cancer screening');
/*!40000 ALTER TABLE `home_image_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imaging_accessories_hero`
--

DROP TABLE IF EXISTS `imaging_accessories_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imaging_accessories_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Imaging Accessories',
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `background_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imaging_accessories_hero`
--

LOCK TABLES `imaging_accessories_hero` WRITE;
/*!40000 ALTER TABLE `imaging_accessories_hero` DISABLE KEYS */;
INSERT INTO `imaging_accessories_hero` VALUES (1,'Imaging Accessories','','','',1,'2025-12-28 09:00:49','2025-12-29 06:25:51',0,NULL);
/*!40000 ALTER TABLE `imaging_accessories_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imaging_accessories_products`
--

DROP TABLE IF EXISTS `imaging_accessories_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imaging_accessories_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` text COLLATE utf8mb4_unicode_ci,
  `features` text COLLATE utf8mb4_unicode_ci,
  `benefits` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `image_position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'left',
  `background_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'from-gray-50 to-white',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imaging_accessories_products`
--

LOCK TABLES `imaging_accessories_products` WRITE;
/*!40000 ALTER TABLE `imaging_accessories_products` DISABLE KEYS */;
INSERT INTO `imaging_accessories_products` VALUES (1,'Sample Imaging Accessory','Essential imaging accessory','[\"Compatible\",\"Durable\",\"Affordable\"]','Enhanced imaging capabilities','','sample-accessory',1,1,'2025-12-28 09:00:49','2025-12-29 06:11:12',1,'2025-12-29 06:11:12','left','from-gray-50 to-white'),(2,'DMD D 2000, X-Ray Film Digitizer','The DMD D 2000 is a medical-grade X-ray film digitizer designed to convert conventional radiographic films into digital formats for easy comparison and storage.','[\"High brightness for enhanced images\",\"Slim data size for efficient storage\",\"Support for various data formats\",\"Auto-sizing and brightness control\"]','Facilitates easy digitization of X-ray films, ensuring high-quality digital storage and comparison.','/uploads/images/image-1766988695797-642877341.jpg','dmdd2000xrayfilmdigitizer',1,1,'2025-12-28 15:57:32','2025-12-29 06:22:44',0,NULL,'right','from-gray-50 to-white'),(3,'Image Display Monitors','USFDA/CE-certified display monitors support accurate display of monochrome and color images, ensuring reliable diagnostic quality.','[\"Multi-monitor configuration\",\"Backlight stabilization and ambient sensor\",\"Maintains image quality over time\",\"High brightness for performance standards\"]','Provides reliable and accurate image display, crucial for diagnostic confidence.','/uploads/images/image-1766988770967-657226888.jpg','imagedisplaymonitors',2,1,'2025-12-28 15:57:32','2025-12-29 06:12:53',0,NULL,'left','from-gray-50 to-white'),(4,'CT/MR/Mammograph Multi-Modality Workstations','These workstations provide vendor-neutral access to a large set of dedicated tools for viewing and analyzing CT, MR, and mammography images.','[\"Access to current and prior studies for direct comparison\",\"Customized hanging protocols\",\"2D/3D CAD support\",\"Images can be viewed on a single station\"]','Enhances workflow efficiency and diagnostic accuracy with comprehensive imaging tools.','/uploads/images/image-1766988795857-930839167.jpg','ctmrmammographmultimodalityworkstations',3,1,'2025-12-28 15:57:32','2025-12-29 06:22:53',0,NULL,'right','from-gray-50 to-white'),(5,'CD/DVD Publishers','DICOM calibrated publishers designed for auto-labelling, printing, and storage of DICOM images, suitable for hospital and center use.','[\"Easy integration with PACS\",\"Auto-pick of CD or DVD based on file size\",\"DICOM calibrated for accuracy\",\"High reliability for long-term storage\"]','Ensures seamless and accurate storage and distribution of DICOM images, supporting efficient data management.','/uploads/images/image-1766988819016-301536446.jpg','cddvdpublishers',4,1,'2025-12-28 15:57:32','2025-12-29 06:13:41',0,NULL,'left','from-gray-50 to-white'),(6,'MedE Drive for Patient Data Storage','MedE Drive is a chip-based digital health card designed for storing all types of health records, offering a convenient way to carry patient data.','[\"32 GB storage capacity\",\"Write protection to avoid data tampering\",\"Personalized card with patient details\",\"Compatible with various devices\"]','Ensures secure and portable storage of patient data, making it accessible anytime, anywhere.','/uploads/images/image-1766988839453-422514058.jpg','mededrive',5,1,'2025-12-28 15:57:32','2025-12-29 06:23:02',0,NULL,'right','from-gray-50 to-white');
/*!40000 ALTER TABLE `imaging_accessories_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `innovation_transformation`
--

DROP TABLE IF EXISTS `innovation_transformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `innovation_transformation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `innovation_transformation`
--

LOCK TABLES `innovation_transformation` WRITE;
/*!40000 ALTER TABLE `innovation_transformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `innovation_transformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journey_items`
--

DROP TABLE IF EXISTS `journey_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journey_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journey_items`
--

LOCK TABLES `journey_items` WRITE;
/*!40000 ALTER TABLE `journey_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `journey_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leadership_members`
--

DROP TABLE IF EXISTS `leadership_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leadership_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `achievements_json` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `experience` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `education` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leadership_members`
--

LOCK TABLES `leadership_members` WRITE;
/*!40000 ALTER TABLE `leadership_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `leadership_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_histories`
--

DROP TABLE IF EXISTS `login_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_histories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` enum('Logged-In','Logged-Out') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Logged-In',
  `login_time` datetime NOT NULL,
  `logout_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `login_histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_100` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_101` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_102` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_103` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_104` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_105` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_106` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_107` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_108` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_109` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_11` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_110` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_111` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_112` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_113` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_114` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_115` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_116` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_117` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_118` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_119` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_12` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_120` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_121` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_122` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_123` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_124` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_125` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_126` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_127` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_128` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_129` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_130` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_14` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_15` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_18` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_20` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_21` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_27` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_29` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_30` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_31` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_32` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_34` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_35` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_36` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_37` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_38` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_39` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_40` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_41` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_42` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_43` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_44` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_45` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_46` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_47` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_48` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_49` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_50` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_51` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_52` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_53` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_54` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_56` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_57` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_58` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_59` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_60` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_61` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_62` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_63` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_64` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_65` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_66` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_67` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_68` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_69` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_70` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_71` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_72` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_73` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_74` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_75` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_76` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_77` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_78` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_79` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_8` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_80` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_81` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_82` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_83` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_84` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_85` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_86` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_87` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_88` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_89` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_90` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_91` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_92` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_93` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_94` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_95` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_96` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_97` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_98` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `login_histories_ibfk_99` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_histories`
--

LOCK TABLES `login_histories` WRITE;
/*!40000 ALTER TABLE `login_histories` DISABLE KEYS */;
INSERT INTO `login_histories` VALUES ('15c7b55b-97f8-4e2d-966b-3b2795833029','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 11:08:30','2025-12-28 11:08:30'),('22f3ac6c-6a42-4b53-89c3-ac829fbb951c','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 17:42:51','2025-12-28 17:42:51'),('2eaeb897-17ab-4aae-b11a-25ccb203b60a','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-Out','2025-12-28 15:32:57','2025-12-28 17:42:27'),('35b7789a-6bb2-4d76-94d3-ae45bfa6e059','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-30 13:11:28','2025-12-30 13:11:28'),('371d1d62-49ef-431d-9951-cb2e5640c659','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 10:40:42','2025-12-28 10:40:42'),('3d57ddfd-bdf1-41f3-858c-eb144c2e0ced','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 10:48:40','2025-12-28 10:48:40'),('46d423d8-f9f1-4658-afa0-5155bf590a5d','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 09:39:12','2025-12-28 09:39:12'),('487246c6-9a3b-4ee0-9a80-f669cd4a29bc','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2026-01-02 14:06:05','2026-01-02 14:06:05'),('4e3a646b-972e-4730-8186-ce6f90a3d9db','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 11:03:00','2025-12-28 11:03:00'),('5606fb22-ec80-4658-843d-41b72057dc9c','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 10:43:32','2025-12-28 10:43:32'),('564fe950-fa88-4ca8-8709-a8cedb1339fd','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 11:08:56','2025-12-28 11:08:56'),('5aa1854d-5dca-473d-80c4-91542a51ab55','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-Out','2026-01-05 07:24:15','2026-01-05 10:24:01'),('5bc94673-cadd-4d78-a36a-0ae7b4808914','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 11:12:08','2025-12-28 11:12:08'),('65b35485-a8d7-40c0-b5dd-0cac344eb423','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 11:44:33','2025-12-28 11:44:33'),('6c4b52a7-3a89-4152-a608-29ed1126675d','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2026-01-07 04:29:26','2026-01-07 04:29:26'),('6c7dbda2-50ce-4a20-98b7-720f3b6a625d','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 10:41:37','2025-12-28 10:41:37'),('8237334a-19dd-47f3-a78d-031ce623b447','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 10:42:14','2025-12-28 10:42:14'),('83556bad-9a4c-49d0-8ef6-ee2cbb9cd79c','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-29 07:12:12','2025-12-29 07:12:12'),('85c24907-5716-41fe-b133-282a58176e05','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 10:48:18','2025-12-28 10:48:18'),('8769832f-a931-441c-91a8-debaa251fd36','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-29 05:48:56','2025-12-29 05:48:56'),('8d889778-41a9-494c-a193-8da877e236a2','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-29 05:21:40','2025-12-29 05:21:40'),('8f8540a3-2648-4942-adac-b2ce3d14bf36','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-29 07:25:34','2025-12-29 07:25:34'),('b1e13fa9-4224-42fe-ab90-79c3da727b35','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-29 14:56:36','2025-12-29 14:56:36'),('b6fe3fa7-34e6-44b6-87ef-a86914320f37','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-Out','2025-12-29 07:22:01','2025-12-29 07:22:38'),('b83bf1ef-bcc8-4b2a-b81f-eac51632a780','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 11:11:22','2025-12-28 11:11:22'),('c5f744d9-1a4b-4d66-80d4-edadb279f4d5','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 10:36:41','2025-12-28 10:36:41'),('c682223f-11bb-470d-b288-2c8f936b4998','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 09:42:04','2025-12-28 09:42:04'),('d00aacd3-9152-47df-a265-559298b4ea0b','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-Out','2025-12-28 11:17:58','2025-12-28 11:18:12'),('d0f32335-ce87-454e-8292-f98bd3c0b9b3','ccd7cac0-21f6-4d4a-9fd9-42058528c074','Logged-Out','2025-12-29 07:22:43','2025-12-29 07:25:15'),('dbb1cbcc-d2c6-42f6-8880-d4834d040853','ccd7cac0-21f6-4d4a-9fd9-42058528c074','Logged-Out','2025-12-29 07:10:44','2025-12-29 07:12:04'),('e7795dba-644e-4705-8cdf-caf74c4b74aa','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2025-12-28 11:18:20','2025-12-28 11:18:20'),('f5f6f935-533b-40b2-9949-d4534a34bedb','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-In','2026-01-07 11:32:50','2026-01-07 11:32:50'),('f6c25852-1377-4732-adb5-92b11314f67d','16cd5241-bd1c-44df-be31-fa40ffa75217','Logged-Out','2025-12-29 07:06:04','2025-12-29 07:10:34');
/*!40000 ALTER TABLE `login_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mammography_hero`
--

DROP TABLE IF EXISTS `mammography_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mammography_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mammography_hero`
--

LOCK TABLES `mammography_hero` WRITE;
/*!40000 ALTER TABLE `mammography_hero` DISABLE KEYS */;
INSERT INTO `mammography_hero` VALUES (1,'Mammography Systems',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `mammography_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mammography_products`
--

DROP TABLE IF EXISTS `mammography_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mammography_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `features` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `benefits` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'left',
  `background_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'from-gray-50 to-white',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mammography_products`
--

LOCK TABLES `mammography_products` WRITE;
/*!40000 ALTER TABLE `mammography_products` DISABLE KEYS */;
INSERT INTO `mammography_products` VALUES (2,'PINKVIEW DR PLUS (Digital Mammography)','The PINKVIEW DR PLUS system is designed for best-in-class breast cancer detection with advanced high-resolution mammography detectors.','[\"75-micron pixel size for high-quality images\",\"Convenient digital pressure control using a microcomputer\",\"Soft compression force control for patient comfort\",\"Automatic standard positioning with single-touch shooting\"]','Offers superior imaging quality with patient comfort, making it an ideal choice for early breast cancer detection.','/uploads/images/image-1766988505480-327269646.jpg','pinkviewdrplus','left','from-gray-50 to-white',1,1,0,NULL,'2025-12-28 15:57:11','2025-12-29 06:08:27'),(3,'PINKVIEW RT (Analog Mammography)','The PINKVIEW RT system provides a cost-effective analog mammography solution with easy operation and installation.','[\"18×24 cm and 24×30 cm film sizes for digitization\",\"High DQE/low noise\",\"Built-in generator in a slim body\",\"Easy movement with 4 wheels\"]','Delivers reliable analog mammography with easy operability, ideal for facilities looking for cost-effective solutions.','/uploads/images/image-1766988528031-76258999.jpg','pinkviewrt','right','from-white to-gray-50',2,1,0,NULL,'2025-12-28 15:57:11','2025-12-29 06:08:50');
/*!40000 ALTER TABLE `mammography_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission_vision_content`
--

DROP TABLE IF EXISTS `mission_vision_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission_vision_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission_vision_content`
--

LOCK TABLES `mission_vision_content` WRITE;
/*!40000 ALTER TABLE `mission_vision_content` DISABLE KEYS */;
INSERT INTO `mission_vision_content` VALUES (1,'mission','/uploads/images/image-1766930377679-406124652.png','Our Mission','To bring “Affordable Luxury” to our products & solutions to serve our customers with advanced technology with lower life cycle costs without compromising on quality, reliability, and patient safety. To promote the role of imaging in preventive medicine, helping to diagnose diseases early when they are most easily treatable. To collaborate with healthcare service providers, research institutions, and technology companies to share knowledge and data to push the boundaries of possibilities in medical imaging using technology.\n',1,'2025-12-28 09:00:49','2025-12-28 13:59:39',0,NULL),(2,'vision','/uploads/images/image-1766930396940-594390992.png','Our Vision','Our vision is to revolutionize the future of healthcare by providing advanced and safer medical imaging solutions that enhance diagnostic accuracy and improve patient experience. We strive to empower healthcare professionals with the most innovative imaging technologies and data-driven insights with highest accuracy.',1,'2025-12-28 09:00:49','2025-12-28 13:59:58',0,NULL);
/*!40000 ALTER TABLE `mission_vision_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission_vision_hero`
--

DROP TABLE IF EXISTS `mission_vision_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission_vision_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `background_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission_vision_hero`
--

LOCK TABLES `mission_vision_hero` WRITE;
/*!40000 ALTER TABLE `mission_vision_hero` DISABLE KEYS */;
INSERT INTO `mission_vision_hero` VALUES (1,'Mission & Vision','To empower healthcare providers with innovative imaging solutions that improve patient care, enhance diagnostic accuracy, and optimize efficiency.','/uploads/images/image-1766930072239-968519375.jpg',1,'2025-12-28 09:00:49','2025-12-28 13:54:34',0,NULL);
/*!40000 ALTER TABLE `mission_vision_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offerings`
--

DROP TABLE IF EXISTS `offerings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offerings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metric` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gradient` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offerings`
--

LOCK TABLES `offerings` WRITE;
/*!40000 ALTER TABLE `offerings` DISABLE KEYS */;
/*!40000 ALTER TABLE `offerings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portable_xray_features`
--

DROP TABLE IF EXISTS `portable_xray_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portable_xray_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portable_xray_features`
--

LOCK TABLES `portable_xray_features` WRITE;
/*!40000 ALTER TABLE `portable_xray_features` DISABLE KEYS */;
INSERT INTO `portable_xray_features` VALUES (1,'Portability','Lightweight and easy to transport','ri-luggage-cart-line',1,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(2,'High Quality','Superior image quality','ri-image-line',2,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(3,'Easy to Use','User-friendly interface','ri-user-friendly-line',3,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `portable_xray_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portable_xray_hero`
--

DROP TABLE IF EXISTS `portable_xray_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portable_xray_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Portable X-Ray Systems',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `background_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portable_xray_hero`
--

LOCK TABLES `portable_xray_hero` WRITE;
/*!40000 ALTER TABLE `portable_xray_hero` DISABLE KEYS */;
INSERT INTO `portable_xray_hero` VALUES (1,'Portable X-Ray Solutions',1,0,NULL,'2025-12-28 09:00:49','2025-12-29 06:09:22','','','');
/*!40000 ALTER TABLE `portable_xray_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portable_xray_overview`
--

DROP TABLE IF EXISTS `portable_xray_overview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portable_xray_overview` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portable_xray_overview`
--

LOCK TABLES `portable_xray_overview` WRITE;
/*!40000 ALTER TABLE `portable_xray_overview` DISABLE KEYS */;
INSERT INTO `portable_xray_overview` VALUES (1,'Portable X-Ray Overview','Our portable X-Ray systems offer flexibility and convenience for various medical imaging needs.',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `portable_xray_overview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portable_xray_products`
--

DROP TABLE IF EXISTS `portable_xray_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portable_xray_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `features` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `benefits` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'left',
  `background_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'from-gray-50 to-white',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portable_xray_products`
--

LOCK TABLES `portable_xray_products` WRITE;
/*!40000 ALTER TABLE `portable_xray_products` DISABLE KEYS */;
INSERT INTO `portable_xray_products` VALUES (2,'Mini 90 Point-of-Care X-Ray','The Mini 90 is a lightweight, compact, portable X-Ray unit designed for point-of-care emergencies, homecare, accident sites, and smaller clinics.','[\"High penetration with selectable kV range from 40 kV to 90 kV\",\"Programmable exposure settings\",\"Small focal spot of 0.8mm\",\"Built-in Lithium-polymer batteries for up to 150 exposures per charge\"]','Offers exceptional portability with high-quality imaging in critical and remote care situations.','/uploads/images/image-1767020286476-216579518.jpg','mini90pointofcarexray','left','from-gray-50 to-white',1,1,0,NULL,'2025-12-28 15:57:38','2025-12-29 14:58:08'),(3,'ADONIS HF Mobile DR','The ADONIS HF Mobile DR system is a compact and lightweight digital radiography solution that ensures productivity and flexibility in ICUs, ERs, and operating rooms.','[\"Featherweight design\",\"Actuator-based motorized vertical movement\",\"Dual battery system\",\"Soft touch keypad with auto-programmable features\"]','Ensures ease of use and mobility for high-demand environments where space and flexibility are crucial.','/uploads/images/image-1767020315943-597141740.jpg','adonishfmobiledr','right','from-white to-gray-50',2,1,0,NULL,'2025-12-28 15:57:38','2025-12-29 14:58:37');
/*!40000 ALTER TABLE `portable_xray_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portable_xray_specifications`
--

DROP TABLE IF EXISTS `portable_xray_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portable_xray_specifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portable_xray_specifications`
--

LOCK TABLES `portable_xray_specifications` WRITE;
/*!40000 ALTER TABLE `portable_xray_specifications` DISABLE KEYS */;
INSERT INTO `portable_xray_specifications` VALUES (1,'Power','High power output',1,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(2,'Weight','Lightweight design',2,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(3,'Battery','Long battery life',3,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `portable_xray_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_hero`
--

DROP TABLE IF EXISTS `product_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `background_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `overlay_from` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'rgba(0,0,0,0.5)',
  `overlay_to` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'rgba(0,0,0,0.3)',
  `title_line1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_line2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `highlight_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `title_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '#ffffff',
  `subtitle_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'rgba(255,255,255,0.9)',
  `description_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'rgba(255,255,255,0.8)',
  `aos_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aos_duration` int DEFAULT NULL,
  `aos_delay` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_hero`
--

LOCK TABLES `product_hero` WRITE;
/*!40000 ALTER TABLE `product_hero` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `radiography_hero`
--

DROP TABLE IF EXISTS `radiography_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radiography_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radiography_hero`
--

LOCK TABLES `radiography_hero` WRITE;
/*!40000 ALTER TABLE `radiography_hero` DISABLE KEYS */;
INSERT INTO `radiography_hero` VALUES (1,'Radiography Systems',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `radiography_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `radiography_products`
--

DROP TABLE IF EXISTS `radiography_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radiography_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `features` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `benefits` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'left',
  `background_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'from-gray-50 to-white',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radiography_products`
--

LOCK TABLES `radiography_products` WRITE;
/*!40000 ALTER TABLE `radiography_products` DISABLE KEYS */;
INSERT INTO `radiography_products` VALUES (1,'DReam CMT-Dual (Ceiling Type, Dual Detector)','The DReam CMT-Dual system is designed to enhance patient throughput and optimize performance. Its dual detector system allows for rapid, high-quality image acquisition, coupled with ergonomic design for easy operation.\n','[\"Synchronized detector stand and tube movement (optional)\",\"Automatic positioning for versatile applications\",\"Elevating horizontal table\",\"Bucky tilt for upper extremity studies\"]','This system translates into higher performance, reduces non-essential work steps, and is ideal for high-demand environments.','/uploads/images/image-1766986483763-155369456.jpg','dreamcmtdual','left','from-gray-50 to-white',2,1,0,NULL,'2025-12-28 09:00:49','2026-01-05 08:44:18'),(2,'DReam CMT-Single (Ceiling Type, Single Detector)','The DReam CMT-Single system is designed for smaller rooms and moderate patient throughput, offering flexibility and extended freedom of movement for challenging clinical examinations.','[\"Tube mounted auto tracking and positioning\",\"High spatial resolution for best image quality\",\"Auto exposure and pre-set programs for faster throughput\",\"Optimized image processing software\"]','Ideal for stand-alone diagnostic centers, emergency care, and specialty hospitals where space is limited but high-quality imaging is required.','/uploads/images/image-1766986523439-585416781.jpg','dreamcmtsingle','right','from-gray-50 to-white',3,1,0,NULL,'2025-12-28 15:30:41','2026-01-05 08:43:53'),(3,'DReam Floor Mounted DR','The DReam Floor Mounted DR system provides a cost-effective and high-performance radiography solution with advanced features and easy operability.','[\"Digital display for kV/mA/mAs selection\",\"APR-based control for all body parts\",\"Microprocessor control tube for overload protection\",\"Automatic voltage compensation\"]','This system ensures high reliability and accuracy, making it suitable for various radiological needs.','/uploads/images/image-1766986592480-887824812.jpg','dreamfloormounteddr','left','from-gray-50 to-white',4,1,0,NULL,'2025-12-28 15:30:41','2026-01-05 08:43:33'),(4,'ADONIS 100HF/150HF Mobile X-Ray','The ADONIS Mobile X-Ray system is compact and lightweight, designed for easy mobility in all directions with effective braking, making it ideal for bedside X-Ray needs.\n','[\"Actuator-based motorized vertical movement\",\"Soft-touch keypad with auto-programmable features\",\"Detachable exposure release switch\",\"Horizontal table/semi-motorized table/vertical bucky (optional)\"]','Offers portability and flexibility for on-the-go radiography, particularly in hospital wards or remote locations.','/uploads/images/image-1766986630355-503715749.jpg','addonis100hf150hfmobilexray','right','from-gray-50 to-white',5,1,0,NULL,'2025-12-28 15:30:41','2026-01-05 08:43:14'),(5,'Adonis HF Radiographic Systems 300mA / 500mA / 600mA','The Adonis HF Radiographic Systems are high-frequency X-ray systems developed to meet a broad range of radiological needs with high-contrast imaging and reduced patient skin dose.','[\"Digital display of factors\",\"APR-based control with 200 programs\",\"Motorized table (depending on the system)\",\"Automatic voltage compensation\"]','These systems are built for high efficiency and reliability, providing superior imaging performance at an affordable price.','/uploads/images/image-1766986829280-767402483.jpg','adonishfradiographicsystems300ma500ma600ma','left','from-gray-50 to-white',6,1,0,NULL,'2025-12-29 05:39:33','2026-01-05 08:42:44'),(6,'FPD C-ARM','A Made-in-India advanced imaging system offering high-resolution, low-dose imaging for a wide range of surgical procedures.','[\"CsI Flat Panel Detector\",\"Large Field of View\",\"ADONIS TIALIC low-dose technology\",\"Wireless connectivity with PACS\",\"Compact, space-saving design\"]','Clear, detailed images\nReduced radiation exposure\nFaster, smoother workflow\nSuitable for multiple surgical specialties\nEasy hospital system integration','/uploads/images/image-1767601797350-796844051.jpg','fpd-c-arm','right','from-gray-50 to-white',1,1,0,NULL,'2026-01-05 08:30:00','2026-01-05 08:42:10');
/*!40000 ALTER TABLE `radiography_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refurbished_mri_hero`
--

DROP TABLE IF EXISTS `refurbished_mri_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refurbished_mri_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refurbished_mri_hero`
--

LOCK TABLES `refurbished_mri_hero` WRITE;
/*!40000 ALTER TABLE `refurbished_mri_hero` DISABLE KEYS */;
INSERT INTO `refurbished_mri_hero` VALUES (1,'Refurbished MRI Systems',1,0,NULL,'2025-12-28 09:00:49','2025-12-29 06:04:51');
/*!40000 ALTER TABLE `refurbished_mri_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refurbished_mri_products`
--

DROP TABLE IF EXISTS `refurbished_mri_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refurbished_mri_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `features` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `benefits` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'left',
  `background_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'from-gray-50 to-white',
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refurbished_mri_products`
--

LOCK TABLES `refurbished_mri_products` WRITE;
/*!40000 ALTER TABLE `refurbished_mri_products` DISABLE KEYS */;
INSERT INTO `refurbished_mri_products` VALUES (2,'GE Signa HDxt 1.5 Tesla','The GE Signa HDxt 1.5T delivers superior imaging results, equipped with advanced gradient systems and optimized for high-performance image generation across all applications.','[\"48 cm field of view (FOV)\",\"High accuracy gradients and real-time image processing\",\"Enhanced contrast and reduced blurring for small FOV\",\"Advanced applications including Propeller 3.0, Lavaflex, DTI\"]','Provides high-definition imaging for a wide range of clinical applications, ensuring top-quality diagnostic performance.','/uploads/images/image-1766939230316-673130234.jpg','gesignahdxt15tesla','left','from-gray-50 to-white',2,1,0,NULL,'2025-12-28 15:57:24','2026-01-05 08:46:39'),(3,'Philips Achieva 3.0 Tesla X-Series','The Philips Achieva 3.0T X-series offers comprehensive MRI capabilities, featuring advanced imaging technology for a broad range of clinical needs.','[\"Exclusive quaser gradient systems for superb performance\",\"SENSE for reduced scan times and enhanced resolution\",\"Smart Exams for consistent MRI examination results\",\"Powerful Transmit Technology for optimal RF uniformity\"]','Delivers exceptional image quality and operational efficiency, making it a preferred choice for advanced MRI imaging.','/uploads/images/image-1766988352056-331043757.jpg','philipsachieva30teslaxseries','right','from-white to-gray-50',1,1,0,NULL,'2025-12-28 15:57:24','2026-01-05 08:46:33');
/*!40000 ALTER TABLE `refurbished_mri_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regulatory_approvals`
--

DROP TABLE IF EXISTS `regulatory_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regulatory_approvals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulatory_approvals`
--

LOCK TABLES `regulatory_approvals` WRITE;
/*!40000 ALTER TABLE `regulatory_approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `regulatory_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_innovations`
--

DROP TABLE IF EXISTS `research_innovations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_innovations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_innovations`
--

LOCK TABLES `research_innovations` WRITE;
/*!40000 ALTER TABLE `research_innovations` DISABLE KEYS */;
/*!40000 ALTER TABLE `research_innovations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_results`
--

DROP TABLE IF EXISTS `search_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_number` int NOT NULL DEFAULT '1',
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_results`
--

LOCK TABLES `search_results` WRITE;
/*!40000 ALTER TABLE `search_results` DISABLE KEYS */;
INSERT INTO `search_results` VALUES (1,'Sample Search Result 1','2024-01-15','/products/sample-1',1,1,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49'),(2,'Sample Search Result 2','2024-01-20','/products/sample-2',1,2,1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `search_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_footer_section`
--

DROP TABLE IF EXISTS `sustainability_footer_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_footer_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cta_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_footer_section`
--

LOCK TABLES `sustainability_footer_section` WRITE;
/*!40000 ALTER TABLE `sustainability_footer_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_footer_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_heart`
--

DROP TABLE IF EXISTS `sustainability_heart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_heart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `main_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_subtitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sections` json DEFAULT NULL,
  `commitments` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_heart`
--

LOCK TABLES `sustainability_heart` WRITE;
/*!40000 ALTER TABLE `sustainability_heart` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_heart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_hero`
--

DROP TABLE IF EXISTS `sustainability_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `background_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_hero`
--

LOCK TABLES `sustainability_hero` WRITE;
/*!40000 ALTER TABLE `sustainability_hero` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_policy`
--

DROP TABLE IF EXISTS `sustainability_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_policy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_policy`
--

LOCK TABLES `sustainability_policy` WRITE;
/*!40000 ALTER TABLE `sustainability_policy` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_sdg_card`
--

DROP TABLE IF EXISTS `sustainability_sdg_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_sdg_card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contribution` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_sdg_card`
--

LOCK TABLES `sustainability_sdg_card` WRITE;
/*!40000 ALTER TABLE `sustainability_sdg_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_sdg_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_social_section`
--

DROP TABLE IF EXISTS `sustainability_social_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_social_section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `csr_cards` json DEFAULT NULL,
  `csr_impact_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `csr_impact_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `csr_impact_items` json DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_social_section`
--

LOCK TABLES `sustainability_social_section` WRITE;
/*!40000 ALTER TABLE `sustainability_social_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_social_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustainability_vision_mission`
--

DROP TABLE IF EXISTS `sustainability_vision_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sustainability_vision_mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vision_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vision_subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vision_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `vision_points` json DEFAULT NULL,
  `mission_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mission_subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mission_points` json DEFAULT NULL,
  `stats` json DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustainability_vision_mission`
--

LOCK TABLES `sustainability_vision_mission` WRITE;
/*!40000 ALTER TABLE `sustainability_vision_mission` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustainability_vision_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(85) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(85) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_key` text COLLATE utf8mb4_unicode_ci,
  `user_type` enum('Admin','Regular User') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `modified_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `allowed_cms_pages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'JSON array of allowed CMS page IDs',
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `modified_by` (`modified_by`),
  KEY `deleted_by` (`deleted_by`),
  CONSTRAINT `users_ibfk_130` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_131` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_132` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_133` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_134` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_135` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_136` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_137` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_138` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_139` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_14` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_140` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_141` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_142` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_143` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_144` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_145` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_146` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_147` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_148` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_149` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_15` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_150` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_151` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_152` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_153` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_154` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_155` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_156` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_157` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_158` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_159` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_16` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_160` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_161` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_162` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_163` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_164` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_165` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_166` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_167` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_168` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_169` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_17` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_170` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_171` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_172` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_173` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_174` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_175` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_176` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_177` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_178` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_179` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_18` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_180` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_181` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_182` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_183` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_184` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_185` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_186` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_187` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_188` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_189` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_19` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_190` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_191` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_192` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_193` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_194` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_195` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_196` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_197` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_198` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_199` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_20` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_200` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_201` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_202` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_203` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_204` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_205` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_206` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_207` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_208` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_209` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_21` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_210` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_211` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_212` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_213` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_214` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_215` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_216` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_217` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_218` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_219` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_22` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_220` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_221` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_222` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_223` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_224` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_225` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_226` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_227` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_228` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_229` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_23` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_230` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_231` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_232` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_233` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_234` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_235` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_236` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_237` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_238` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_239` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_24` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_240` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_241` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_242` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_243` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_244` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_245` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_246` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_247` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_248` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_249` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_25` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_250` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_251` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_252` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_253` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_254` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_255` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_256` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_257` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_258` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_259` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_26` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_260` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_261` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_262` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_263` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_264` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_265` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_266` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_267` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_268` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_269` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_27` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_270` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_271` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_272` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_273` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_274` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_275` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_276` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_277` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_278` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_279` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_28` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_280` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_281` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_282` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_283` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_284` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_285` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_286` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_287` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_288` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_289` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_29` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_290` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_291` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_292` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_293` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_294` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_295` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_296` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_297` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_298` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_299` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_30` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_300` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_301` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_302` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_303` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_304` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_305` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_306` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_307` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_308` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_309` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_31` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_310` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_311` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_312` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_313` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_314` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_315` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_316` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_317` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_318` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_319` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_32` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_320` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_321` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_322` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_323` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_324` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_325` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_326` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_327` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_328` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_329` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_33` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_330` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_331` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_332` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_333` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_334` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_335` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_336` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_337` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_338` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_339` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_34` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_340` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_341` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_342` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_343` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_344` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_345` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_346` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_347` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_348` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_349` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_35` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_350` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_351` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_352` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_353` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_354` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_355` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_356` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_357` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_358` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_359` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_36` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_360` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_361` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_362` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_363` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_364` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_365` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_366` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_367` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_368` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_369` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_37` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_370` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_371` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_372` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_373` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_374` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_375` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_376` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_377` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_378` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_379` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_38` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_380` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_381` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_382` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_383` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_384` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_385` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_386` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_387` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_388` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_389` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_39` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_390` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_391` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_392` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_393` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_394` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_395` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_396` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_397` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_398` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_399` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_40` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_400` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_401` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_402` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_403` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_404` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_405` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_406` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_407` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_408` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_409` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_41` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_410` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_411` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_412` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_413` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_414` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_415` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_416` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_417` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_418` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_419` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_42` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_420` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_421` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_422` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_423` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_424` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_425` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_426` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_427` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_428` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_429` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_43` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_430` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_431` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_432` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_433` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_434` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_435` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_436` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_437` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_438` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_439` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_44` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_440` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_441` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_442` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_443` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_444` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_445` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_446` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_447` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_448` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_449` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_45` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_450` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_451` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_452` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_453` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_454` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_455` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_456` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_457` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_458` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_459` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_46` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_460` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_461` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_462` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_463` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_464` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_465` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_466` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_467` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_468` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_469` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_47` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_470` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_471` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_472` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_473` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_474` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_475` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_476` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_477` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_478` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_479` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_48` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_480` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_481` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_482` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_483` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_484` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_485` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_486` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_487` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_488` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_489` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_49` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_490` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_491` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_492` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_493` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_494` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_495` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_496` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_497` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_498` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_499` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_5` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_50` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_500` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_501` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_502` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_503` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_504` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_505` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_506` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_507` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_508` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_509` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_51` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_510` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_511` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_512` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_513` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_514` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_515` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_516` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_517` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_518` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_519` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_52` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_520` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_521` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_522` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_523` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_524` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_525` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_526` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_527` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_528` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_529` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_53` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_54` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_55` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_56` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_57` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_58` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_59` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_6` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_60` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_61` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_62` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_63` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_64` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_65` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_66` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_67` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_68` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_69` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_7` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_70` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_71` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_72` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_73` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_74` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_75` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_76` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_77` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_78` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_79` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_8` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_80` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_81` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_82` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_83` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_84` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_85` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_86` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_87` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_88` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_89` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_9` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_90` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_91` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_92` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_93` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_94` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_95` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_96` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_97` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_98` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_99` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('16cd5241-bd1c-44df-be31-fa40ffa75217','Raghul','',NULL,'raghul.je@refex.co.in','$2b$10$TircwzmkfQCUxo//EfuKvedXJjZykdfEa6qHqhNQS2Ll8ko9hCMiq',NULL,'Admin',1,NULL,NULL,NULL,'2025-12-28 09:00:48','2025-12-29 07:20:17',NULL,'[\"home-page\",\"header-footer\",\"about-page\",\"mission-vision-page\",\"why-choose-us-page\",\"contact-page\",\"portable-xray-page\",\"radiography-page\",\"flat-panel-page\",\"mammography-page\",\"mri-page\",\"imaging-accessories-page\",\"fpd-carm-page\"]'),('ccd7cac0-21f6-4d4a-9fd9-42058528c074','murugesh','Kumar','','murugesh.k@refex.co.in','$2b$10$8/J/HRgH9V9fV5BLKZOaUOIw3ZsHF8jsZAUOtrKIQSSbOrYuWDLBi',NULL,'Admin',1,'16cd5241-bd1c-44df-be31-fa40ffa75217','16cd5241-bd1c-44df-be31-fa40ffa75217',NULL,'2025-12-28 15:16:09','2025-12-29 07:25:53',NULL,'[\"home-page\",\"header-footer\",\"about-page\",\"mission-vision-page\",\"why-choose-us-page\",\"contact-page\",\"portable-xray-page\",\"radiography-page\",\"flat-panel-page\",\"mammography-page\",\"mri-page\",\"imaging-accessories-page\",\"fpd-carm-page\"]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `value_items`
--

DROP TABLE IF EXISTS `value_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `value_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `value_items`
--

LOCK TABLES `value_items` WRITE;
/*!40000 ALTER TABLE `value_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `value_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `version_control`
--

DROP TABLE IF EXISTS `version_control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `version_control` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Type of section: home-hero, home-about-section, home-image-box, home-commitment',
  `section_id` int DEFAULT NULL COMMENT 'ID of the specific item (null for single-instance sections like hero)',
  `version_number` int NOT NULL DEFAULT '1',
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'JSON string of the section data at this version',
  `user_id` int DEFAULT NULL COMMENT 'User who created this version',
  `change_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Optional description of what changed',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `version_control_section_type_section_id` (`section_type`,`section_id`),
  KEY `version_control_section_type_section_id_version_number` (`section_type`,`section_id`,`version_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `version_control`
--

LOCK TABLES `version_control` WRITE;
/*!40000 ALTER TABLE `version_control` DISABLE KEYS */;
/*!40000 ALTER TABLE `version_control` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `why_choose_us`
--

DROP TABLE IF EXISTS `why_choose_us`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `why_choose_us` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `subtitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `background_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `list_items` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cards` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `why_choose_us`
--

LOCK TABLES `why_choose_us` WRITE;
/*!40000 ALTER TABLE `why_choose_us` DISABLE KEYS */;
/*!40000 ALTER TABLE `why_choose_us` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `why_choose_us_advantages`
--

DROP TABLE IF EXISTS `why_choose_us_advantages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `why_choose_us_advantages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cards` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `why_choose_us_advantages`
--

LOCK TABLES `why_choose_us_advantages` WRITE;
/*!40000 ALTER TABLE `why_choose_us_advantages` DISABLE KEYS */;
INSERT INTO `why_choose_us_advantages` VALUES (1,'Our Advantages','What Sets Us Apart','[{\"title\":\"Quality Assurance\",\"description\":\"Rigorous quality control processes\",\"icon\":\"ri-checkbox-circle-line\",\"order\":1,\"isActive\":true},{\"title\":\"Expert Team\",\"description\":\"Experienced professionals\",\"icon\":\"ri-team-line\",\"order\":2,\"isActive\":true},{\"title\":\"Customer Focus\",\"description\":\"Dedicated to your success\",\"icon\":\"ri-heart-line\",\"order\":3,\"isActive\":true}]',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 09:00:49');
/*!40000 ALTER TABLE `why_choose_us_advantages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `why_choose_us_hero`
--

DROP TABLE IF EXISTS `why_choose_us_hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `why_choose_us_hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `background_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `why_choose_us_hero`
--

LOCK TABLES `why_choose_us_hero` WRITE;
/*!40000 ALTER TABLE `why_choose_us_hero` DISABLE KEYS */;
INSERT INTO `why_choose_us_hero` VALUES (1,' ','With a combined experience of delivering and installing thousands of imaging systems across India, our team boasts deep industry knowledge and a proven track record of success. Our strategic focus on Tier 2 and Tier 3 markets ensures that healthcare facilities in every corner of the country benefit from our advanced technology.','/uploads/images/image-1766934553907-358438926.jpg','Get in Touch','/contact',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 15:09:17');
/*!40000 ALTER TABLE `why_choose_us_hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `why_choose_us_offerings`
--

DROP TABLE IF EXISTS `why_choose_us_offerings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `why_choose_us_offerings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `list_items` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `why_choose_us_offerings`
--

LOCK TABLES `why_choose_us_offerings` WRITE;
/*!40000 ALTER TABLE `why_choose_us_offerings` DISABLE KEYS */;
INSERT INTO `why_choose_us_offerings` VALUES (1,'Our Offerings','/uploads/images/image-1766935696475-84873300.jpg','[{\"boldText\":\"Comprehensive Product Portfolio\",\"description\":\"Our product range encompasses X-ray systems, digital radiography solutions,C-Arms, mammography equipment, and pre-owned MRI scanners.\"},{\"boldText\":\"Patented Innovations\",\"description\":\"We are proud to offer specialty products like the Dream ERA range of DR systems,showcasing our commitment to research and development.\"},{\"boldText\":\"Pre-owned Equipment Expertise\",\"description\":\"Our expertise in processing and marketing high-end pre-owned imaging systems provides cost-effective solutions for healthcare facilities.\"},{\"boldText\":\"Exceptional Service\",\"description\":\"Our dedicated service team ensures maximum uptime, rapid response, and comprehensive support for all our products.\"}]',1,0,NULL,'2025-12-28 09:00:49','2025-12-28 15:28:19');
/*!40000 ALTER TABLE `why_choose_us_offerings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database '3imedtech_production'
--

--
-- Dumping routines for database '3imedtech_production'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-12 15:21:52

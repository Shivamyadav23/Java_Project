-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: vconfig
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) NOT NULL,
  `min_qty` int NOT NULL,
  `mod_name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `safety_rating` int DEFAULT '5',
  `manu_id` bigint NOT NULL,
  `seg_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr7t3perk8n5abjcuk8j3kn9ko` (`manu_id`),
  KEY `FKeoehxbf066gnexos8p4o9fn5e` (`seg_id`),
  CONSTRAINT `FKeoehxbf066gnexos8p4o9fn5e` FOREIGN KEY (`seg_id`) REFERENCES `segments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKr7t3perk8n5abjcuk8j3kn9ko` FOREIGN KEY (`manu_id`) REFERENCES `manufacturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (1,'Images/1',8,'Swift-ZXI',5000,2,1,1),(2,'Images/2',8,'Grand i10-Megan',8000,2,2,1),(3,'Images/3',6,'Civic-V',9000,3,3,2),(4,'Images/4',6,'NexonSmart(O) Petrol 5 Speed MT',9000,3,4,2),(5,'Images/5',5,'Verna SX OPT Turbo DCT DT',8000,3,5,3),(6,'Images/6',5,'City V Elegant',8000,3,6,3),(7,'Images/7',3,'Scorpio S9 Seater',9000,4,7,4),(8,'Images/8',3,'Punch Adventure Petrol 5 Speed MT',9000,4,8,4),(9,'Images/9',2,'Defender 2.0 11 SE (Petrol)',10000,5,9,5),(10,'Images/10',2,'Q5 Bold Edition',10000,5,10,5);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06 19:01:10

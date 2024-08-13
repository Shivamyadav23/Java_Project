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
-- Table structure for table `car_description`
--

DROP TABLE IF EXISTS `car_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_description` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `car_name` varchar(255) DEFAULT NULL,
  `description` text,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_description`
--

LOCK TABLES `car_description` WRITE;
/*!40000 ALTER TABLE `car_description` DISABLE KEYS */;
INSERT INTO `car_description` VALUES (1,'Swift-ZXI','The Swift-ZXI is a compact and stylish car that offers a smooth ride. Known for its fuel efficiency and reliability, it is a popular choice among urban drivers. The design features a modern look with advanced technology integration. With comfortable seating and a spacious interior, it caters to small families and daily commuters alike. Its affordability makes it an attractive option for budget-conscious buyers.','/Car/1.png'),(2,'Grand i10-Megan','The Grand i10-Megan combines practicality with a touch of elegance. This model is designed to provide a comfortable driving experience with its spacious cabin and user-friendly features. Its fuel-efficient engine and low maintenance costs add to its appeal. The car’s sleek exterior and modern interior make it a versatile choice for both city driving and long journeys.','/Car/2.png'),(3,'Civic-V','The Civic-V is a sophisticated sedan with a strong emphasis on performance and luxury. It boasts a refined interior with premium materials and cutting-edge technology. The car’s smooth handling and powerful engine ensure a pleasurable driving experience. Its elegant design and advanced safety features provide both style and peace of mind.','/Car/3.png'),(4,'NexonSmart(O) Petrol 5 Speed MT','The NexonSmart(O) Petrol 5 Speed MT is a robust and versatile SUV with a sporty design. It offers a dynamic driving experience with its efficient petrol engine and smooth manual transmission. The vehicle’s high ground clearance and rugged build make it suitable for various terrains. Its well-designed interior ensures comfort and convenience for passengers.','/Car/4.png'),(5,'Verna SX OPT Turbo DCT DT','The Verna SX OPT Turbo DCT DT is a high-performance sedan with a turbocharged engine and dual-clutch transmission. It delivers a thrilling driving experience with swift acceleration and precise handling. The car’s stylish design and premium features enhance both comfort and driving pleasure. Its advanced safety systems and modern technology make it a top choice for enthusiasts.','/Car/5.png'),(6,'City V Elegant','The City V Elegant is a refined and elegant sedan known for its spacious interior and smooth ride. It offers a blend of style and practicality, making it ideal for both urban and long-distance driving. The car features a comfortable cabin with high-quality materials and modern amenities. Its efficient engine and reliable performance ensure a satisfying driving experience.','/Car/6.png'),(7,'Scorpio S9 Seater','The Scorpio S9 Seater is a rugged and durable SUV designed for adventure and off-road driving. It provides ample seating capacity and a spacious interior for large families or groups. The vehicle’s powerful engine and robust suspension system offer excellent performance in challenging conditions. Its commanding presence and versatile features make it a popular choice for explorers.','/Car/7.png'),(8,'Punch Adventure Petrol 5 Speed MT','The Punch Adventure Petrol 5 Speed MT is a compact SUV with a playful design and agile handling. It features a responsive petrol engine and a smooth manual transmission for an engaging driving experience. The car’s compact size makes it ideal for city driving, while its versatile features provide comfort and convenience.','/Car/8.png'),(9,'Defender 2.0 11 SE (Petrol)','The Defender 2.0 11 SE (Petrol) is a legendary off-road vehicle with a robust build and exceptional durability. It offers powerful performance and advanced off-road capabilities. The car’s iconic design and rugged features make it suitable for challenging terrains. Its spacious interior and modern amenities ensure comfort during adventurous journeys.','/Car/9.png'),(10,'Q5 Bold Edition','The Q5 Bold Edition is a luxurious SUV that stands out with its bold design and advanced features. It combines high-performance capabilities with a refined interior for a premium driving experience. The vehicle’s powerful engine and sophisticated technology enhance both comfort and safety. Its striking appearance and upscale features make it a top choice for discerning drivers.','/Car/10.png');
/*!40000 ALTER TABLE `car_description` ENABLE KEYS */;
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

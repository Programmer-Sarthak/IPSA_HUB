-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ipsa_hub
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `userid` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Excited to start my final year project on AI-based learning tools! #AI #FinalYearProject','projectAI.jpg',29,'2024-10-23 10:10:26'),(2,'Attended a great workshop on cloud computing today. Learned a lot about AWS and its real-world applications. #CloudComputing','cc.jpg',29,'2024-10-23 10:10:26'),(3,'Just completed a mini-project on data structures. Feeling accomplished! #Coding #DataStructures','miniproject.jpg',29,'2024-10-23 10:10:26'),(4,'Working on improving my skills in Java. Any good resources to recommend? #Java #Learning','javaskills.jpg',29,'2024-10-23 10:10:26'),(5,'Looking forward to collaborating with my peers for the upcoming hackathon! #Hackathon #Teamwork','hackathon.jpg',29,'2024-10-23 10:10:26'),(6,'Attended an insightful seminar on blockchain technology. Exciting future ahead! #Blockchain #Seminar','blockchainSeminar.jpg',30,'2024-10-23 10:10:26'),(7,'Just got certified in Full Stack Development! Ready to build some cool projects. #FullStack #WebDevelopment','certificateFullStack.jpg',30,'2024-10-23 10:10:26'),(8,'Feeling grateful to be part of the college tech fest organizing committee. It\'s going to be awesome! #TechFest #CollegeLife','techfest.jpg',30,'2024-10-23 10:10:26'),(9,'Completed my first machine learning model using Python. So pumped! #MachineLearning #Python','mlmodel.jpg',30,'2024-10-23 10:10:26'),(10,'Had a great discussion with my professor about career opportunities in software engineering. #CareerTalk #SoftwareEngineering','careerTalk.jpg',30,'2024-10-23 10:10:26'),(11,'Presented my research paper on IoT applications in healthcare. Great feedback from my peers! #Research #IoT','researchIoT.jpg',31,'2024-10-23 10:10:26'),(12,'Working on a side project to develop an app for our college campus. Can\'t wait to share it! #AppDevelopment #SideProject','appDevelopment.jpg',31,'2024-10-23 10:10:26'),(13,'Grateful for the opportunity to mentor juniors in coding. #Mentorship #CodingLife','mentorCoding.jpg',31,'2024-10-23 10:10:26'),(14,'Got hands-on experience with React.js today. Frontend development is fun! #ReactJS #Frontend','reactLearning.jpg',31,'2024-10-23 10:10:26'),(15,'Attended a guest lecture by an industry expert on cybersecurity. Learned a lot! #CyberSecurity #GuestLecture','cyberSecurity.jpg',31,'2024-10-23 10:10:26'),(16,'Started learning about DevOps practices. Excited for continuous integration and deployment! #DevOps #CI/CD','devops.jpg',32,'2024-10-23 10:10:26'),(17,'Successfully implemented an API for my latest web project. #APIDevelopment #WebDevelopment','apiProject.jpg',32,'2024-10-23 10:10:26'),(18,'Participating in a virtual coding competition this weekend! #CodingCompetition #VirtualEvent','codingCompetition.jpg',32,'2024-10-23 10:10:26'),(19,'Just completed an advanced SQL course. Feeling more confident with databases now! #SQL #Database','sqlCourse.jpg',32,'2024-10-23 10:10:26'),(20,'Had an amazing team discussion on improving our group project. #TeamWork #Collaboration','teamProject.jpg',32,'2024-10-23 10:10:26'),(21,'Started an internship in data analytics. Can’t wait to apply what I’m learning in college. #DataAnalytics #Internship','dataAnalyticsIntern.jpg',33,'2024-10-23 10:10:26'),(22,'Building a portfolio website to showcase my college projects. #Portfolio #WebDesign','portfolio.jpg',33,'2024-10-23 10:10:26'),(23,'Attended a career fair organized by our college. Great networking opportunities! #CareerFair #Networking','careerFair.jpg',33,'2024-10-23 10:10:26'),(24,'Exploring career opportunities in backend development. #BackendDevelopment #CareerPath','careerBackend.jpg',33,'2024-10-23 10:10:26'),(25,'Received a letter of appreciation for my contribution to the college fest. #CollegeFest #Appreciation','appreciationFest.jpg',33,'2024-10-23 10:10:26'),(27,'hello',NULL,36,'2024-10-23 14:17:09');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-23 17:09:01

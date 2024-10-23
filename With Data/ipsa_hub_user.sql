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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `enrollment_number` varchar(15) DEFAULT NULL,
  `faculty_id` varchar(15) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `coverPic` varchar(45) DEFAULT NULL,
  `profilePic` varchar(45) DEFAULT NULL,
  `descr` varchar(200) DEFAULT NULL,
  `isApproved` tinyint(1) DEFAULT '0',
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  KEY `department_id_idx` (`department_id`),
  KEY `role_id_idx` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (29,NULL,'FAC0808ENG0001',1,2,'amit_sharma','$2a$10$GK0nrdfvaBvJvS0tZMN33ubx7xmaKZbhdI4xk.TdCa5KEvYPAMUn.','c1.jpg','9.jpg','Faculty member in Engineering',1,0),(30,NULL,'FAC0808ENG0002',1,2,'ravi_kumar','$2a$10$B1tITi10KbCT9ofZkQAeKuWBppqOK5lbW1wFMNIlZfSIO/CfY8YlK','c2.jpg','14.jpg','Faculty member in Engineering',1,0),(31,NULL,'FAC0808MNG0001',2,2,'suman_gupta','$2a$10$tyrdjlR/ZBhZ0vl/mH5e9.Y5VhlamtsSxWYgbvpepwHyJYg1b8Yce','c3.jpg','2.jpg','Faculty member in Management',1,0),(32,NULL,'FAC0808MNG0002',2,2,'pooja_singh','$2a$10$gboqLjFCPdslGY5KMvmuaeaZj2FJ3by2A3b8nSS3TRX4NTzMQnVTW','c4.jpg','11.jpg','Faculty member in Management',1,0),(33,NULL,'FAC0808CSE0001',3,2,'rahul_verma','$2a$10$XWj79VYTdvrX6ntMJp36YuERTskyDud9k/eWJPkqB/cXfZRXjc3sS','c5.jpg','20.jpg','Faculty member in Computers',1,0),(34,NULL,'FAC0808CSE0002',3,2,'neha_bansal','$2a$10$DPiib0pzXTnQcIELaljhI.aOMbQJ7fyUfBUhXIKieml47NZXc5.8m','c6.jpg','13.jpg','Faculty member in Computers',1,0),(35,'','FAC0808SCI0001',4,2,'anjali_mehta','$2a$10$IIHuaCjP8MFoOv8f6pvJpu2ax8P439MI43l41nGk3dl0SPlycua2K','c7.jpg','24.jpg','Faculty member in Science',1,0),(36,NULL,'FAC0808SCI0002',4,2,'vikram_joshi','$2a$10$RMh3PYEisXNLpUhG.g1B2eRoI/.Sb1297yUDW9Ehl/vMm3X8dBw7C','c8.jpg','42.jpg','Faculty member in Science',1,0),(37,NULL,'FAC0808PHR0001',5,2,'karan_yadav','$2a$10$vOk8Nm8fS7Ve1IrN7s7evetkhm5yb9FovG2eMKNzi6yUVlr1Fy3Fq','c9.jpg','45.jpg','Faculty member in Pharmacy',1,0),(38,NULL,'FAC0808PHR0002',5,2,'sneha_rathi','$2a$10$jA7lboubTBq3eREii6mvTuFPBfLqWRkJ0crqMun5NXLOrresIdAxq','c10.jpg','26.jpg','Faculty member in Pharmacy',1,0),(39,NULL,'FAC0808FA0001',6,2,'ritika_sharma','$2a$10$/dkR.RKxg2GjmaNIo96byu4fH4fstpsayUY9nARrVRStQj.rg23za','c11.jpg','27.jpg','Faculty member in Fine Arts',1,0),(40,NULL,'FAC0808FA0002',6,2,'deepak_kumar','$2a$10$IslWO18h52mP5GAeS4tUGu/vFUr60tndrgE4VFDJi39LM8zMpdLKm','c.12jpg','46.jpg','Faculty member in Fine Arts',1,0),(41,NULL,'FAC0808COM0001',7,2,'priya_nair','$2a$10$gI7XhL3G2mncYqnHVU.HieqMFF/qVA1D5zQDmi7gzc8fXsqjYRn86','c13.jpg','32.jpg','Faculty member in Commerce',1,0),(42,NULL,'FAC0808COM0002',7,2,'kunal_sethi','$2a$10$1urClK6GwiqqIrxqFXNjoe.yTipw1Lmx2sckTa85R9rzUT/uF92ZO','c14.jpg','50.jpg','Faculty member in Commerce',1,0),(43,'0808CSE221001',NULL,3,1,'aishwarya_patel','$2a$10$Vo2Vx91nGpU3qu4AKIhvheRR5Z.Uv00BpwGadi0gC3mEpImjUGvw.','c1.jpg','42.jpg','Student in Engineering',1,0),(44,'0808CSE221002',NULL,3,1,'vivek_gupta','$2a$10$JpwDnR/Gqti1asbnRiN/quKODlMJ/qDdE9hFbd6DRE4WU0Ruo1WFq','c2.jpg','60.jpg','Student in Engineering',1,0),(45,'0808MNG221001',NULL,2,1,'meena_rao','$2a$10$1KhFw6wBdCFcWJ4TzEwR9uLxWfDKSZhS/6K4jeX3we4i2Wb.l108e','c3.jpg','51.jpg','Student in Management',1,0),(46,'0808MNG221002',NULL,2,1,'rohan_singh','$2a$10$nF92IY3oix8LZkyNx/eg6e92ew688MoLrf8fxWgNAYjR9LOjecNX2','c4.jpg','62.jpg','Student in Management',1,0),(47,'0808ENG221001',NULL,1,1,'sakshi_verma','$2a$10$O5HH3kQ0C8UwuDrbZv14rOnEX57rzYI2VfMzYcNQh0ueqfGcINO.i','c5.jpg','52.jpg','Student in Engineering',1,0),(48,'0808ENG221002',NULL,1,1,'kartik_jain','$2a$10$Z.xzr/bB2bQFfZujLULT1edBzvMyspfo1Ru1VOhTIIcq5tzUjiL4m','c6.jpg','65.jpg','Student in Engineering',1,0),(49,'0808SCI221001',NULL,4,1,'alok_mishra','$2a$10$e2Nk9XALa6CKLhJrzR8BMuVSsFfohOqQgpT5O1ZMpf73ZUXisOVvC','c7.jpg','67.jpg','Student in Science',1,0),(50,'0808SCI221002',NULL,4,1,'divya_sharma','$2a$10$IMcMI1vojTto//Q6DsMl3eZFT5ze36eHALIkUJziNTf5Set2.bJVi','c8.jpg','63.jpg','Student in Science',1,0),(51,'0808PHR221001',NULL,5,1,'nisha_mehta','$2a$10$F.lZDKMUXYqa91X/SWWQkuToQlwzJ/Tx5FmFOIKau9QT2aJmmuz8O','c9.jpg','68.jpg','Student in Pharmacy',1,0),(52,'0808PHR221002',NULL,5,1,'rahul_singh','$2a$10$t24jLtsResFuty9XBc2at.BMsNerepgJPWbWE2joFtb6rSH04KMFS','c10.jpg','69.jpg','Student in Pharmacy',1,0),(53,'0808FA221001',NULL,6,1,'vinay_joshi','$2a$10$HIDkxAFVra9ZXqX4qySPBeWld2AI5w8bHzx8V6oiMs8Q5pczMsEzm','c11.jpg','76.jpg','Student in Fine Arts',1,0),(54,'0808FA221002',NULL,6,1,'neeta_rao','$2a$10$8MXos.7phJNccGGE2D4ZO.iHGt7eBJcTP5/KBvkmjX7EEkCMi7s4K','c12.jpg','71.jpg','Student in Fine Arts',1,0),(55,'0808COM221001',NULL,7,1,'ajay_nair','$2a$10$it/PCtknXGwiuCxwKwUfpeggWLQl46SWBjq/Rqe4M.FdT0aYpnEkm','c13.jpg','51.jpg','Student in Commerce',1,0),(56,'0808COM221002',NULL,7,1,'ritu_bansal','$2a$10$PFqCBNb0I0taI8jtoA2LlO2znqK5TV1swoWzZbm9aFHonQEAHgTZu','c14.jpg','37.jpg','Student in Commerce',1,0),(57,'0808IO221036',NULL,1,1,'sarthak_chourey','$2a$10$HQixnjeGqKxxLD15h0VbfuT9AiL2AyoKhwifnjmi72Xfl3ayy/iUW','white.jpg','1729678867124IMG_20220710_153200.jpg',NULL,1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 08:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookingsys`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `bookingId` varchar(191) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `date` date NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `placeId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cancellation`
--

CREATE TABLE `cancellation` (
  `cancelId` varchar(191) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `cancelDate` date NOT NULL,
  `userId` varchar(191) NOT NULL,
  `bookingId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

CREATE TABLE `picture` (
  `picId` varchar(191) NOT NULL,
  `picLink` varchar(500) NOT NULL,
  `placeId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `picture`
--

INSERT INTO `picture` (`picId`, `picLink`, `placeId`) VALUES
('pic1', 'https://i.ibb.co/zfVC8VL/Bilik-Orkid.jpg', 'p1'),
('pic2', 'https://i.postimg.cc/TwGggkTJ/dewan-jubli.jpg', 'p2'),
('pic3', 'https://i.postimg.cc/g2V08Gj1/dewan-jubli-2.jpg', 'p2');

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `placeId` varchar(191) NOT NULL,
  `placeName` varchar(255) NOT NULL,
  `placeDesc` varchar(500) NOT NULL,
  `placeCapacity` int(11) NOT NULL,
  `placeType` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`placeId`, `placeName`, `placeDesc`, `placeCapacity`, `placeType`) VALUES
('p1', 'Bilik Mesyuarat Orkid Majlis Daerah Raub', 'Bilik Orkid is the main meeting room in Majlis Daerah Raub. It is complete with new equipment such as one large smart tv, two projectors, three standard viewing tvs, enough microphone for each meetings participants to share and one touchscreen control for the meeting host.', 50, 'Meeting Room'),
('p2', 'Dewan Jubli Majlis Daerah Raub', 'A hall with a complete sound system and 4K/FHD LED screen. The hall is suitable for weddings, public or private events.', 500, 'Hall');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` varchar(191) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNum` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `fullname`, `email`, `password`, `phoneNum`, `role`, `createdAt`, `updatedAt`) VALUES
('abbf594b-f0fa-4206-9abf-8b9dedf9c6b1', 'Hariz Rafie', 'harizrafie86@gmail.com', '$2a$10$gy84uqpfMm4NqyB3dHKOEejmCKZzkBBEJQv0yqJwA0Uf49E/uhB4q', '01124573013', 'admin', '2024-11-11 02:07:47.600', '2024-11-11 02:07:47.600'),
('ce51d966-66cf-4d78-9b1b-ccc8c841e1b7', 'Irfan Farhan bin Mazlan', 'paan@gmail.com', '$2a$10$mLM/QSoEsZyIhaZA/FaB/eV0tIHOhH2HUxosobte8nebe4OcnQV5S', '01124573019', 'user', '2024-11-15 01:09:37.848', '2024-11-22 02:35:40.919');

-- --------------------------------------------------------

--
-- Table structure for table `verificationtokens`
--

CREATE TABLE `verificationtokens` (
  `identifier` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingId`,`placeId`,`userId`),
  ADD UNIQUE KEY `bookingId` (`bookingId`),
  ADD KEY `placeId` (`placeId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `cancellation`
--
ALTER TABLE `cancellation`
  ADD PRIMARY KEY (`cancelId`,`userId`,`bookingId`),
  ADD UNIQUE KEY `cancelId` (`cancelId`),
  ADD KEY `bookingId` (`bookingId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`picId`),
  ADD KEY `placeId` (`placeId`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`placeId`),
  ADD UNIQUE KEY `placeId` (`placeId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userId` (`userId`),
  ADD UNIQUE KEY `user_email_key` (`email`);

--
-- Indexes for table `verificationtokens`
--
ALTER TABLE `verificationtokens`
  ADD UNIQUE KEY `verificationtokens_identifier_token_key` (`identifier`,`token`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`placeId`) REFERENCES `place` (`placeId`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `cancellation`
--
ALTER TABLE `cancellation`
  ADD CONSTRAINT `cancellation_ibfk_1` FOREIGN KEY (`bookingId`) REFERENCES `booking` (`bookingId`),
  ADD CONSTRAINT `cancellation_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `picture`
--
ALTER TABLE `picture`
  ADD CONSTRAINT `picture_ibfk_1` FOREIGN KEY (`placeId`) REFERENCES `place` (`placeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

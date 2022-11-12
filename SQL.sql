-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: Nov 12, 2022 at 03:53 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12561563`
--
CREATE DATABASE IF NOT EXISTS `sql12561563` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql12561563`;

-- --------------------------------------------------------

--
-- Table structure for table `AdminInfo`
--

DROP TABLE IF EXISTS `AdminInfo`;
CREATE TABLE `AdminInfo` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(30) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `login_password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `AdminInfo`
--

INSERT INTO `AdminInfo` (`admin_id`, `admin_name`, `username`, `login_password`) VALUES
(1, 'Lovely Sharma', 'lovely', 'lovely'),
(2, 'Om Khandale', 'om0508', 'om0508');

-- --------------------------------------------------------

--
-- Table structure for table `BookData`
--

DROP TABLE IF EXISTS `BookData`;
CREATE TABLE `BookData` (
  `book_id` int(3) NOT NULL,
  `book_title` varchar(30) DEFAULT NULL,
  `book_route` varchar(10) DEFAULT NULL,
  `book_image_src` varchar(50) DEFAULT NULL,
  `book_folderlink` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `BookData`
--

INSERT INTO `BookData` (`book_id`, `book_title`, `book_route`, `book_image_src`, `book_folderlink`) VALUES
(1, 'Operating Systems', 'os', 'https://i.imgur.com/CMe34Hc.jpg', 'https://drive.google.com/drive/folders/1x563LnVW1JoTaMT3zv9t5t2d8ktgnjM4'),
(2, 'Software Engineering', 'sen', 'https://i.imgur.com/vp35lhA.jpg', 'https://drive.google.com/drive/folders/1krLf8Cwg4hQzpuV8fu-KrCjR_nFgnZPZ'),
(3, 'Theory of Computation', 'toc', 'https://i.imgur.com/pdTWIBu.jpg', 'https://drive.google.com/drive/folders/1AflsbwQKPbpNHp1FP_9TdC3SINcjM3Ta'),
(5, 'Data Structures and Algorithms', 'dsa', 'https://i.imgur.com/grpUZ8Y.jpg', 'https://drive.google.com/drive/folders/1BVsu-W2-XwWTxQQNEJU94mcmoQyg94x4');

-- --------------------------------------------------------

--
-- Table structure for table `BookReferences`
--

DROP TABLE IF EXISTS `BookReferences`;
CREATE TABLE `BookReferences` (
  `reference_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `book_reference_name` varchar(255) NOT NULL,
  `book_reference_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `BookReferences`
--

INSERT INTO `BookReferences` (`reference_id`, `book_id`, `book_reference_name`, `book_reference_link`) VALUES
(1, 1, 'Gate Smashers', 'https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p'),
(2, 1, 'Neso Academy', 'https://youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O'),
(3, 3, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i'),
(4, 3, 'Neso Academy', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev'),
(5, 5, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT'),
(6, 5, 'Neso Academy', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPd1Y'),
(7, 5, 'Jenny Lecture', 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU'),
(8, 5, 'Kunal Kushwaha', 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ'),
(9, 5, 'FreeCodeCamp', 'https://www.youtube.com/watch?v=zg9ih6SVACc&t=10015s');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminInfo`
--
ALTER TABLE `AdminInfo`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `BookData`
--
ALTER TABLE `BookData`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `BookReferences`
--
ALTER TABLE `BookReferences`
  ADD PRIMARY KEY (`reference_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AdminInfo`
--
ALTER TABLE `AdminInfo`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `BookData`
--
ALTER TABLE `BookData`
  MODIFY `book_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `BookReferences`
--
ALTER TABLE `BookReferences`
  MODIFY `reference_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

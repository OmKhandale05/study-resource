
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
(9, 5, 'FreeCodeCamp', 'https://www.youtube.com/watch?v=zg9ih6SVACc&t=10015s'),
(10, 6, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa'),
(11, 6, 'Abdul Bari', 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O'),
(12, 6, 'MIT OpenCourseWare', 'https://www.youtube.com/playlist?list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp'),
(13, 6, 'Space & Time Complexity', 'https://www.youtube.com/watch?v=mV3wrLBbuuE&list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ&index=24&t=6960s'),
(14, 8, 'Kunal Kushwaha', 'https://www.youtube.com/watch?v=IPvYjXCsTg8&t=1680s'),
(15, 8, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_'),
(16, 8, 'Neso Academy', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx'),
(17, 9, 'Digital Electronics', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm'),
(18, 9, 'Bharat Acharya(Recommended)', 'https://www.youtube.com/playlist?list=PLWSi8b2bBhm7bKvNPOln-sghqiHUcnH7V');

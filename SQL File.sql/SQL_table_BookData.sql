
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
  `book_folderlink` varchar(255) DEFAULT NULL,
  `admin_id` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `BookData`
--

INSERT INTO `BookData` (`book_id`, `book_title`, `book_route`, `book_image_src`, `book_folderlink`, `admin_id`) VALUES
(1, 'Operating Systems', 'os', 'https://i.imgur.com/CMe34Hc.jpg', 'https://drive.google.com/drive/folders/1x563LnVW1JoTaMT3zv9t5t2d8ktgnjM4', 2),
(2, 'Software Engineering', 'sen', 'https://i.imgur.com/vp35lhA.jpg', 'https://drive.google.com/drive/folders/1krLf8Cwg4hQzpuV8fu-KrCjR_nFgnZPZ', 2),
(3, 'Theory of Computation', 'toc', 'https://i.imgur.com/pdTWIBu.jpg', 'https://drive.google.com/drive/folders/1AflsbwQKPbpNHp1FP_9TdC3SINcjM3Ta', 2),
(5, 'Data Structures and Algorithms', 'dsa', 'https://i.imgur.com/grpUZ8Y.jpg', 'https://drive.google.com/drive/folders/1BVsu-W2-XwWTxQQNEJU94mcmoQyg94x4', 2),
(6, 'Design and Analysis of Algorit', 'daa', 'https://i.imgur.com/4izvWwI.jpg', 'https://drive.google.com/drive/folders/1eel1Q-IBwCgEnz6zb5XYiztZT5SBY2Q7', 2),
(8, 'Computer Networks', 'cn', 'https://i.imgur.com/OxYi4eY.jpg', 'https://drive.google.com/drive/folders/1NhbFARMpsiip5RYdIyRUNxnB0s-JPKPF?usp=sharing', 2),
(9, 'Digital logic Design and Micro', 'dldm', 'https://i.imgur.com/W0RWOKv.jpg', 'https://drive.google.com/drive/folders/1qIa0d-_qJ7jyWJZSH045RunCSvAOBYWe?usp=sharing', 2);

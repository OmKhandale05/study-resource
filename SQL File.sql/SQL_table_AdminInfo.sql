
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

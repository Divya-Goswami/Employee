DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `E.title` varchar(10) NOT NULL,
  `E.first_name` varchar(90) NOT NULL,
  `E.last_name` varchar(90) NOT NULL,
  `E.address1` text NOT NULL,
  `E.address2` text NOT NULL,
  `E.dob` date NOT NULL,
  `E.designation` varchar(90) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
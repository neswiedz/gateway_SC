--
-- Baza danych: `domomatik`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `actor`
--

CREATE TABLE IF NOT EXISTS `actor` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `element_id` int(9) unsigned NOT NULL DEFAULT '0',
  `room_id` int(9) unsigned NOT NULL DEFAULT '0',
  `coords` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=44 ;

--
-- Zrzut danych tabeli `actor`
--

INSERT INTO `actor` (`id`, `name`, `element_id`, `room_id`, `coords`) VALUES
(1, 'TARAS', 3, 11, '730,270'),
(2, 'SCHODY', 1, 17, '300,310'),
(5, 'KORYTARZ I', 1, 6, '522,624'),
(6, 'KUCHNIA', 1, 2, '699,775'),
(7, 'GABINET', 1, 4, '389,423'),
(8, 'SZAFKI', 3, 2, '764,837'),
(9, 'ŁAZIENKA I', 1, 5, '368,670'),
(10, 'WIATROŁAP', 1, 1, '518,812'),
(11, 'PRZEJŚCIE DO GARAŻU', 1, 8, '367,809'),
(12, 'NAD KOTŁOWNIĄ', 1, 10, '116,270'),
(13, 'WEJŚCIE', 1, 9, '540,900'),
(14, 'NAD GARAŻEM', 3, 9, '179,900'),
(15, 'ŁAZIENKA II', 1, 15, '390,534'),
(16, 'SYPIALNIA', 1, 14, '650,537'),
(17, 'PAWEŁ', 1, 13, '684,244'),
(18, 'KORYTARZ II', 1, 16, '527,354'),
(19, 'MACIEK', 1, 12, '415,120'),
(20, 'LAMPA BALKON', 1, 19, '540,660'),
(25, 'PŁOT ANDRZEJ', 3, 9, NULL),
(26, 'PRZY STUDNI', 5, 9, NULL),
(28, 'GRILL', 11, 10, NULL),
(30, 'SZOPA GARAŻ', 1, 10, NULL),
(31, 'ROL_TARAS', 25, 11, NULL),
(32, 'Rynny', 20, 9, '880,530'),
(42, 'TARAS', 11, 11, NULL),
(43, 'LAMPKI BALKONOWE', 11, 19, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `actor_status`
--

CREATE TABLE IF NOT EXISTS `actor_status` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `actor_id` int(9) unsigned NOT NULL DEFAULT '0',
  `channel_id` int(5) unsigned NOT NULL DEFAULT '0',
  `status` varchar(10) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=46 ;

--
-- Zrzut danych tabeli `actor_status`
--

INSERT INTO `actor_status` (`id`, `actor_id`, `channel_id`, `status`) VALUES
(2, 1, 1, '0'),
(3, 2, 1, '0'),
(4, 3, 1, '135'),
(5, 4, 1, '193'),
(6, 5, 1, '0'),
(7, 6, 1, '255'),
(8, 7, 1, '255'),
(9, 8, 1, '0'),
(10, 9, 1, '255'),
(11, 10, 1, '0'),
(12, 11, 1, '0'),
(13, 12, 1, '0'),
(14, 13, 1, '255'),
(15, 14, 1, '0'),
(16, 14, 2, '0'),
(17, 15, 1, '0'),
(18, 16, 1, '0'),
(19, 16, 2, '255'),
(20, 17, 1, '0'),
(21, 18, 1, '0'),
(22, 19, 1, '0'),
(23, 19, 2, '0'),
(24, 20, 1, '0'),
(25, 21, 1, '0'),
(26, 22, 1, '0'),
(27, 23, 1, '0'),
(28, 24, 1, '0'),
(29, 25, 1, '0'),
(30, 26, 1, '0'),
(31, 27, 1, '0'),
(32, 28, 1, '255'),
(33, 29, 1, '0'),
(34, 30, 1, '255'),
(35, 31, 1, '0'),
(36, 32, 1, '0'),
(37, 33, 1, '0'),
(38, 34, 1, '0'),
(39, 35, 1, '0'),
(40, 36, 1, '0'),
(41, 37, 1, '0'),
(42, 38, 1, '0'),
(43, 39, 1, '0'),
(44, 41, 1, '0'),
(45, 43, 1, '0');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `connection`
--

CREATE TABLE IF NOT EXISTS `connection` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(9) unsigned NOT NULL DEFAULT '0',
  `device_channel` int(5) unsigned NOT NULL DEFAULT '0',
  `element_type` enum('ACTOR','SENSOR') COLLATE utf8_polish_ci NOT NULL DEFAULT 'ACTOR',
  `element_id` int(9) unsigned NOT NULL DEFAULT '0',
  `element_channel` int(5) unsigned NOT NULL DEFAULT '0',
  `connection_type` enum('NC','NO') COLLATE utf8_polish_ci NOT NULL DEFAULT 'NC',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=90 ;

--
-- Zrzut danych tabeli `connection`
--

INSERT INTO `connection` (`id`, `device_id`, `device_channel`, `element_type`, `element_id`, `element_channel`, `connection_type`) VALUES
(2, 1, 2, 'ACTOR', 42, 1, 'NC'),
(5, 1, 5, 'ACTOR', 25, 1, 'NC'),
(6, 1, 6, 'ACTOR', 26, 1, 'NC'),
(8, 2, 2, 'ACTOR', 28, 1, 'NC'),
(10, 2, 4, 'ACTOR', 30, 1, 'NC'),
(12, 2, 6, 'ACTOR', 14, 1, 'NC'),
(89, 3, 5, 'ACTOR', 9, 1, 'NC'),
(14, 3, 2, 'ACTOR', 5, 1, 'NC'),
(15, 3, 3, 'ACTOR', 7, 1, 'NC'),
(16, 3, 4, 'ACTOR', 11, 1, 'NC'),
(85, 3, 1, 'ACTOR', 6, 1, 'NC'),
(18, 3, 6, 'ACTOR', 8, 1, 'NC'),
(19, 4, 1, 'ACTOR', 12, 1, 'NC'),
(20, 4, 2, 'ACTOR', 1, 1, 'NC'),
(21, 4, 3, 'ACTOR', 2, 1, 'NC'),
(22, 4, 4, 'ACTOR', 10, 1, 'NC'),
(23, 4, 5, 'ACTOR', 13, 1, 'NO'),
(24, 4, 6, 'ACTOR', 32, 1, 'NC'),
(25, 5, 1, 'ACTOR', 31, 1, 'NC'),
(26, 6, 1, 'SENSOR', 27, 1, 'NC'),
(27, 7, 1, 'SENSOR', 26, 1, 'NC'),
(60, 16, 2, 'ACTOR', 19, 1, 'NC'),
(61, 16, 3, 'ACTOR', 16, 1, 'NC'),
(62, 16, 4, 'ACTOR', 18, 1, 'NC'),
(88, 17, 2, 'ACTOR', 20, 1, 'NC'),
(64, 16, 6, 'ACTOR', 17, 1, 'NC'),
(65, 17, 1, 'ACTOR', 15, 1, 'NC'),
(87, 18, 2, 'ACTOR', 43, 1, 'NO');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `device`
--

CREATE TABLE IF NOT EXISTS `device` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `device_type_id` int(9) unsigned NOT NULL DEFAULT '0',
  `description` varchar(16) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `group_id` int(3) unsigned NOT NULL DEFAULT '0',
  `item_id` int(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=21 ;

--
-- Zrzut danych tabeli `device`
--

INSERT INTO `device` (`id`, `device_type_id`, `description`, `group_id`, `item_id`) VALUES
(1, 3, 'T1.1.1', 11, 1),
(2, 3, 'T1.1.2', 11, 2),
(3, 3, 'T1.1.3', 11, 3),
(4, 3, 'T1.1.4', 11, 4),
(5, 6, 'T1.2.1', 12, 1),
(6, 8, 'T1.2.2', 12, 2),
(7, 8, 'T1.2.3', 12, 3),
(8, 17, 'Sypialnia IT', 30, 4),
(9, 1, 'T1.4.1', 14, 1),
(10, 1, 'T1.4.2', 14, 2),
(11, 1, 'T1.4.3', 14, 3),
(12, 1, 'T1.4.4', 14, 4),
(13, 1, 'T1.4.5', 14, 5),
(14, 1, 'T1.4.6', 14, 6),
(15, 6, 'T1.3.1', 13, 1),
(16, 3, 'T2.1.1', 21, 1),
(17, 3, 'T2.1.2', 21, 2),
(18, 3, 'T2.3.1', 23, 1),
(19, 1, 'T2.3.2', 23, 2),
(20, 1, 'T.2.3', 23, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `device_action`
--

CREATE TABLE IF NOT EXISTS `device_action` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(9) unsigned NOT NULL DEFAULT '0',
  `trigger_id` int(9) unsigned NOT NULL DEFAULT '0',
  `trigger_type` enum('ACTOR','SENSOR') COLLATE utf8_polish_ci NOT NULL DEFAULT 'ACTOR',
  `channel_id` int(5) unsigned NOT NULL DEFAULT '0',
  `delay` int(5) unsigned NOT NULL DEFAULT '0',
  `action_id` int(5) unsigned NOT NULL DEFAULT '0',
  `action_params` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `device_info`
--

CREATE TABLE IF NOT EXISTS `device_info` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(9) unsigned NOT NULL DEFAULT '0',
  `device_attribute` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `device_value` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=141 ;

--
-- Zrzut danych tabeli `device_info`
--

INSERT INTO `device_info` (`id`, `device_id`, `device_attribute`, `device_value`) VALUES
(1, 1, 'TYPE', '0x3000'),
(2, 1, 'FIRMWARE', '1.0.2.1'),
(3, 1, 'BOOTLOADER', '2.6'),
(4, 1, 'UNIV_VERSION', '1.0 rev.9'),
(5, 1, 'DESCRIPTION', 'przekaznik M 6ch'),
(6, 1, 'PROCESSOR_ID', '000001cf'),
(7, 1, 'VOLTAGE', '13.2375366568915'),
(8, 2, 'TYPE', '0x3000'),
(9, 2, 'FIRMWARE', '1.0.2.1'),
(10, 2, 'BOOTLOADER', '2.6'),
(11, 2, 'UNIV_VERSION', '1.0 rev.9'),
(12, 2, 'DESCRIPTION', 'przekaznik M 6ch'),
(13, 2, 'PROCESSOR_ID', '0000020c'),
(14, 2, 'VOLTAGE', '14.1915933528837'),
(15, 3, 'TYPE', '0x3000'),
(16, 3, 'FIRMWARE', '1.0.2.1'),
(17, 3, 'BOOTLOADER', '2.6'),
(18, 3, 'UNIV_VERSION', '1.0 rev.9'),
(19, 3, 'DESCRIPTION', 'przekaznik M 6ch'),
(20, 3, 'PROCESSOR_ID', '0000020b'),
(21, 3, 'VOLTAGE', '13.3269794721408'),
(22, 4, 'TYPE', '0x3000'),
(23, 4, 'FIRMWARE', '1.0.2.1'),
(24, 4, 'BOOTLOADER', '2.6'),
(25, 4, 'UNIV_VERSION', '1.0 rev.9'),
(26, 4, 'DESCRIPTION', 'przekaznik M 6ch'),
(27, 4, 'PROCESSOR_ID', '000001db'),
(28, 4, 'VOLTAGE', '13.1182795698925'),
(29, 5, 'TYPE', '0x3000'),
(30, 5, 'FIRMWARE', '1.0.7.1'),
(31, 5, 'BOOTLOADER', '2.6'),
(32, 5, 'UNIV_VERSION', '1.0 rev.9'),
(33, 5, 'DESCRIPTION', 'ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ'),
(34, 5, 'PROCESSOR_ID', 'ff00010c'),
(35, 5, 'VOLTAGE', '11.6871945259042'),
(36, 6, 'TYPE', '0x3000'),
(37, 6, 'FIRMWARE', '1.0.6.22'),
(38, 6, 'BOOTLOADER', '2.6'),
(39, 6, 'UNIV_VERSION', '1.0 rev.9'),
(40, 6, 'DESCRIPTION', 'sciemniaczRCsal\0'),
(41, 6, 'PROCESSOR_ID', '000002c5'),
(42, 6, 'VOLTAGE', '13.41642228739'),
(43, 7, 'TYPE', '0x3000'),
(44, 7, 'FIRMWARE', '1.0.6.2'),
(45, 7, 'BOOTLOADER', '2.6'),
(46, 7, 'UNIV_VERSION', '1.0 rev.9'),
(47, 7, 'DESCRIPTION', 'sciemniaczRCwyk\0'),
(48, 7, 'PROCESSOR_ID', '000001d9'),
(49, 7, 'VOLTAGE', '13.3567937438905'),
(50, 8, 'TYPE', '0x3000'),
(51, 8, 'FIRMWARE', '1.0.3.2'),
(52, 8, 'BOOTLOADER', '2.6'),
(53, 8, 'UNIV_VERSION', '1.0 rev.9'),
(54, 8, 'DESCRIPTION', 'CzujnikRC Rodz \0'),
(55, 8, 'PROCESSOR_ID', '0000021c'),
(56, 8, 'VOLTAGE', '14.1617790811339'),
(57, 9, 'TYPE', '0x3000'),
(58, 9, 'FIRMWARE', '1.0.255.1'),
(59, 9, 'BOOTLOADER', '2.6'),
(60, 9, 'UNIV_VERSION', '1.0 rev.9'),
(61, 9, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(62, 9, 'PROCESSOR_ID', '00000210'),
(63, 9, 'VOLTAGE', '13.177908113392'),
(64, 10, 'TYPE', '0x3000'),
(65, 10, 'FIRMWARE', '1.0.255.1'),
(66, 10, 'BOOTLOADER', '2.6'),
(67, 10, 'UNIV_VERSION', '1.0 rev.9'),
(68, 10, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(69, 10, 'PROCESSOR_ID', '00000206'),
(70, 10, 'VOLTAGE', '13.3866080156403'),
(71, 11, 'TYPE', '0x3000'),
(72, 11, 'FIRMWARE', '1.0.255.1'),
(73, 11, 'BOOTLOADER', '2.6'),
(74, 11, 'UNIV_VERSION', '1.0 rev.9'),
(75, 11, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(76, 11, 'PROCESSOR_ID', '0000020f'),
(77, 11, 'VOLTAGE', '13.297165200391'),
(78, 12, 'TYPE', '0x3000'),
(79, 12, 'FIRMWARE', '1.0.255.1'),
(80, 12, 'BOOTLOADER', '2.6'),
(81, 12, 'UNIV_VERSION', '1.0 rev.9'),
(82, 12, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(83, 12, 'PROCESSOR_ID', '00000211'),
(84, 12, 'VOLTAGE', '13.4462365591398'),
(85, 13, 'TYPE', '0x3000'),
(86, 13, 'FIRMWARE', '1.0.255.1'),
(87, 13, 'BOOTLOADER', '2.6'),
(88, 13, 'UNIV_VERSION', '1.0 rev.9'),
(89, 13, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(90, 13, 'PROCESSOR_ID', '0000020e'),
(91, 13, 'VOLTAGE', '13.41642228739'),
(92, 14, 'TYPE', '0x3000'),
(93, 14, 'FIRMWARE', '1.0.255.1'),
(94, 14, 'BOOTLOADER', '2.6'),
(95, 14, 'UNIV_VERSION', '1.0 rev.9'),
(96, 14, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(97, 14, 'PROCESSOR_ID', '0000020d'),
(98, 14, 'VOLTAGE', '13.4760508308895'),
(99, 15, 'TYPE', '0x3000'),
(100, 15, 'FIRMWARE', '1.0.7.1'),
(101, 15, 'BOOTLOADER', '2.6'),
(102, 15, 'UNIV_VERSION', '1.0 rev.9'),
(103, 15, 'DESCRIPTION', 'ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ'),
(104, 15, 'PROCESSOR_ID', 'ff00010d'),
(105, 15, 'VOLTAGE', '11.6871945259042'),
(106, 16, 'TYPE', '0x3000'),
(107, 16, 'FIRMWARE', '1.0.2.1'),
(108, 16, 'BOOTLOADER', '2.6'),
(109, 16, 'UNIV_VERSION', '1.0 rev.9'),
(110, 16, 'DESCRIPTION', 'przekaznik M 6ch'),
(111, 16, 'PROCESSOR_ID', '00000207'),
(112, 16, 'VOLTAGE', '14.519550342131'),
(113, 17, 'TYPE', '0x3000'),
(114, 17, 'FIRMWARE', '1.0.2.1'),
(115, 17, 'BOOTLOADER', '2.6'),
(116, 17, 'UNIV_VERSION', '1.0 rev.9'),
(117, 17, 'DESCRIPTION', 'przekaznik M 6ch'),
(118, 17, 'PROCESSOR_ID', '00000208'),
(119, 17, 'VOLTAGE', '14.1915933528837'),
(120, 18, 'TYPE', '0x3000'),
(121, 18, 'FIRMWARE', '1.0.2.1'),
(122, 18, 'BOOTLOADER', '2.6'),
(123, 18, 'UNIV_VERSION', '1.0 rev.9'),
(124, 18, 'DESCRIPTION', 'przekaznik M 6ch'),
(125, 18, 'PROCESSOR_ID', '00000209'),
(126, 18, 'VOLTAGE', '14.1319648093842'),
(127, 19, 'TYPE', '0x3000'),
(128, 19, 'FIRMWARE', '1.0.255.1'),
(129, 19, 'BOOTLOADER', '2.6'),
(130, 19, 'UNIV_VERSION', '1.0 rev.9'),
(131, 19, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(132, 19, 'PROCESSOR_ID', '000001d5'),
(133, 19, 'VOLTAGE', '14.1021505376344'),
(134, 20, 'TYPE', '0x3000'),
(135, 20, 'FIRMWARE', '1.0.255.1'),
(136, 20, 'BOOTLOADER', '2.6'),
(137, 20, 'UNIV_VERSION', '1.0 rev.9'),
(138, 20, 'DESCRIPTION', 'Button_6CH\0\0\0\0\0\0'),
(139, 20, 'PROCESSOR_ID', '00000212'),
(140, 20, 'VOLTAGE', '14.2810361681329');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `device_schedule`
--

CREATE TABLE IF NOT EXISTS `device_schedule` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(9) unsigned NOT NULL DEFAULT '0',
  `start_at` int(9) unsigned NOT NULL DEFAULT '0',
  `code` varchar(16) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `status` enum('DONE','WAITING') COLLATE utf8_polish_ci NOT NULL DEFAULT 'WAITING',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `device_status`
--

CREATE TABLE IF NOT EXISTS `device_status` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(9) unsigned NOT NULL DEFAULT '0',
  `channel_id` int(5) unsigned NOT NULL DEFAULT '0',
  `status` varchar(10) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=102 ;

--
-- Zrzut danych tabeli `device_status`
--

INSERT INTO `device_status` (`id`, `device_id`, `channel_id`, `status`) VALUES
(1, 1, 1, '0'),
(2, 1, 2, '0'),
(3, 1, 3, '0'),
(4, 1, 4, '0'),
(5, 1, 5, '0'),
(6, 1, 6, '0'),
(7, 2, 1, '0'),
(8, 2, 2, '255'),
(9, 2, 3, '0'),
(10, 2, 4, '255'),
(11, 2, 5, '0'),
(12, 2, 6, '0'),
(13, 3, 1, '255'),
(14, 3, 2, '0'),
(15, 3, 3, '255'),
(16, 3, 4, '0'),
(17, 3, 5, '255'),
(18, 3, 6, '0'),
(19, 4, 1, '0'),
(20, 4, 2, '0'),
(21, 4, 3, '0'),
(22, 4, 4, '0'),
(23, 4, 5, '0'),
(24, 4, 6, '0'),
(25, 5, 1, '0'),
(26, 5, 2, '0'),
(27, 5, 3, '0'),
(28, 5, 4, '0'),
(29, 6, 1, '143'),
(30, 7, 1, '0'),
(31, 8, 1, '0'),
(32, 9, 1, '0'),
(33, 9, 2, '0'),
(34, 9, 3, '0'),
(35, 9, 4, '0'),
(36, 9, 5, '0'),
(37, 9, 6, '0'),
(38, 10, 1, '0'),
(39, 10, 2, '0'),
(40, 10, 3, '0'),
(41, 10, 4, '0'),
(42, 10, 5, '0'),
(43, 10, 6, '255'),
(44, 11, 1, '0'),
(45, 11, 2, '255'),
(46, 11, 3, '0'),
(47, 11, 4, '0'),
(48, 11, 5, '0'),
(49, 11, 6, '255'),
(50, 12, 1, '255'),
(51, 12, 2, '255'),
(52, 12, 3, '0'),
(53, 12, 4, '0'),
(54, 12, 5, '0'),
(55, 12, 6, '0'),
(56, 13, 1, '255'),
(57, 13, 2, '255'),
(58, 13, 3, '255'),
(59, 13, 4, '0'),
(60, 13, 5, '0'),
(61, 13, 6, '0'),
(62, 14, 1, '255'),
(63, 14, 2, '255'),
(64, 14, 3, '255'),
(65, 14, 4, '0'),
(66, 14, 5, '255'),
(67, 14, 6, '255'),
(68, 15, 1, '0'),
(69, 15, 2, '0'),
(70, 15, 3, '0'),
(71, 15, 4, '0'),
(72, 16, 1, '0'),
(73, 16, 2, '0'),
(74, 16, 3, '0'),
(75, 16, 4, '0'),
(76, 16, 5, '255'),
(77, 16, 6, '0'),
(78, 17, 1, '0'),
(79, 17, 2, '0'),
(80, 17, 3, '0'),
(81, 17, 4, '0'),
(82, 17, 5, '0'),
(83, 17, 6, '0'),
(84, 18, 1, '0'),
(85, 18, 2, '255'),
(86, 18, 3, '0'),
(87, 18, 4, '0'),
(88, 18, 5, '0'),
(89, 18, 6, '0'),
(90, 19, 1, '0'),
(91, 19, 2, '0'),
(92, 19, 3, '0'),
(93, 19, 4, '0'),
(94, 19, 5, '0'),
(95, 19, 6, '0'),
(96, 20, 1, '255'),
(97, 20, 2, '0'),
(98, 20, 3, '0'),
(99, 20, 4, '0'),
(100, 20, 5, '0'),
(101, 20, 6, '0');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `device_type`
--

CREATE TABLE IF NOT EXISTS `device_type` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `icon` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `channels` int(5) unsigned NOT NULL DEFAULT '0',
  `type` enum('ACTOR','SENSOR','LOGIC') COLLATE utf8_polish_ci NOT NULL DEFAULT 'ACTOR',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=18 ;

--
-- Zrzut danych tabeli `device_type`
--

INSERT INTO `device_type` (`id`, `name`, `icon`, `channels`, `type`) VALUES
(1, 'BUTTON 3CH DIN', 'mod_wej3ch_din', 6, 'SENSOR'),
(2, 'RELAY 2CH 230V DIN', 'mod_wyj2ch_din', 2, 'ACTOR'),
(3, 'RELAY 6CH 230V DIN', 'mod_wyj6ch_din', 6, 'ACTOR'),
(4, 'RELAY 6CH 10V DIN', 'mod_wyj6ch_10_din', 6, 'ACTOR'),
(5, 'IT IR DIN', 'mod_it_ir_din', 1, 'SENSOR'),
(6, 'BLIND 4CH DIN', 'mod_blind_din', 4, 'ACTOR'),
(7, 'TEMPERATURE DIN', 'mod_temp_din', 1, 'SENSOR'),
(8, 'DIMMER DIN', 'mod_dimmer_din', 1, 'ACTOR'),
(9, 'MOD_WWW DIN', 'mod_www_din', 1, 'LOGIC'),
(10, 'MOD_GSM DIN', 'mod_gsm_din', 1, 'LOGIC'),
(11, 'BUTTON 8CH KM', 'mod_wej8ch_km', 8, 'SENSOR'),
(12, 'RELAY 1CH 230V KM', 'mod_wyj_km', 1, 'ACTOR'),
(13, 'RELAY 2CH 230V KM', 'mod_wyj2ch_km', 2, 'ACTOR'),
(14, 'RELAY 1CH 10V KM', 'mod_wyj_10_km', 1, 'ACTOR'),
(15, 'RELAY 2CH 10V KM', 'mod_wyj2ch_10_km', 2, 'ACTOR'),
(16, 'TEMPERATURE KM', 'mod_temp_km', 1, 'SENSOR'),
(17, 'IT IR KM', 'mod_it_ir_km', 1, 'SENSOR');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `element`
--

CREATE TABLE IF NOT EXISTS `element` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `type` enum('ACTOR','SENSOR') COLLATE utf8_polish_ci NOT NULL DEFAULT 'ACTOR',
  `icon` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `channels` int(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=44 ;

--
-- Zrzut danych tabeli `element`
--

INSERT INTO `element` (`id`, `name`, `type`, `icon`, `channels`) VALUES
(1, 'Lampa sufitowa 1CH', 'ACTOR', 'actor_lamp_suf_1', 1),
(2, 'Lampa sufitowa 2CH', 'ACTOR', 'actor_lamp_suf_2', 2),
(3, 'Kinkiet 1CH', 'ACTOR', 'actor_lamp_kin_1', 1),
(4, 'Kinkiet 2CH', 'ACTOR', 'actor_lamp_kin_2', 2),
(5, 'Lampa stojąca 1CH', 'ACTOR', 'actor_lamp_sto_1', 1),
(6, 'Lampa stojąca 2CH', 'ACTOR', 'actor_lamp_sto_2', 2),
(7, 'Lampa RGB', 'ACTOR', 'actor_lamp_rgb', 1),
(8, 'Lampa R', 'ACTOR', 'actor_lamp_r', 1),
(9, 'Lampa G', 'ACTOR', 'actor_lamp_g', 1),
(10, 'Lampa B', 'ACTOR', 'actor_lamp_b', 1),
(11, 'Kontakt 1CH', 'ACTOR', 'actor_kontakt_1', 1),
(12, 'Kontakt 2CH', 'ACTOR', 'actor_kontakt_2', 2),
(13, 'Telewizor', 'ACTOR', 'actor_telewizor', 1),
(14, 'Odtwarzacz video', 'ACTOR', 'actor_video', 1),
(15, 'Wieża Hi-Fi', 'ACTOR', 'actor_radio', 1),
(16, 'Sprzet audio-video', 'ACTOR', 'actor_sprzet_hifi', 1),
(17, 'Kamera', 'ACTOR', 'actor_kamera', 1),
(18, 'Wentylator', 'ACTOR', 'actor_wentylator', 1),
(19, 'Klimatyzator', 'ACTOR', 'actor_klimatyzator', 1),
(20, 'Kaloryfer', 'ACTOR', 'actor_kaloryfer', 1),
(21, 'Piec grzewczy', 'ACTOR', 'actor_piec', 1),
(22, 'Zawór ciepła', 'ACTOR', 'actor_zawor', 1),
(23, 'Pompa', 'ACTOR', 'actor_pompa', 1),
(24, 'Markiza', 'ACTOR', 'actor_markiza', 1),
(25, 'Rolety', 'ACTOR', 'actor_rolety', 1),
(26, 'Żaluzje', 'ACTOR', 'actor_zaluzje', 1),
(27, 'Zraszacz', 'ACTOR', 'actor_zraszacz', 1),
(28, 'Brama garażowa', 'ACTOR', 'actor_brama_garazowa', 1),
(29, 'Brama skrzydłowa', 'ACTOR', 'actor_brama_skrzydlowa', 1),
(30, 'Brama suwana', 'ACTOR', 'actor_brama_suwana', 1),
(31, 'Włącznik 1CH', 'SENSOR', 'sensor_wlacz_1ch', 1),
(32, 'Włącznik 2CH', 'SENSOR', 'sensor_wlacz_2ch', 2),
(33, 'Włącznik 3CH', 'SENSOR', 'sensor_wlacz_3ch', 3),
(34, 'Włącznik regulowany', 'SENSOR', 'sensor_wlacz_regul', 1),
(35, 'Czujnik ruchu', 'SENSOR', 'sensor_czuj_ruchu', 1),
(36, 'Czujnik dymu', 'SENSOR', 'sensor_czuj_dymu', 1),
(37, 'Czujnik gazu', 'SENSOR', 'sensor_czuj_gazu', 1),
(38, 'Czujnik zalania', 'SENSOR', 'sensor_czuj_zalania', 1),
(39, 'Czujnik temperatory', 'SENSOR', 'sensor_czuj_temp', 1),
(40, 'Alarm centrala', 'SENSOR', 'sensor_alarm', 1),
(41, 'Alarm manipulator', 'SENSOR', 'sensor_alarm_klaw', 1),
(42, 'Czytnik kart', 'SENSOR', 'sensor_alarm_czytnik', 1),
(43, 'Odbiornik podczerwieni', 'SENSOR', 'sensor_odbiornik_it', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `group_room`
--

CREATE TABLE IF NOT EXISTS `group_room` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `item_order` int(9) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=4 ;

--
-- Zrzut danych tabeli `group_room`
--

INSERT INTO `group_room` (`id`, `name`, `item_order`) VALUES
(1, 'Parter', 1),
(2, 'I piętro', 2),
(3, 'Na zewnątrz', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `icon` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `group_id` int(9) unsigned NOT NULL DEFAULT '0',
  `group_order` int(9) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=20 ;

--
-- Zrzut danych tabeli `room`
--

INSERT INTO `room` (`id`, `name`, `icon`, `group_id`, `group_order`) VALUES
(1, 'Wiatrołap', 'room_korytarz', 1, 1),
(2, 'Kuchnia', 'room_kuchnia', 1, 2),
(3, 'Salon', 'room_salon', 1, 3),
(4, 'Sypialnia', 'room_sypialnia', 1, 4),
(5, 'Łazienka', 'room_lazienka', 1, 5),
(6, 'Korytarz', 'room_korytarz', 1, 6),
(7, 'Garaż', 'room_garaz', 1, 7),
(8, 'Pomieszczenie gospodarcze', 'room_inne', 1, 8),
(9, 'Ogród przed domem', 'room_ogrod', 3, 1),
(10, 'Ogród za domem', 'room_ogrod', 3, 2),
(11, 'Taras', 'room_balkon', 3, 3),
(12, 'Mała sypialnia', 'room_sypialnia', 2, 1),
(13, 'Duża sypialnia', 'room_sypialnia', 2, 2),
(14, 'Sypialnia rodziców', 'room_salon', 2, 3),
(15, 'Łazienka', 'room_lazienka', 2, 4),
(16, 'Korytarz', 'room_korytarz', 2, 5),
(17, 'Schody', 'room_inne', 2, 6),
(18, 'Schowek', 'room_inne', 2, 7),
(19, 'Balkon południowy', 'room_balkon', 2, 8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sensor`
--

CREATE TABLE IF NOT EXISTS `sensor` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `element_id` int(9) unsigned NOT NULL DEFAULT '0',
  `room_id` int(9) unsigned NOT NULL DEFAULT '0',
  `coords` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=28 ;

--
-- Zrzut danych tabeli `sensor`
--

INSERT INTO `sensor` (`id`, `name`, `element_id`, `room_id`, `coords`) VALUES
(27, 'SALON KOMINEK', 34, 3, NULL),
(26, 'SALON WYKUSZ', 34, 3, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sensor_status`
--

CREATE TABLE IF NOT EXISTS `sensor_status` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `sensor_id` int(9) unsigned NOT NULL DEFAULT '0',
  `channel_id` int(5) unsigned NOT NULL DEFAULT '0',
  `status` varchar(10) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=40 ;

--
-- Zrzut danych tabeli `sensor_status`
--

INSERT INTO `sensor_status` (`id`, `sensor_id`, `channel_id`, `status`) VALUES
(39, 27, 1, '143'),
(38, 26, 1, '0');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `setting`
--

CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `value` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(45) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `password` varchar(45) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  `username` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=3 ;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `username`) VALUES
(1, 'domomatik', '13e6d8687650dfcc4f1ea9bdc90507f1', 'Domomatik - konto Super'),
(2, 'admin', '13e6d8687650dfcc4f1ea9bdc90507f1', 'Administrator');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Sze 17. 14:40
-- Kiszolgáló verziója: 10.4.25-MariaDB
-- PHP verzió: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `countdown`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `controller`
--

CREATE TABLE `controller` (
  `controller_id` int(255) NOT NULL,
  `controller_name` varchar(255) NOT NULL,
  `controller_key` varchar(255) NOT NULL,
  `controller_creationdate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `controller`
--
ALTER TABLE `controller`
  ADD PRIMARY KEY (`controller_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `controller`
--
ALTER TABLE `controller`
  MODIFY `controller_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

DELIMITER $$
--
-- Események
--
CREATE DEFINER=`root`@`localhost` EVENT `delete_older_records_that_one_day` ON SCHEDULE EVERY 1 DAY STARTS '2024-09-18 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM controller
  WHERE controller_creationdate < CURDATE() - INTERVAL 1 DAY$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

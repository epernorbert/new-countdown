-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Aug 30. 16:19
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
  `controller_key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `controller`
--

INSERT INTO `controller` (`controller_id`, `controller_name`, `controller_key`) VALUES
(1, 'test', 'sad123asd2');

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
  MODIFY `controller_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

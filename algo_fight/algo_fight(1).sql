-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 24 juin 2021 à 05:35
-- Version du serveur :  5.7.21
-- Version de PHP :  7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `algo_fight`
--

-- --------------------------------------------------------

--
-- Structure de la table `algos`
--

DROP TABLE IF EXISTS `algos`;
CREATE TABLE IF NOT EXISTS `algos` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'NoName',
  `nameId` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `victoryCount` int(11) NOT NULL DEFAULT '0',
  `fairCount` int(11) NOT NULL DEFAULT '0',
  `defeatCount` int(11) NOT NULL DEFAULT '0',
  `jeu` varchar(100) NOT NULL DEFAULT 'morpion',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `algos`
--

INSERT INTO `algos` (`id`, `name`, `nameId`, `content`, `victoryCount`, `fairCount`, `defeatCount`, `jeu`) VALUES
(33, 'Vincent', 'Vincent#33', '\r\n    // Pour configurer votre IA :\r\n    // écrivez le contenu de la fonction, celle ci prend comme argument \"board\" qui est le tableau de l\'exemple ci dessus\r\n    \r\n    //Votre fonction doit retourner un nombre entre 1 et 9, désignant une case comme l\'exemple au dessus.\r\n    //Si vous rendez un numéro de case déjà selectionné, ou autre chose qu\'un nombre entre 1 et 9, alors votre IA jouera une case randomisée entre 1 et 9 (ce qui peut vous permettre de jouer une case random consciemment aussi)\r\n    \r\n    //EXEMPLE DE CODE  :\r\n//si la première case est vide\r\n    if(board[0][1] == \"\"){\r\n\r\n//alors je joue en case 1\r\n        return 1;\r\n\r\n//Si la première case est déjà cochée par le joueur 1\r\n    }else if(board[0][1]==\"O\"){\r\n    \r\n//Alors jouer en case 2\r\n    return 2;\r\n    }\r\n\r\n//sinon, je joue sur n\'importe quelle case de libre\r\n    else{\r\n        return \"Random\";\r\n    }\r\n', 1, 0, 10, 'morpion'),
(34, 'Philippe', 'Philippe#34', '\r\n    // Pour configurer votre IA :\r\n    // écrivez le contenu de la fonction, celle ci prend comme argument \"board\" qui est le tableau de l\'exemple ci dessus\r\n    \r\n    //Votre fonction doit retourner un nombre entre 1 et 9, désignant une case comme l\'exemple au dessus.\r\n    //Si vous rendez un numéro de case déjà selectionné, ou autre chose qu\'un nombre entre 1 et 9, alors votre IA jouera une case randomisée entre 1 et 9 (ce qui peut vous permettre de jouer une case random consciemment aussi)\r\n    \r\n    //EXEMPLE DE CODE  :\r\n//si la première case est vide\r\n    if(board[0][1] == \"\"){\r\n\r\n//alors je joue en case 1\r\n        return 1;\r\n\r\n//Si la première case est déjà cochée par le joueur 1\r\n    }else if(board[0][1]==\"O\"){\r\n    \r\n//Alors jouer en case 2\r\n    return 2;\r\n    }\r\n\r\n//sinon, je joue sur n\'importe quelle case de libre\r\n    else{\r\n        return \"Random\";\r\n    }\r\n', 10, 0, 1, 'morpion'),
(35, 'Vincent', 'Vincent#35', '\r\n    // Pour configurer votre IA :\r\n    // écrivez le contenu de la fonction, celle ci prend comme argument \"board\" qui est le tableau de l\'exemple ci dessus\r\n    \r\n    //Votre fonction doit retourner un nombre entre 1 et 9, désignant une case comme l\'exemple au dessus.\r\n    //Si vous rendez un numéro de case déjà selectionné, ou autre chose qu\'un nombre entre 1 et 9, alors votre IA jouera une case randomisée entre 1 et 9 (ce qui peut vous permettre de jouer une case random consciemment aussi)\r\n    \r\n    //EXEMPLE DE CODE  :\r\n//si la première case est vide\r\n    if(board[0][1] == \"\"){\r\n\r\n//alors je joue en case 1\r\n        return 1;\r\n\r\n//Si la première case est déjà cochée par le joueur 1\r\n    }else if(board[0][1]==\"O\"){\r\n    \r\n//Alors jouer en case 2\r\n    return 2;\r\n    }\r\n\r\n//sinon, je joue sur n\'importe quelle case de libre\r\n    else{\r\n        return \"Random\";\r\n    }\r\n', 0, 0, 0, 'morpion'),
(36, 'Philippoooooti', 'Philippoooooti#36', 'oaoadzoiazdiojzdajiozda', 0, 0, 0, 'morpion'),
(37, 'Vincentkyyk', 'Vincentkyyk#37', 'return \"Random\";', 0, 0, 0, 'morpion'),
(38, 'Philippoooooti', 'Philippoooooti#38', 'oaoadzoiazdiojzdajiozda', 0, 0, 0, 'morpion');

-- --------------------------------------------------------

--
-- Structure de la table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_algo1` varchar(255) DEFAULT NULL,
  `id_algo2` varchar(255) DEFAULT NULL,
  `isValid_algo1` tinyint(1) NOT NULL DEFAULT '1',
  `isValid_algo2` tinyint(1) NOT NULL DEFAULT '1',
  `iterations` int(5) DEFAULT '0',
  `victoryCountJ1` int(5) DEFAULT '0',
  `victoryCountJ2` int(5) DEFAULT '0',
  `fairCount` int(5) DEFAULT '0',
  `jeu` varchar(10) NOT NULL DEFAULT 'morpion',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COMMENT='doute sur les booleans sur les "isValid" : 0 :false; 1 true';

--
-- Déchargement des données de la table `games`
--

INSERT INTO `games` (`id`, `id_algo1`, `id_algo2`, `isValid_algo1`, `isValid_algo2`, `iterations`, `victoryCountJ1`, `victoryCountJ2`, `fairCount`, `jeu`) VALUES
(23, 'Philippe#34', 'Vincent#33', 1, 1, 5, 3, 2, 0, 'morpion'),
(24, 'Philippe#34', 'Vincent#33', 1, 1, 5, 2, 2, 1, 'morpion'),
(25, 'Philippe#34', 'Vincent#33', 1, 1, 5, 3, 1, 1, 'morpion'),
(26, 'Philippe#34', 'Vincent#33', 1, 1, 5, 2, 3, 0, 'morpion'),
(27, 'Philippe#34', 'Vincent#33', 1, 1, 5, 3, 1, 1, 'morpion'),
(28, 'Philippe#34', 'Vincent#33', 1, 1, 5, 4, 1, 0, 'morpion'),
(29, 'Philippe#34', 'Vincent#33', 1, 1, 5, 5, 0, 0, 'morpion'),
(30, 'Philippe#34', 'Vincent#33', 1, 1, 5, 3, 0, 2, 'morpion'),
(31, 'Philippe#34', 'Vincent#33', 1, 1, 5, 2, 2, 1, 'morpion'),
(32, 'Philippe#34', 'Vincent#33', 1, 1, 5, 4, 0, 1, 'morpion'),
(33, 'Philippe#34', 'Vincent#33', 1, 1, 5, 3, 1, 1, 'morpion'),
(34, 'Philippe#34', 'Vincent#33', 1, 1, 5, 3, 0, 2, 'morpion'),
(35, 'Philippe#34', 'Vincent#33', 1, 1, 5, 4, 1, 0, 'morpion');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

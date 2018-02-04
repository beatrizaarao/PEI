-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 04-Fev-2018 às 16:34
-- Versão do servidor: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id4056546_uniline`
--
CREATE SCHEMA IF NOT EXISTS `id4056546_uniline` DEFAULT CHARACTER SET utf8 ;
USE `id4056546_uniline` ;
--
-- Estrutura da tabela `ADMINISTRATOR`
--

CREATE TABLE `ADMINISTRATOR` (
  `id_ADMINISTRATOR` int(11) NOT NULL,
  `Username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `deploy` int(11) NOT NULL,
  `IS_LOGGED` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ADMINISTRATOR`
--

INSERT INTO `ADMINISTRATOR` (`id_ADMINISTRATOR`, `Username`, `PASSWORD`, `deploy`, `IS_LOGGED`) VALUES
(1, 'encomenda.uniline', 'admin123', 1, 1),
(2, 'madalenaa.castro', 'Teste123', 1, 0),
(3, 'luismarques24', 'olaola', 1, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ADMIN_MESSAGE`
--

CREATE TABLE `ADMIN_MESSAGE` (
  `idMESSAGES` int(11) NOT NULL,
  `SUBJECT` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CONTENT` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Tipo` int(11) NOT NULL,
  `client_mail` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `IS_READ` int(11) NOT NULL,
  `IS_FAVORITE` int(11) NOT NULL,
  `Data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ADMIN_MESSAGE`
--

INSERT INTO `ADMIN_MESSAGE` (`idMESSAGES`, `SUBJECT`, `CONTENT`, `Tipo`, `client_mail`, `IS_READ`, `IS_FAVORITE`, `Data`) VALUES
(15, 'ff', 'fsdf', 1, 'beatrizaarao@gmail.com', 1, 0, '2018-02-02'),
(16, 'ola', 'aai', 1, 'beatrizaarao@gmail.com', 1, 0, '2018-02-02'),
(17, 'teste', 'teste', 1, 'beatrizaarao@gmail.com', 1, 0, '2018-02-02');

-- --------------------------------------------------------

--
-- Estrutura da tabela `CLIENT`
--

CREATE TABLE `CLIENT` (
  `NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `NIF` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `PHONE` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `STREET` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `DOOR_NUMBER` int(11) DEFAULT NULL,
  `CITY` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `COUNTRY` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `ZIP_CODE` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `PASS` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `IS_BLOCKED` int(1) NOT NULL,
  `img_path` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IS_APPROVED` int(3) NOT NULL,
  `data_registo` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `CLIENT`
--

INSERT INTO `CLIENT` (`NAME`, `NIF`, `EMAIL`, `PHONE`, `STREET`, `DOOR_NUMBER`, `CITY`, `COUNTRY`, `ZIP_CODE`, `PASS`, `IS_BLOCKED`, `img_path`, `IS_APPROVED`, `data_registo`) VALUES
('Madalena', '123456', 'mada@mail', '123', 'oal', 3, 'braga', 'jj', '123', '345', 0, NULL, 1, '2018-02-22'),
('Beatriz Aarão', '123456789', 'beatrizaarao@gmail.com', '919999999', 'Rua Teixeira Pascoais-229', 2, 'Guimarães', 'PT', '4810-073', 'bea123', 1, NULL, 1, '2018-01-31');

-- --------------------------------------------------------

--
-- Estrutura da tabela `DEPLOY`
--

CREATE TABLE `DEPLOY` (
  `NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `ID` int(11) NOT NULL,
  `EMAIL` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `PHONE` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `ADRESS` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `WEBPAGE_LINK` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `URL_ICON` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `FACEBOOK_LINK` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TWITTER_LINK` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `STATISTICS` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NIF` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `DEPLOY`
--

INSERT INTO `DEPLOY` (`NAME`, `ID`, `EMAIL`, `PHONE`, `ADRESS`, `WEBPAGE_LINK`, `URL_ICON`, `FACEBOOK_LINK`, `TWITTER_LINK`, `STATISTICS`, `NIF`) VALUES
('PeugasLDA.', 1, 'peugas@teste.com', '253000000', 'Rua da Travessa_4000-300_Guimarães_Portugal', 'http://www.etpeugas.com/pt/', 'https://icon-icons.com/icons2/390/PNG/512/socks_39463.png', 'https://www.facebook.com/peugas.co/', 'https://twitter.com/PeugasFilisa', '1000', 123456789);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Incompatibilities`
--

CREATE TABLE `Incompatibilities` (
  `idIncompatibilities` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `OPCAO`
--

CREATE TABLE `OPCAO` (
  `id_OPTION` int(11) NOT NULL,
  `NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `VALOR` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SERVICE_id_SERVICE` int(11) NOT NULL,
  `IS_CHECKBOX` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `OPCAO`
--

INSERT INTO `OPCAO` (`id_OPTION`, `NAME`, `DESCRIPTION`, `VALOR`, `SERVICE_id_SERVICE`, `IS_CHECKBOX`) VALUES
(1, 'LI intervalo inicial', 'larguraii', '100', 4, 0),
(2, 'LI intervalo final', 'larguraif', '50', 4, 0),
(5, 'Meio Branco', 'meiobranco', NULL, 9, 1),
(11, 'EI', 'ei', NULL, 25, 1),
(12, 'RM', 'rm', NULL, 25, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `OPTION_has_Incompatibilities`
--

CREATE TABLE `OPTION_has_Incompatibilities` (
  `Incompatibilities_idIncompatibilities` int(11) NOT NULL,
  `OPTION_id_option` int(11) NOT NULL,
  `SERVICE_id_SERVICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `ORDEM`
--

CREATE TABLE `ORDEM` (
  `ID_ORDER` int(11) NOT NULL,
  `BEGIN_DATE` date NOT NULL,
  `CLOSE_DATE` date DEFAULT NULL,
  `Client_NIF` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `ASKED_DELIVERY_DATE` date NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ORDEM`
--

INSERT INTO `ORDEM` (`ID_ORDER`, `BEGIN_DATE`, `CLOSE_DATE`, `Client_NIF`, `ASKED_DELIVERY_DATE`, `STATUS`) VALUES
(1, '2018-02-07', NULL, '123456789', '2018-02-09', 2),
(49, '2018-02-14', NULL, '123456', '2018-02-06', 0),
(50, '2018-03-15', NULL, '123456789', '2018-02-07', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ORDER_STEP_SERVICE_OPTION`
--

CREATE TABLE `ORDER_STEP_SERVICE_OPTION` (
  `ID_ORDER` int(11) NOT NULL,
  `id_STEP` int(11) NOT NULL,
  `id_SERVICE` int(11) NOT NULL,
  `id_OPTION` int(11) DEFAULT NULL,
  `SERVICE_valor` varchar(200) DEFAULT NULL,
  `opcao_valor` int(100) DEFAULT NULL,
  `insertionDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `ORDER_STEP_SERVICE_OPTION`
--

INSERT INTO `ORDER_STEP_SERVICE_OPTION` (`ID_ORDER`, `id_STEP`, `id_SERVICE`, `id_OPTION`, `SERVICE_valor`, `opcao_valor`, `insertionDate`) VALUES
(1, 1, 1, NULL, 'Algodão', NULL, '2018-02-03 14:40:38'),
(1, 1, 4, 1, NULL, 100, '2018-02-03 14:40:39'),
(1, 1, 4, 2, NULL, 500, '2018-02-03 15:47:42'),
(1, 2, 9, 5, NULL, NULL, '2018-02-03 14:40:39'),
(1, 2, 11, NULL, NULL, NULL, '2018-02-03 14:41:05'),
(1, 4, 23, NULL, NULL, NULL, '2018-02-03 14:41:18'),
(1, 5, 25, 11, NULL, NULL, '2018-02-03 14:41:34'),
(1, 5, 25, 12, NULL, NULL, '2018-02-03 14:41:50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `SERVICE`
--

CREATE TABLE `SERVICE` (
  `id_SERVICE` int(11) NOT NULL,
  `NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `STEP_id_step` int(11) DEFAULT NULL,
  `VALOR` text COLLATE utf8_unicode_ci,
  `IS_CHECKBOX` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `SERVICE`
--

INSERT INTO `SERVICE` (`id_SERVICE`, `NAME`, `DESCRIPTION`, `STEP_id_step`, `VALOR`, `IS_CHECKBOX`) VALUES
(1, 'Composição', 'composicao', 1, NULL, 0),
(4, 'Largura Inicial', 'largurai', 1, NULL, 0),
(9, 'Branquear', 'branquear', 2, NULL, 1),
(11, 'Mercerizar', 'mercerizar', 2, NULL, 1),
(23, 'Sanforizar', 'sanforizar', 4, NULL, 1),
(25, 'Enfestar', 'enfestar', 5, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `STEP`
--

CREATE TABLE `STEP` (
  `id_STEP` int(11) NOT NULL,
  `NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `STEP`
--

INSERT INTO `STEP` (`id_STEP`, `NAME`, `DESCRIPTION`) VALUES
(1, 'Definição do Produto', 'defProduto'),
(2, 'Preparação', 'preparacao'),
(4, 'Acabamento', 'acabamentos'),
(5, 'Embalagem', 'embalagem');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Task`
--

CREATE TABLE `Task` (
  `ID_TASK` int(11) NOT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `STATE` int(1) NOT NULL,
  `Client_NIF` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Tipo` int(2) NOT NULL,
  `dataPedido` date NOT NULL,
  `Ordem_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Task`
--

INSERT INTO `Task` (`ID_TASK`, `DESCRIPTION`, `STATE`, `Client_NIF`, `Tipo`, `dataPedido`, `Ordem_ID`) VALUES
(10, 'O cliente com o NIF=123456789pretende registar-se na aplicação', 0, '123456789', 0, '2018-01-31', NULL),
(11, 'Cancelar encomenda', 1, '123456789', 1, '2018-02-07', 1),
(12, 'Alterar encomenda', 0, '123456', 2, '2018-02-14', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  ADD PRIMARY KEY (`id_ADMINISTRATOR`),
  ADD KEY `fk_ADMINISTRATOR_DEPLOY_idx` (`deploy`);

--
-- Indexes for table `ADMIN_MESSAGE`
--
ALTER TABLE `ADMIN_MESSAGE`
  ADD PRIMARY KEY (`idMESSAGES`);

--
-- Indexes for table `CLIENT`
--
ALTER TABLE `CLIENT`
  ADD PRIMARY KEY (`NIF`);

--
-- Indexes for table `DEPLOY`
--
ALTER TABLE `DEPLOY`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Incompatibilities`
--
ALTER TABLE `Incompatibilities`
  ADD PRIMARY KEY (`idIncompatibilities`);

--
-- Indexes for table `OPCAO`
--
ALTER TABLE `OPCAO`
  ADD PRIMARY KEY (`id_OPTION`),
  ADD KEY `fk_OPTION_SERVICE1_idx` (`SERVICE_id_SERVICE`);

--
-- Indexes for table `OPTION_has_Incompatibilities`
--
ALTER TABLE `OPTION_has_Incompatibilities`
  ADD PRIMARY KEY (`Incompatibilities_idIncompatibilities`,`OPTION_id_option`,`SERVICE_id_SERVICE`),
  ADD KEY `fk_OPTION_has_Incompatibilities_Incompatibilities1_idx` (`Incompatibilities_idIncompatibilities`),
  ADD KEY `fk_INC_option` (`OPTION_id_option`),
  ADD KEY `fk_OPTION_has_Incompatibilities_SERVICE1_idx` (`SERVICE_id_SERVICE`);

--
-- Indexes for table `ORDEM`
--
ALTER TABLE `ORDEM`
  ADD PRIMARY KEY (`ID_ORDER`),
  ADD KEY `fk_ORDER_Client1` (`Client_NIF`);

--
-- Indexes for table `ORDER_STEP_SERVICE_OPTION`
--
ALTER TABLE `ORDER_STEP_SERVICE_OPTION`
  ADD PRIMARY KEY (`ID_ORDER`,`id_STEP`,`id_SERVICE`,`insertionDate`),
  ADD KEY `id_STEP` (`id_STEP`),
  ADD KEY `id_SERVICE` (`id_SERVICE`),
  ADD KEY `id_OPTION` (`id_OPTION`);

--
-- Indexes for table `SERVICE`
--
ALTER TABLE `SERVICE`
  ADD PRIMARY KEY (`id_SERVICE`),
  ADD KEY `fk_SERVICE_STEP` (`STEP_id_step`);

--
-- Indexes for table `STEP`
--
ALTER TABLE `STEP`
  ADD PRIMARY KEY (`id_STEP`);

--
-- Indexes for table `Task`
--
ALTER TABLE `Task`
  ADD PRIMARY KEY (`ID_TASK`),
  ADD KEY `fk_Task_Client1_idx` (`Client_NIF`),
  ADD KEY `fk_Task_Ordem_idx` (`Ordem_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  MODIFY `id_ADMINISTRATOR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ADMIN_MESSAGE`
--
ALTER TABLE `ADMIN_MESSAGE`
  MODIFY `idMESSAGES` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `OPCAO`
--
ALTER TABLE `OPCAO`
  MODIFY `id_OPTION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ORDEM`
--
ALTER TABLE `ORDEM`
  MODIFY `ID_ORDER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `SERVICE`
--
ALTER TABLE `SERVICE`
  MODIFY `id_SERVICE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `STEP`
--
ALTER TABLE `STEP`
  MODIFY `id_STEP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Task`
--
ALTER TABLE `Task`
  MODIFY `ID_TASK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  ADD CONSTRAINT `fk_ADMINISTRATOR_deploy1` FOREIGN KEY (`deploy`) REFERENCES `Deploy` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `OPCAO`
--
ALTER TABLE `OPCAO`
  ADD CONSTRAINT `fk_OPTION_SERVICE1` FOREIGN KEY (`SERVICE_id_SERVICE`) REFERENCES `SERVICE` (`id_SERVICE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `OPTION_has_Incompatibilities`
--
ALTER TABLE `OPTION_has_Incompatibilities`
  ADD CONSTRAINT `fk_INC_option` FOREIGN KEY (`OPTION_id_option`) REFERENCES `OPCAO` (`id_OPTION`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OPTION_has_Incompatibilities_Incompatibilities1` FOREIGN KEY (`Incompatibilities_idIncompatibilities`) REFERENCES `Incompatibilities` (`idIncompatibilities`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OPTION_has_Incompatibilities_SERVICE1` FOREIGN KEY (`SERVICE_id_SERVICE`) REFERENCES `SERVICE` (`id_SERVICE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `ORDEM`
--
ALTER TABLE `ORDEM`
  ADD CONSTRAINT `fk_ORDER_Client1` FOREIGN KEY (`Client_NIF`) REFERENCES `CLIENT` (`NIF`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `ORDER_STEP_SERVICE_OPTION`
--
ALTER TABLE `ORDER_STEP_SERVICE_OPTION`
  ADD CONSTRAINT `order_step_service_option_ibfk_1` FOREIGN KEY (`ID_ORDER`) REFERENCES `ordem` (`ID_ORDER`),
  ADD CONSTRAINT `order_step_service_option_ibfk_2` FOREIGN KEY (`id_STEP`) REFERENCES `step` (`id_STEP`),
  ADD CONSTRAINT `order_step_service_option_ibfk_3` FOREIGN KEY (`id_SERVICE`) REFERENCES `service` (`id_SERVICE`),
  ADD CONSTRAINT `order_step_service_option_ibfk_4` FOREIGN KEY (`id_OPTION`) REFERENCES `opcao` (`id_OPTION`);

--
-- Limitadores para a tabela `SERVICE`
--
ALTER TABLE `SERVICE`
  ADD CONSTRAINT `fk_SERVICE_STEP` FOREIGN KEY (`STEP_id_step`) REFERENCES `STEP` (`id_STEP`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `Task`
--
ALTER TABLE `Task`
  ADD CONSTRAINT `fk_Task_Client1` FOREIGN KEY (`Client_NIF`) REFERENCES `CLIENT` (`NIF`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Task_Ordem` FOREIGN KEY (`Ordem_ID`) REFERENCES `Ordem` (`ID_ORDER`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

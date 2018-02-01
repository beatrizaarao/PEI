-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 31-Jan-2018 às 15:28
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
  `EMAIL` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `COMPANY_id` int(11) NOT NULL,
  `IS_LOGGED` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ADMINISTRATOR`
--

INSERT INTO `ADMINISTRATOR` (`id_ADMINISTRATOR`, `EMAIL`, `PASSWORD`, `COMPANY_id`, `IS_LOGGED`) VALUES
(1, 'encomenda.uniline@gmail.com', 'admin123', 1, 1);

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
('Beatriz Aarão', '123456789', 'beatrizaarao@gmail.com', '919999999', 'Rua Teixeira Pascoais-229', 2, 'Guimarães', 'PT', '4810-073', 'bea123', 1, NULL, 1, '2018-01-31');

-- --------------------------------------------------------

--
-- Estrutura da tabela `COMPANY`
--

CREATE TABLE `COMPANY` (
  `id_COMPANY` int(11) NOT NULL,
  `PHONE` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `STREET` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `CITY` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `COUNTRY` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `COMPANY`
--

INSERT INTO `COMPANY` (`id_COMPANY`, `PHONE`, `STREET`, `CITY`, `COUNTRY`) VALUES
(0, '1232345', 'wedwed', 'wedwed', 'weded'),
(1, 'wsqsw', 'qwsqws', 'qws', 'qws');

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

-- --------------------------------------------------------

--
-- Estrutura da tabela `ORDER_STEP_SERVICE_OPTION`
--

CREATE TABLE `ORDER_STEP_SERVICE_OPTION` (
  `ID_ORDER` int(11) NOT NULL,
  `id_STEP` int(11) NOT NULL,
  `id_SERVICE` int(11) NOT NULL,
  `id_OPTION` int(11) DEFAULT NULL,
  `SERVICE_valor` text default null, 
  `opcao_valor` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Estrutura da tabela `STEP`
--

CREATE TABLE `STEP` (
  `id_STEP` int(11) NOT NULL,
  `NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(10, 'O cliente com o NIF=123456789pretende registar-se na aplicação', 1, '123456789', 0, '2018-01-31', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  ADD PRIMARY KEY (`id_ADMINISTRATOR`),
  ADD KEY `fk_ADMINISTRATOR_COMPANY1_idx` (`COMPANY_id`);

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
-- Indexes for table `COMPANY`
--
ALTER TABLE `COMPANY`
  ADD PRIMARY KEY (`id_COMPANY`);

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
  ADD PRIMARY KEY (`ID_ORDER`,`id_STEP`,`id_SERVICE`),
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
  MODIFY `id_ADMINISTRATOR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ADMIN_MESSAGE`
--
ALTER TABLE `ADMIN_MESSAGE`
  MODIFY `idMESSAGES` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `OPCAO`
--
ALTER TABLE `OPCAO`
  MODIFY `id_OPTION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ORDEM`
--
ALTER TABLE `ORDEM`
  MODIFY `ID_ORDER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
  MODIFY `ID_TASK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `ADMINISTRATOR`
--
ALTER TABLE `ADMINISTRATOR`
  ADD CONSTRAINT `fk_ADMINISTRATOR_COMPANY1` FOREIGN KEY (`COMPANY_id`) REFERENCES `COMPANY` (`id_COMPANY`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
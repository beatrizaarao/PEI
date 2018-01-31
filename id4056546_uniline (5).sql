-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 30-Jan-2018 às 13:03
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

--
-- Extraindo dados da tabela `ADMIN_MESSAGE`
--

INSERT INTO `ADMIN_MESSAGE` (`idMESSAGES`, `SUBJECT`, `CONTENT`, `Tipo`, `client_mail`, `IS_READ`, `IS_FAVORITE`, `Data`) VALUES
(0, 'ewec', 'wecec', 2, 'dddd', 1, 0, '2018-01-02'),
(4, 'ff', 'ff', 2, 'beatrizaarao@gmail.com', 1, 0, '2018-01-09'),
(5, 'testeinbox', 'ola mundo', 2, 'bea', 0, 1, '2018-01-17'),
(6, 'coisa1', 'olq', 2, 'beq', 0, 1, '2018-01-03'),
(7, 'Avaliação entre pares', 'Boa noite,\r\nComo requerido envio em anexo a avaliação entre pares.\r\nCumprimentos,\r\nBeatriz Aarão', 0, 'beatrizaarao@gmail.com', 1, 1, '2018-01-01'),
(9, 'wewec', 'wcwec', 2, 'ddd', 0, 0, '2018-01-10'),
(10, 'ola', 'bea', 1, 'bea2', 0, 1, '2018-01-28'),
(11, 'teste', 'teste1', 1, 'teste2', 0, 0, '2018-01-28'),
(12, 'ss', 'ssss', 1, 'bea@mail.com', 1, 0, '2018-01-28');

-- --------------------------------------------------------

--
-- Estrutura da tabela `CLIENT`
--

CREATE TABLE `CLIENT` (
  `NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `NIF` int(11) NOT NULL,
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
('teste', 123, 'teste@', '123', 'ddfdfdf', 11, 'port', 'hu', '123123', 'dkdkfndf', 0, '123', 0, '2018-01-10'),
('Maria', 1233, 'qwdqdqwd', 'qwd', 'qwd', 2, 'qwd', 'qwd', 'qwd', 'qwd', 0, NULL, 1, '2018-01-20'),
('joaquina', 3333, 'dddd', 'ddd', 'ddd', 3, 'ddd', 'dd', 'ss', 'ss', 0, NULL, 1, '2017-12-06'),
('blcaganita', 3523, 'dsdfsdf', '23333', 'rrr', 3, 'rrr', 'rr', 'rr', 'ola', 1, NULL, 1, '2017-12-06'),
('João', 123123, 'wdwd', '123123', 'sqs', 33, 'qdd', 'dqd', 'qdqd', 'qdq', 0, NULL, 1, '2018-01-15'),
('CAGANITA2', 2343456, 'caganita2@email.com', '1232345', 'Rua das Joaquinas', 9, 'Braga', 'Espanha', '1234-123', '234566', 0, NULL, 1, '2017-10-10'),
('Caganita3', 3454567, 'caganita3@email.com', '123234345', 'Rua das Madalenas', 4, 'Coimbra', 'França', '1234-234', '12312323', 0, NULL, 1, '2018-01-18'),
('Caganita5', 4565677, 'caganita5@email.com', '123123123', 'Rua das Cecilias', 5, 'Fafe', 'Inglaterra', '123-123', 'ddddddd', 0, NULL, 1, '2017-11-08'),
('CAGANITA4', 45645456, 'caganita4@email.com', '123234234', 'Rua das Beatrizes', 8, 'Braga', 'Luxemburgo', '2345-234', '234234234', 0, '45645456.jpg', 1, '2017-12-20'),
('bea joaquina', 111111111, 'bea@ola', '123111111', 'Rua Teixeira Pascoais-229', 3, 'Guimarães', 'PT', '4810-073', '123', 1, NULL, 0, '2018-01-30'),
('Caganita', 123456789, 'caganita@email.com', '123456789', 'Rua das Flores', 3, 'Guimarães', 'Portugal', '1234-123', '123456', 0, NULL, 1, '2017-11-08');

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
  `DESCRIPTION` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `VALOR` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SERVICE_id_SERVICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `OPCAO`
--

/*INSERT INTO `OPCAO` (`id_OPTION`, `DESCRIPTION`, `TYPE`, `SERVICE_id_SERVICE`) VALUES
(1, 'Q', '0', 16),
(2, 'F', '0', 16),
(3, 'EM', '0', 19),
(4, 'EI', '0', 19);
*/
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
  `Client_NIF` int(11) NOT NULL,
  `ASKED_DELIVERY_DATE` date NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `ORDEM`
--

/*INSERT INTO `ORDEM` (`ID_ORDER`, `BEGIN_DATE`, `CLOSE_DATE`, `Client_NIF`, `ASKED_DELIVERY_DATE`, `STATUS`) VALUES
(1, '2018-01-10', '2018-01-27', 2343456, '2018-01-27', 2),
(2, '2018-01-17', NULL, 2343456, '2018-01-09', 1),
(3, '2018-02-09', NULL, 4565677, '2018-01-03', 0),
(4, '2017-01-05', NULL, 2343456, '2018-01-10', 0),
(5, '2017-01-11', NULL, 45645456, '2018-01-24', 0),
(6, '2017-01-28', NULL, 45645456, '2018-01-03', 0),
(7, '2018-01-20', NULL, 3454567, '2018-01-10', 0);
*/
-- --------------------------------------------------------

--
-- Estrutura da tabela `ORDER_STEP_SERVICE_OPTION`
--

CREATE TABLE `ORDER_STEP_SERVICE_OPTION` (
  `ID_ORDER` int(11) NOT NULL,
  `id_STEP` int(11) NOT NULL,
  `id_SERVICE` int(11) NOT NULL,
  `id_OPTION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `SERVICE`
--

CREATE TABLE `SERVICE` (
  `id_SERVICE` int(11) NOT NULL,
  `DESCRIPTION` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `STEP_id_step` int(11) DEFAULT NULL,
  `VALOR` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `SERVICE`
--

/*INSERT INTO `SERVICE` (`id_SERVICE`, `DESCRIPTION`, `STEP_id_step`, `VALOR`) VALUES
(1, 'Composição', 1, 'CETIM'),
(2, 'Ponto', 1, 'Ponto Pequinez'),
(3, 'Peso, Largura e Quantidade', 1, NULL),
(4, 'Caderno de Encargos', 1, 'O tecido é muito lindo'),
(5, 'Gazar', 2, NULL),
(6, 'Branquear', 2, NULL),
(7, 'Lavar', 2, NULL),
(8, 'Mercerizar', 2, NULL),
(9, 'Reativo', 3, NULL),
(10, 'Cuba', 3, NULL),
(11, 'Pigmentos', 3, NULL),
(12, 'Panton', 3, NULL),
(13, 'Secar', 4, NULL),
(14, 'Acabar', 4, NULL),
(15, 'Largura', 4, NULL),
(16, 'Calandar', 4, NULL),
(17, 'Sanfonizar', 4, NULL),
(18, 'Tumbler', 4, NULL),
(19, 'Enfestar', 5, NULL);
*/
-- --------------------------------------------------------

--
-- Estrutura da tabela `STEP`
--

CREATE TABLE `STEP` (
  `id_STEP` int(11) NOT NULL,
  `DESCRIPTION` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `STEP`
--

/*INSERT INTO `STEP` (`id_STEP`, `DESCRIPTION`) VALUES
(1, 'Definição do Produto'),
(2, 'Preparação'),
(3, 'Tinturaria'),
(4, 'Acabamento'),
(5, 'Embalagem');
*/
-- --------------------------------------------------------

--
-- Estrutura da tabela `Task`
--

CREATE TABLE `Task` (
  `ID_TASK` int(11) NOT NULL,
  `DESCRIPTION` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `STATE` int(1) NOT NULL,
  `Client_NIF` int(11) DEFAULT NULL,
  `Tipo` int(2) NOT NULL,
  `dataPedido` date NOT NULL,
  `Ordem_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `Task`
--

INSERT INTO `Task` (`ID_TASK`, `DESCRIPTION`, `STATE`, `Client_NIF`, `Tipo`, `dataPedido`, `Ordem_ID`) VALUES
(2, 'O cliente Caganita4 pretende registar-se na aplicação', 1, 45645456, 0, '2018-01-10', NULL),
(3, 'Tarefa2', 0, 3454567, 0, '2018-01-04', NULL),
(4, 'Tarefa3', 0, 45645456, 2, '2018-02-22', 1),
(6, 'O cliente Caganita2 pretende cancelar a encomenda 1', 1, 2343456, 1, '2018-01-12', 1),
(8, 'O cliente com o NIF=123 pretende registar-se na aplicação', 0, 123, 0, '2018-01-30', NULL);

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
  ADD PRIMARY KEY (`ID_ORDER`,`id_STEP`,`id_SERVICE`,`id_OPTION`),
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
  MODIFY `idMESSAGES` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `OPCAO`
--
ALTER TABLE `OPCAO`
  MODIFY `id_OPTION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ORDEM`
--
ALTER TABLE `ORDEM`
  MODIFY `ID_ORDER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `SERVICE`
--
ALTER TABLE `SERVICE`
  MODIFY `id_SERVICE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `STEP`
--
ALTER TABLE `STEP`
  MODIFY `id_STEP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Task`
--
ALTER TABLE `Task`
  MODIFY `ID_TASK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  ADD CONSTRAINT `fk_INC_option` FOREIGN KEY (`OPTION_id_option`) REFERENCES `OPTION` (`id_OPTION`) ON DELETE NO ACTION ON UPDATE NO ACTION,
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

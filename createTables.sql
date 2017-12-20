-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema uniline
-- -----------------------------------------------------
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`CLIENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CLIENT` (
  `NAME` NVARCHAR(45) NOT NULL,
  `NIF` INT NOT NULL,
  `EMAIL` NVARCHAR(45) NOT NULL,
  `PHONE` NVARCHAR(45) NOT NULL,
  `STREET` VARCHAR(45) NOT NULL,
  `DOOR_NUMBER` INT NULL,
  `CITY` VARCHAR(45) NOT NULL,
  `COUNTRY` VARCHAR(45) NOT NULL,
  `ZIP_CODE` VARCHAR(45) NOT NULL,
  `PASS` VARCHAR(45) NOT NULL,
  `IS_BLOCKED` BINARY NOT NULL,
  PRIMARY KEY (`NIF`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Task` (
  `ID_TASK` INT NOT NULL,
  `DESCRIPTION` VARCHAR(100) NOT NULL,
  `STATE` BINARY NOT NULL,
  `Client_NIF` INT NULL,
  PRIMARY KEY (`ID_TASK`),
  INDEX `fk_Task_Client1_idx` (`Client_NIF` ASC),
  CONSTRAINT `fk_Task_Client1`
    FOREIGN KEY (`Client_NIF`)
    REFERENCES `mydb`.`CLIENT` (`NIF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ORDER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ORDER` (
  `ID_ORDER` INT NOT NULL,
  `BEGIN_DATE` DATE NOT NULL,
  `CLOSE_DATE` DATE NULL,
  `Client_NIF` INT NOT NULL,
  `ASKED_DELIVERY_DATE` DATE NOT NULL,
  PRIMARY KEY (`ID_ORDER`),
  INDEX `fk_ORDER_Client1_idx` (`Client_NIF` ASC),
  CONSTRAINT `fk_ORDER_Client1`
    FOREIGN KEY (`Client_NIF`)
    REFERENCES `mydb`.`CLIENT` (`NIF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`COMPANY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`COMPANY` (
  `id_COMPANY` INT NOT NULL,
  `PHONE` NVARCHAR(45) NOT NULL,
  `STREET` NVARCHAR(45) NOT NULL,
  `CITY` NVARCHAR(45) NOT NULL,
  `COUNTRY` NVARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_COMPANY`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ADMINISTRATOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ADMINISTRATOR` (
  `id_ADMINISTRATOR` INT NOT NULL,
  `EMAIL` VARCHAR(45) NOT NULL,
  `PASSWORD` VARCHAR(45) NOT NULL,
  `COMPANY_id` INT NOT NULL,
  PRIMARY KEY (`id_ADMINISTRATOR`),
  INDEX `fk_ADMINISTRATOR_COMPANY1_idx` (`COMPANY_id` ASC),
  CONSTRAINT `fk_ADMINISTRATOR_COMPANY1`
    FOREIGN KEY (`COMPANY_id`)
    REFERENCES `mydb`.`COMPANY` (`id_COMPANY`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`STEP`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`STEP` (
  `id_STEP` INT NOT NULL,
  `DESCRIPTION` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_STEP`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`STEP_has_ORDER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`STEP_has_ORDER` (
  `STEP_id_STEP` INT NOT NULL,
  `ORDER_ID_ORDER` INT NOT NULL,
  PRIMARY KEY (`STEP_id_STEP`, `ORDER_ID_ORDER`),
  INDEX `fk_STEP_has_ORDER_ORDER1_idx` (`ORDER_ID_ORDER` ASC),
  INDEX `fk_STEP_has_ORDER_STEP1_idx` (`STEP_id_STEP` ASC),
  CONSTRAINT `fk_STEP_has_ORDER_STEP1`
    FOREIGN KEY (`STEP_id_STEP`)
    REFERENCES `mydb`.`STEP` (`id_STEP`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_STEP_has_ORDER_ORDER1`
    FOREIGN KEY (`ORDER_ID_ORDER`)
    REFERENCES `mydb`.`ORDER` (`ID_ORDER`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SERVICE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SERVICE` (
  `id_SERVICE` INT NULL,
  `DESCRIPTION` VARCHAR(45) NOT NULL,
  `STEP_id_STEP` INT NOT NULL,
  PRIMARY KEY (`id_SERVICE`),
  INDEX `fk_SERVICE_STEP1_idx` (`STEP_id_STEP` ASC),
  CONSTRAINT `fk_SERVICE_STEP1`
    FOREIGN KEY (`STEP_id_STEP`)
    REFERENCES `mydb`.`STEP` (`id_STEP`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`OPTION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`OPTION` (
  `id_OPTION` INT NOT NULL,
  `DESCRIPTION` VARCHAR(45) NOT NULL,
  `TYPE` BINARY NOT NULL,
  `SERVICE_id_SERVICE` INT NOT NULL,
  PRIMARY KEY (`id_OPTION`),
  INDEX `fk_OPTION_SERVICE1_idx` (`SERVICE_id_SERVICE` ASC),
  CONSTRAINT `fk_OPTION_SERVICE1`
    FOREIGN KEY (`SERVICE_id_SERVICE`)
    REFERENCES `mydb`.`SERVICE` (`id_SERVICE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Incompatibilities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Incompatibilities` (
  `idIncompatibilities` INT NULL,
  PRIMARY KEY (`idIncompatibilities`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`OPTION_has_Incompatibilities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`OPTION_has_Incompatibilities` (
  `OPTION_id_OPTION` INT NULL,
  `Incompatibilities_idIncompatibilities` INT NOT NULL,
  `SERVICE_id_SERVICE` INT NULL,
  PRIMARY KEY (`OPTION_id_OPTION`, `Incompatibilities_idIncompatibilities`, `SERVICE_id_SERVICE`),
  INDEX `fk_OPTION_has_Incompatibilities_Incompatibilities1_idx` (`Incompatibilities_idIncompatibilities` ASC),
  INDEX `fk_OPTION_has_Incompatibilities_OPTION1_idx` (`OPTION_id_OPTION` ASC),
  INDEX `fk_OPTION_has_Incompatibilities_SERVICE1_idx` (`SERVICE_id_SERVICE` ASC),
  CONSTRAINT `fk_OPTION_has_Incompatibilities_OPTION1`
    FOREIGN KEY (`OPTION_id_OPTION`)
    REFERENCES `mydb`.`OPTION` (`id_OPTION`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OPTION_has_Incompatibilities_Incompatibilities1`
    FOREIGN KEY (`Incompatibilities_idIncompatibilities`)
    REFERENCES `mydb`.`Incompatibilities` (`idIncompatibilities`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OPTION_has_Incompatibilities_SERVICE1`
    FOREIGN KEY (`SERVICE_id_SERVICE`)
    REFERENCES `mydb`.`SERVICE` (`id_SERVICE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`MESSAGE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`MESSAGE` (
  `idMESSAGES` INT NOT NULL,
  `SUBJECT` NVARCHAR(15) NULL,
  `CONTENT` NVARCHAR(500) NOT NULL,
  `CLIENT_NIF` INT NOT NULL,
  PRIMARY KEY (`idMESSAGES`),
  INDEX `fk_MESSAGE_CLIENT1_idx` (`CLIENT_NIF` ASC),
  CONSTRAINT `fk_MESSAGE_CLIENT1`
    FOREIGN KEY (`CLIENT_NIF`)
    REFERENCES `mydb`.`CLIENT` (`NIF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

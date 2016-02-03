DROP DATABASE IF EXISTS cash_it;

CREATE DATABASE cash_it;

USE cash_it;

CREATE TABLE salaries (
       id                  INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
       salary              INT(10) NOT NULL,
       companyName         VARCHAR(100) NOT NULL,
       position            VARCHAR(100) NOT NULL,
       location	      VARCHAR(100) NOT NULL,
       yearsOfExperience   INT(10) NOT NULL,
       isPFA               BOOLEAN NOT NULL,
       hasDiploma          BOOLEAN NOT NULL,
       year                VARCHAR(100) NOT NULL,
       submitterIP         VARCHAR(100) NOT NULL,
       KEY (id)
);
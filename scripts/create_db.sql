DROP DATABASE IF EXISTS cash_it;

CREATE DATABASE cash_it;

USE cash_it;

CREATE TABLE salaries (
       id                  INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
       salary              INT(10) NOT NULL,
       companyName         VARCHAR(10) NOT NULL,
       position            VARCHAR(50) NOT NULL,
       location			   VARCHAR(50) NOT NULL,
       yearsOfExperience   INT(10) NOT NULL,
       isPFA               BOOLEAN NOT NULL,
       hasDiploma          BOOLEAN NOT NULL,
       year                VARCHAR(50) NOT NULL,
       submitterIP         VARCHAR(50) NOT NULL,
       KEY (id)
);

INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(1,1,1,1,1,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(1,1,1,1,1,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(1,1,1,1,1,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(1,1,1,1,1,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(1,1,1,1,1,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(2,2,2,2,2,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(2,2,2,2,2,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(2,2,2,2,2,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(2,2,2,2,2,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(3,3,3,3,3,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(3,3,3,3,3,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(3,3,3,3,3,true,true,2016,0);
INSERT INTO salaries(salary, companyName, position, location, yearsOfExperience, isPFA, hasDiploma, year, submitterIP) 
       VALUES(3,3,3,3,3,true,true,2016,0);
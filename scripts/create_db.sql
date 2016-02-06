DROP DATABASE IF EXISTS cash_it;
 
CREATE DATABASE cash_it;
 
USE cash_it;
 
CREATE TABLE salaries (
       id                  INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
       salary              INT(10) NOT NULL,
       companyName         VARCHAR(100) NOT NULL,
       position            VARCHAR(100) NOT NULL,
       location            VARCHAR(100) NOT NULL,
       yearsOfExperience   INT(10) NOT NULL,
       isPFA               BOOLEAN NOT NULL,
       hasDiploma          BOOLEAN NOT NULL,
       year                VARCHAR(100) NOT NULL,
       submitterIP         VARCHAR(100) NOT NULL,
       KEY (id)
);
ALTER TABLE salaries ADD CONSTRAINT pk_salaries_id PRIMARY KEY (id);
 
CREATE TABLE tags (
       id                 INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
       name               VARCHAR(100) NOT NULL UNIQUE,
       KEY (id)
);
ALTER TABLE tags ADD CONSTRAINT pk_tags_id PRIMARY KEY (id);
 
CREATE TABLE salaries_cross_tags (
       id                 INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
       salary_id          INT(10) UNSIGNED NOT NULL,
       tag_id             INT(10) UNSIGNED NOT NULL,
       KEY (id)      
);

ALTER TABLE salaries_cross_tags ADD CONSTRAINT pk_salaries_cross_tags_id PRIMARY KEY (id);
ALTER TABLE salaries_cross_tags ADD CONSTRAINT fk_salaries_cross_tags_id FOREIGN KEY (salary_id) REFERENCES salaries (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE salaries_cross_tags ADD CONSTRAINT fk_salaries_cross_tags2_id FOREIGN KEY (tag_id) REFERENCES tags (id) ON UPDATE CASCADE ON DELETE CASCADE;
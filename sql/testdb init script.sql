-- sails dev demo db initialization script

-- create the testdb database and switch to testdb
create database if not exists testdb;
use testdb;

-- start creating our tables

-- entry table definition
create table if not exists entry 
(
	id int primary key,
    name nvarchar(100),
    entryCompetition int,
    createdAt datetime,
    updatedAt datetime
);

-- item table definition
create table if not exists item
(
	id int primary key,
    name nvarchar(100),
    attachment nvarchar(150),
    itemEntry int,
    createdAt datetime,
    updatedAt datetime
);
-- competition table definition
create table if not exists competition
(
	id int primary key,
    name nvarchar(100),
    year int,
    createdAt datetime,
    updatedAt datetime
);
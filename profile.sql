show DATABASES;

create DATABASE Company_Profile;

use Company_Profile;
 create table Contact(
    CId INT PRIMARY KEY,
    F_NAME VARCHAR (100) NOT NULL,
    L_NAME VARCHAR (100) NOT NULL,
    EMAIL VARCHAR (100) UNIQUE NOT NULL,
    TEL_NO VARCHAR (25) UNIQUE
 );
 create table Admin (
    AID INT PRIMARY KEY,
    CId INT,
    FOREIGN KEY
      (CId) References Contact(CId)
        On delete from table Contact cascade
        On update from table Contact cascade,
        USERNAME VARCHAR (100) UNIQUE NOT NULL,
        PASSWORD VARCHAR (100) NOT NULL
 );
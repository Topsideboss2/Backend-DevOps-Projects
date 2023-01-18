# Deploy Laravel Application

This is a step by step instruction on how laravel applications are deployed onto an **Apache Server** running on a **Linux Server with Ubuntu** operating system.

## Prerequisites
* An Operating System running Ubuntu Linux
* A root user with Sudo privileges
* Command Line Interface

## Step 1: [Install Apache on Ubuntu](https://techvblogs.com/blog/install-apache-on-ubuntu-20-04)
Apache HTTP Web Server (Apache) is an open-source web application for deploying web servers. If you have Apache already installed, you can skip this. If you have not installed Apache, then kindly click on the link above.

Simple commands you'll have to use:

| Command | Description |
| ------- | ----------- |
| `sudo apt-get update` | Refresh your local software package database to make sure you are accessing the latest versions |
| `sudo apt-get install apache2` | Installs the apache package in ubuntu |
| `sudo a2enmod rewrite` | Once Apache2 is installed, we have to enable Apache2 rewrite module |

## Step 2: Install mySQL 
Laravel uses a MariaDB or MySQL as a database backend. So you will need to create a database and user for Laravel.
Connect to the MySQL using the commands below:

| Command | Description |
| ------- | ----------- |
| `apt-get install mysql-server` | This command will install mysql |
| `mysql_secure_installation` | This command will secure mysql |
| ` mysql -u root -p` | This will log onto mysql shell without you providing any password |
| `show databases` | List databases |
| `UPDATE mysql.user SET authentication_string=null WHERE User='root';` | Changing mySQL root password |
| `FLUSH PRIVILEGES;` | Flush privileges |
| `ALTER USER 'root'@'localhost1 IDENTIFIED WITH mysql_native_password BY 'new_password';` | Set the new password for the root user using the Alter command |
| `FLUSH PRIVILEGES` | Flush privileges |
| `exit` | exit the mysql shell |


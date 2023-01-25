# Deploy Laravel Application

This is a step by step instruction on how **Laravel** applications are deployed onto an **Apache Server** running on a **Linux Server with Ubuntu** operating system.

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

## Step 3: Install PhpMyAdmin

**phpMyAdmin** was created so that users can interact with MySQL through a web interface. The following command will help you install and secure phpMyAdmin so that you can safely use it to manage your databases on your Ubuntu system.

| Command | Description |
| ------- | ----------- |
| `sudo apt-get install phpmyadmin` | Install phpMyAdmin |
| `sudo vim /etc/apache2/apache2.conf` | Open the apache2.conf file and add the command below to the bottom of the config file |
| `Include /etc/phpmyadmin/apache.conf` | Adds phpMyAdmin to apache2 |
| `sudo service aoache2 restart` | Restart Apache |

## Step 4: Install Composer

**Composer** is a dependency management too for PHP and was created mainly to facilitate installation and updates for project dependencies. It is a tool that determines the required packages and installs it on your system using the right version based on the project's need.
Also, depending on the version of composer that we need, we will have to install php version that is compatible with it.
**NB** - Composer is installed into the folder of the project. In my case the folder of my project was cloned into /var/www/investments-mark
| Command | Description |
| ------- | ----------- |
| `cd /var/www/investments-mark` | This will navigate me to my project folder |
| `sudo apt-get install composer -y` | Installs composer on the Ubuntu system |
| `composer install` | This will install composer onto our project folder |
| `sudo a2dismod php8.1` | This will disable the version of php we had previously installed|
| `sudo a2enmod php7.1` | This will enable the version of php that we currently require based on our project |
| `apt-get install php7.1-{BCMath,Ctype,curl,DOM,Fileinfo,Mbstring,PDO,Tokenizer,XML,zip,mysql,fpm}` | This will install php requirements |

## Step 5: Link storage to Public Disk

The `public` disk included in your application's filesystems configuration file is intended for files that are going to be publicly accessible. By default, the `public` disk uses the local driver and stores it in `storage/app/public`
To make these files accessible from the web, you should create a symbolic link from `public/storage` to `storage/app/public`. 

Use the command below:

| Command | Description |
| ------- | ----------- |
| `php artisan storage:link` | Creates a symbolic link from public/storage |

## Step 6: Change Folder Ownerships and File Permissions

| Command | Description |
| ------- | ----------- |
| `chown -R www-data:www-data investments-mark` | Change folder ownership |
| `chown -R 755 bootsrap/ public/ storage/` | Change file permissions |

## Step 7: Create Database

| Command | Description |
| ------- | ----------- |
| `mysql -u root -p` | Log into mysql providing your password |
| `create database investmentsmark;` | Create the database itself |
| `exit` | Exit

## Step 8: Update ENV file

| Command | Description |
| ------- | ----------- |
| `cp .env.example .env` | Copy the file from env.example to .env |
| `vim .env` | Update env file |
| `APP_NAME=Investments APP_URL=http://192.168.1.10:22 DB=DATABASE=investmentsmark` | 

## Step 9: Populate Your Database

| Command | Description |
| ------- | ----------- |
| `php artisan migrate` | Populate the database
| `php artisan key:generate` | Generate an encryption key

## Step 10: Serve on Apache

| Command | Description |
| ------- | ----------- |
| `sudo vim /etc/apache2/sites-available/investments-mark.conf` | Edit the configuration file |

Add the following lines:

 ```<VirtualHost *:8080>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/investments-mark/public

        DirectoryIndex index.php

        <Directory /var/www/investments-mark/public>
                Options Indexes FollowSymlinks Multiviews
                Require all granted
                AllowOverride All
                RewriteEngine On
                RewriteBase /var/www/investments-mark/public

        </Directory>
        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
``` 

## Step 11: Enable Apache Configuration File

| Command | Description |
| ------- | ----------- |
| `a2ensite investments-mark.conf` | Enable apache configuration file |
| `service apache2 restart` | Restart the Apache server to apply the changes|

## Step 12: Enable ports

| Command | Description |
| ------- | ----------- |
| `vim /etc/apache2/ports.conf` | Add the respective ports on the file |

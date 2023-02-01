# Web Server

## Setting up a Web Server

Setting up a **Web Server** is pretty simple and direct, others might find it a little daunting but it really should not be.

On your Ubuntu Server, what should be added is an apache webserver to allow it to host a simple website from it. This is often referred to as a LAMP stack. 
* Linux Operating System
* Apache Web Server
* mySQL database
* PHP

## Apache2

Apache2 is an open-source HTTP server. It is installed with the following command.
```
sudo apt-get install apache2
```
To confirm that apache2 is installed correctly run 
```
sudo service apache2 restart
```
Then using a web browser go to the address of that server. i.e `http://192.168.1.123/`



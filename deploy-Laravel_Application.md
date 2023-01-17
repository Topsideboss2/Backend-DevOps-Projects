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

## Step 2: Install Composer on Ubuntu


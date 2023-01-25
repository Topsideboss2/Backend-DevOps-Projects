# Using Rsync

This is a step by step set of instruction on how to use Rsync to sync data between two web servers. The purpose of creating a backup web server is if your main web server fails, the backup web server can take over to reduce downtime of your website. In this case, we were transferring data from a localized web server to another due to preventive maintenance. This is way of creating a backup web server is very good and effective for small and medium size web businesses.

Main Server: 
* 192.168.1.9

Backup Server:
* 192.168.1.5

## Step 1:

Install Rsync on both servers with the following command.

`apt-get install rsync`

NB: *Ensure you are a root user* and if not, use the following command to create a root user and password

```
useradd <username>
passwd <password>
```

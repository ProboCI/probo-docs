---
layout: "docs"
title: Getting Started
class: documentation
permalink: /open-source/getting-started/
published: true
---

## Getting Started with Open Source Probo
The first step was to install a package managed set of core software  necessary to be sure that it  was able to complete the compilation and running of Probo, git and Docker. Not to mention screen which will become very important later.  
  
**Downloading Prerequisite Packages**  
```bash
sudo wget http://download.rethinkdb.com/centos/7/`uname -m`/rethinkdb.repo \
          -O /etc/yum.repos.d/rethinkdb.repo
sudo yum install epel-release
sudo yum update
sudo yum makecache fast
sudo yum install nodejs
sudo yum install node-gyp
sudo yum install mocha
sudo yum install nodejs-should
sudo yum install git
sudo yum install screen
sudo yum install rethinkdb
```  
  
**Setting Up CentOS Firewall**  
The next part involves opening up our external ports on our CentOS iptables firewall. You might be stuck on this step or you might not be depending on how you installed CentOS. If you get a message saying that firewalld doesn't exist or isn't enabled, then you likely do not need to do this step.  
  
```bash
sudo firewall-cmd --zone=public --add-port=3010/tcp --permanent
sudo firewall-cmd --zone=public --add-port=3012/tcp --permanent
sudo firewall-cmd --zone=public --add-port=3050/tcp --permanent
sudo firewall-cmd --zone=public --add-port=3070/tcp --permanent
sudo systemctl restart firewalld
```  
  
**Checking Out Repositories**  
Now we checkout the Probo code and other packages covered in this walkthru. 
  
```bash
git clone https://github.com/ProboCI/probo.git
git clone https://github.com/ProboCI/probo-asset-receiver.git
git clone https://github.com/ProboCI/probo-loom.git
git clone https://github.com/ProboCI/probo-proxy.git
git clone https://github.com/ProboCI/probo-reaper.git
```  
  
**Installing Docker**  
The next step in the process involves downloading and installing the Docker container system.
  
```bash
wget -qO- https://get.docker.com/ | sudo sh
```

Now we need to add our probo user to the docker group so it can utilize the Docker daemon.

```bash
sudo usermod -aG docker $USER
```  
  
Now we start Docker and ensure it starts at system start up.
  
```bash
sudo systemctl enable docker
sudo systemctl start docker
```  
  
Now we need to pull the relevant Docker containers that can be used by our system. Here are the main ones. There are more, but these are the ones that are used most often. It is important to note that the default one does not specify the version of PHP. If you want to default to a specific version of PHP, you will need to make a change in your .probo.yaml file in your specific project or wait for another blog entry on some advanced things I will cover later. You may need to log out and log back in before you will be able to issue these commands if you get Docker daemon errors.
  
```bash
sudo docker pull proboci/ubuntu-14.04-lamp
sudo docker pull proboci/ubuntu-14.04-lamp:php-5.6
sudo docker pull proboci/ubuntu-14.04-lamp:php-7.0
sudo docker pull proboci/ubuntu-14.04-lamp:php-7.1
```
  
**Deployment**  
Several components of the system require full DNS names to function properly and cannot be addressed at localhost. For this tutorial, we assume that the server your install is running on is publically routable on {YOUR-DOMAIN}, and that all services are directly accessible on their ports as well (such as http://{YOUR-DOMAIN}:3050). You can also use a sub-domain of an existing domain if you wish.
  
In order to view the results of the builds ensure that {YOUR-DOMAIN} is also pointing to your server.
  
Note that this configuration is suitable for development, but do NOT use for production. Reverse-proxying and SSL configuration are beyond the scope of this quickstart series.

## Next Step: [Container Manager >>](/open-source/container-manager/)
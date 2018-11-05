---
layout: "docs"
title: Open Source Quickstart
class: documentation
permalink: /open-source/introduction/
published: true
---

## Set up your own ProboCI Server using our Open Source repositories.

In order to do this, your system will require certain requirements for this quickstart guide. The guide will be expanded over time to include additional parameters, but for now this is the set of parameters that we have.

{% note %}
**Note:** This particular guide was contributed by a Probo user and is written for CentOS 7. Probo runs on Ubuntu 14.04 Server in production, so this guide should be able to be modified slightly to get up and running on Ubuntu Server. We will create a new Ubuntu guide in the near future that gives step by step instructions specific to the Ubuntu command line and apt repository.
{% endnote %}

**You will need:**  
1. A CentOS 7 based Linux Server.
2. Root level access to this server.
3. The ability to install packages on the server via the yum package manager.
4. The ability to create additional accounts on this server and give them sudo access (administrator access).
5. A high speed internet connection that is attached to a router which can do portmapping,
6. A working knowledge of how to navigate around the command lines of a Linux terminal.

**The Probo Open Source Server Requires**  
1. NodeJS
2. Docker
3. Ports to be open on firewalld
4. A GitHub or Bitbucket account to test with.

**Roadmap Steps**  
1. Setting up systemd startup scripts
2. Configuring for use with the Drupal 8 Probo Interface module.

## Introduction
To get started, use a base server installation of CentOS 7 with very little attached to it. This is to keep things lean, but you can do as you please. Just remember that your mileage may vary if you are using a different distribution of Linux such as Debian or Ubuntu.

For those who wish to follow along in setting up your own Probo server using CentOS, be sure to create a user called 'probo' that had administrative privileges. This way you could use the sudo command with that user. This is a very important step for following along.

Credit where credit is due - some of the steps and information here come directly from the Quickstart README documents for the various Probo projects. The attempt here is to put the puzzle together and provide a walk-through in the hope it may help others in need or who are looking to get started with their own instance of Probo.

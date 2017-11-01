---
layout: "docs"
title: Open Source Quickstart
class: documentation
permalink: /open-source/introduction/
published: true
---

## Set up your own ProboCI Server using our Open Source repositories.
Probo is open source so you can build your own server and run it yourself. This is accomplished by installing a series of components that work together to make up the Probo system. Once these components are properly installed, configured and started you will have a working Probo server capable of doing roughly the same thing as the existing ProboCI SAAS web site.

In order to do this, your system will require certain requirements for this quickstart guide. The guide will be expanded over time to include additional parameters, but for now this is the set of parameters that we have.

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

**Optional Steps**

1. Setting up systemd startup scripts
2. Configuring for use with the Drupal 8 Probo Interface module.

## Introduction
To get started, I used a base server installation of CentOS 7 with very little attached to it. I like to do this to keep things lean, but you can do as you please. Just remember that your mileage may vary if you are using a different distribution of Linux such as Debian or Ubuntu.

For those who wish to follow along in setting up your own Probo server using CentOS, be sure to create a user called 'probo' that had administrative privileges. This way you could use the sudo command with that user. This is a very important step for following along.

Credit where credit is due - some of the steps and information here come directly from the Quickstart README documents for the various Probo projects. My attempt here is to put the puzzle together and provide a walk-through of my experience in the hope it may help others in need or who are looking to get started with their own instance of Probo.

## Next Step: [Getting Started >>](/open-source/getting-started/)
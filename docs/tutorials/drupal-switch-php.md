---
layout: "docs"
title: Switch Version of PHP
class: documentation
permalink: /tutorials/switch-php/
---
Probo CI LampApp comes with PHP 5.5 by default. If you'd like to upgrade to 5.6 or 7.0, you need to add a script
to your .probo.yml file.

## Setup Probo.CI with PHP 5.6

In your .probo.yml file add the following Script:

```
  - name: Upgrade to php 5.6
    plugin: Script
    script: |
      apt-get update
      apt-get install -y software-properties-common language-pack-en-base
      LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php
      LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/apache2
      apt-get update
      apt-get install -y php5.6 php5.6-mbstring php5.6-mcrypt php5.6-mysql php5.6-xml php5.6-gd php5.6-curl php5.6-json php5.6-imagick php5.6-dev php5.6-gmp
      a2dismod php5
      a2enmod php5.6
      apachectl graceful
      update-alternatives --set php /usr/bin/php5.6 # Needed for 5.6.29-1+deb.sury.org~trusty+1 and up.
      php -v
```

Note: This installs packages required to run Drupal.

## Setup Probo.CI with PHP 7

In your .probo.yml file add the following Script:

```
  - name: Upgrade to php 7
    plugin: Script
    script: |
      apt-get update
      apt-get install -y software-properties-common language-pack-en-base
      LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php
      LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/apache2
      apt-get update
      apt-get install -y php7.0 libapache2-mod-php7.0 php7.0-gd php7.0-curl php7.0-json php7.0-mbstring php7.0-mysql php7.0-mcrypt php7.0-imagick php7.0-dev php7.0-gmp php7.0-xml
      php -v
      apachectl graceful
```

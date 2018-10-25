---
layout: "docs"
title: Switch PHP Versions
class: documentation
permalink: /tutorials/switch-php/
redirect_to: /build/environment-configuration/
---
Probo.CI LAMP containers come with PHP 5.5 by default. If you'd like to upgrade to 5.6 or 7.0, you need to add a script to your `.probo.yml` file.

{% note %}
**Note:** These scripts install packages required to run Drupal.
{% endnote %}

## Setup Probo.CI with PHP 5.6

In your `.probo.yml` file add the following Script:

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
      php -v
```

## Setup Probo.CI with PHP 7

In your `.probo.yml` file add the following Script:

```
  - name: Upgrade to php 7
    plugin: Script
    script: |
      echo 'exit 0' > /usr/sbin/policy-rc.d
      apt-get update
      apt-get install -y software-properties-common language-pack-en-base
      LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php
      apt-get update
      DEBIAN_FRONTEND=noninteractive apt-get install -y php7.0 libapache2-mod-php7.0 php7.0-gd php7.0-curl php7.0-json php7.0-mbstring php7.0-mysql php7.0-mcrypt php7.0-imagick php7.0-dev php7.0-gmp php7.0-xml
      cp /etc/php5/mods-available/general_settings.ini /etc/php/7.0/apache2/conf.d/20-general_settings.ini
      a2dismod php5
      a2enmod php7.0
      a2enmod mpm_prefork
      apache2ctl graceful
```

If you are using PHP7 you probably also want to run the [PHP OpCache](http://php.net/manual/en/book.opcache.php) as it will run much faster. The following Script will enable OpCache and set some decent default settings, though you may want to adjust them.

```
  - name: opcache
    plugin: Script
    script: |
      echo 'opcache.enable=1' >> /etc/php/7.0/mods-available/opcache.ini
      echo 'opcache.enable_cli=1' >> /etc/php/7.0/mods-available/opcache.ini
      echo 'opcache.memory_consumption=192' >> /etc/php/7.0/mods-available/opcache.ini
      echo 'opcache.interned_strings_buffer=16' >> /etc/php/7.0/mods-available/opcache.ini
      echo 'opcache.max_accelerated_files=3907' >> /etc/php/7.0/mods-available/opcache.ini
      echo 'opcache.validate_timestamps=0' >> /etc/php/7.0/mods-available/opcache.ini
      echo 'opcache.fast_shutdown=1' >> /etc/php/7.0/mods-available/opcache.ini
      apache2ctl graceful
```

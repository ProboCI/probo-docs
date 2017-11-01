---
layout: "docs"
title: Docker Images
class: documentation
permalink: /build/images/
published: true
---

Probo uses [Docker](https://www.docker.com/){:target="\_blank"} to isolate every build that runs in its own virtual container. Docker can either build its containers on the fly or use pre-built docker images from the [Docker Hub](https://hub.docker.com/){:target="\_blank"} to speed up the container creation process. Probo uses pre-built docker images that are built with software commonly used by web development and application development shops around the world (PHP, MySQL, Solr, Redis, etc.). The [Probo Docker images](https://hub.docker.com/u/proboci/){:target="\_blank"} are also built with helpful tools that go along with these applications such as Composer, npm, Drush, WP-CLI, and more. Additional tools and software can be added through steps in your `.probo.yaml` file provided by the [Probo Script Plugin](https://docs.probo.ci/plugins/script-plugin/).

## Probo Docker Images

We have pre-built several different flavors of Probo Docker images for you to choose from to build the testing environment closest to your production server. Add one of the available images with the following syntax:

    image: proboci/ubuntu-14.04-lamp:php-7.1


**Please note:** Not all of the image tags on the [Probo.CI Docker Hub](https://hub.docker.com/u/proboci/){:target="\_blank"} are available in your `.probo.yaml` configuration. Only the available images listed below have been approved to run in the Probo app.

### Available Images

- `proboci/ubuntu-14.04-lamp` _(default)_ - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.47, and PHP 5.5.9.
- `proboci/ubuntu-14.04-lamp:php-5.6` - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.54, and PHP 5.6.30.
- `proboci/ubuntu-14.04-lamp:php-7.0` - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.54, and PHP 7.0.16.
- `proboci/ubuntu-14.04-lamp:php-7.1` - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.54, and PHP 7.1.2.

### Installed Software and Tools

All Probo Docker Images have the following software packages and development tools installed.

- bundler
- compass
- composer
- curl
- drupal console
- drush
- git
- memcached
- nodejs
- ntp
- openjdk-8-jre
- redis-server
- ruby
- solr
- wget
- wp-cli

Please [let us know](https://probo.ci/contact/) if you would like to see additional software packages or development tools that your team uses added to the Probo Docker images.

---
layout: "docs"
title: Docker Images
class: documentation
permalink: /build/images/
published: true
---

Probo uses [Docker](https://www.docker.com/){:target="\_blank"} to isolate every build that runs in its own virtual container. Docker can either build its containers on the fly or use pre-built docker images from the [Docker Hub](https://hub.docker.com/){:target="\_blank"} to speed up the container creation process. Probo uses pre-built docker images that are built with software commonly used by web development and application development shops around the world (PHP, MySQL, Solr, Redis, etc.).

[Probo Docker images](https://hub.docker.com/u/proboci/){:target="\_blank"} are also built with helpful tools that go along with these applications such as Composer, npm, Drush, WP-CLI, and more. Additional tools and software can be added through steps in your `.probo.yaml` file provided by the [Probo Script Plugin](https://docs.probo.ci/plugins/script-plugin/).

## Probo Docker Images

We have pre-built several different flavors of Probo Docker images for you to choose from to build the testing environment closest to your production server. Add one of the available images with the following syntax:

    image: proboci/ubuntu-18.04-lamp:php8.0

The example above would use the Docker image we have built on Ubuntu 18.06 LTS with LAMP and our PHP 8.0 configuration. See below in the Available Images section for specific Apache, MySQL, and PHP versions, as well as additional software and development tools installed on each available image. Feel free to test out our images outside the Probo system by downloading the image from the Docker Hub.

{% note %}
**Please note:** Not all of the image tags listed on the [Probo.CI Docker Hub](https://hub.docker.com/u/proboci/){:target="\_blank"} are available in your `.probo.yaml` configuration. Only the available images listed below have been approved to run in a Probo Build.
{% endnote %}

### Stable Probo Images

The following image tags are the currently approved Stable Probo Images. Make sure to choose one of the images below or your Probo Build will not start properly. The images below have been built specifically for use in Probo Builds and have known good configurations for installed packages and software. We will put out advanced notice if we are going to make changes to these images that may affect existing builds.

**Note:** Please check this section regularly as we update our images. 

#### Ubuntu 18.04 LAMP (Current Versions)

{: .table .table-striped .table-bordered}
| Image | Apache | MySQL | PHP |
|------------------------------|
| `proboci/ubuntu:18.04-php5.6` | 2.4.29 | 5.7.33 | 5.6.40-47 |
| `proboci/ubuntu:18.04-php7.0` | 2.4.29 | 5.7.33 | 7.0.33-47 |
| `proboci/ubuntu:18.04-php7.1` | 2.4.29 | 5.7.33 | 7.1.33-34 |
| `proboci/ubuntu:18.04-php7.2` | 2.4.29 | 5.7.33 | 7.2.34-18 |
| `proboci/ubuntu:18.04-php7.3` | 2.4.29 | 5.7.33 | 7.3.27-7 |
| `proboci/ubuntu:18.04-php7.4` | 2.4.29 | 5.7.33 | 7.4.15 |
| `proboci/ubuntu:18.04-php8.0` | 2.4.29 | 5.7.33 | 8.0.2 |


#### Ubuntu 14.04 LAMP **(DEPRECATED)**
_Scheduled for removal September 5, 2021_  

{: .table .table-striped .table-bordered}
| Image | Ubuntu | Apache | MySQL | PHP |
|-------------------------|-------------|
| `proboci/ubuntu-14.04-lamp:php-5.5` | 14.04.5 LTS | 2.4.7 |  5.5.47 | 5.5.9 |
| `proboci/ubuntu-14.04-lamp:php-5.6 (default)` | 14.04.5 LTS | 2.4.7 | 5.5.54 | 5.6.30 |
| `proboci/ubuntu-14.04-lamp:php-7.0` | 14.04.5 LTS | 2.4.7 | 5.5.54 | 7.0.16 |
| `proboci/ubuntu-14.04-lamp:php-7.1` | 14.04.5 LTS | 2.4.7 | 5.5.54 | 7.1.2 |

#### Ubuntu 16.04 LAMP **(DEPRECATED)**
_Scheduled for removal September 5, 2021_  

{: .table .table-striped .table-bordered}
| Image | Ubuntu | Apache | MySQL | PHP |
|-------------------------|-------------|
| `proboci/ubuntu-16.04-lamp:php-7.0` | 16.04.3 LTS | 2.4.18 | 5.7.x (latest) | 7.0.x (latest) |
| `proboci/ubuntu-16.04-lamp:php-7.1` | 16.04.3 LTS | 2.4.18 | 5.7.x (latest) | 7.1.x (latest) |
| `proboci/ubuntu-16.04-lamp:php-7.2` | 16.04.3 LTS | 2.4.18 | 5.7.x (latest) | 7.2.x (latest) |

<!--
#### Ubuntu 20.04 LAMP

{: .table .table-striped .table-bordered}
| PHP Version | Apache | MySQL 5.7 | MySQL 8.0 | PostgreSQL | PHP |
| --- | --- | --- | --- | --- | --- |
| php5.6 | 2.4.41 | 5.7.32 | 8.0.23 | 12.6 | 5.6.40-47 |
| php7.0 | 2.4.41 | 5.7.32 | 8.0.23 | 12.6 | 7.0.33-47 |
| php7.1 | 2.4.41 | 5.7.32 | 8.0.23 | 12.6 | 7.1.33-34 |
| php7.2 | 2.4.41 | 5.7.32 | 8.0.23 | 12.6 | 7.2.34-18 |
| php7.3 | 2.4.41 | 5.7.32 | 8.0.23 | 12.6 | 7.3.27-9 |
| php7.4 | 2.4.41 | 5.7.32 | 8.0.23 | 12.6 | 7.4.15 |
| php8.0 | 2.4.41 | 5.7.32 | 8.0.23 | 12.6 | 8.0.2 |
-->

#### Installed Software and Tools

All Stable Probo Docker Images have the following software packages and development tools installed.

- bower
- bundler
- compass
- composer
- curl
- drupal console
- drush
- git
- google-chrome-stable - 88.0.4324.182
- grunt-cli
- gulp-cli
- lighthouse
- memcached
- nodejs
- ntp
- openjdk-8-jre
- redis-server
- ruby
- solr
- varnish
- wget
- wp-cli
- yarn

You can install pretty much anything you need to during the Probo Build process, but we try to include as many helpful tools that make sense for most of our users. Please [let us know](https://probo.ci/contact/) if you would like to see additional software packages or development tools that your team uses often added to the Probo Docker images.

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

    image: proboci/ubuntu:18.04-php7.4

The example above would use the Docker image we have built on Ubuntu 18.04 LTS with LAMP and our PHP 7.4 configuration. See below in the Available Images section for specific Apache, MySQL, and PHP versions, as well as additional software and development tools installed on each available image. Feel free to test out our images outside the Probo system by downloading the image from the Docker Hub.

{% note %}
Image are updated monthly unless security updates are issued which require an out of cycle update. Please see the section below titled [Getting the Current Versions](#versions) for more information on how you can get the version of all software running in your build.
{% endnote %}

{% note %}
Not all of the image tags listed on the [Probo.CI Docker Hub](https://hub.docker.com/u/proboci/){:target="\_blank"} are available in your `.probo.yaml` configuration. Only the available images listed below have been approved to run in a Probo Build.
{% endnote %}

### Stable Probo Images

The following image tags are the currently approved Stable Probo Images. Make sure to choose one of the images below or your Probo Build will not start properly. The images below have been built specifically for use in Probo Builds and have known good configurations for installed packages and software. We will put out advanced notice if we are going to make changes to these images that may affect existing builds.

#### Getting The Current Versions

You can get the current versions of all major components by using the SSH feature for the build in question and typing `versionizer` on the command line. This will give you the current, applicable versions for all major software pieces. Here is a sample from the PHP 7.4 Image running under Ubuntu 20:  

```
Probo.CI - Software Versions Report:
------------------------------------
PHP 7.4.22 (cli) (built: Jul 30 2021 13:08:17) ( NTS )
Web Server version: Apache/2.4.41 (Ubuntu)
Google Chrome 92.0.4515.131 
ChromeDriver 92.0.4515.43
Kernel: 5.4.0-65-generic
Ubuntu 20.04.2 LTS
Composer version 2.1.5 2021-07-23 10:35:47
Drush Commandline Tool 9.7.3
Node: v12.22.4
WordPress CLI: WP-CLI 2.5.0
Pantheon Terminus 2.6.1
```

#### Current ProboCI Images That Can Be Used

{: .table .table-striped .table-bordered}
| Image | Information |
|------------------------------|
| `proboci/ubuntu:18.04-php5.6` | Legacy - Unsupported PHP |
| `proboci/ubuntu:18.04-php7.0` | Legacy - Unsupported PHP |
| `proboci/ubuntu:18.04-php7.1` | Legacy - Unsupported PHP |
| `proboci/ubuntu:18.04-php7.2` | Legacy - Unsupported PHP |
| `proboci/ubuntu:18.04-php7.3` | Legacy - Unsupported PHP |
| `proboci/ubuntu:18.04-php7.4` | Default Image |
| `proboci/ubuntu:18.04-php8.0` | Supported PHP |
| `proboci/ubuntu:20.04-php7.4` | Supported PHP & MySQL 8.0 |
| `proboci/ubuntu:20.04-php8.0` | Supported PHP & MySQL 8.0 |
| `proboci/ubuntu:20.04-php8.1` | Supported PHP & MySQL 8.0 |

#### Installed Software and Tools

All Stable Probo Docker Images have the following software packages and development tools installed. Note that many of the versions are available using the `versionizer` command structure listed above.

- bower
- bundler
- compass
- composer
- chromedriver
- curl
- drupal console
- drush
- git
- google-chrome-stable
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
- terminus
- varnish
- wget
- wp-cli
- yarn

You can install pretty much anything you need to during the Probo Build process, but we try to include as many helpful tools that make sense for most of our users. Please [let us know](https://probo.ci/contact/) if you would like to see additional software packages or development tools that your team uses often added to the Probo Docker images.

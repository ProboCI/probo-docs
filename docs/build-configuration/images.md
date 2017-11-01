---
layout: "docs"
title: Docker Images
class: documentation
permalink: /build/images/
published: true
---

Probo uses [Docker](https://www.docker.com/){:target="_blank"} to isolate every build that runs in it's own virtual container. Docker can either build it's containers on the fly, or use pre-built docker images from the [Docker Hub](https://hub.docker.com/){:target="_blank"} to speed up the container creation process. Probo uses pre-built docker images that are built with software commonly used by web development and application development shops around the world like PHP, MySQL, Solr, and Redis. The [Probo Docker images](https://hub.docker.com/u/proboci/){:target="_blank"} are also built with helpful tools that go along with these applications such as Composer, NPM, Drush, WP-CLI, and more. Additional tools and software can be added through steps in your `.probo.yaml` file provided by the [Probo Script Plugin](https://docs.probo.ci/plugins/script-plugin/).

## Probo Docker Images

We have pre-built several different flavors of Probo Docker Images for you to choose from to build the testing environment closest to your Production server. Add one of the Available Images with the following syntax:

    image: proboci/ubuntu-14.04-lamp:php-7.1


**Please note:** Not all of the image tags on the [Probo.CI Docker Hub](https://hub.docker.com/u/proboci/){:target="_blank"} are available in your `.probo.yaml` configuration. Only the Available Images listed below have been made approved to run in the Probo app.

Please [let us know](https://probo.ci/contact/) if you are looking for software or tools that are missing from our current Probo Docker Images!

### Available Images

- `proboci/ubuntu-14.04-lamp` _(default)_ - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.47, and PHP 5.5.9.
- `proboci/ubuntu-14.04-lamp:php-5.6` - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.54, and PHP 5.6.30.
- `proboci/ubuntu-14.04-lamp:php-7.0` - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.54, and PHP 7.0.16.
- `proboci/ubuntu-14.04-lamp:php-7.1` - Ubuntu 14.04.5 including LAMP with Apache 2.4.7, MySQL 5.5.54, and PHP 7.1.2.

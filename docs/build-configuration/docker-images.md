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

    image: proboci/ubuntu-14.04-lamp:php-7.1

The example above would use Ubuntu 14.04 with LAMP and our PHP 7.1 configuration. See below in the Available Images section for specific Apache, MySQL, and PHP versions, as well as additional software and development tools installed on each available image.

**Please note:** Not all of the image tags listed on the [Probo.CI Docker Hub](https://hub.docker.com/u/proboci/){:target="\_blank"} are available in your `.probo.yaml` configuration. Only the available images listed below have been approved to run in a Probo build.

### Stable Probo Images

The Stable Probo Docker Images below have been built specifically for Probo Builds and are known good configurations that we do not change without advanced notice to ensure existing builds are not affected.

    {: .table .table-striped .table-bordered}
    | Image | Ubuntu | Apache | MySQL | PHP |
    |-------------------------|-------------|
    | `proboci/ubuntu-14.04-lamp (default)` | 14.04.5 | 2.4.7 |  5.5.47 | 5.5.9 |
    | `proboci/ubuntu-14.04-lamp:php-5.6` | 14.04.5 | 2.4.7 | 5.5.54 | 5.6.30 |
    | `proboci/ubuntu-14.04-lamp:php-7.0` | 14.04.5 | 2.4.7 | 5.5.54 | 7.0.16 |
    | `proboci/ubuntu-14.04-lamp:php-7.1` | 14.04.5 | 2.4.7 | 5.5.54 | 7.1.2 |

### Nightly Probo Images

The Nightly Probo Docker Images below are updated with the latest versions of the Installed Software and Tools listed below this section when the images are rebuilt. We plan to have these updating on a true nightly schedule in the near future, but for now they are being built manually and tested before pushing up to the docker hub and pulling down to the Production Probo server.

    {: .table .table-striped .table-bordered}
    | Image | Ubuntu | Apache | MySQL | PHP |
    |-------------------------|-------------|
    | `proboci/ubuntu-14.04-lamp:php5.6-nightly` | 14.04.5 (latest) | 2.4.7 |  5.5.x (latest) | 5.6.x (latest) |
    | `proboci/ubuntu-14.04-lamp:php7.0-nightly` | 14.04.5 (latest) | 2.4.7 | 5.5.x (latest) | 7.0.x (latest) |
    | `proboci/ubuntu-14.04-lamp:php7.1-nightly` | 14.04.5 (latest) | 2.4.7 | 5.5.x (latest) | 7.1.x (latest) |

### Installed Software and Tools

The Probo Docker Images have the following software packages and development tools installed. **Note:** Some packages are currently only available in our newer `-nightly` tagged images above. Those packages will be labeled with (Nightly) below.

- bower (Nightly)
- bundler
- compass
- composer
- curl
- drupal console
- drush
- git
- google-chrome-stable (Nightly)
- grunt-cli (Nightly)
- gulp-cli (Nightly)
- memcached
- nodejs
- ntp
- openjdk-8-jre
- redis-server
- ruby
- solr
- wget
- wp-cli
- yarn (Nightly)

Please [let us know](https://probo.ci/contact/) if you would like to see additional software packages or development tools that your team uses added to the Probo Docker images.

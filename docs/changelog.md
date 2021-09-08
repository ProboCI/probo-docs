---
layout: "docs"
title: ProboCI ChangeLog
class: documentation
permalink: /changelog/
published: true
---

## Update: August 31, 2021
- Docker images update only. No code changes.
- Update Chrome Driver to 93.0.4577.15.
- Updated Google Chrome to 93.0.4577.63.

## Update: August 28, 2021
- Docker images only update. No code changes.
- Drush no longer requires -y flag or -r path in .probo.yaml files.
- Add [versionizer](/build/images/)  command to display versions of software in container.
- Remove old Drush oriented configuration files that are no longer supported.
- Update Chrome Driver to 92.0.4515.107.
- Updated Google Chrome to 92.0.4515.159.
- Added Cypress package for scripted testing.
- Update Search API Solr core for v4.2.1

## Update: March 6, 2021  
- Project page now sorts by most recently active by default.
- Language to remind users of upload limits for assets.
- Support for PHP 8.0 (proboci/ubuntu:18.04-php8.0)
- Support for PHP versions 5.6 - 8.0 with Ubuntu 18.04. This officially makes all 14.04 and 16.04 images deprecated.
- All 18.04 images feature updated `terminus`, `wp-cli`, `composer`, and `drush` versions. Drush is installed relative to the verison of Drupal being installed.
- Updates to LAMP stack. For versions, see the [Docker Images](/build/images/) page.
- Drupal 8 now default drupal version for all containers.
- Updates to SOLR for Drupal 7, 8 and 9.
- Removal of Stage File Proxy directives in Drupal Plugin as using configuration import for Drupal 8 or 9 would break this.
- Under the hood fixes to upgrade services to use newer versions of NodeJS.
- Schedule 14.04 and 16.04 images for removal on **September 5, 2021**

## Update: February 21, 2021
- Support for Drupal 9. Settings configuration changes between 8 and 9 have been addressed. You can now specify if you are using Drupal 8 or Drupal 9.
- Corrected an issue where GitLab users were only getting the first 20 repositories found by Probo.

{% note %}
**Please note:** The next update is scheduled for April 4, 2021. Please monitor this page and our [ProboCI Systems Status Page](http://status.probo.ci/) for more information and get on our news and information mailing list to be kept informed of the new and improved ProboCI.
{% endnote %}
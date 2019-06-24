---
title: Updating Composer for Drupal 8 in the Probo Drupal Plugin
uid: drupal_updating_composer_drupal_8
---

{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Update composer
    command: '/usr/local/bin/composer self-update'
  - name: Add Drupal package repository for Drupal 8.
    command: 'composer config -d /src/docroot/ repositories.drupal composer https://packages.drupal.org/8'
  - name: Install composer packages with dependencies.
    command: 'composer install -d /src/docroot/'
  - name: Probo site setup
    plugin: Drupal
    database: mydb.sql.gz
    databaseGzipped: true
    databaseUpdates: false
    clearCaches: false
    subDirectory: docroot
    settingsRequireFile: site-settings.php
    drupalVersion: 8
    configSyncDirectory: config/sync
  - name: Earlier cache rebuild
    command: "drush --root='/var/www/html' cr"
  - name: Import config
    command: "sleep 3 ; drush --root='/var/www/html/' config-import --source='/src/config/sync' -y"
  - name: DB Updates
    command: "drush --root='/var/www/html/' updb -y"
  - name: Rebuild Caches
    command: "drush --root='/var/www/html' cr"
  - name: Generate login link
    command: "drush --root='/var/www/html/' uli"
{% endhighlight %}

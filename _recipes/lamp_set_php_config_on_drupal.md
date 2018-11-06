---
title: Setting LAMPApp PHP Configuration Options on a Drupal Installation
uid: lamp_set_php_config_on_drupal
---

{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Probo site setup
    plugin: Drupal
    database: mydb.sql.gz
    databaseGzipped: true
    databaseUpdates: true
    revertFeatures: true
    phpIniOptions:
      all:
        memory_limit: 256M
      apache2:
        max_execution_time: 60
        upload_max_filesize: 25M
        post_max_size: 25M
      cli:
        max_execution_time: 0
  - name: Generate login link
    command: 'drush uli'
{% endhighlight %}

---
title: Drupal with Registry Rebuild
uid: drupal_registry_rebuild
---

Sometimes it is necessary to rebuild the registry when changing paths on probo builds especially if migrations are involved. To do this, you can get the registry rebuild module, run it and then run your update functions and clear caching functions. Additionally, you could also add the feature revert drush command at the end as well.

{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Setup Drupal Site
    plugin: Drupal
    database: mydb.sql.gz
    databaseGzipped: true
    databaseUpdates: false
    clearCaches: false
    subDirectory: docroot

  - name: Rebuild the site registry.
    plugin: Script
    script:
      - cd $SRC_DIR/docroot/sites/all/modules/contrib
      - wget https://ftp.drupal.org/files/projects/registry_rebuild-7.x-2.5.tar.gz
      - tar -xvzf registry_rebuild-7.x-2.5.tar.gz
      - cd registry_rebuild
      - php registry_rebuild.php

  - name: Perform update function.
    command: 'drush --root=/var/www/html updb -y'

  - name: Clear all caches
    command: 'drush --root=/var/www/html cc all'
{% endhighlight %}

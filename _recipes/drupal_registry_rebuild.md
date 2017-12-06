---
title: Drupal with Registry Rebuild
uid: drupal_registry_rebuild
---

Sometimes it is necessary to rebuild the registry when changing paths on probo builds especially if migrations are involved. There are two ways to go about this.  

This method is for when Drupal is bootstrapping normally via standard a `drush rr` command. 

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

  - name: Install the registry_rebuild module universally.
    command: 'drush @none dl registry_rebuild-7.x -y'

  - name: Clear drush cache
    command: 'drush --root=/var/www/html cc drush'

  - name: Rebuilding Registry
    command: 'drush --root=/var/www/html rr'

  - name: Perform update function.
    command: 'drush --root=/var/www/html updb -y'

  - name: Clear all caches
    command: 'drush --root=/var/www/html cc all'
{% endhighlight %}

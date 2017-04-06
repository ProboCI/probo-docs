---
title: Getting a database for a Drupal site hosted on Pantheon
uid: pantheon
---

Be sure to substitute the name of your Pantheon site for 'YOURSITE'.

{% highlight yaml%}
 assets:
   - terminus.sh
   - test-export.sql.gz
 steps:
   - name: Install terminus
     command: 'curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install'
   - name: Log in to terminus
     command: 'source $ASSET_DIR/terminus.sh ; vendor/bin/terminus auth:login --email=$EMAIL --machine-token=$TOKEN'
   - name: Get the latest backup db from Pantheon test
    command: 'vendor/bin/terminus backup:get YOURSITE.test --element=database --to=$ASSET_DIR/test-export.sql.gz'
   - name: Probo site setup
     plugin: Drupal
     database: test-export.sql.gz
     databaseGzipped: true
     databaseUpdates: true
     revertFeatures: true
{% endhighlight %}

---
title: Developing a site on Pantheon
---

{% highlight yaml%}
 assets:
   - export.sh
 steps:
   - name: Download terminus
     command: 'curl https://github.com/pantheon-systems/cli/releases/download/0.9.3/terminus.phar -L -o $HOME/terminus && chmod +x $HOME/terminus'
   - name: Log in to terminus
     command: 'source $ASSET_DIR/export.sh ; $HOME/terminus auth login $EMAIL --password=$PASS'
   - name: Download DB
     command: '$HOME/terminus site backups get --site=test-db-export --env=dev --element=database --to=$ASSET_DIR/test-export.sql.gz --latest'
   - name: Probo site setup
     plugin: Drupal
     database: test-export.sql.gz
     databaseGzipped: true
     databaseUpdates: true
     revertFeatures: true
{% endhighlight %}

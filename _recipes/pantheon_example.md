---
title: Getting a database for a Drupal site hosted on Pantheon
---

[Pantheon](https://pantheon.io/) is a hosting platform used for many Drupal and Wordpress sites. In this recipe we use Pantheon's 'terminus' command to get the latest database backup from its Test environment for use in the Probo build.

Create a terminus.sh file and upload it to your Probo project's build assets. The file should be like:
{% highlight yaml%}
#!/bin/bash
EMAIL="foo@test.com"
TOKEN="abcdefghijklmnopqrstuvwxyz"
{% endhighlight %}
Use your Pantheon account email and generate a [Pantheon Machine Token](https://pantheon.io/docs/machine-tokens/) for the token.

In the Probo build configuration below, be sure to substitute the name of your Pantheon site for 'YOURSITE'.

{% highlight yaml%}
 assets:
   - terminus.sh
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

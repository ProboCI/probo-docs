---
layout: "docs"
title: Using Probo on Your Pantheon Site
class: documentation
permalink: /tutorials/pantheon/
published: true
---
Probo can make your life easier if you're developing your site on Pantheon. There are two steps to follow to configure Probo properly.

**Note: You must still have your code in a repository on either GitHub or Bitbucket. Probo will not download the code directly from Pantheon.**

## Step 1: Create a .sh File

To download a database from your Pantheon site to your Probo container you will need to use [Pantheon's CLI, Terminus](https://github.com/pantheon-systems/cli){:target="_blank"}, so that we can pass the necessary commands to Probo. However, using Terminus requires that you authenticate with Pantheon first with your username and password. To protect your security you must create a YOUR_FILE_NAME.sh file that contains your Pantheon login information. It should look like this:

```bash
#!/bin/bash
EMAIL="your_email_address"
PASS="your_password"
```

You will need to [upload this file as an asset](/assets/) for your Probo build. We will use the variables that you set to authenticate with Pantheon.

## Step 2: Update your .probo.yml file

After you have uploaded your .sh file containing your login info, you need to add 3 steps to your .probo.yml file to download your Pantheon site's database. This example uses version 0.9.3 of Pantheon's CLI.

{% highlight yaml %}
steps:
  - name: Download terminus
    command: 'curl https://github.com/pantheon-systems/cli/releases/download/0.9.3/terminus.phar -L -o $HOME/terminus && chmod +x $HOME/terminus'
  - name: Log in to terminus
    command: 'source $ASSET_DIR/**YOUR_FILE_NAME**.sh ; $HOME/terminus auth login $EMAIL --password=$PASS'
  - name: Download Pantheon site DB
    command: '$HOME/terminus site backups get --site=SITE_NAME --env=[dev,test,live] --element=database --to=$ASSET_DIR/FILE_NAME.sql.gz --latest'
{% endhighlight %}

**Note: You must download your database to a gzipped file!**

Now that Probo has downloaded your site's database from Pantheon it can continue with other necessary steps to build your site. The Terminus steps also cooperate with Probo's Drupal plugin. Here's an example of what that looks like:

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

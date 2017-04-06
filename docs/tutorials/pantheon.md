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

To download a database from your Pantheon site to your Probo container you will need to use [Pantheon's CLI, Terminus](https://github.com/pantheon-systems/cli){:target="\_blank"}, so that we can pass the necessary commands to Probo. However, using Terminus requires that you authenticate with Pantheon first. To protect your security you must create a `terminus.sh` file that contains your Pantheon information. It should look like this:

```bash
#!/bin/bash
EMAIL="foo@test.com" #replace with your email address
TOKEN="abcdefghijklmnopqrstuvwxyz" #replace with your token
```

Use your Pantheon account email and generate a [Pantheon Machine Token](https://pantheon.io/docs/machine-tokens/) for the token.

You will need to [upload this file as an asset](/assets/) for your Probo build.

## Step 2: Update your .probo.yml file

After you have uploaded your `terminus.sh` file containing your authentication info, you need to include it in your `.probo.yml` file's assets and add some steps to download your Pantheon site's database.

{% highlight yaml %}
assets:
 - terminus.sh
{% endhighlight %}

{% highlight yaml %}
steps:
 - name: Install terminus
   command: 'curl -O https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar && php installer.phar install'
 - name: Log in to terminus
   command: 'source $ASSET_DIR/terminus.sh ; vendor/bin/terminus auth:login --email=$EMAIL --machine-token=$TOKEN'
 - name: Get the latest backup db from Pantheon test
  command: 'vendor/bin/terminus backup:get YOURSITE.test --element=database --to=$ASSET_DIR/test-export.sql.gz'
{% endhighlight %}

**Note: You must download your database to a gzipped file!**

Now that Probo has downloaded your site's database from Pantheon it can continue with other necessary steps to build your site. The Terminus steps also cooperate with Probo's Drupal plugin. Here's an example of what that looks like:

{{ site.recipes | where: 'uid', 'pantheon_example' }}

---
layout: "docs"
title: Using Acquia BLT on Probo
class: documentation
permalink: /tutorials/acquia-blt/
published: true
---

Probo can make your life easier if you're developing your site using Acquia BLT (short for Buid and Launch Tools). There are XXXXX steps to follow to configure Probo properly to utilize .

**Note: You must still have your code in a repository on either GitHub or Bitbucket. Probo will not download the code directly from Acquia.**

## Step 1: 

## Step 2: Update your .probo.yml file

After you have uploaded your `terminus.sh` file containing your authentication info, you need to include it in your `.probo.yml` file's assets and add some steps to download your Pantheon site's database.

{% highlight yaml %}
assets:
{% endhighlight %}

{% highlight yaml %}
steps:
 - name: 
   command: 
 - name: 
   command: 
{% endhighlight %}

**Note: You must download your database to a gzipped file!**

Here's a recipe to use Acquia BLT with:

{{ site.recipes | where: 'uid', 'acquia_blt_example' }}

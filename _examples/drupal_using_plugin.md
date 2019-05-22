---
title: Using the Drupal plugin
uid: drupal_using_plugin
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
    subDirectory: docroot
    revertFeatures: true
{% endhighlight %}

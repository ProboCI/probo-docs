---
title: Using the Drupal plugin
category: Drupal
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

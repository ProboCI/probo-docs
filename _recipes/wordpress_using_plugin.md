---
title: Using the WordPress Plugin
---

{% highlight yaml%}
 assets:
  - dev.sql.gz
  steps:
  - name: Site setup
    plugin: WordPressApp
    database: dev.sql.gz
    databaseName: wordpress
    databaseGzipped: true
    subDirectory: code
    devDomain: example.com
    devHome: example.com/home
  - name: Flush the cache
    plugin: WordPressApp
    flushCaches: true
{% endhighlight %}

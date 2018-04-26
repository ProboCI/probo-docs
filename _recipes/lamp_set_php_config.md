---
title: Setting LAMPApp PHP Configuration Options
uid: lamp_set_php_config
---

{% highlight yaml %}
assets:
  - mydb.sql.gz
steps:
  - name: LAMPApp site configuration example.
    plugin: LAMPApp
    database: mydb.sql.gz
    databaseName: example
    databaseUser: example
    phpIniOptions:
      upload_max_filesize: 25M
      post_max_size: 25M
      memory_limit: 256M
{% endhighlight %}

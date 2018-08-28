---
title: Using the LAMPApp Plugin for a PHP/MySQL Based Application
uid: lamp_test_phpmysql_app
---

{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Probo site setup
    plugin: LAMPApp
    database: mydb.sql.gz
    databaseName: mydb
    databaseUser: mydbuser
    databaseGzipped: true
    mysqlCnfOptions:
      key_buffer_size: 16M
      max_allowed_packet: 128M
{% endhighlight %}

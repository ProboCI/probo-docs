---
title: Using the LAMPApp Plugin to Test a PHP/MySQL Based Application
category: LAMP
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
{% endhighlight %}

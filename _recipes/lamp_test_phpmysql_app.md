---
title: Using the LAMPApp Plugin to Test a PHP/MySQL Based Application
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
{% endhighlight %}

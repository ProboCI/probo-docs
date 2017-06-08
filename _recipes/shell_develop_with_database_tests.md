---
title: Using shell plugin to import database and run tests
uid: shell_develop_with_database_tests
---

{% highlight yaml %}
assets:
  - dev.sql.gz
steps:
  - name: Import the database
    plugin: Shell
    command: 'gunzip -c $ASSET_DIR/dev.sql.gz | `mysql foo` ; rm $ASSET_DIR/dev.sql.gz'
  - name: Move code in place
    command: 'mv $SRC_DIR /var/www/foo/code'
  - name: Run behat tests
    command: 'cd /var/www/foo/code/tests ; composer install ; bin/behat'
{% endhighlight %}

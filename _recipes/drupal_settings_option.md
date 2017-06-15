---
title: Using the Settings Options
---

{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Provision Drupal
    plugin: Drupal
    runInstall: standard
    settingsRequireFile: 'site-settings.php'
    settingsAppend: |
      $bar = 'baz';
      $foo = 'stuff';
{% endhighlight %}

---
title: Using the Settings Options
uid: drupal_settings_option
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

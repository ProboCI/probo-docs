---
title: Using the Shell plugin
---

{% highlight yaml %}
steps:
  - name: Run behat tests
    plugin: Shell
    command: 'cd tests ; composer install ; bin/behat'
  - name: Another example test with default Shell plugin
    command: 'echo "Hello World!"'
{% endhighlight %}

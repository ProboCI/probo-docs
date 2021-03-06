---
title: Using the Script plugin
uid: script_using_plugin
---

Add your script as a multi-line YAML string.

{% highlight yaml%}
steps:
  - name: List Pull Request files
    plugin: Script
    script: |
      cd $SRC_DIR
      files=$(ls)
      echo "Listing all files included in this Pull Request..."
      echo files $files
{% endhighlight %}

You can also add your script in the traditional YAML syntax. Each new line in your script is a new item in the sequence.

{% highlight yaml%}
steps:
  - name: List Pull Request files
    plugin: Script
    script:
      - cd $SRC_DIR
      - files=$(ls)
      - echo "Listing all files included in this Pull Request..."
      - echo files $files
{% endhighlight %}

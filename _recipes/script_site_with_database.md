---
title: Developing on a site with a database
uid: script_site_with_database
---

Here is an example using a multi-line YAML string.

{% highlight yaml%}
assets:
  - dev.sql.gz
steps:
  - plugin: Script
    name: List Pull Request files
    script: |
      gunzip -c $ASSET_DIR/dev.sql.gz | `mysql foo`
      rm $ASSET_DIR/dev.sql.gz
      cd $SRC_DIR
      files=$(ls)
      echo "Listing all files included in this Pull Request..."
      echo files $files
{% endhighlight %}

Here is an example using traditional YAML syntax.

{% highlight yaml%}
assets:
  - dev.sql.gz
steps:
  - plugin: Script
    name: List Pull Request files
    script:
      - gunzip -c $ASSET_DIR/dev.sql.gz | `mysql foo`
      - rm $ASSET_DIR/dev.sql.gz
      - cd $SRC_DIR
      - files=$(ls)
      - echo "Listing all files included in this Pull Request..."
      - echo files $files
{% endhighlight %}

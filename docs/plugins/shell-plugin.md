---
layout: "docs"
title: Shell Plugin
class: documentation
permalink: /plugins/shell-plugin/
published: true
---
The Shell plugin provides the `command` parameter. This allows you to define bash commands to run during the site build. You can list as many commands as you like within the steps in your `.probo.yaml` file.

You will need to include a `name` for each `command` since you can only declare a given parameter once per step. [The Script plugin](/plugins/script-plugin/) is available for multi-line commands.

## Examples

**Using the `Shell` plugin**

{% highlight yaml%}
steps:
  - name: Run behat tests
    plugin: Shell
    command: 'cd tests ; composer install ; bin/behat'
  - name: Another example test with default Shell plugin
    command: 'echo "Hello World!"'
{% endhighlight %}

**Developing on a site with a database**

{% highlight yaml%}
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

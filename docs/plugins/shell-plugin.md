---
layout: "docs"
title: Shell Plugin
class: documentation
permalink: /plugins/shell-plugin/
published: true
---
The Shell plugin requires a parameter for `command`. This allows you to define Shell commands to run during the site build. You can list as many commands as you like within the steps in your `.probo.yaml` file. Remember to include a `name` for each `command`. You must also declare `plugin: Shell` in your `.probo.yaml` file.

The Shell plugin provides several variables to use within your `.probo.yaml` file.

## Available Variables

{: .table .table-striped .table-bordered}
| ----------- | --------------------------------------------------------------------------- |
| `$SRC_DIR`  | The filepath which contains the code from your pull request.                |
| `$ASSET_DIR`| The filepath which contains any assets you uploaded to your Probo project.  |
| `$BUILD_ID` | The ID for the build.                                                       |

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

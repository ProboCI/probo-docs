---
layout: "docs"
title: Script Plugin
class: documentation
permalink: /plugins/script-plugin/
published: true
---
The Probo.CI Script plugin is very similar to the [Shell plugin](/docs/plugins/shell-plugin/) but is designed to run multiple lines of commands.

Instead of `command`, the Script plugin requires a parameter for `script`. This allows you to define a set of Shell commands to run during the site build. You can list as many commands as you like within the steps in your .probo.yaml file. Remember to include a `name` for each `script`.

Like the Shell plugin, the Script plugin also provides several variables to use within your `.probo.yaml` file.

{: .table .table-striped .table-bordered}
| Available Variables |                                                                     |
| ----------- | --------------------------------------------------------------------------- |
| `$SRC_DIR`  | The filepath which contains the code from your pull request.                |
| `$ASSET_DIR`| The filepath which contains any assets you uploaded to your Probo project.  |
| `$BUILD_ID` | The ID for the build.                                                       |

## Examples

### Using the Script plugin

Add your script as a multi-line YAML string.

{% highlight yaml%}
steps:
  - plugin: Script
    name: List Pull Request files
    script: |
      cd $SRC_DIR
      files=$(ls)
      echo "Listing all files included in this Pull Request..."
      echo files $files
{% endhighlight %}

You can also add your script in the traditional YAML syntax. Each new line in your script is a new item in the sequence.

{% highlight yaml%}
steps:
  - plugin: Script
    name: List Pull Request files
    script:
      - cd $SRC_DIR
      - files=$(ls)
      - echo "Listing all files included in this Pull Request..."
      - echo files $files
{% endhighlight %}

### Developing on a site with a database:

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

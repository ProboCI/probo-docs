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

{% for recipe in site.recipes %}
{% if recipe.uid == 'shell_using_plugin' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}


**Developing on a site with a database tests**

{% for recipe in site.recipes %}
{% if recipe.uid == 'shell_develop_with_database_tests' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

---
layout: "docs"
title: Script Plugin
class: documentation
permalink: /plugins/script-plugin/
published: true
---
The Probo.CI Script plugin is very similar to the [Shell plugin](/plugins/shell-plugin/) but is designed to run multiple lines of commands.

Instead of `command`, the Script plugin requires a parameter for `script`. This allows you to define a set of Shell commands to run during the site build. You can list as many commands as you like within the steps in your .probo.yaml file. Remember to include a `name` for each `script`.

## Examples

### Using the Script plugin

{% for recipe in site.recipes %}
{% if recipe.uid == 'script_using_plugin' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}


### Developing on a site with a database:

{% for recipe in site.recipes %}
{% if recipe.uid == 'script_site_with_database' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

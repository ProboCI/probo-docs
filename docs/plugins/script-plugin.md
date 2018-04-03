---
layout: "docs"
title: Script Plugin
class: documentation
permalink: /plugins/script-plugin/
published: true
---
The Probo.CI Script plugin is very similar to the [Shell plugin](/plugins/shell-plugin/) but is designed to run multiple lines of commands.

Instead of `command`, the Probo Script plugin requires a parameter for `script`. This allows you to define a set of Shell commands to run during the Probo Build process for your site. You can list as many commands as you like within the steps in your `.probo.yaml` file. Remember to include a `name` for each `script`.

## Probo Script Plugin Exit Codes

Currently a [Probo Build Step](/build/steps/) will pass or fail based on the exit code of last command run in that particular step. Be sure to put any automated tests you want to ensure return the exit code you desire as the last command in a [Probo Script Plugin](plugins/script-plugin/) step or in a separate Probo Build Step. False positives will occur if a command exits 1 after automated tests such as behat may actually be failing in the Probo Build Step. This same execution ordering should be noted on Probo plugins that extend the Probo Script Plugin like the [Probo LAMP Plugin](/plugins/lamp-plugin/), the [Probo Drupal Plugin](/plugins/drupal-plugin/), and the [Probo Wordpress Plugin](/plugins/wordpress-plugin/).

## Probo Script Plugin Examples

### Using the Probo Script plugin

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

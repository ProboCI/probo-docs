---
layout: "docs"
title: Build Steps
class: documentation
permalink: /build-steps/
published: true
---
Steps are the commands to run for the build. These are typically steps for setting up a site and running tests and will get their own status updates.

Each step must have a **name**, which should provide context for the actions being performed. Steps are identified by their name in build status interfaces on the pull request and the Probo app. Therefore it should be written in plain language so it is universally understood.

## Plugins

Each step also has a **plugin**. The default plugin is `Shell`.  Depending on the plugin you specify, you will have access to various parameters. These parameters allow you to configure your Probo site build. You can use multiple plugins, but you must declare the plugin used for each step before its parameters.

Currently plugin names are case sensitive. For example this means that `shell` will not work. Refer to a specific plugin page for the correct name.

**Available Plugins:**

Click the names below for more information on the specific plugin parameters you can use in your `.probo.yaml` file.

* [Shell Plugin](/docs/plugins/shell-plugin/ "Shell Plugin")
* [Script Plugin](/docs/plugins/script-plugin/ "Script Plugin")
* [Drupal Plugin](/docs/plugins/drupal-plugin/ "Drupal Plugin")
* [LAMP Plugin](/docs/plugins/lamp-plugin/ "LAMP Plugin")
* [WordPress Plugin](/docs/plugins/wordpress-plugin/ "WordPress Plugin")

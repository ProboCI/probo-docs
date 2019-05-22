---
layout: "docs"
title: Drupal Plugin
class: documentation
permalink: /plugins/drupal-plugin/
published: true
---
The Probo Drupal plugin provides an easy way to set Drupal site configuration options in a Probo Build and quickly integrate a Drupal website's repository. To use the Probo Drupal plugin you must declare `plugin: Drupal` in your `.probo.yaml` file. The Drupal plugin's parameters can automate some steps specific to Drupal such as reverting features, running database updates, clearing caches, or performing other build configuration steps.

The Probo Drupal plugin inherits all [Probo LAMP plugin](/plugins/lamp-plugin/) configuration options. This allows additional Probo Build steps in your `.probo.yaml` file to layer LAMP configuration options and commands on top of the Drupal site specific configuration.

See the <a href="#drupal-plugin-examples" title="Probo Drupal Plugin Examples">Probo Drupal Plugin Examples</a> section below for YAML config examples specific to Drupal.

## Directory Configuration

{% option_list %}
{% option %}
### `makeFile` {string}
The name of the [Drush make file](http://docs.drush.org/en/7.x/make/) to run to generate the install directory.
{% details Example %}
{% highlight yaml%}
# Use a file in your docroot
steps:
  - name: Specify make file
    plugin: Drupal
    makeFile: example.make

# Use an uploaded asset
assets:
  - probo-specific.make
steps:
  - name: Specify make file
    plugin: Drupal
    makeFile: $ASSET_DIR/probo-specific.make
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `makeForceComplete` {boolean}
Whether to use the `--force-complete` option for `drush make`. Defaults to `true`.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Do not force make file completion
    plugin: Drupal
    makeForceComplete: false
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `makeArgs` {array}
A set of parameters to concatenate onto the `drush make` command.
{% details Example %}
{% highlight yaml%}

{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `profileName` {string}
The profile name used in creating a symlink to this directory if a Drush make file is specified with the [`makeFile`](#makefile-string) option. Used to select the profile to install if the [`runInstall`](#runinstall-boolean) option is selected.
{% details Example %}
{% highlight yaml%}

{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `runInstall` {boolean}
If set, run `drush site-install` to perform a fresh install of the site using the [`profileName`](#profilename-string) as the install profile and allowing the [`installArgs`](#installargs-string) option to configure the install.
{% details Example %}
{% highlight yaml%}

{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `installArgs` {string}
A set of parameters to concatenate onto the `drush site-install` command if the [`runInstall`](#runinstall-string) option is set. Defaults to ''.
{% details Example %}
{% highlight yaml%}

{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `siteFolder` {string}
Specifies the site folder to use for this build (the folder within the Drupal `sites` folder). Defaults to `default`.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Specify non-default site
    plugin: Drupal
    siteFolder: blog
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `subDirectory` {string}
The path to your docroot if it is a subdirectory of your git repository.
{% details Example %}
{% highlight yaml%}

{% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

## Database Configuration

{% option_list %}
{% option %}
### `database` {string}
The file name of the database to import if specified. Note that this database must be added to the assets array separately.
{% details Example %}
{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Import database
    plugin: Drupal
    database: mydb.sql.gz
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `databaseGzipped` {boolean}
Whether the database was sent gzipped and whether it should therefore be gunzipped before importing.

{% details Example %}
{% highlight yaml%}
steps:
  - name: Unzip database
    plugin: Drupal
    databaseGzipped: true
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `databaseBzipped` {boolean}
Whether the database was sent bzipped and whether it should therefore be bunzipped before importing.

{% details Example %}
{% highlight yaml%}
steps:
  - name: Unzip database
    plugin: Drupal
    databaseBzipped: true
{% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

## Settings.php Options

{% option_list %}

{% option %}
### `settingsRequireFile` {string}
A file to require at the end of settings.php. This option helps you to avoid checking settings.php into your repository.
{% details Example %}
{% highlight yaml%}
# Require checked in settings
steps:
  - name: Require Probo-specific site settings
    plugin: Drupal
    settingsRequireFile: sites/default/probo-settings.php

# Use an uploaded asset
assets:
  - probo-settings.php
steps:
  - name: Require Probo-specific site settings
    plugin: Drupal
    settingsRequireFile: $ASSET_DIR/probo-settings.php
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `settingsAppend` {string}
Specify a snippet, such as a variable, to append to the end of the settings.php file.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Append to settings.php
    plugin: Drupal
    settingsAppend: |
      $bar = 'baz';
      $foo = 'stuff';
{% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

## Additional Options
{% option_list %}

{% option %}
### `drupalVersion` {integer}
Specifies which version of Drupal you are using so that the appropriate commands can be run. For example, if you specify "8" the [`clearCaches`](#clearcaches-boolean) option will run `drush cache-rebuild`. Defaults to 7. Accepts the integer values 6, 7, or 8.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Set Drupal version
    plugin: Drupal
    drupalVersion: 8
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `databaseUpdates` {boolean}
Determines whether to run `drush updb` after the build is finished.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Run database updates
    plugin: Drupal
    databaseUpdates: true
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `clearCaches` {boolean}
Whether to clear all caches using `drush cc all` after the build is finished. Pair with the [`drupalVersion`](#drupalversion-integer) option to ensure the proper command is run for your version of Drupal. Defaults to true.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Clear caches
    plugin: Drupal
    clearCaches: true
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `revertFeatures` {boolean}
Whether to revert features using `drush fra` after the build is finished. To use this option, your site must have the [Features module](https://www.drupal.org/project/features) installed.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Revert features
    plugin: Drupal
    revertFeatures: true
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `fileProxy` {string}
Installs and enables the [Stage File Proxy module](https://www.drupal.org/project/stage_file_proxy) to retrieve public and/or private files from another instance of the site such as production or development. Enter the protocol and fully qualified domain here.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Proxy site files
    plugin: Drupal
    fileProxy: https://example.com
{% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

<h2 id="drupal-plugin-examples">Probo Drupal Plugin Examples</h2>

**Using the `Drupal` plugin**

{% for example in site.examples %}
{% if example.uid == 'drupal_using_plugin' %}
  {{ example.content }}
{% endif %}
{% endfor %}

**Using the Settings Options**

{% for example in site.examples %}
{% if example.uid == 'drupal_settings_option' %}
  {{ example.content }}
{% endif %}
{% endfor %}

**Setting `LAMPApp` PHP Configuration Options on a Drupal Installation**

{% for example in site.examples %}
{% if example.uid == 'lamp_set_php_config_on_drupal' %}
  {{ example.content }}
{% endif %}
{% endfor %}

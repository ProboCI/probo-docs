---
layout: "docs"
title: LAMP Plugin
class: documentation
permalink: /plugins/lamp-plugin/
published: true
---
Probo provides LAMP (Linux, Apache, MySQL, and PHP) stack configuration options to make it easier to set up your `.probo.yaml` file to mimic your production environment. To use the Probo LAMP plugin you must declare `plugin: LAMPApp` in your `.probo.yaml` file, or add these options to one of the other available LAMP based Probo plugins.

The [Probo Drupal plugin](/plugins/drupal-plugin/), [Probo WordPress plugin](/plugins/wordpress-plugin/), and other LAMP based Probo plugins inherit these options. This allows for these configuration options to be easily used in conjunction with those plugins.

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
      plugin: LAMPApp
      database: mydb.sql.gz
  {% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `databaseName` {string}
The name of the database to use.
{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Set database name
      plugin: LAMPApp
      databaseName: mydb
  {% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `databaseUser` {string}
The username of the database to use.
{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Set database user
      plugin: LAMPApp
      databaseUser: mydbuser
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
      plugin: LAMPApp
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
      plugin: LAMPApp
      databaseBzipped: true
  {% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `mysqlCnfOptions` {hash}
A hash of MySQL configuration options, such as {option1: 'option1Value', option2: 'option2Value',}.

{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Set MySQL options
      plugin: LAMPApp
      mysqlCnfOptions:
        key_buffer_size: 16M
        max_allowed_packet: 128M
  {% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `restartMysql` {boolean}
Whether to restart MySQL. If `mysqlCnfOptions` is set, MySQL will be restarted automatically, so you probably won't need to use this.

{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Restart MySQL
      plugin: LAMPApp
      restartMysql: true
  {% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

## PHP Configuration

Probo builds have their own isolated `php.ini` files. Specific PHP options for your build can be modified using the `phpIniOptions` configuration option in  your `.probo.yaml` file. The `phpIniOptions` configuration option must be paired with a LAMPApp compatible [Probo Plugin](https://docs.probo.ci/plugins/) to set specific PHP settings within the plugin's steps.

See the <a href="#lamp-plugin-examples" title="Probo LAMP Plugin Examples">Probo LAMP Plugin Examples</a> section below for YAML config examples that set custom `upload_max_filesize`, `post_max_size`, and `memory_limit` PHP settings values for a Probo Build using the Probo LAMPApp plugin, and [Probo Drupal plugin](/plugins/drupal-plugin/).

{% option_list %}
{% option %}
### `phpIniOptions` {hash}
A hash of options, such as {option1: 'option1Value', option2: 'option2Value',}.
{% endoption %}

{% option %}
### `phpConstants` {hash}
A hash of constants, such as {const1: 'const1Value', const2: 'const2Value',}. This will overwrite any other auto_prepend_file directives in your php.ini.
{% endoption %}

{% option %}
### `phpMods` {array}
An array of php5 modules to enable (should be installed via the `installPackages` option if needed).
{% endoption %}
{% endoption_list %}

## Apache Configuration

{% option_list %}
{% option %}
### `apacheMods` {array}
An array of apache modules to enable (should be installed via installPackages if needed).
{% endoption %}

{% option %}
### `restartApache` {boolean}
Whether to restart Apache. If phpIniOptions, phpConstants, phpMods, or apacheMods are set, Apache will be restarted automatically, so you probably won't need to use this.
{% endoption %}
{% endoption_list %}

## Additional Options

{% option_list %}
{% option %}
### `subDirectory` {string}
The directory of the actual web root (defaults to 'docroot').
{% endoption %}

{% option %}
### `cliDefines` {hash}
A hash of defines, such as {define1: 'define1Value', define2: 'define2Value',}.
{% endoption %}

{% option %}
### `installPackages` {array}
An array of additional packages to install.
{% endoption %}

{% option %}
### `varnish` {hash}
A hash of options to configure the Varnish HTTP cache. The options are `enabled`, a boolean that defaults to false and indicates whether or not to enable Varnish, and `pathToVcl`, a string that indicates the path to your Varnish configuration file relative to the container root.
{% endoption %}
{% endoption_list %}

<h2 id="lamp-plugin-examples">Probo LAMP Plugin Examples</h2>

**Note:** The `LAMPApp` plugin options are inherited by the Probo Drupal, Wordpress, and other Probo plugins.

**Using the `LAMPApp` Plugin to Test a PHP/MySQL Based Application**

{% for recipe in site.recipes %}
{% if recipe.uid == 'lamp_test_phpmysql_app' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

**Setting `LAMPApp` PHP Configuration Options**

{% for recipe in site.recipes %}
{% if recipe.uid == 'lamp_set_php_config' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

**Setting `LAMPApp` PHP Configuration Options on a Drupal Installation**

{% for recipe in site.recipes %}
{% if recipe.uid == 'lamp_set_php_config_on_drupal' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

**Setting `LAMPApp` Varnish Configuration Options**

{% for recipe in site.recipes %}
{% if recipe.uid == 'lamp_set_varnish_config' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

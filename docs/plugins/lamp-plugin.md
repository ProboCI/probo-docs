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
A hash of MySQL configuration options.

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

{% option_list %}
{% option %}
### `phpIniOptions` {hash}
Probo builds have their own isolated `php.ini` files. Specific PHP options for your build can be modified using the this configuration option.
{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Configure PHP
      plugin: LAMPApp
      phpIniOptions:
        upload_max_filesize: 25M
        post_max_size: 25M
        memory_limit: 256M
  {% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `phpConstants` {hash}
A hash of PHP constants. This will overwrite any other `auto_prepend_file` directives in your php.ini.
{% endoption %}

{% option %}
### `phpMods` {array}
An array of PHP 5 modules to enable (should be installed via [`installPackages`](#installpackages-array) if needed).
{% endoption %}
{% endoption_list %}

## Apache Configuration

{% option_list %}
{% option %}
### `apacheMods` {array}
An array of Apache modules to enable (should be installed via [`installPackages`](#installpackages-array) if needed).
{% endoption %}

{% option %}
### `restartApache` {boolean}
Whether to restart Apache. If `phpIniOptions`, `phpConstants`, `phpMods`, or `apacheMods` are set, Apache will be restarted automatically, so you probably won't need to use this.
{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Restart Apache
      plugin: LAMPApp
      restartApache: true
  {% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

## Additional Options

{% option_list %}
{% option %}
### `subDirectory` {string}
The directory of the actual web root (defaults to 'docroot').
{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Configure web root
      plugin: LAMPApp
      subDirectory: $SRC_DIR/web
  {% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `cliDefines` {hash}
A hash of defines.
{% endoption %}

{% option %}
### `installPackages` {array}
An array of packages to install in addition to those that come with the [Docker image](/build/images).
{% endoption %}

{% option %}
### `varnish` {hash}
A hash of options to configure the Varnish HTTP cache.

`enabled`: A boolean that indicates whether or not to enable Varnish. Defaults to false.

`pathToVcl`: A string that indicates the path to your Varnish configuration file relative to the container root.
{% details Example %}
  {% highlight yaml%}
  steps:
    - name: Configure Varnish
      plugin: LAMPApp
      varnish:
        enabled: true
        pathToVcl: $SRC_DIR/config.vcl
  {% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

<h2 id="lamp-plugin-examples">Probo LAMP Plugin Examples</h2>

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

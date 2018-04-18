---
layout: "docs"
title: LAMP Plugin
class: documentation
permalink: /plugins/lamp-plugin/
published: true
---
Probo provides LAMP (Linux, Apache, MySQL, and PHP) stack configuration options to make it easier to set up your `.probo.yaml` file to mimic your production environment. To use the LAMP plugin you must declare `plugin: LAMPApp` in your `.probo.yaml` file, or add these options to one of the other available LAMP based Probo plugins.

The Probo [Drupal plugin](/plugins/drupal-plugin/), [WordPress plugin](/plugins/wordpress-plugin/), and other LAMP based Probo plugins inherit these options. This allows for these configuration options to be easily used in conjunction with those plugins.

## Database Configuration

{: .table .table-striped .table-bordered}
|---------|----------------------------|
| `database` | The file name of the database to import if specified. Note that this database *must be added to the assets array separately*. Accepts a **string** value. |
| `databaseName` | The name of the database to use. Accepts a **string** value. |
| `databaseUser` | The username of the database to use. Accepts a **string** value. |
| `databaseGzipped` | Whether the database was sent gzipped and whether it should therefore be gunzipped before importing. Accepts a **boolean** value. |
| `databaseBzipped` | Whether the database was sent bzipped and whether it should therefore be bunzipped before importing. Accepts a **boolean** value. |

## PHP Configuration

{: .table .table-striped .table-bordered}
|---------|----------------------------|
| `phpIniOptions` | A hash of options, such as {option1: 'option1Value', option2: 'option2Value',}. Accepts a **hash** value. |
| `phpConstants` | A hash of constants, such as {const1: 'const1Value', const2: 'const2Value',}. This will overwrite any other auto_prepend_file directives in your php.ini. Accepts a **hash** value. |
| `phpMods` | An array of php5 modules to enable (should be installed via installPackages if needed). Accepts an **array** value. |

### Modify PHP Environment Options in a Build
Probo builds have their own isolated `php.ini` files. Specific PHP options for your build can be modified using the `phpIniOptions` configuration option in  your `.probo.yaml` file. The `phpIniOptions` configuration option must be paired with a LAMPApp compatible [Probo Plugin](https://docs.probo.ci/plugins/) to set specific PHP settings within the plugin's steps. 

See below for an example YAML config that sets custom `upload_max_filesize`, `post_max_size`, and `memory_limit` PHP settings values for a Probo Build using the [Probo LAMPApp plugin](/plugins/lamp-plugin/).

{% highlight yaml %}
steps:
  - name: LAMPApp site configuration example.
    plugin: LAMPApp
    databaseName: example
    databaseUser: example
    phpIniOptions:
      upload_max_filesize: 25M
      post_max_size: 25M
      memory_limit: 256M
{% endhighlight %}

## Apache Configuration

{: .table .table-striped .table-bordered}
|---------|----------------------------|
| `apacheMods` | An array of apache modules to enable (should be installed via installPackages if needed). Accepts an **array** value. |
| `restartApache` | Whether to restart Apache. If phpIniOptions, phpConstants, phpMods, or apacheMods are set, Apache will be restarted automatically, so you probably won't need to use this. Accepts a **boolean** value. |

## Additional Options

{: .table .table-striped .table-bordered}
|---------|----------------------------|
| `subDirectory` | The directory of the actual web root (defaults to 'docroot'). Accepts a **string** value. |
| `cliDefines` | A hash of defines, such as {define1: 'define1Value', define2: 'define2Value',}. Accepts a **hash** value. |
| `installPackages` | An array of additional packages to install. Accepts an **array** value. |

## Examples

**Note:** The `LAMPApp` plugin options are inherited by the Probo Drupal, Wordpress, and other Probo plugins.

**Using the `LAMPApp` Plugin to Test a PHP/MySQL Based Application**

{% for recipe in site.recipes %}
{% if recipe.uid == 'lamp_test_phpmysql_app' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

**Setting `LAMPApp` PHP Configuration Options on a Drupal Installation**

{% for recipe in site.recipes %}
{% if recipe.uid == 'lamp_set_php_config_on_drupal' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

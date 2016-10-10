---
layout: "docs"
title: Drupal Plugin
class: documentation
permalink: /docs/plugins/drupal-plugin/
published: true
---
The Drupal plugin provides an easy way for you to configure your Drupal build and to save you some shell scripting. To use the Drupal plugin you must declare `plugin: Drupal` in your `.probo.yaml` file. The plugin's parameters can automate your Drupal build by reverting features, running database updates, clearing caches, or performing other build configuration steps.

{: .table .table-striped .table-bordered}
| Directory Configuration |                                                                                                   |
|-------------------------|---------------------------------------------------------------------------------------------------|
|`makeFile`               | The name of the [Drush make file](http://www.drush.org/en/master/make/) to run to generate                             the install directory. Accepts a **string** value.                             |
|`profileName`            | The profile name used in creating a symlink to this directory if a Drush make file is                                  specified with the `makeFile` option and used to select the profile to install if the `runInstall`                             option is selected. Accepts a **string** value.                                |
|`runInstall`             | If set, run `drush site-install` to perform a fresh install of the site using the                                      `profileName` as the install profile and allowing the `installArgs` option to configure the                                    install. Accepts a **boolean** value.                                            |
|`installArgs`            | A set of parameters to concatenate onto the `drush site-install` command if the                                        `runInstall` option is set. Defaults to ''. Accepts a **string** value. |
|`siteFolder`             | Specifies the site folder to use for this build (the folder within the Drupal `sites`                                  folder). Defaults to `default`. Accepts a **string** value.             |
| `subDirectory`     |The path to your docroot if it is a subdirectory of your git repository. Accepts a **string** value. |

{: .table .table-striped .table-bordered}
| Database Configuration  |                                                                                                   |
--------------------------|---------------------------------------------------------------------------------------------------|
| `database`              |The name of the database to import if specified. Note that this database *must be added as                             an asset separately*. Accepts a **string** value. If you use this parameter, don't add the database with the shell plugin. Do not use the zip format for your compressed database. Use the gzip format.                           |
| `databaseGzipped`       |Whether the database was sent gzipped and whether it should therefore be gunzipped before                               importing. Accepts a **boolean** value.                                         |
| `databaseBzipped`       |Whether the database was sent bzipped and whether it should therefore be bunzipped before                               importing. Accepts a **boolean** value.                                         |

{: .table .table-striped .table-bordered}
| Settings Options    |                                                                                                     |
|-----------------------|-----------------------------------------------------------------------------------------------------|
| `settingsRequireFile`      |A file to require at the end of settings.php. This option helps you to avoid checking settings.php into your repository. Accepts a **string** value.|
| `settingsAppend`      |Specify a snippet, such as a variable, to append to the end of the settings.php file. Accepts a **string** value. |

{: .table .table-striped .table-bordered}
| Additional Options    |                                                                                                     |
|-----------------------|-----------------------------------------------------------------------------------------------------|
| `drupalVersion`       |Specifies which version of Drupal you are using so that the appropriate commands can be run. For example, if you specify "8" the `clearCaches` option will run `drush cache-rebuild`. Defaults to 7. Accepts the **integer** values 6, 7, or 8.        |
| `databaseUpdates`     |Determines whether to run `drush updb` after the build is finished. Accepts a                                  **boolean** value.                                                                         |
| `clearCaches`         |Whether to clear all caches using `drush cc all` after the build is finished. Your Drupal site must be version 7 or older to use this option. Defaults to                                           true. Accepts a **boolean** value.                                                 |
| `revertFeatures`      |Whether to revert features using `drush fra` after the build is finished. To use this option, your site must have the [Features module](https://www.drupal.org/project/features) installed. Accepts a                             **boolean** value.                                                                        |

## Examples

**Using the `Drupal` plugin**

{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Probo site setup
    plugin: Drupal
    database: mydb.sql.gz
    databaseGzipped: true
    databaseUpdates: true
    subDirectory: docroot
    revertFeatures: true
{% endhighlight %}

**Using the Settings Options**

{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Provision Drupal
    plugin: Drupal
    runInstall: standard
    settingsRequireFile: 'site-settings.php'
    settingsAppend: |
      $bar = 'baz';
      $foo = 'stuff';
{% endhighlight %}

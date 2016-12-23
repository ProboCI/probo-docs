---
layout: "docs"
title: WordPress Plugin
class: documentation
permalink: /plugins/wordpress-plugin/
published: true
---

The WordPress plugin provides some handy options to make setting up a `.probo.yaml` file for your WordPress site easier. To use this plugin you must declare `plugin: WordPressApp` in a step in your `.probo.yaml` file.

WordPress core and plugins generally prefer absolute URLs for links and images instead of relative URLs. This means Probo needs to rewrite your data in order for links to work in the test environment. The `wpUrl` and `wpHome` configuration options set the string values Probo will use to search for the appropriate base paths and replace them with the Probo environment's URL.

## Domain/URL Configuration

{: .table .table-striped .table-bordered}
|------------------------|-------|
| wpUrl | The URL of the original site as stored in the database. This is replaced by the Probo URL in the database. Accepts a **string** value. |
| wpHome | The homepage URL of the original site (including the domain). This is replaced by the Probo URL in the database. Accepts a **string** value. |


## Database Configuration

{: .table .table-striped .table-bordered}
|------------------------|-------|
| database | The filename of the database to import if specified. **Note that this database must be added to the Assets section separately.** Accepts a **string** value. |
| databaseName   | The name of the database. Accepts a **string** value. Defaults to `wordpress`. |
| databaseGzipped| Whether the database was sent gzipped and whether it should therefore be gunzipped before importing. Accepts a **boolean** value. |

## Additional Options

{: .table .table-striped .table-bordered}
|--------------------|-------|
| subDirectory | The directory of the actual web root. Accepts a **string** value. Defaults to `docroot`. |
| flushCaches | Whether or not to flush the cache. Accepts a **boolean** value. Defaults to `true`. |
| updatePlugins | Whether or not to attempt to update any WordPress plugins to their latest versions. Accepts a **boolean** value. Defaults to `false`. |

## Example

**Using the Wordpress plugin**

{% highlight yaml%}
 assets:
  - dev.sql.gz
  steps:
  - name: Site setup
    plugin: WordPressApp
    database: dev.sql.gz
    databaseName: wordpress
    databaseGzipped: true
    subDirectory: code
    devDomain: example.com
    devHome: example.com/home
  - name: Flush the cache
    plugin: WordPressApp
    flushCaches: true
{% endhighlight %}

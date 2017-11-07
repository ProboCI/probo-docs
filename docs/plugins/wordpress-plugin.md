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

### Known Issues

#### Database Collation Errors on Builds
Currenty in Wordpress 4.8.x, the MySQL database collation can be in COLLATION format `utf8mb4_unicode_520_ci`. This format is unsupported by our current docker images depending on your site's MySQL Server version. If you exported your DB from MySQL 5.6 or higher, you might receive the following error:

    ERROR 1273 (HY000) at line 25: Unknown collation: 'utf8mb4_unicode_520_ci'
    
You will need to modify your exported `sitename.sql` file to allow your exported DB to import properly on Probo's current Docker images.
    
##### Workaround:

Find and replace `utf8mb4_unicode_520_ci` with `utf8mb4_unicode_ci` in your exported `sitename.sql` file. Then, upload this modified file as a Probo Asset, and set this DB as an asset in  your `.probo.yaml` file. This will no longer be neccessary once we create docker images that support the newer `utf8mb4_unicode_520_ci` format.

#### WP-CLI Version Errors
In some cases we have seen the [wp-cli](http://wp-cli.org/) tool error out during a build using the `utf8mb4_unicode_ci` DB collation. Updating the `wp-cli` tool in the `.probo.yaml` file resolves this issue. You will need to update your `wp-cli` version if you receive the following error in your Probo build logs for the "Site setup" step:

    Fatal error: Call to undefined function apply_filters() in /src/wp-includes/load.php on line 316

##### Workaround:

Update `wp-cli` in your `.probo.yaml` steps.

    {% highlight yaml%}
    assets:
      - wordpress.sql.gz
    steps:
      - name: Update wp-cli.
        plugin: Script
        script:
          - wp cli update --allow-root --yes
      - name: Site setup
        plugin: WordPressApp
        database: 'wordpress.sql.gz'
        databaseName: 'wordpress'
        databaseGzipped: true
        subDirectory: 'code'
        devDomain: 'http://example.com'
        devHome: 'http://example.com/'
        flushCaches: true
    {% endhighlight %}


## Additional Options

{: .table .table-striped .table-bordered}
|--------------------|-------|
| subDirectory | The directory of the actual web root. Accepts a **string** value. Defaults to `docroot`. |
| flushCaches | Whether or not to flush the cache. Accepts a **boolean** value. Defaults to `true`. |
| updatePlugins | Whether or not to attempt to update any WordPress plugins to their latest versions. Accepts a **boolean** value. Defaults to `false`. |

## Example

**Using the Wordpress plugin**

{% for recipe in site.recipes %}
{% if recipe.uid == 'wordpress_using_plugin' %}
  {{ recipe.content }}
{% endif %}
{% endfor %}

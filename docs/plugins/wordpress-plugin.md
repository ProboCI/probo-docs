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

{% option_list %}
{% option %}
### `wpUrl` {string}
The URL of the original site as stored in the database. This is replaced by the Probo URL in the database.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Identify site URL
    plugin: WordPressApp
    wpUrl: http://www.example.com
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `wpHome` {string}
The homepage URL of the original site (including the domain). This is replaced by the Probo URL in the database.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Identify homepage URL
    plugin: WordPressApp
    wpHome: http://www.example.com
{% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

## Database Configuration

{% option_list %}
{% option %}
### `database` {string}
The filename of the database to import if specified. **Note that this database must be added to the Assets section separately.**
{% details Example %}
{% highlight yaml%}
assets:
  - mydb.sql.gz
steps:
  - name: Import database
    plugin: WordPressApp
    database: mydb.sql.gz
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `databaseName` {string}
The name of the database. Defaults to `wordpress`.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Set database name
    plugin: WordPressApp
    databaseName: mydb
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
    plugin: WordPressApp
    databaseGzipped: true
{% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

### Known Issues

#### Database Collation Errors on Builds
Currenty in Wordpress 4.8.x+, the MySQL database collation can be in COLLATION format `utf8mb4_unicode_520_ci`. This format is unsupported by our older Docker images depending on your site's MySQL Server version. If you exported your database from MySQL 5.6 or higher, you might receive the following error when importing the DB to Probo:

    ERROR 1273 (HY000) at line 25: Unknown collation: 'utf8mb4_unicode_520_ci'

##### Workaround:

Use one of our Ubuntu 16.04 or Ubuntu 18.04 [Probo Docker images](https://docs.probo.ci/build/images/) instead to resolve this issue as they have a newer version of MySQL installed supports `utf8mb4_unicode_520_ci`.

#### WP-CLI Version Errors
In some cases we have seen the [wp-cli](http://wp-cli.org/) tool error out during a build using the `utf8mb4_unicode_ci` DB collation. Updating the `wp-cli` tool in the `.probo.yaml` file resolves this issue. You will need to update your `wp-cli` version if you receive the following error in your Probo build logs for the "Site setup" step:

    Fatal error: Call to undefined function apply_filters() in /src/wp-includes/load.php on line 316

##### Workaround:

Update `wp-cli` in your `.probo.yaml` steps, or use one of our Ubuntu 16.04 or Ubuntu 18.04 images to resolve this issue.

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

{% option_list %}
{% option %}
### `subDirectory` {string}
The directory of the actual web root. Defaults to `docroot`.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Configure web root
    plugin: WordPressApp
    subDirectory: $SRC_DIR/web
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `flushCaches` {boolean}
Whether or not to flush the cache. Defaults to `true`.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Flush caches
    plugin: WordPressApp
    flushCaches: true
{% endhighlight %}
{% enddetails %}
{% endoption %}

{% option %}
### `updatePlugins` {boolean}
Whether or not to attempt to update any WordPress plugins to their latest versions. Defaults to `false`.
{% details Example %}
{% highlight yaml%}
steps:
  - name: Update plugins
    plugin: WordPressApp
    updatePlugins: true
{% endhighlight %}
{% enddetails %}
{% endoption %}
{% endoption_list %}

## Example

**Using the Wordpress plugin**

{% for example in site.examples %}
{% if example.uid == 'wordpress_using_plugin' %}
  {{ example.content }}
{% endif %}
{% endfor %}

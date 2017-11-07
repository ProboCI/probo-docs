{% include quickstart/create-branch.md %}


**Step 9: Declare your assets and build your steps.**

Tell Probo.CI what database you are going to use for your Probo.CI builds. Add in your parameters as steps. You can [read more in the docs about different parameter options](/plugins/wordpress-plugin/).
{% highlight yaml%}
assets:
  - wordpress.sql.gz
 steps:
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

**Note:** The [wp-cli](http://wp-cli.org/) version we have currently on our docker images is old. Add a step before the Site setup step to update `wp-cli` if you receive the following error in your "Site setup" build step:

    Fatal error: Call to undefined function apply_filters() in /src/wp-includes/load.php on line 316

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

**Step 10: In your new branch probo-build, add and commit your files to your remote origin.**

{% highlight yaml %}
 git add .probo.yaml  
 git commit -m "Adding .probo.yaml."  
 git push -u origin probo-build   
{% endhighlight %}

<img src="/images/git-create-branch.gif" alt="Add your Probo.CI Configuration" class="docs-gif screenshot">

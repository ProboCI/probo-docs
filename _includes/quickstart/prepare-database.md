You will need to import your project's database with the [Probo Uploader](https://github.com/ProboCI/probo-uploader), a CLI tool. You will first import your database, then you will declare the database file in a `.probo.yaml` file. We will use [the Drupal plugin](/docs/drupal-plugin/ "Drupal plugin"){:target="_blank"} to revert features, run database updates, and clear caches. (Cache all the things!)

**Step 3: Sanitize your database (optional).**

Although we compress and encrypt your database, it is always best practice to sanitize and compress your files.

**Very Important: Do not do this on a production database.**

[Drush sql-sanitize](http://drushcommands.com/drush-7x/sql/sql-sanitize){:target="_blank"} will reset passwords and email addresses in the user table and truncate Drupal's sessions tables. It is extremely important to note that you do not do this on a production database.
{% highlight bash %}
drush sql-sanitize
{% endhighlight %}

**Step 4: Use Drush to get and compress your database in a sql file.**

If you wish to compress your database you'll need to use [gzip](http://www.gzip.org/){:target="_blank"}. Other zip files won't work.

{% highlight bash %}
drush sql-dump | gzip > dev.sql.gz
{% endhighlight %}


**Step 5: Install the [Probo Uploader](https://github.com/ProboCI/probo-uploader){:target="_blank"} on your machine with npm.**

You will need Node.js for the Probo.CI Uploader. [Install node.js and npm if you don't already have them.](https://nodejs.org/en/){:target="_blank"}
{% highlight bash %}
sudo npm install -g probo-uploader
{% endhighlight %}

**Step 6: Upload your database to the Probo.CI app.**

Each repository will have it's own token. You can find your project's token on the dashboard of the Probo.CI app.
{% highlight bash %}
probo-uploader --token=[your-token] dev.sql.gz
{% endhighlight %}

<img src="/images/database-probo.gif" alt="Upload your Database Gif" class="docs-gif">

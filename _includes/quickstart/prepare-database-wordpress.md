You will need to import your project's database within the Probo.CI App, or use the [Probo Uploader](https://github.com/ProboCI/probo-uploader), a CLI tool. You will first import your database, then you will declare the database file in a `.probo.yaml` file. We will use [the Wordpress plugin](/plugins/wordpress-plugin/ "Wordpress Plugin"){:target="_blank"} to prepare the Wordpress install, import the database, and flush caches. (Cache all the things!)

**Step 3: Prepare the Database**

Export your existing MySQL database and ensure your database COLLATION is set to `utf8mb4_unicode_ci` or `utf8_unicode_ci` in the `wordpress.sql` file. There is currently an issue importing a DB with `utf8mb4_unicode_520_ci` COLLATION on our current docker images available for builds. Find and replace `utf8mb4_unicode_520_ci` with `utf8mb4_unicode_ci` in your exported `wordpress.sql` file if you receive the following error in your build:

    ERROR 1273 (HY000) at line 25: Unknown collation: 'utf8mb4_unicode_520_ci'

**Step 4: Compress your database.**

If you wish to compress your database you'll need to use [gzip](http://www.gzip.org/){:target="_blank"}. Other compressed file types like zip won't work.

{% highlight bash %}
gzip wordpress.sql
{% endhighlight %}


**Step 5: Install the [Probo Uploader](https://github.com/ProboCI/probo-uploader){:target="_blank"} on your machine with npm. (Optional)**

You will need Node.js for the Probo.CI Uploader. [Install node.js and npm if you don't already have them.](https://nodejs.org/en/){:target="_blank"}
{% highlight bash %}
sudo npm install -g probo-uploader
{% endhighlight %}

**Step 6: Upload your database to the Probo.CI app.**

Probo users can now upload database assets and other file assets directly from within the Probo.CI app on the Build Assets tab within their project.

Each repository also has it's own Upload Token that can be used to upload file assets through the command line. You can find your project's Upload Token on the Upload Tokens tab within the Probo project.
{% highlight bash %}
probo-uploader --token=[your-token] wordpress.sql.gz
{% endhighlight %}

<img src="/images/database-probo.gif" alt="Upload your Database Gif" class="docs-gif">

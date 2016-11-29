{% include quickstart/create-branch.md %}


**Step 9: Declare your assets and build your steps.**

Tell Probo.CI what database you are going to use for your Probo.CI builds. Add in your parameters as steps. You can [read more in the docs about different parameter options](/docs/steps/drupal-plugin/).
{% highlight yaml%}
assets:     
  - dev.sql.gz
steps:
  - name: Probo.CI site setup
    plugin: Drupal
    database: dev.sql.gz
    databaseGzipped: true
    databaseUpdates: true
    revertFeatures: true
    clearCaches: true
{% endhighlight %}


**Step 10: In your new branch probo-build, add and commit your files to your remote origin.**

{% highlight yaml %}
 git add .probo.yaml  
 git commit -m "Adding .probo.yaml."  
 git push -u origin probo-build   
{% endhighlight %}

<img src="/images/git-create-branch.gif" alt="Add your Probo.CI Configuration" class="docs-gif">

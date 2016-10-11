The real magic of Probo CI is automating pull requests to create test environments for you. In order to do that, you will need to add a few things to your project. 

**Step 7: Create a new branch.**

cd into your project and create a new branch.
{% highlight bash %}
git checkout -b probo-build
{% endhighlight %}

**Step 8: Create your .probo.yaml file.**

You will need a `.probo.yaml` file in the root of your directory. You can task Probo CI to run any number of build steps. Each step is a runnable plugin, and will get a status update sent to hosted repository for the commit. * Remember that indentation and spacing is important for yaml files.
{% highlight bash %}
vim .probo.yaml
{% endhighlight %}
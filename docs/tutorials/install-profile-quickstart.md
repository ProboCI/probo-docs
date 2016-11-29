---
layout: "docs"
title:  Drupal Install Profile QuickStart
class: documentation
permalink: /tutorials/drupal-install-profile-quickstart/
published: true
---

## Setup Probo for a Drupal site with an Install Profile.
Want to use a Drupal Install profile with your probo builds? With this setup you do not need to import a database because the drush site-install command will drop your database tables on build.

Below is a step by step example of a Drupal site install using Zivtech's [Bear installation profile](https://www.drupal.org/project/bear). Note that this walkthrough does not use all the available parameters provided by the Drupal plugin. You can find all available parameters in the [Drupal plugin documentation](/plugins/drupal-plugin/ "Drupal plugin Documentation").

Build Specs:

* Standard Drupal site
* Your repository is stored on GitHub (Although this uses GitHub, the same principles apply if you are using Bitbucket.)
* You have a really awesome [Drupal install profile.](https://www.drupal.org/node/306267)

> Bonus: Want a Drupal Install Profile? Check out Zivtech's [Bear Installation Profile](https://www.drupal.org/project/bear). Also, take a look at the [features](http://bear.zivtech.com/features) of its bear_skin theme.

----

{::options parse_block_html="true" /}
<div class="dropdown drop-click">
## Sign in and Sync up.
<div class="drop-inner">
{% include quickstart/github-sign-in.md %}
</div>
</div>

{::options parse_block_html="true" /}
<div class="dropdown drop-click open">
## Define your Install Profile configuration.
<div class="drop-inner">
{% include quickstart/create-branch.md %}

**Step 10: Declare your assets and build your steps.**

You can use the Drupal plugin to build your steps. If you would like to use the [default shell plugin see the install profile documentation](/drupal/install-profile/).
{% highlight bash%}
steps:
  - name: Probo site setup
    plugin: Drupal
    makeFile: build-bear.make
    installArgs: "--site-name='Install Profile Drupal Plugin Demo'"
    clearCaches: true
    profileName: bear
    runInstall: true
    revertFeatures: true

{% endhighlight %}


**Step 11: In your new branch probo-build, add and commit your files to your remote origin.**

{% highlight yaml %}
git add .probo.yaml  
 git commit -m"Adding .probo.yaml."  
 git push -u origin probo-build   
{% endhighlight %}

<img src='/images/git-create-branch.gif' alt='Add your Probo.CI Configuration' class='docs-gif'>
</div>
</div>

{::options parse_block_html="true" /}
<div class="dropdown drop-click">
## View your build.
<div class="drop-inner">
**Step 12: Go to your GitHub account. You will see your new branch inside your project.**
[https://github.com/Probo-Demos/install-profile-demo/branches](https://github.com/Probo-Demos/install-profile-demo/branches){:target="_blank"}


**Step 13: Create a pull request.**  

Click 'New Pull Request'.   

**Step 14: Bask in the glory of Probo.CI.**  

In GitHub you will see the Probo.CI build steps. You can now click on any of the **details** links and it will direct you back to the Probo.CI dashboard.

**Step 15: See your Probo.CI build.**  

In your Probo.CI dashboard, click on 'View build' and your site will open in a new tab. This Probo.build link uses the database defined in your `.probo.yaml` file and the code from your pull request.

**Step 16: Share your Probo.build link with clients, managers, even your parents.**

Note: It might take a few seconds for your Probo.CI environment to build. Wait until all checks have passed before following your Probo.build link.    

  In this repo there are two pull requests:  

  * [pull request to demo this with the drupal plugin](https://github.com/Probo-Demos/install-profile-demo/pull/2)   
  * [pull request to demo this with shell plugin](https://github.com/Probo-Demos/install-profile-demo/pull/1)  

<img src='/images/probo-build.gif' alt='Probo.CI build Gif' class='docs-gif'>
</div>
</div>

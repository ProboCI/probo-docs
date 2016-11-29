---
layout: "docs"
title: Drupal GitHub QuickStart
class: documentation
permalink: /tutorials/drupal-github-quickstart/
redirect_from: /drupal-quickstart/
published: true
---



## Setup Probo.CI for a Drupal site that uses GitHub.
Probo.CI is here to make your development workflow more fluid. We want you to be able to configure Probo.CI to fit your project's needs. Below is a step by step example of a standard Drupal site install with GitHub. This walkthrough does not use all the available parameters provided by the Drupal plugin, but you can see more available parameters in the [Drupal plugin documentation](/plugins/drupal-plugin/ "Drupal plugin Documentation"){:target="_blank"}.

You can find this Probo.CI example repository [here](https://github.com/Probo-Demos/drupal_github){:target="_blank"}.

Build Specs:

* Standard Drupal site with a MySQL database
* Your repository is stored on GitHub

----

## Sign in and Sync up.
{% include quickstart/github-sign-in.md %}

## Prepare your Database.
{% include quickstart/prepare-database.md %}

## Define your website configuration for Probo.
{% include quickstart/website-configuration.md %}

## View your build.
**Step 11: Go to your GitHub account. You will see your new branch inside your project.**
[https://github.com/Probo-Demos/drupal_github](https://github.com/Probo-Demos/drupal_github){:target="_blank"}

**Step 12: Create a pull request.**  
Click 'New Pull Request'.   

**Step 13: Bask in the glory of Probo.CI.**  
In GitHub you will see the Probo.CI build steps. You can now click on any of the **details** links and it will direct you back to the Probo.CI dashboard.

**Step 14: See your Probo.CI build.**  
In your Probo.CI dashboard, click on 'View build' and your site will open in a new tab. This Probo.build link uses the database defined in your `.probo.yaml` file and the code from your pull request.

**Step 15: Share your Probo.build link with clients, managers, even your parents.**
Note: It might take a few seconds for your Probo.CI environment to build. Wait until all checks have passed before following your Probo.build link.  


<img src="/images/probo-build.gif" alt="Probo.CI build Gif" class="docs-gif">

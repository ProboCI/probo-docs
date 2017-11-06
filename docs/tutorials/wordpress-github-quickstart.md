---
layout: "docs"
title: Wordpress GitHub QuickStart
class: documentation
permalink: /tutorials/wordpress-github-quickstart/
redirect_from: /wordpress-quickstart/
published: true
---

## Setup Probo.CI for a Wordpress site that uses GitHub.

Below is a step by step example of a standard Wordpress site install with GitHub. This walkthrough does not use all the available parameters provided by the Wordpress plugin, but you can see more available parameters in the [Drupal plugin documentation](plugins/wordpress-plugin/ "Wordpress Plugin Documentation"){:target="\_blank"}.

You can find this Probo.CI example repository [here](https://github.com/Probo-Demos/wordpress_github "Wordpress using Probo.CI demo repository"){:target="\_blank"}.

**You will need:**

1. A standard Wordpress site with a MySQL database. **Note:** Currently, databases cannot be collated as `utf8mb4_unicode_520_ci`. See notes below in Prepare your Database.
2. Your code stored in a repository on GitHub.

## Sign in and Sync up.
{% include quickstart/github-sign-in.md %}

## Prepare your Database.
{% include quickstart/prepare-database-wordpress.md %}

## Define your website configuration for Probo.
{% include quickstart/website-configuration-wordpress.md %}

## View your build.
**Step 11: Go to your GitHub account. You will see your new branch inside your project.**
[https://github.com/Probo-Demos/wordpress_github](https://github.com/Probo-Demos/wordpress_github){:target="\_blank"}

**Step 12: Create a pull request.**

Click 'New Pull Request'.

**Step 13: Bask in the glory of Probo.CI.**

In GitHub you will see the Probo.CI build steps. You can now click on any of the **details** links and it will direct you back to the Probo.CI dashboard.

**Step 14: See your Probo.CI build.**

In your Probo.CI dashboard, click on 'View build' and your site will open in a new tab. This Probo.build link uses the database defined in your `.probo.yaml` file and the code from your pull request.

**Step 15: Share your Probo.build link with clients, managers, even your parents.**

**Note:** It might take a few seconds for your Probo.CI environment to build. Wait until all checks have passed before following your Probo.build link.

<img src="/images/probo-build.gif" alt="Probo.CI build Gif" class="docs-gif screenshot">

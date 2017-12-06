---
layout: "docs"
title: Drupal Bitbucket QuickStart
class: documentation
permalink: /tutorials/drupal-bitbucket-quickstart/
published: true
---

## Setup Probo.CI for a Drupal site that uses Bitbucket.
Probo.CI is here to make your development workflow more fluid. We want you to be able to configure Probo.CI to fit your project's needs. Below is a step by step example of a standard Drupal site install with Bitbucket. This walkthrough does not use all the available parameters provided by the Drupal plugin, but you can see more available parameters in the [Drupal plugin documentation](/plugins/drupal-plugin/ "Drupal plugin Documentation"){:target="\_blank"}.

You can find this Probo.CI example repository [here](https://bitbucket.org/Probo-Demos/probo-example-drupal7){:target="\_blank"}.

Build Specs:

* Standard Drupal site with a MySQL database
* Your repository is stored on Bitbucket

----


## Sign in and Sync up.
**Step 1: Sign into the [Probo.CI app](https://app.probo.ci/){:target="_blank"} and authenticate Bitbucket.**
Go to the [Probo.CI app](https://app.probo.ci/){:target="\_blank"} and click on the **Login with Bitbucket** button. Once you get to Bitbucket, click 'Grant access'.

**Step 2: Sync your Bitbucket Repos.**
Your Bitbucket repositories will be synced automatically. You can always click the 'Sync Repos' button at the top right corner if you need to manually update your dashboard.  Click on the button next to each repo that you want to use with Probo.CI.

![Authenticate GIF](/images/bitbucketauth.gif){:class="docs-gif screenshot"}

## Prepare your Database.
{% include quickstart/prepare-database.md %}

## Define your website configuration for Probo.
{% include quickstart/website-configuration.md %}

## View your build.
**Step 11: Locate your branch in Bitbucket.**
Go to your Bitbucket account and click on Branches in the left navigation menu. You will see your new branch in the list. Click on the new branch name to view details.

**Step 11: Create a pull request.**  
On the details page, click the 'Create pull request' link. Verify your branch is pointing to master, enter the title of the pull request and click the 'Create pull request' button.    

**Step 13: Bask in the glory of Probo.CI.**  
In the Overview section of the pull request, look for the build status link. It will say something like "3 of 5 passed". Click this link to see the build steps and status. Click on one of the build steps to be taken to the Probo.CI dashboard.

**Step 14: See your Probo.CI build.**  
In your Probo.CI dashboard, click on 'View site' and your site will open in a new tab. This probo.build link uses the database defined in your `.probo.yaml` file and the code from your pull request.

**Step 15: Share your Probo.build link with clients, managers, even your parents.**
Note: It might take a few seconds for your Probo.CI environment to build. Wait until all checks have passed before following your Probo.build link.  

![Probo.CI Bitbucket build Gif](/images/bitbucketpullrequest.gif){:class="docs-gif screenshot"}

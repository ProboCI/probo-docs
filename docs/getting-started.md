---
layout: "docs"
title: Getting Started
class: documentation
permalink: /getting-started/
published: true
---
## Log In to the Probo App
The first step to using Probo is logging in to the Probo App, where you can sync your repositories, view your builds and access build information like the console output.

**GitHub:** Go to the [Probo App](https://app.probo.ci/ "Probo App") and click **Login with GitHub**. On the authorization page, grant Probo permission to access your repos. Back in the Probo App, enter your user information and click Submit.

**Bitbucket:** Go to the [Probo App](https://app.probo.ci/ "Probo App") and click **Login with Bitbucket**. On the authorization page, grant Probo permission to access your repos. Back in the Probo App, enter your user information and click Submit.

**Bitbucket Server:** [Contact us](/contact/ "Contact us") to complete the login process.

## Sync Your Repos
After logging in you will land on the **Probo Dashboard** which contains a list of all your available repositories. Click the Activate Repos button, click Sync Repos, then flip the toggle switch next to a repository to enable Probo on that project. If you add a new repository, click the **Sync Repos** button to update your list.

## Test Your Connection
You can test the connection between Probo.CI and your repository by creating a dummy configuration file. Create a new branch and add a file named `.probo.yaml` to the root of your repository with the following:

{% highlight yaml%}
steps:
  - name: Test Connection
    plugin: Shell
    command: 'print "Hello World!"'
{% endhighlight %}

If this check passed and the connection is successful, you can begin [configuring your Probo build.](/docs/build "Build Configuration")

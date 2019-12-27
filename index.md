---
layout: "docs"
title: Probo Documentation
class: documentation
redirect_from: /getting-started/
published: true
---

[Probo.CI](http://probo.ci) is a continuous integration and collaboration tool that helps break down the barriers inherent in a software development project. Probo works with git on a per-pull-request basis to ensure that you never merge code into any branch before it has been tested and approved.

Probo is both a SaaS app, available at app.probo.ci, as well as an open source software project, available at [https://github.com/ProboCI](https://github.com/ProboCI). The Probo docs site is hosted on GitHub at [https://github.com/ProboCI/probo-docs/](https://github.com/ProboCI/probo-docs/) and pull requests are welcome!

## Getting Started
The first step to using Probo is logging in to the Probo app, where you can sync your repositories, view your builds, and access build information like the console output.

Go to the [Probo app](https://app.probo.ci/ "Probo app") and log in with your **GitHub**, **Bitbucket**, or **GitLab** account. On the authorization page, grant Probo permission to access your repos. Back in the Probo app, enter your user information and click Submit.

Please see the docs for [setting up Bitbucket Server](/git/bitbucket-server/) if you are using Probo with **Bitbucket Server**.

## Sync Your Repos
After logging in, you will land on the Probo dashboard, which contains a list of all your available repositories.

- Click **Activate Repos** to get to the repository management page.
- Click **Sync Repos** to pull in repositories from your DVCS account.
- Click the toggle next to a repository to enable Probo for that project.

Whenever you add a new repository, click the **Sync Repos** button to update your list on this page.

## Test Your Connection
You can test the connection between Probo.CI and your repository by creating a dummy configuration file. Create a new branch and add a file named `.probo.yaml` to the root of your repository with the following:

{% highlight yaml%}
steps:
  - name: Test Connection
    plugin: Shell
    command: 'echo "Hello World!"'
{% endhighlight %}

Create a new pull request for this branch. If the check passes and the connection is successful, you can begin [configuring your Probo build.](/build/configuration/ "Build Configuration")

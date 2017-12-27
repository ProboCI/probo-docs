---
layout: "docs"
title: Configuration File
class: documentation
permalink: /build/configuration/
published: true
---
After you have synced your repos to Probo, you need to create a configuration file. This file tells Probo how to build your test environments.

## Create a Configuration File
In a new branch, create a `.probo.yaml` file in the root of your codebase. The `.probo.yaml` file is split into a section for declaring **Assets**, a section for defining **Steps**, and any environment configuration options.

### Assets

{% highlight yaml %}
Assets:
  - mydb.sql.gz
{% endhighlight %}

Assets are any files you want available to your Probo environments that are not found within your repository. For example, a database is an important asset for many web applications. These assets must be uploaded to Probo before they can be used in a build. [See the Assets section](/build/assets/ "Build Assets") for details on uploading assets and adding them to the configuration file.

### Steps

{% highlight yaml %}
Steps:
  - name: Say Hello
    plugin: Shell
    command: echo 'Hello, World!'
{% endhighlight %}

You can task Probo to run any number of build steps to successfully create testing environments. Each step you define will get a status update sent to the Probo app as well as your chosen version control software. [See the Build Steps section](/build/build-steps/ "Build Steps") for details on adding steps to the configuration file.

## Create a Pull Request
Create a pull request for the branch that includes the `.probo.yaml` file. You should see the steps in your `.probo.yaml` file building both on your pull request and in the Probo app. If all your steps pass, you can view the build and begin testing. If a step fails, look at the details in the Probo app for the full console output to begin troubleshooting.

## Iterate for a Successful Build
If your build fails, check the output in the Probo app to help you diagnose what went wrong. Adjust your `.probo.yaml` to correct any errors, or [contact us for support](https://probo.ci/contact/). Whenever you commit a change to a branch with an open pull request, a new build will be created. Repeat the process until all steps have passed and your build is successful.

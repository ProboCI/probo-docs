---
layout: "docs"
title: Build Steps
class: documentation
permalink: /build/steps/
redirect_from: /build-steps/
published: true
---
Build steps are the commands run to build a Probo environment and run any additional tests in that environment. Steps are identified by their **name** and a **plugin** declaration, and each step can have one or many parameters.

## Name

{% highlight yaml %}
Steps:
  - name: Say Hello
{% endhighlight %}

A step's name should provide context for the actions being performed. Each step appears in build status interfaces on the pull request and the Probo app.

## Plugin

{% highlight yaml %}
Steps:
  - name: Say Hello
    plugin: Shell
{% endhighlight %}

Each step also has a **plugin**. When you define a plugin for the step, you get access to that plugin's set of build parameters.

The default plugin is `Shell`. You can use multiple plugins in your configuration file, but you must declare the plugin used for each step before its parameters. Plugin names are case sensitive. For example this means that `shell` will not work.

## Parameters

{% highlight yaml %}
Steps:
  - name: Say Hello
    plugin: Shell
    command: echo 'Hello, World!'
{% endhighlight %}

These are the actual commands that are run to build your environments. The `Shell` plugin provides the default `command` parameter that can be used to run bash commands. Depending on the plugin you specify for your build step, you will have access to various other parameters. You may only declare a parameter once per step.

[See the Plugins section](/plugins/ "Plugins") for a list of available plugins and their parameters.

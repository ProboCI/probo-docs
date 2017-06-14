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

A step's name should provide context for the actions being performed. Each step appears in build status interfaces on the pull request and the Probo app.

## Plugin

Each step also has a **plugin**. The default plugin is `Shell`. You can use multiple plugins in your configuration file, but you must declare the plugin used for each step before its parameters.

Plugin names are case sensitive. For example this means that `shell` will not work. Please refer to the plugin pages for the correct plugin names.

## Parameters

These are the actual commands that are run to build your environments. The `Shell` plugin provides the default `command` parameter that can be used to run bash commands. Depending on the plugin you specify for your build step, you will have access to various other parameters. You may only declare a parameter once per step.

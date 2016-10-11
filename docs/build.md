---
layout: "docs"
title: Build Configuration
class: documentation
permalink: /build/
published: true
---
After you have synced your repos to Probo, you need to create a configuration file for each repository which will tell Probo how to configure your test environments.

## Create a Configuration File
In a new branch, create a `.probo.yaml` file in the root of your codebase. The `.probo.yaml` file is split into a section for **Assets** and a section for **Steps**.

**Assets:** You can declare important website assets, which are required files not found within the repository, so that those assets are available to each of your Probo builds. For example, your database is considered an asset. These assets must be uploaded to Probo before they can be used in a build. Click [here](/docs/assets/ "Build Assets") for details on uploading assets and adding them to the configuration file.

**Steps:** You can task Probo to run any number of build steps required to create a successful testing environment. Each step is a runnable plugin, and will get a status update sent to the Probo app as well as your chosen version control software. Click [here](/docs/build-steps/ "Build Steps") for details on adding steps and plugins to the configuration file.

## Create a Pull Request
Create a pull request for the branch that includes the `.probo.yaml` file. You should see the steps in your `.probo.yaml` file building both on your pull request and in the Probo app. When the build runs, your source code for the commit that triggered the build is automatically available to you in the `$SRC_DIR` directory inside the container. If all your steps pass, you can view the build and begin testing. If a step fails, look at the details in the Probo app for the full console output to begin troubleshooting.

## Iterate for a Successful Build
If your build fails, check the output in the Probo app to help you diagnose what went wrong. Adjust your `.probo.yaml` to correct any errors, or get help in our support room. When you commit a change to a branch with a pull request, a new build will be created. Repeat the process until all steps have passed and your build is successful.

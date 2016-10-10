---
layout: "docs"
title: About Probo.CI
class: documentation
permalink: /docs/about/
published: true
---


## What is Probo.CI?

Probo.CI is an [open source](https://github.com/ProboCI/probo) Quality Assurance (QA) tool for web development projects. Probo creates test environments for each new feature as your team develops so that everyone (QA or UAT testers, project managers, developers) can see and interact with development changes earlier and more frequently throughout development without waiting for an environment update.

## Why use Probo.CI?

Typical web application projects have environments for live, staging, development, and local developer sites. When a developer completes a task, the work needs to be reviewed and tested in multiple ways (for example, automated testing, manual QA, UAT, and code review by a senior developer). Because each environment can only run code from one git branch at a time, in order to test  code it needs to be merged with other work. When you have to merge work in order to test it you run into some of the following  problems:

 - Delays before testing occurs.
 - Bottlenecks at the code review step.
 - Confusing or unstable dev or staging environments with many changes happening at once.
 - Insufficiently tested automated deployment steps.
 - Technical barrier of entry to review work before deployment.
 - Difficulty deploying a subset of the work which was already merged.
 - The testing environment becomes 'junked up' from testing. You need to re-sync it from the production database but also don't want to lose the testing content you need for review.

Probo spins up a new environment when you create a pull request - before you merge your code. This makes it easy to preview and test work. We've found this workflow to be a massive improvement for quality and efficiency

### Probo.CI for Automated QA

Probo.CI integrates with version control applications ([GitHub](http://github.com/) and [Stash](https://www.atlassian.com/software/stash)) to run automated QA tests upon every [pull request](http://oss-watch.ac.uk/resources/pullrequest). When a developer submits a pull request, Probo automatically builds sandbox sites and runs each test against a Probo sandbox site. From GitHub or Stash, the pull request reviewer can see the status of all each test run and click into its respective sandbox site to interact within it. If a test fails, then the team knows that there is a problem with the code submitted, saving reviewers, -- who are often senior developers, -- valuable time. Probo uses [Docker](https://www.docker.com/) to create these isolated sandbox sites on demand, so these sites stay available for as long as they are needed.

### Probo.CI for Business UAT

The sandbox sites created by Probo.CI can also be used for business users to provide earlier UAT feedback. Business owners no longer have to wait until the end when a dedicated UAT environment is updated. The sandbox sites are created with realistic data and content from a backup (such as from a production site). Visually demonstrate each development change to your business user. This ensures there is no misunderstanding about the end results before the end of your development period, when the code is merged.

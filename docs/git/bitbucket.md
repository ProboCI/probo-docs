---
layout: "docs"
title: Bitbucket Server Integration
class: documentation
permalink: /git/bitbucket/
published: true
---
Probo integrates with [Bitbucket](https://bitbucket.org), a git repository management system created by Atlassian. Probo also supports [Bitbucket Server](https://bitbucket.org/product/server), however it requires manual setup on our part.

Probo uses Bitbucket's build status pop-up to display the list of build steps and their statuses. The link can be found in the Overview section of the pull request detail page.

<img src="/images/bitbucket-build-status.png" alt="Bitbucket Build Status Link Screenshot" class="full-width">

Developers who are reviewing the pull request can see whether any automated tests failed against a Probo site build.

<img src="/images/bitbucket-screenshot.png" alt="Bitbucket Build Status Popup Screenshot" class="full-width">

Click the title of a build step to be directed to the Probo app, where you can find the console output for each step and a link to the sandbox site.

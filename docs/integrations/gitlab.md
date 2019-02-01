---
layout: "docs"
title: GitLab Integration
class: documentation
permalink: /integrations/gitlab/
published: true
---
Probo integrates with [GitLab](http://gitlab.com/), a popular git repository management system. On the GitLab Merge Request detail page, Probo utilizes the Pipelines API to display the list of build steps, their status, and a link to the Probo app for additional details. In this section the steps are carried out and updated in real time. Developers who are reviewing the Merge Request can immediately see whether any automated tests or other steps failed against a Probo site build.

<img src='/images/probo-gitlab-builds.png' alt="GitLab Status Screenshot">

Mousing over any build step will show the log response for that step. Click any build step to be directed to that build step in the Probo App. Inside the Probo App you can find the console output for each step, a link to the sandbox site, and some additional advanced build controls such as an SSH terminal.

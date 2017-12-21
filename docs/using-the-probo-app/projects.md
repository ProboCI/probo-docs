---
layout: "docs"
title: Probo Projects
class: documentation
permalink: /app/projects/
published: true
---
Probo Projects are repositories that have been synced and enabled from a DVCS account. The Projects overview tab in a Probo Organization is where all Probo Projects for that Organization are listed, accompanied by information specific to each projects' resource usage and latest Probo Build.

Probo Admins can activate additional Projects by navigating to the [Probo Dashboard](https://app.probo.ci/#/dashboard/projects) and clicking the green "Activate Repos" button at the top right of the page. Once activated, Organization members can sync the Project in their own accounts and begin initiating Probo Builds.

![Probo Projects Page screenshot](/images/probo-projects-page.png){:class="full-width"}

## Probo Project Page Overview

A Probo Project page is broken down into subsections for Builds, Build Assets, and Upload Tokens. All authenticated Probo Users in a Probo Organization should be able to view and modify settings in these sections.

### Probo Builds

A Probo Build is a set of instructions run against a Pull Request in an isolated Docker container with settings outlined in your `.probo.yaml` file. Active Probo Builds are listed on each Probo Project's Builds tab, with the Project's latest builds appearing first.

![Probo Build Builds Page screenshot](/images/probo-builds-page.png){:class="full-width"}

You can click the "Show all builds" toggle at the top of the Builds page to view builds that have been deleted by the Probo Reaper. Once toggled, you can view each builds' history by expanding its "View older builds" toggle.

![Probo Build Builds Page Expanded screenshot](/images/probo-builds-page-expanded.png){:class="full-width"}

### Probo Build Assets

A Probo Build Asset is a file uploaded to the Probo App that is available to use as a file asset in a Probo Build. Probo Build Assets can be added through the Probo UI, or by using the command line Probo Uploader tool. The Probo Uploader tool requires an Upload Token available on the Upload Tokens tab. More information about Assets is available on [the Assets page](/build/assets/).

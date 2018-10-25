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

### Project Access

Access to Probo projects is based on your DVCS user account's relationship to the source repository.

#### GitHub

You have access to Projects for which you have one of these roles on the repository:

- **owner:** Repositories that you own.
- **collaborator:** Repositories that you have been added to as a collaborator.
- **organization_member:** Repositories that you have access to through being a member of an [organization](https://help.github.com/articles/about-organizations/). This includes every repository on every team that you are on.

{% note %}
**Note:** Organizations must allow Probo access in the 'Third-party access' settings tab.

- You can give specific permissions to the Probo app once you've already authorized Probo for your account. Follow the directions at [https://help.github.com/articles/requesting-organization-approval-for-oauth-apps/](https://help.github.com/articles/requesting-organization-approval-for-oauth-apps/).
- This requirement can also be satisfied by having no third-party access restrictions.
{% endnote %}

{% note %}
**Note:** You must have write access in order to receive notifications back from Probo.
{% endnote %}

#### Bitbucket

You have access to Projects for which you have one of these roles on the repository:

- **admin**
- **contributor**
- **member**

{% note %}
**Note:** At this time, you are not able to see forked Bitbucket repositories in Probo.
{% endnote %}

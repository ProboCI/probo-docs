---
layout: "docs"
title: Probo Projects
class: documentation
permalink: /app/projects/
published: true
---
A Probo Project is an activated repository inside of a Probo Organization. The Projects overview tab in a Probo Organization is where all Probo Projects for that organization are listed with information specific to that project's resources used and latest Probo Build. Probo Projects are the repositories that have been synced and enabled from GitHub and Bitbucket. The repositories are labeled GitHub with the Octocat logo and Bitbucket with the Bucket logo to easily distinguish between a GitHub or Bitbucket project repository.

Probo Admins can activate additional repositories for a project in a Probo Organization by navigating to the [Probo Dashboard](https://app.probo.ci/#/dashboard/projects) and clicking the green Activate Repos button at the top right of the page. Once activated, other Projects can be synced by other Probo Organization members to their account and they can start creating Pull Requests to kick off some Probo Builds.

![Probo Projects Page screenshot](/images/probo-projects-page.png){:class="full-width"}

## Probo Project Page Overview

A Probo Project page is broken down into subsections for Builds, Build Assets, and Upload Tokens. All authenticated Probo Users in a Probo Organization should be able to view and modify settings in these sections.

### Probo Builds

A Probo Build is a set of instructions run against a Pull Request in an isolated Docker container with settings outlined in the .probo.yaml file in the root of your Probo Project repository. Active Probo Builds are listed on the Builds tab in a Probo Project by last build created with some helpful details about the build available at a glance in the Probo App UI.

![Probo Build Builds Page screenshot](/images/probo-builds-page.png){:class="full-width"}

Additional builds that have been deleted by the Probo Reaper can be viewed by clicking the Toggle to show all builds toggle to the top right of the Builds page. View older build history by expanding the View older builds toggle widget to the bottom right of a given build in the list of all builds for a Probo Project.

![Probo Build Builds Page Expanded screenshot](/images/probo-builds-page-expanded.png){:class="full-width"}

### Probo Build Assets

A Probo Build Asset is a file uploaded to the Probo App that is available to use as a file asset in a Probo Build. Probo Build Assets can be added through the Probo UI, or by using the command line Probo Uploader tool. The Probo Uploader tool requires an Upload Token available on the Upload Tokens tab.

![Probo Build Assets Page screenshot](/images/probo-build-assets-page.png){:class="full-width"}

### Probo Upload Tokens

A Probo Upload token is a unique key given to your Probo Project that allows files to be uploaded through command line using the Probo Uploader or other 3rd Party plugins. Probo Upload Tokens can be generated on the Upload Tokens tab. Probo Users can create as many tokens as needed for a given Probo Project. Click an Upload Token in the list to copy the token to your clipboard. Then paste it into your terminal to give the Probo Uploader access or work it into a 3rd Party plugin.

![Probo Upload Tokens Page screenshot](/images/probo-upload-tokens-page.png){:class="full-width"}

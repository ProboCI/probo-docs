---
layout: "docs"
title: Automatic Build Cleanup (the Reaper)
class: documentation
permalink: /app/reaper/
redirect_from: /reaper/
published: true
---

Probo has a feature fondly known as the Reaper. Its job is to clean up old builds and generally make sure your organization does not exceed its allotted disk space. If it does, the Reaper selectively deletes, or "reaps," builds until you're back under.

## What happens when a build is reaped?

* You will no longer see its **View Site** button on its build page.
* If the build had a database, any content in it will be lost.
* The logs will remain intact. You can access them on the build page.
* You have the option to rebuild the environment by clicking "Rebuild" on its build page.

You can find details of reaped builds by toggling to show all builds on the project page and then clicking "+ View older versions."

## Reaper Logic

The Reaper works on a couple of premises:

1. Probo builds are designed to be short-lived sandboxes. We do not at this time support long-lived environments.
2. An organization's oldest builds are its least valuable builds. This is in line with Continuous Integration principles; pull requests should not be open for very long in preference of continuously reviewing and merging code.

With this in mind, there are three processes the Reaper carries out:

### 1. Reaping outdated builds

The Reaper assumes only the latest build on a branch has value. If a new commit is pushed to your pull request, the Reaper removes the existing build while Probo puts together a new build based on the new HEAD commit. This frees you up to commit and push to your PR branch as frequently as you like. This means you won't have to constantly delete builds in the app or worry about using up all of your disk space with old builds.

### 2. Reaping builds for closed pull requests

The Reaper periodically checks for closed pull requests. If it finds any, it deletes those pull requests' builds. When this happens, you will not see any details for these pull requests in the Probo app until you toggle to show all builds on the project page.

### 3. Reaping to meet disk limit

Probo monitors your organization's total disk usage and compares it to how much disk space your account has. If you exceed your disk allocation, the Reaper is dispatched to selectively delete builds until you are at or below your limit. Currently the oldest builds are deleted first. This means the very oldest build of all of your projects' pull requests will be deleted first, followed by the second oldest and so on.

---
layout: "docs"
title: Build Pages
class: documentation
permalink: /app/builds/
published: true
---

Once your repositories are synced and you have begun using Probo, you can view all the Probo builds for each project. Each build page shows the list of the steps that were run, the log output for each step, and a link to the build itself.

## Build Controls

### <i class="fa fa-refresh"></i> Rebuild

The rebuild process deletes the existing environment and builds an entirely new one based on the same commit. If your site uses a database, the new build will receive a fresh copy of the database asset specified in the configuration file.

### <i class="fa fa-thumb-tack"></i> Pin

You can tell [the Reaper](/reaper/) a build is important by pinning it.

* A pinned build will not be deleted when a new environment is built after a commit is pushed to its branch.
* A pinned build will not be deleted when its pull request is closed.
* If possible, a pinned build will not be reaped if you exceed your allotted disk space.

{% note %}
**Note:** When the Reaper is dispatched, it will reap all non-pinned builds before considering a pinned build eligible for deletion. If after all non-pinned builds are reaped and your account still exceeds its disk space, pinned builds become eligible and will be deleted from oldest to newest until you are back under.
{% endnote %}

### <i class="fa fa-trash"></i> Delete

You can manually delete unwanted builds to free up disk space for your account. Deleting a build completely removes its container from disk. You will be unable to rebuild the environment, but a change to the same Pull Request will build a new environment.

Deleting a build does not delete the build's logs. Logs are still available on the build page, which can be found by showing all builds on the project page.

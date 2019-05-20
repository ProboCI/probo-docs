---
layout: "docs"
title: Builds Don't Trigger
class: documentation
permalink: /troubleshooting/builds-dont-trigger/
redirect_from: /build/validate/
published: true
---

## Problem

I added a `.probo.yaml` file to my repository and opened a pull request, but I do not see a build.

## Solution

Validate the contents of your `.probo.yaml` file with a tool like [http://www.yamllint.com/](http://www.yamllint.com/) and update your configuration file with the fixed yaml.

## Explanation

Probo builds will fail to trigger if the configuration file contains invalid yaml. We recommend linting your configuration file when you first write it and after you make any significant changes.

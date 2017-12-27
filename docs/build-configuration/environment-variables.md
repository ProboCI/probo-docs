---
layout: "docs"
title: Environment Variables
class: documentation
permalink: /build/environment-variables/
published: true
---

There are several variables available for you to use in your build steps:

{: .table .table-striped .table-bordered}
| ------------------------- | -------------------------------------------------------------------------- |
| `$ASSET_DIR`              | The filepath which contains any assets you uploaded to your Probo project. |
| `$BRANCH_NAME`            | The name of the branch the build is based on.                              |
| `$BRANCH_LINK`            | An HTML link to the branch (in Github, Bitbucket, etc).                    |
| `$BUILD_ID`               | The ID for the build.                                                      |
| `$BUILD_DOMAIN`           | The HTTPS URL of the build.                                                |
| `$COMMIT_REF`             | The commit ID the build is based on.                                       |
| `$COMMIT_LINK`            | An HTML link to the commit (in Github, Bitbucket, etc).                    |
| `$PROBO_ENVIRONMENT`      | Boolean acknowledging the build is in Probo.         |
| `$PULL_REQUEST_NAME`      | The name of the Pull Request.                                              |
| `$PULL_REQUEST_LINK`      | An HTML link to the pull request (in Github, Bitbucket, etc).              |
| `$SRC_DIR`                | The filepath which contains the code from your pull request.               |

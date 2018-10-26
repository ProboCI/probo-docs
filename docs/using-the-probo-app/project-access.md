---
layout: "docs"
title: Probo Project Access
class: documentation
permalink: /app/project-access/
published: true
---

Access to Probo projects is based on your DVCS user account's relationship to the source repository.

## GitHub Project Access

You have access to Projects for which you are an owner, collaborator, or organization member on the repository.

- **owner:** You are automatically given the owner role for any repositories you own and any repositories within organizations you own.
- **collaborator:** You can be [added as a collaborator to personal repositories](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/) or [added as a collaborator to organizations' repositories](https://help.github.com/articles/adding-outside-collaborators-to-repositories-in-your-organization/).
- **organization member:** If you are a member of any organizations, you are given this role for each of those organizations' repositories.

{% note %}
**Note:** Organizations must allow Probo access in the 'Third-party access' settings tab for their repositories to appear in the Probo app.

- You can give specific permissions to the Probo app once you've already authorized Probo for your account. Follow the directions at [https://help.github.com/articles/requesting-organization-approval-for-oauth-apps/](https://help.github.com/articles/requesting-organization-approval-for-oauth-apps/).
- This requirement can also be satisfied by having no third-party access restrictions.
{% endnote %}

{% note %}
**Note:** You must have write access in order to receive notifications back from Probo.
{% endnote %}

## Bitbucket Project Access

You have access to Projects for which you are an admin, contributor, or member on the repository.

- **admin:** You are automatically an admin for any repositories you own and any repositories within teams you own.
- **contributor:** You are a contributor when your user is given specific access to a repository.
- **member:** If you are a member of any groups, you are given this role for each of those groups' repositories.

{% note %}
**Note:** At this time, you are not able to see forked Bitbucket repositories in Probo.
{% endnote %}

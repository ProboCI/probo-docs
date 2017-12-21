---
layout: "docs"
title: Probo Organizations
class: documentation
permalink: /app/organizations/
published: true
---
A Probo Organization is a grouping of Probo users, Projects, and billing information. The first time a repository from a DVCS account is enabled in Probo, whether it be an organization account or user account, a new Probo Organization related to that DVCS account is created. Organization pages can be accessed though a URL such as `https://app.probo.ci/#/dashboard/organization/ORGANIZATION-ID/overview`, where ORGANIZATION-ID is a unique identifier for the organization.

![Probo Organizations Page screenshot](/images/probo-organization-page.png){:class="full-width"}

An Organization page in the Probo App is where Probo Admins can manage settings specific to the Organization as a whole, such as who the Admins are, which subscription tier the organization is using, the organization's payment method, and payment history.

Probo Organizations house various Probo Projects, which are essentially repositories from a DVCS account that have been activated in Probo. Anyone who has access to the repository and also has a Probo account will have access to the repository's related Probo Project. These users have the ability to view builds and perform all operations on them (such as pinning, rebuilding, and deleting).

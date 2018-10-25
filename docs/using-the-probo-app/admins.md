---
layout: "docs"
title: Probo Admins
class: documentation
permalink: /app/admins/
published: true
---
Probo Admins are Probo users that can perform administrative actions on your Probo Organization. An Organization's initial Admin is the Probo user that first activated a repository in that Organization. Organization admins can add or remove further Admins in the Organization's Admins tab.

![Probo Admin Page screenshot](/images/probo-admin-page.png){:class="full-width"}

## Add Probo Admins

Probo Organizations are separate entities from DVCS providers' organizations. Any person that has a Probo user account (created when they OAuth into the app for the first time) can be made an Admin for a given Organization, even if they aren't a part of your DVCS organization. For example, a Probo user who is not part of your GitHub organization can be added as an Admin to your Probo Organization.

This separation of concerns will eventually allow non-developers to sign up as Probo users so they can be made Organization Admins. This could be useful in the case of an employee from the billing department being able to login directly to handle subscriptions and payment methods, view payment history, etc., all without needing a user account in your DVCS organization.

{% note %}
**Note:** Admins are not automatically synchronized from DVCS organizations to your Probo organization. For example, admins in your GitHub organization are not automatically made Admins in your Probo Organization.

In your Organization's Admin tab, use the autocomplete field to search for the Probo users you want to make Admins in your Probo Organization.

![Probo Add Admin User screenshot](/images/probo-add-admin.png){:class="full-width"}
{% endnote %}

## Delete Probo Admins

Probo Organization admins can be deleted by clicking the red X to the right of the user's information card on the Organization's Admin tab.

**Note:** Removing a user as an admin from your DVCS organization will not automatically remove them as an Admin on the related Probo Organization.

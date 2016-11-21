---
layout: "docs"
title: Bitbucket Server Integration
class: documentation
permalink: /git/bitbucket-server/
published: true
---
You can use Probo with your instance of [Bitbucket Server](https://bitbucket.org/product/server). Just like the [Bitbucket Integration](/git/bitbucket/ "Bitbucket Integration"), Probo uses the build status pop-up to display the list of build steps as defined in your `.probo.yaml` file and their statuses. The link can be found in the Overview section of the pull request details page.

Follow these steps to get started using Probo with your instance of Bitbucket Server:

  1. <a href="#create-link">Create an Application Link in Bitbucket Server.</a>
  2. <a href="#configure-auth">Configure authentication settings.</a>
  3. <a href="#activate-repos">Activate repositories.</a>
  4. <a href="#configure-webhooks">Configure webhooks.</a>

<a name="create-link"></a>
## Create an Application Link in Bitbucket Server.

1. Go to the administration section of your Bitbucket Server installation and create an Application Link.
  * Click the settings gear in the top right hand corner of Bitbucket's interface.
  * Go to the Application Links page.
  * Create a new link with the address `https://app.probo.ci`.
  <a href="/images/bitbucket-server/bbserver-setup-1--create-app-link.png" data-lightbox="bbserver-setup-1">
  <img src="/images/bitbucket-server/bbserver-setup-1--create-app-link.png" class="full-width">
  </a>


2. Specify `https://app.probo.ci` again as the Application URL.
  <a href="/images/bitbucket-server/bbserver-setup-2--configure-app-link-url.png" data-lightbox="bbserver-setup-2">
  <img src="/images/bitbucket-server/bbserver-setup-2--configure-app-link-url.png" alt="" class="full-width">
  </a>

3. Give your application a logical name, such as **Probo.CI**, and leave the rest of the application settings blank.
  <a href="/images/bitbucket-server/bbserver-setup-3--configure-app-link-name.png" data-lightbox="bbserver-setup-3">
  <img src="/images/bitbucket-server/bbserver-setup-3--configure-app-link-name.png" alt="" class="full-width">
  </a>

<a name="configure-auth"></a>
## Configure authentication settings.

1. Edit the application link you configured for Probo.CI.
  <a href="/images/bitbucket-server/bbserver-setup-4--edit-app-link.png" data-lightbox="bbserver-setup-4">
  <img src="/images/bitbucket-server/bbserver-setup-4--edit-app-link.png" alt="" class="full-width">
  </a>

2. In the Incoming Authentication settings, enter **bitbucket.server.probo.consumer.key** as the consumer key and **Probo.CI** as the consumer name.
  <a href="bbserver-setup-5--enter-consumer-key.png" data-lightbox="bbserver-setup-5">
  <img src="/images/bitbucket-server/bbserver-setup-5--enter-consumer-key.png" alt="" class="full-width">
  </a>

3. Enter the following public key:
  ```
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeIHvKM3ruAGHSs9CKKYQ6RYVq
  fjlqVxbS9XxLnxBBd1honfmz89p9TnmwnarJoD/GA5A5SBpuOA2RCExaPxHU7iap
  s8GZ+GZk24kHcboGRu4ahLeoiWpLjz8fr2Zrsv9zK1DKFfsoXWQyPvnswvXfkIF5
  N/46a9CrOsqu2fXLewIDAQAB
  ```
  <a href="/images/bitbucket-server/bbserver-setup-6--enter-public-key.png" data-lightbox="bbserver-setup-6">
  <img src="/images/bitbucket-server/bbserver-setup-6--enter-public-key.png" alt="" class="full-width">
  </a>

4. Leave the rest of the form blank and save.
  <a href="/images/bitbucket-server/bbserver-setup-7--incoming-auth-save.png" data-lightbox="bbserver-setup-7">
  <img src="/images/bitbucket-server/bbserver-setup-7--incoming-auth-save.png" alt="" class="full-width">
  </a>

<a name="activate-repos"></a>
## Activate repositories.

1. Go to `https://app.probo.ci/auth/stash/[your full Bitbucket Server instance url]` to sign in.

   **Example URL:** `https://app.probo.ci/auth/stash/https://stash.yourdomain.com/`

   You will be prompted to login and/or grant access. We have a UI for this coming shortly, but this link will always work.

2. Sync and enable the repositories you want to connect with Probo.
   * Press the **Activate repos** button.
   * Press **Sync Repos** and wait for Probo to pull in your Bitbucket Server repositories.
   * Enable a repository by switching the toggle next to it.
  <a href="/images/bitbucket-server/bbserver-setup-8--activate-repos.png" data-lightbox="bbserver-setup-8-9-10">
  <img src="/images/bitbucket-server/bbserver-setup-8--activate-repos.png" alt="" class="full-width">
  </a>
  <a href="/images/bitbucket-server/bbserver-setup-9--sync-repos.png" data-lightbox="bbserver-setup-8-9-10">
  <img src="/images/bitbucket-server/bbserver-setup-9--sync-repos.png" alt="" class="full-width">
  </a>
  <a href="/images/bitbucket-server/bbserver-setup-10--enable-repo.png" data-lightbox="bbserver-setup-8-9-10">
  <img src="/images/bitbucket-server/bbserver-setup-10--enable-repo.png" alt="" class="full-width">
  </a>

<a href="configure-webhooks"></a>
## Configure webhooks.
Due to limitations in the Bitbucket Server API, we cannot reliably create webhooks for your repositories. You will need to do this manually for each project you enable in Probo.

1. Go back to Bitbucket Server, find your project, and navigate to the project settings.
  <a href="/images/bitbucket-server/bbserver-setup-11--webhook-settings.png" data-lightbox="bbserver-setup-11">
  <img src="/images/bitbucket-server/bbserver-setup-11--webhook-settings.png" alt="" class="full-width">
  </a>

2. Find the webhooks (or hooks) configuration page and enable Post-Receive WebHooks.
  <a href="/images/bitbucket-server/bbserver-setup-12--enable-webhooks.png" data-lightbox="bbserver-setup-12">
  <img src="/images/bitbucket-server/bbserver-setup-12--enable-webhooks.png" alt="" class="full-width">
  </a>

3. Enter `https://stash.probo.ci/stash-webhook` as the URL.
  <a href="/images/bitbucket-server/bbserver-setup-13--enter-webhook-url.png" data-lightbox="bbserver-setup-13">
  <img src="/images/bitbucket-server/bbserver-setup-13--enter-webhook-url.png" alt="" class="full-width">
  </a>

## Profit.

That's it - now Probo will automatically kick off a build and report progress back to your Bitbucket Server instance when you push code to an open pull request.

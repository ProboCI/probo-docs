---
layout: "docs"
title: Using Probo with GitLab Server
class: documentation
permalink: /integrations/gitlab-server/
redirect_from: /git/gitlab-server/
published: true
---
You can use Probo.CI with your instance of [GitLab Server](https://bitbucket.org/product/server). Just like the [GitLab Integration](/git/gitlab/ "GitLab Integration"), Probo uses the build status pop-up to display the list of build steps as defined in your `.probo.yaml` file and their statuses. The link can be found in the Overview section of the Merge Request details page.

Follow these steps to get started using Probo with your instance of GitLab Server:

1. <a href="#create-an-oauth-application-on-your-gitlab-server">Create an OAuth application on your GitLab Server.</a>
2. <a href="#register-your-gitlab-server-with-proboci">Register your GitLab Server with Probo.CI.</a>
3. <a href="#authenticate-your-gitlab-server-with-proboci">Authenticate your GitLab Server with Probo.CI.</a>
4. <a href="#activate-a-probo-organization">Activate a Probo Organization.</a>
5. <a href="#activating-repositories">Activate repositories.</a>

## Create an OAuth application on your GitLab Server.

1. Visit the Applications page in the Admin Area of your GitLab Server instance. Example: `https://gitlab.example.com/admin/applications` 
2. Create an OAuth application with the following required settings.  
   **Name:** Enter a name for your OAuth application.  
   **Redirect URI:** Enter `https://app.probo.ci/auth/gitlab/callback` in this field.  
   **Scopes:** API _(Check the API checkbox.)_
3. Submit your changes to save the new OAuth application.

Next you need to register your GitLab Server’s OAuth application with Probo.CI.

## Register your GitLab Server with Probo.CI.

1. Go to [http://app.probo.ci/#/self-hosted/new](http://app.probo.ci/#/self-hosted/new) to register a new self-hosted service.
2. Enter the following required OAuth connection settings.

{% note %}
**Note:** The following required settings are found on your GitLab Server OAuth application settings page. Example: `https://gitlab.example.com/admin/applications/1`
{% endnote %}

- **Server URL:** The URL of your GitLab Server instance. Example: `https://gitlab.example.com`
- **Client ID:** The `Application ID` string from your GitLab Server instance.
- **Client Secret:** The `Secret` string from your GitLab Server instance.

Now that you have your OAuth application configured and added to Probo.CI you can authenticate with your GitLab Server.

## Authenticate your GitLab Server with Probo.CI.

1. Visit [https://app.probo.ci/#/self-hosted](https://app.probo.ci/#/self-hosted).
2. Enter your GitLab Server URL. Example: `https://gitlab.example.com`

Congratulations, you should now be connected! Next you need to activate a Probo Organization.

## Activate a Probo Organization.

Once authenticated you need to activate your Probo Organization by choosing a subscription plan. New Probo.CI users are given a 2 month free trial to test things out and figure out what plan they want to use.

{% note %}
**Note:** A Probo Organization is linked to the base user on the repositories from your GitLab Server instance that you want to enable.
{% endnote %}

1. Click the Activate repos button or the Enable some now! link to start the activation process.
2. Next click the Activate this organization button on the organization that has repos you want to enable.
3. Choose a plan to start on for your 2 month trial.  
4. Next verify your subscription plan and enter your email address. 
5. Click the start subscription to complete activating your organization.

{% note %}
**Note:** Your plan can be changed at any time during your trial period to see what fits best for your organization.
{% endnote %}

That's it! Now you can start activating repositories within your Probo Organization.

## Activate repositories.

1. Go to [https://app.probo.ci/#/self-hosted](https://app.probo.ci/#/self-hosted) to authenticate, or go to the Projects Dashboard, [https://app.probo.ci/#/dashboard/projects](https://app.probo.ci/#/dashboard/projects) if already authenticated.

2. Sync and enable the repositories you want to connect with Probo.
   * Press the **Activate repos** button.
   <a href="/images/gitlab-server/activate-repos.png" data-lightbox="gitlabserver-setup-8-9-10">
   <img src="/images/gitlab-server/activate-repos.png" alt="Arrow pointing to the Activate Repositories button in the Probo web app." class="screenshot">
   </a>
   * Press **Sync repos** and wait for Probo to pull in your Bitbucket Server repositories.
   <a href="/images/gitlab-server/sync-repos.png" data-lightbox="gitlabserver-setup-8-9-10">
   <img src="/images/gitlab-server/sync-repos.png" alt="Arrow pointing to the Sync Repositories button in the Probo web app." class="screenshot">
   </a>
   * Activate a repository by switching the toggle next to it to the on position. Once activated the toggle should be a green color.
  <a href="/images/gitlab-server/activate-repo.png" data-lightbox="gitlabserver-setup-8-9-10">
  <img src="/images/gitlab-server/activate-repo.png" alt="Arrow pointing to the repository activation toggle for a project in the Probo web app." class="screenshot">
  </a>
  <a href="/images/gitlab-server/activated-repo.png" data-lightbox="gitlabserver-setup-8-9-10">
  <img src="/images/gitlab-server/activated-repo.png" alt="Arrow pointing to the repository activation toggle for a project in the Probo web app." class="screenshot">
  </a>

{% note %}
**Note:** This step, if successful, will add a new webhook to the repository on your GitLab Server instance on the Integrations page within the enabled repository. Example: `https://gitlab.example.com/org-name/repo-name/settings/integrations`
{% endnote %}

That's it! You are now ready to [configure your build](https://docs.probo.ci/build/).

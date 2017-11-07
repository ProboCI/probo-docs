---
layout: "docs"
title: GitHub Handler
class: documentation
permalink: /open-source/github/
published: true
---

## GitHub Handler 
The GitHub Handler processes GitHub hook events each time a pull request is created or updated. It then triggers builds through the Container Manager. The GitHub Handler also sends commit status updates back to GitHub.

It is implemented as a plugin of the Probo repository. There is also a Bitbucket plugin that is in a separate repository and it's function and configuration is discussed in a different documentation entry as there are conditions and parameters outside the scope of this document which must be taken into consideration before you can successfully run Bitbucket.

```bash
cd probo
npm install
```

Create a file `ggh.yaml` with the following contents:

```yaml
# Port for the server to listen on
port: 3010
hostname: 0.0.0.0

# Github hook and credentials
githubWebhookPath: '/github-webhook'
githubWebhookSecret: '{YOUR_CHOSEN_SECURE_SECRET_PHRASE}'
githubAPIToken: '{GITHUB_PERSONAL_TOKEN}'

# Container Manager API server
api:
  url: "http://localhost:3020"
```

Of the defaults above, `githubAPIToken` must be set to your token. You can generate a personal token at [https://github.com/settings/tokens]. A token created from an OAuth flow will also work here. Probo requires the response.

The `githubWebhookSecret` value should be modified to a secure string as well. This is a random token containing a string value that you select and will need to be used when you configure your webhook in GitHub.

**Execution**

```bash
node ./bin/probo github-handler -c ghh.yaml > /dev/null &
```

Now add a webhook for your repository in GitHub to your server under Settings -> Webhooks & services. Direct link to the configuration page: https://github.com/OWNER/REPO/settings/hooks.

**Set the following properties:**  
**Payload URL:** http://{YOUR-DOMAIN}:3010/github-webhook  
**Secret:** {The value from `githubWebhookSecret` in the config file}  

Next, under "Which events would you like to trigger this webhook?", select "Let me select individual events", and select "Pull Request"
If you see a green checkmark next to your new webhook, you're all set. GitHub can successfully send requests to your handler.

## Next Step: [Bitbucket Handler >>](/open-source/bitbucket/)
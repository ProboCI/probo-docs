---
layout: "docs"
title: Bitbucket Handler
class: documentation
permalink: /open-source/bitbucket/
published: true
---

## Bitbucket Handler 
To integrate Bitbucket into open source Probo, there are some slight modifications to the instructions for the standard Probo server and GitHub. The most important of which is that currently you can't easily run the GitHub handler and the Bitbucket handler without doing some configuration steps out of the scope of these documents (and that I do not know how to do myself). For the sake of simplicity, we will assume you are going to be using one repository or the other and not both.

The first step is to add the following rule to your firewall on your CentOS server if needed:

```bash
sudo firewall-cmd --zone=public --add-port=3012/tcp --permanent
sudo systemctl restart firewalld
```

Now we will need to checkout some additional projects to complete this walk-through. Please note the branch and location of the repository as it contains important code that is key to getting everything working.

```bash
git clone -b bitbucket-open-source https://github.com/ElusiveMind/probo-bitbucket.git
```

Next we will checkout a helper webapp that I wrote in PHP to help us configure the Probo Bitbucket Handler. This should be checked out in a location other than your Probo server. It will be used as the callback of the Bitbucket OAuth consumer you're about to create in the next step.

```bash
git clone https://github.com/ElusiveMind/probo-bitbucket-configuration-generator.git
```

**The Probo Bitbucket Configuration Generator**  
There is a bit of hocus pocus involved in configuring Bitbucket with open source Probo. The following steps will get you the configuration data you need to successfully integrate Bitbucket with your server.

The first step is to install the Probo Bitbucket Configuration Generator (pbbcg) on your web accessible server in a location and note the URL required to get there. In our case, we will use the example of:

**http://example.com/pbbcg**

The second part is to create an OAuth consumer in your Bitbucket account. It is important to note that this should be done on your base account and not part of any team you belong to. Putting it on a team will not work. It needs to be part of your specific account's settings. In Settings -> OAuth, scroll to the bottom and add a consumer. Enter the information of your choosing. The only two items you must specifically provide for pbbcg and the Bitbucket handler are the callback URL and the permissions.

The callback URL should be the web accessible URL where you can reach the pbbcg webapp. In this case:

**http://example.com/pbbcg**

Under permissions, check the Read option in Pull Requests. This will automatically check the Read option in Repositories as well and that is OK. Click the Save button and you will be assigned a client key and a client secret. Copy and paste these two items into a text editor for future use.

The next step is to go to the pbbcg webapp URL. It will ask you for the client key that you were just assigned by Bitbucket for the consumer you added. Enter this in the space provided and press the submit button. You will be asked to authorize your application to your Bitbucket account. Once authorized, you will be returned to the pbbcg webapp and be asked for your client key again along with the client secret. Don't worry, these are not stored anywhere be it in a cookie, session or file anywhere on the server. If you like, you can also install pbbcg on an SSL enabled server for additional security.

Once you have provided the key and secret in their respective fields, click the submit button. If everything went well, you will be greeted with a success message and four lines of YAML that you copy and paste into Probo's Bitbucket handler configuration file. A sample of this file would look like something below. The four options (`bbClientKey`, `bbClientSecret`, `bbAccessToken`, `bbRefreshToken`) would all be copied and pasted from pbbcg.

**SECURITY TIP:** The access point on the handler is a public access point. To secure it, you can obfuscate it with a token or some other random string. You will need to just make sure this is included in the webhook you create on repositories you implement Probo.

```yaml
# Port for the server to listen on
port: 3012
hostname: 0.0.0.0

bbWebhookUrl: '/bitbucket-webhook'
bbClientKey: {BITBUCKEY_CLIENT_KEY}
bbClientSecret: {BITBUCKET_CLIENT_SECRET}
bbAccessToken: {BITBUCKET_ACCESS_TOKEN}
bbRefreshToken: {BITBUCKET_REFRESH_TOKEN}

# Settings for the API or Container Manager server port
api:
  url: "http://localhost:3020"
```

**Execution**  
You can then run the handler by executing the following bit of code from within the probo-bitbucket folder on your Probo server (replace your configuration file name in place of defaults.yaml if you have done so).

```bash
node ./bin/probo-bitbucket-handler -c defaults.yaml > /dev/null &
```

**Container Manager**  
The Container Manager (CM) manages Docker containers and kicks off builds. With Bitbucket, there are some nuanced configuration changes that need to be implemented for it to talk to the Bitbucket handler.

The Configuration Manager is implemented as a plugin of the probo repository.

**Configure**  
Create a file `cm.yaml` with the following contents:

```yaml
hostname: localhost
port: 3020

instanceName: '{YOUR CHOSEN INSTANCE NAME}'

api:
  url: "http://localhost:3012"

auth:
  url: "http://localhost:3012/auth_lookup"

loom:
  url: "http://localhost:3060"

assets:
  url: "http://{YOUR_DOMAIN}:3070"

buildUrl: "http://{{buildId}}.{YOUR_DOMAIN}:3050/"
```

You will want to be sure to modify the InstanceName as this is what is prefixed in your GitHub status updates as tests are conducted. This will differentiate those tests from those done by the ProboCI SASS service a little more clearly. Also be sure to provide your domain name in the proper space. Leave {{buildId}} as it is. That is an important token used by the container manager to build URL's to your containers. If you modify the port of your probo-proxy daemon (such as to port 80), you will need to change the port in the buildUrl (or remove it) manually as well.

**Execution:**  
```bash
node ./bin/probo-bitbucket-handler -c defaults.yaml > ../logs/bitbucket.log &
```

Now add a webhook for your repository in Bitbucket to your server under Settings -> Webhooks.

URL: http://{YOUR-DOMAIN}:3012/bitbucket-webhook

Next, under "Triggers", select "Choose from a full list of triggers", and select "Pull Request: Created" and "Pull Request: Updated".

Click the save button and your webhook should be configured. You won't have a way of seeing this until you issue a pull request, so there is no way to immediately know if the hook is working. The best way to test is to check with a test repository and make sure everything is good to go and then begin configuring your development repositories.

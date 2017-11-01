---
layout: "docs"
title: Container Manager
class: documentation
permalink: /open-source/container-manager/
published: true
---

## Open Source Probo Container Manager
The Container Manager (CM) manages Docker containers and kicks off builds. It is implemented as a plugin of the probo repository. This is the process that does the heavy lifting of the probo system and is the most important system. It can work with both the GitHub or Bitbucket handler although at this time there is no easy way to make it work with both handlers at the same time.

**Installation**

To install the dependent packages, change directory into the `probo` directory and run the following command:

```bash
npm install
```

If you have installed all of your prerequisites correctly, you will get a successful build and can move on to the next step. If you have issues here, please revisit the step on installing [prerequisites](/open-source/getting-started) and make sure that everything is done correctly. If all else fails, please contact Probo support.

**Configure**

The next step is to create a configuration file create a container manager configuration yaml file called `cm.yaml` with the following contents:

```yaml
hostname: localhost
port: 3020

instanceName: '{YOUR CHOSEN INSTANCE NAME}'

api:
  url: "http://localhost:3010"

loom:
  url: "http://localhost:3060"

assets:
  url: "http://{YOUR_DOMAIN}:3070"

buildUrl: "http://{{buildId}}.{YOUR_DOMAIN}:3050/"
```

You will want to be sure to modify the instanceName as this is what is prefixed in your GitHub status updates as tests are conducted. This will differentiate those tests from those done by the ProboCI SASS service a little more clearly. Also be sure to provide your domain name in the proper space. Leave {{buildId}} as it is. That is an important token used by the container manager to build URL's to your containers. If you modify the port of your probo-proxy daemon (such as to port 80), you will need to change the port in the buildUrl (or remove it) manually as well.

You should replace {YOUR_DOMAIN} with your fully qualified domain name for your server that you will be using to serve probo sites. Note that this CANNOT be an IP address. It must be a domain name. The port number (3050 in this case) should match the port number in the proxy configuration mention later on in this tutorial).

**Execution**

```bash
node ./bin/probo container-manager -c cm.yaml > /dev/null &
```

## Next Step: [GitHub Handler >>](/open-source/github/)
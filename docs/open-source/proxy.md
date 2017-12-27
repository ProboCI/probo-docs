---
layout: "docs"
title: Probo Proxy
class: documentation
permalink: /open-source/proxy/
published: true
---

## Probo Proxy
The proxy maps an external host/port to a build container's port 80 to view the built web application. This is the key piece to making the public URL's available to view your Probo builds.

```bash
cd ..
cd probo-proxy
npm install
```

**Configure**  
Edit the file `defaults.yaml` with the following contents:

```yaml
# port that the proxy server is running on
port: 3050

# server timeout, in any unit
serverTimeout: 10m

# Host for the container lookup service that maps a build id to a host/port to proxy to
containerLookupHost: "http://localhost:3020"

# Specifies if the lookup cache is enabled.
cacheEnabled: true

# Max number of proxy lookup responses to cache. Defaults to 500
cacheMax: 500

# Max age of proxy lookup responses in cache, in any unit (units default to ms). Defaults to 5 min
cacheMaxAge: 5m

redirectUrl: ''

custom404Html: '<h1>404 - Build Not Found</h1><p>The build could not be found</p>'
```

Be sure that `containerLookupHost` has the same port number as your container manager instance.  

Also if you are going to use port 80, you may need to run this process as the root user. Failing to do so could cause port-locking issues and CentOS may not allow you to do it. Keep this in mind when selecting a port.  

```bash
node ./index.js -c defaults.yaml > /dev/null &
```

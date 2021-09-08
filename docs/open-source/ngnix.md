---
layout: "docs"
title: Nginx Proxy Routing
class: documentation
permalink: /open-source/nginx/
published: true
---

## Nginx Proxy Routing
The Nginx daemon can be used as a web proxy to shuffle all of your Probo server related traffic through. You can route subdomains or domains through the proxy on ports 80/443 to their ports on the local server. So if you wanted to route `http://assets.example.com` through to the asset received, you could set up an Nginx proxy as follows:

```nginx
  server {
    listen 80
    client_max_body_size 4096M;
    server_name assets.example.com;
    location / {
      proxy_pass http://127.0.0.1:3070;
      proxy_set_header Host $host;
    }
  }
```

You can also do this via a secure port (443) but you will need to add references to your SSL certificates and change the listen port to 443. Note that the `client_max_body_size` is set to 4 gigabytes to handle the largest file upload size.


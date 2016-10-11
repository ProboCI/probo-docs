---
layout: "docs"
title: Stage File Proxy
class: documentation
permalink: /docs/drupal/stage-file-proxy/
published: true
---
[Stage File Proxy](https://www.drupal.org/project/stage_file_proxy){:target="_blank"} is a Drupal module that sends requests to your development environment's files directory to the production environment and making a copy of the production file in your development site. This module saves time and most importantly - disk space. This module should be used for development environments only.

You can find an example repository [here](https://github.com/Probo-beta-tester/sfp){:target="_blank"}.

Even though we are using the `Drupal` plugin we can still use the shell plugin to add special configuration steps.


{% highlight yaml%}
assets:
  - dev.sql.gz
steps:
  - name: Probo site setup
    plugin: Drupal
    database: dev.sql.gz
    databaseGzipped: true
    databaseUpdates: true

  - name: Enable stage_file_proxy
    command: 'drush --root="/var/www/sfp/webroot" en stage_file_proxy -y'
    command: 'drush variable-set stage_file_proxy_origin "http://www.sfp.com"'


{% endhighlight %}


This example enables Stage File Proxy and sets the point of origin to http://www.sfp.com.

The settings located at 'admin/config/system/stage_file_proxy' will now match what was set in the `.probo.yaml` file.
<img src='sfp-config-example.jpg' alt='Stage File Proxy Configuration Example' class='docs-gif'>

---
layout: "docs"
title: Environment Configuration
class: documentation
permalink: /build/environment-configuration/
published: true
---

You have access to certain environment options while configuring your Probo builds. These options are set as top level keys, on the same level as `image:`, `assets:`, or `steps:` in your `probo.yaml` file.


## Allow Environment Access While Building

We assume environments have confidential data and can be in potentially insecure or unstable states while building. Because of this, our default settings make sure environments are not made public until all of the steps have completed and the build is finished.

Setting the `allowAccessWhileBuilding` configuration flag to true allows access to the environment while building. This configuration variable can be used in combination with the `$BUILD_DOMAIN` environment variable to make your site available to external services and to kick them off in build steps.

{% highlight yaml %}
allowAccessWhileBuilding: true
{% endhighlight %}

## Basic Environment Authentication

You can set up Basic Authentication for your Probo builds with `basicAuth`. This will require users to enter the correct username and password to access the Probo build site.

{% highlight yaml %}
basicAuth:
  username: foo
  password: bar
{% endhighlight %}

## Modify PHP Environment Options in a Build
Probo builds have their own isolated `php.ini` files. Specific PHP options for your build can be modified using the `phpIniOptions` configuration option in  your `.probo.yaml` file. The `phpIniOptions` configuration option must be paired with a LAMPApp compatible [Probo Plugin](https://docs.probo.ci/plugins/) to set specific PHP settings within the plugin's steps. See below for an example YAML config that sets custom `upload_max_filesize`, `post_max_size`, and `memory_limit` PHP settings values for the custom Probo `php.ini` file.

{% highlight yaml %}
steps:
  - name: LAMPApp site configuration example.
    plugin: LAMPApp
    databaseName: example
    databaseUser: example
    phpIniOptions:
      upload_max_filesize: 25M
      post_max_size: 25M
      memory_limit: 256M
{% endhighlight %}

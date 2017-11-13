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

Setting the `allowAccessWhileBuilding` configuration flag to true allows access to the environment while building. This configuration variable can be used in combination with the `$BUILD_URL` environment variable to make your site available to external services and to kick them off in build steps.

{% highlight yaml %}
allowAccessWhileBuilding: true
{% endhighlight %}

## Basic Environment Authentication

You can set up Basic Authentication for your Probo Builds with `basicAuth`. This will require users to enter the correct username and password to access the Probo Build site.

{% highlight yaml %}
basicAuth:
  username: foo
  password: bar
{% endhighlight %}

## Modify PHP Environment Options in a Build
Probo Builds have their own isolated php.ini files which can be modified during the build process to set specific PHP options for your build using the `phpIniOptions` option. Like other environment options available to your Probo Builds, the `phpIniOptions` option can be paired with the [Probo Drupal Plugin](/plugins/drupal-plugin/) or [Probo Wordpress Plugin](/plugins/wordpress-plugin/) to set specific PHP settings for your Drupal or Wordpress sites during the Probo Build process.

{% highlight yaml %}
phpIniOptions:
  upload_max_filesize: 25M
  post_max_size: 25M
  memory_limit: 256M
{% endhighlight %}

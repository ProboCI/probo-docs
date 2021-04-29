---
layout: "docs"
title: Drupal Multisite with Probo
class: documentation
permalink: /drupal/multisite/
published: true
---

You can add `--site-[anything]` to the end of any build's URL – where `[anything]` can be anything URL safe with no periods – and Probo will still route to the appropriate container. For example, if your `$BUILD_ID` is "abc-123" and your normal URL is `https://abc-123.probo.build`, you can add `--site-foo` to the end of the URL. The new URL, `https://abc-123--site-foo.probo.build`, will still pass you through to the exact same build. This effectively gives you a way to create subdomains for your builds.

With this in mind, you can add the necessary site entries in your `sites.php` file to route the appropriate Probo URLs to your site folders. For example, you might want to route `$BUILD_ID--site-de.probo.build` to your `de` site folder. In `sites.php` this would look like:

```
$sites['$BUILD_ID--site-de.probo.build'] = 'de';
```

You can define these entries in your `.probo.yaml` file:

{% highlight yaml %}
steps:
  - name: Configure Multisite
    plugin: Script
    script: |
       cd $SRC_DIR/webroot/sites
       echo "\$sites['$BUILD_ID--site-de.probo.build'] = 'de';" >> sites.php
{% endhighlight %}

You also need to [generate your own settings.php files](https://www.drupal.org/documentation/install/settings-file) for each site.

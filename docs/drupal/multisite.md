---
layout: "docs"
title: Drupal Multisite with Probo
class: documentation
permalink: /drupal/multisite/
published: true
---

You can add `--site-[anything]` to the end of any build's URL – where `[anything]` can be anything URL safe with no periods – and Probo will still route to the appropriate container. For example, if your `$BUILD_ID` is "abc-123" and your normal URL is `https://abc-123.probo.build`, you can add `--site-foo` to the end of the URL. The new URL, `https://abc-123--site-foo.probo.build`, will still pass you through to the exact same build. This effectively gives you a way to create subdomains for your builds.

With this in mind, you can create the necessary site folders in your sites directory and then [create a `sites.php` file](https://api.drupal.org/api/drupal/sites%21example.sites.php/7.x) to route your sites to the appropriate Probo URLs. For example, you might want to route your `de` site folder to `$BUILD_ID--site-de.probo.build`. In `sites.php` this would look like:

```
$sites = array(
  $BUILD_ID . '--site-de.probo.build' => 'de';
);
```

You will need to either commit the `sites.php` file to your sites folder, or you can define it in your `.probo.yaml` file. The latter would look like this:

{% highlight yaml %}
steps:
  - name: Create sites.php
    plugin: Script
    script: |
       cd /var/www/html/sites/
       touch sites.php
       echo "\$sites = array(" >> sites.php
       echo "\$BUILD_ID . '--site-de.probo.build' => 'de';" >> sites.php
       echo ");" >> sites.php
{% endhighlight %}

You also need to [generate your own settings.php files](https://www.drupal.org/documentation/install/settings-file) for each site.

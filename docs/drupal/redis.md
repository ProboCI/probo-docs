---
layout: "docs"
title: Redis Configuration
class: documentation
permalink: /drupal/redis/
published: true
---
[Redis](https://redis.io){:target="\_blank"} is a memory-based data structure that can supplement or replace native caching system that Drupal does in the RDBMS. It's primary focus is on performance by keeping cached data in memory as opposed to being written to a persistent database.  

Your Probo.CI Drupal build can leverage Redis by ensuring the [Redis](https://www.drupal.org/project/redis){:target="\_blank"} contributed module is part of your Drupal site and enabled. After this is done, you can add the following to your Drupal plugin configuation

{% highlight yaml%}
    settingsAppend: |
      $settings['redis.connection']['interface'] = 'PhpRedis';
      $settings['redis.connection']['host'] = 'localhost';
      $settings['redis.connection']['port'] = 6379;
      $settings['cache']['default'] = 'cache.backend.redis';
{% endhighlight %}

If you receive site errors after setting this, then you likely do not have the Redis module enabled on your probo build. This is a dependency of using Redis on your Drupal build.

It's important to note that if your site has Redis configurations enabled in the `settings.php` file and not loaded conditionally for Probo.CI or overidden by the settings above could lead to severe performance degredation of your Probo.CI builds.
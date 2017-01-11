---
layout: "docs"
title: Notifications
class: documentation
permalink: /build/notifications/
published: true
---

You can add notifications to your build by adding a notifications key to your `.probo.yaml` file. This will allow you to start getting webhooks delivered to your service when changes happen to your builds, including steps completing and builds passing or failing.

## Examples

{% highlight yaml %}
notifications:
  webhook: https://example.com/api/probo-notification
{% endhighlight %}

{% highlight yaml %}
notifications:
  webhook:
    - https://example.com/api/probo-notification1
    - https://example.com/api/probo-notification2
{% endhighlight %}

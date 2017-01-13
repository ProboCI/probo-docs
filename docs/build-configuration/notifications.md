---
layout: "docs"
title: Notifications
class: documentation
permalink: /build/notifications/
published: true
---

Enabling notifications from Probo allows you to be automatically informed about your builds' status and completion. Currently, Probo supports webhook  `POST` notifications, but will soon support HipChat and Slack notifications as well.

## Webhook notifications

Get started with webbook notifications by adding a `notifications` key to your `.probo.yaml` file. Within this `notifications` key, add your webhook `POST` URL. You can add a single URL or multiple URLs. See the following examples for more information:

### Examples

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

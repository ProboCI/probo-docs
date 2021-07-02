---
layout: "docs"
title: Notifications
class: documentation
permalink: /build/notifications/
published: true
---

Enabling notifications in your Probo Build allows you to be automatically informed about your builds' status and completion. Currently, Probo supports webhook  `POST` notifications, and Slack notifications through a custom Slack app.

## Slack notifications

Probo now supports Slack notifications for your builds using a [custom Slack app](https://api.slack.com/apps/new) with an [Incoming Webhook](https://api.slack.com/incoming-webhooks) activated. 

Receive slack notifications about your Probo builds by adding a `notifications` key to your `.probo.yaml` file. Within this `notifications` key, add a `slack` key containing a `webhook` key. Then add the webhook for your custom Slack app within the `webhook` key. You can add a single webhook URL or multiple webhook URLs for Slack notifications. See the following slack notifications examples for more information:

### Examples

{% highlight yaml %}
notifications:
  slack:
    webhook:
      - https://hooks.slack.com/services/EXAMPLE-1/WEBHOOK-1/PATH-1
{% endhighlight %}

{% highlight yaml %}
notifications:
  slack:
    webhook:
      - https://hooks.slack.com/services/EXAMPLE-1/WEBHOOK-1/PATH-1
      - https://hooks.slack.com/services/EXAMPLE-2/WEBHOOK-2/PATH-2
{% endhighlight %}


## Webhook notifications

Get started receiving webhook notifications for your Probo builds by adding a `notifications` key to your `.probo.yaml` file. Within this `notifications` key, add your webhook `POST` URL. You can add a single webhook URL or multiple webhook URLs for webhook notifications. See the following webhook notifications examples for more information:

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

---
title: Setting LAMP Varnish Configuration Options
uid: lamp_set_varnish_config
---

{% highlight yaml %}
steps:
  - name: Configure Varnish
    plugin: LAMPApp
    varnish:
      enabled: true
      pathToVcl: $SRC_DIR/config.vcl
{% endhighlight %}

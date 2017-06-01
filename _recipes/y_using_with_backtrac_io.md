---
title: Using Probo with Backtrac.io for Visual Regression Testing
uid: y_using_with_backtrac_io
---
Be sure to replace $BACKTRAC_API_KEY with your project's API key, $BACKTRAC_PROJECT_NID with the appropriate API id, and $CURRENT_LIVE_SITE with the site that you're testing against.

ex: https://docs.probo.ci

{% highlight yaml%}
- name: 'Run visual comparision to test via backtrac.io'
    plugin: Script
    script: |
        curl $BUILD_DOMAIN
        curl --header 'x-api-key: $BACKTRAC_API_KEY' --request POST 'https://backtrac.io/api/project/$BACKTRAC_PROJECT_NID/compare_custom' --data '{"url1":"https://$CURRENT_LIVE_SITE","sn1_name": "Current Live Site","url2":"'"$BUILD_DOMAIN"'","sn2_name":"New Site Probo Build","diff_name":"Live vs Probo"}'
{% endhighlight %}

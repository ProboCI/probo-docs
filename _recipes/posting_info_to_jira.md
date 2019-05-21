---
title: Posting Probo links to Jira
uid: posting_info_to_jira
---
This recipe assumes you're using GitHub, and that you're naming your branches the same as your Jira issue id (ex: PRO-123).

_Please note that you should not add your passwords or API keys to a public repository! Probo will soon be releasing a safer process for posting build information into Jira._

**Step One**

Upload a Probo project asset named `credentials.sh` with a Jira account's credentials, which should be put in the appropriate place in the quotes.

```
#!/bin/bash
JIRA_NAME=""
JIRA_PASS=""
```

**Step Two**

Add this to your `.probo.yaml` file, replacing `_JIRA_URL` with the URL to your Jira instance.

{% highlight yaml%}
 - plugin: Script
 name: Comment in Jira
 script: |
    echo '{"body": "Probo build at ' $BUILD_DOMAIN '"}' >> comment.json
    source $ASSET_DIR/credentials.sh
    BRANCH_NAME=$(echo $BRANCH_NAME | awk '{print toupper($0)}')
    curl -D- -u $JIRA_NAME:$JIRA_PASS -X POST --data @comment.json -H "Content-Type: application/json" https://_JIRA_URL/rest/api/2/issue/$BRANCH_NAME/comment
{% endhighlight %}

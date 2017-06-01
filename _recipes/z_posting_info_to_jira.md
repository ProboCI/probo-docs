---
title: Posting Probo and Backtrac links to Jira
uid: z_posting_tickets_to_jira
---
This recipe assumes you're using Backtrack.io and GitHub, and that you're naming your branches the same as your Jira issue id (ex: PRO-123).

Please note that you should not add your passwords or API keys to a public repository! Probo will soon be releasing a safe process for posting build information into Jira and using Backtrac for testing.

**Step One.**

Upload a probo project asset 'credentials.sh' with a Jira account's credentials, as well as your Bactrac.io API key and NID, which should be put in the appropriate place in the quotes.

{% highlight yaml%}
#!/bin/bash
JIRA_NAME=""
JIRA_PASS=""
BACKTRAC_PROJECT_NID=""
BACKTRAC_API_KEY=""
{% endhighlight %}

**Step Two.**

Add this to your Probo yaml file, replaceing _JIRA_URL with the URL to your Jira instance.

{% highlight yaml%}
 - plugin: Script
 name: Run visual comparision to test via backtrac.io and comment in Jira
 script: |
    echo '{"body": "Probo build at ' $BUILD_DOMAIN  >> comment.json
    echo ' and visual test at https://backtrac.io/node' >> comment.json
    curl --header 'x-api-key: $BACKTRAC_API_KEY' --request POST https://backtrac.io/api/project/$BACKTRAC_PROJECT_NID/compare_custom --data '{"url1":"_URL","sn1_name":"Prod","url2":"'"$BUILD_DOMAIN"'","sn2_name":"Probo ","diff_name":"Prod vs Probo"}' | rev | awk -F , '{print $2}' | rev | awk -F \\ '{print $5 $6}' | tr -d '\"' >> comment.json
    echo '"}' >> comment.json
    source $ASSET_DIR/credentials.sh
    BRANCH_NAME=$(echo $BRANCH_NAME | awk '{print toupper($0)}')
    curl -D- -u $JIRA_NAME:$JIRA_PASS -X POST --data @comment.json -H "Content-Type: application/json" https://_JIRA_URL/rest/api/2/issue/$BRANCH_NAME/comment
{% endhighlight %}

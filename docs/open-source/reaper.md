---
layout: "docs"
title: Probo Reaper
class: documentation
permalink: /open-source/reaper/
published: true
---

## Probo Reaper
The Reaper is a housekeeping process used to kill off old builds when pull requests have been merged, declined or otherwise go away. It tears down and destroys docker builds and can be generally thought of as garbage collection. This task best set up on a cron to run about every 10 minutes. It is a light weight process and, of course, depends on how heavily used your server is.  
  
The Reaper `defaults.yaml` file can be left untouched for standard performance. The only change you will need to be aware of is that if you change from GitHub to Bitbucket for repository handling the "github" under `codeHostingHandler` will need to be changed to "bitbucket" using the same URL.  
  
A sample of the cron command might look something like this if your user is named "probo"  
  
```bash
*/10 * * * * node /home/probo/probo-reaper/bin/probo-reaper reap
```  
  
**KNOWN ISSUES**  
As of this writing it is a known issue that if you update a pull request and it kicks off a new build, reaper may reap both builds. In this case you may need to close the pull-request and re-pull it. The cause of this is still being investigated but is one you will want to be aware of.

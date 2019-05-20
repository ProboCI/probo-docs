---
layout: "docs"
title: SQL Timeouts
class: documentation
permalink: /troubleshooting/sql-timeouts/
published: true
---

## Problem

I receive the following error when I attempt to view a build:

```
PDOException: SQLSTATE[HY000] [2002] No such file or directory
in lock_may_be_available().
```

## Solution

Enter the [SSH Terminal](/app/builds#advanced-functions) and run `sudo service mysql restart`.

## Explanation

For some reason, the MySQL service is failing and needs to be restarted.

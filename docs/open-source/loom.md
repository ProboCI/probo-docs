---
layout: "docs"
title: Loom
class: documentation
permalink: /open-source/loom/
published: true
---

## The Loom
Loom is the task output aggregation service that records and plays back live log streams. Loom currently requires RethinkDB as a backing store.

**Installation**  
```bash
cd probo-loom
npm install
```

Before starting this process, keep in mind that you will need to start the RethinkDB daemon before starting loom. This is an important step not only for the installation of Probo, but also for subsequent restarts. 

You will want to edit the `defaults.yaml` file to look as follows. Of particular note is to comment out the section on tokens. These are primarily for tailing streams which will be covered in the future.

```yaml
# server host to listen on, defaults to localhost
host: 'localhost'

# server port to listen on, defaults to 3060
port: 3060

# RethinkDB host, defaults to localhost
dbHost: 'localhost'

# RethinkDB port, defaults to 28015
dbPort: 28015

# RethinkDB DB name, defaults to logs
dbName: "logs"

# RethinkDB table for storing stream metadata
storageMetaTable: "meta"

# RethinkDB table for storing actual logs (Rethink Storage)
storageLogsTable: "logs"

# Path on file system for storing stream files. Defaults to "data"
storageDataDir: "/opt/probo/probo-loom/data"

# Timeout for tailing streams. Defaults to 30 seconds.
# storageTailTimeout: 30s

# File compression, defaults to true
# storageCompress: true

# API tokens
#tokens:
#  - tik
#  - tok
```

Then you can start by using the following commands inside the `probo-loom` directory:

```bash
rethinkdb --daemon
node ./bin/loom > /dev/null &
```

## Next Step: [Asset Receiver >>](/open-source/asset-receiver/)
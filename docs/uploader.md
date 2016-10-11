---
layout: "docs"
title: Uploading Build Assets to Probo
class: documentation
permalink: /uploader/
published: false
---
You may need to upload assets to Probo for use in your builds. Build Assets are any files you need other than what is within your git repository. For example, you may need to upload a database for your project.

When you view your project in the Probo app, you will see above your builds an Upload Token. This token is project-specific.

### To upload an asset:
- Install the [Probo Uploader](https://github.com/ProboCI/probo-uploader) on your machine with `npm`.
```
sudo npm install -g probo-uploader
```
- Run the command as shown on your project page. For example,
```
probo-uploader --token=[your token] some-file.txt
```

### To use an asset in your builds:

See documentation for Build Configuration.

### To update an asset automatically:

You may want to use Jenkins or other tool to update your asset using the probo-uploader. For example, after Jenkins does a database backup of your production database, have it upload the backup to Probo.

### For more information:
See [https://github.com/ProboCI/probo-uploader](https://github.com/ProboCI/probo-uploader)

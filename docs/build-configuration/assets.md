---
layout: "docs"
title: Assets
class: documentation
permalink: /build/assets/
redirect_from: /assets/
published: true
---
Assets are any files you need other than what is within your git repository. For example, you may need to upload a database for your project. You can find a list of your uploaded assets on your repository's Build Assets page in the web app. It's important to note that when you upload an asset with the same name as a previously uploaded asset, it replaces the existing asset.

## Upload Assets

There are two ways to upload assets:

1. Upload through [the Probo app](https://app.probo.ci/).
2. Use the [Probo Uploader](https://github.com/ProboCI/probo-uploader) CLI tool.

### Using the web app

Navigate to your repository's project page in the web app. Click the Build Assets tab in the sidebar menu. Here you will find a drag and drop interface to upload and manage your assets.

<img src="/images/db-asset-example.png" class="screenshot" alt="A database asset uploaded using the web app.">

### Using the Probo Uploader

Install the [Probo Uploader](https://github.com/ProboCI/probo-uploader) on your machine with `npm`.

  ```
    sudo npm install -g probo-uploader
  ```

Run the command as shown on your project page. For example,

  ```
  probo-uploader --token=[your token] mydb.sql.gz
  ```

You can find your project's upload tokens when you view your project's Upload Tokens page in the Probo app. Every project is given one token to begin with, and you can add and delete tokens as necessary. This is useful if your token is compromised in any way.

## Import assets to your builds

You can indicate which assets to import into your builds in the `.probo.yaml` file. For example, if you need to use an asset you've uploaded with filename dev.sql.gz, start .probo.yaml file with:
{% highlight yaml%}
assets:
  - mydb.sql.gz
{% endhighlight %}

We store your assets encrypted at rest and we do our best to keep your data safe, but we'd rather not have your sensitive data at all if we can avoid it. **If you are uploading a database or any other file with potentially sensitive data, we strongly recommended you sanitize it first.**

## Update an asset automatically

You may want to use Jenkins or another automation tool to update your asset using the Probo Uploader. For example, after Jenkins runs a backup of your production database, have it make a sanitized copy and upload it to Probo.

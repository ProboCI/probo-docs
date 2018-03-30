---
layout: "docs"
title: Assets
class: documentation
permalink: /build/assets/
redirect_from: /assets/
published: true
---
Assets are any files you need other than what is within your git repository. For example, you may need to upload a database dump for your project. You can find a list of your uploaded assets on your repository's Build Assets page in the web app. It's important to note that when you upload an asset with the same name as a previously uploaded asset, it replaces the existing asset.

## Upload Files as Probo Assets

There are two ways to upload files as Probo assets:

1. Upload through [the Probo app](https://app.probo.ci/).
2. Use the [Probo Uploader](https://github.com/ProboCI/probo-uploader) CLI tool.

### Upload Probo Assets Using the Web App

Navigate to your repository's project page in the web app. Click the Build Assets tab in the sidebar menu. Here you will find a drag and drop interface to upload and manage your assets.

<img src="/images/db-asset-example.png" class="screenshot" alt="A database asset uploaded using the web app.">

### Upload Probo Assets Using the Probo Uploader

Install the [Probo Uploader](https://github.com/ProboCI/probo-uploader) on your machine with `npm`.

  ```
    sudo npm install -g probo-uploader
  ```

Run the command as shown on your project page. For example,

  ```
  probo-uploader --token=[your token] mydb.sql.gz
  ```

You can find your project's upload tokens when you view your project's Upload Tokens page in the Probo app. Every project is given one token to begin with, and you can add and delete tokens as necessary. This is useful if your token is compromised in any way.

## Import Probo Assets to Your Probo Build

You can indicate which assets to import into your builds in the `.probo.yaml` file. For example, if you need to use an asset you've uploaded with filename dev.sql.gz, start .probo.yaml file with:
{% highlight yaml%}
assets:
  - mydb.sql.gz
{% endhighlight %}

We store your assets encrypted at rest and we do our best to keep your data safe, but we'd rather not have your sensitive data at all if we can avoid it. **If you are uploading a database or any other file with potentially sensitive data, we strongly recommended you sanitize it first.**

## Update a Probo Asset Automatically

You may want to use Jenkins or another automation tool to update your asset using the Probo Uploader. For example, after Jenkins runs a backup of your production database, have it make a sanitized copy and upload it to Probo.

## Access Probo Assets in Your Builds

Currently we do not support accessing Probo Assets through the Probo app UI, but there are ways to view the contents of a Probo Asset file or download the Probo Asset file after your Probo Build has completed.

### Viewing the Contents of a Probo Asset File

All Probo Assets are stored in the `/assets` directory in your Probo Build container by default. This path is not accessible through the Probo Build URL, but the contents of a file such as a text file or markdown file can be viewed by using the `cat` command to print the contents of the file to stdout.
  ```
  cat /assets/asset.txt
  ```
Below is an example of a step in the `.probo.yaml` file that views the contents of a Probo Asset, `asset.txt`, that was uploaded to the Probo app through the UI or the Probo Uploader.

{% highlight yaml%}
assets:
  - asset.txt
steps:
  - name: View contents of asset.txt.
    command: 'cat /assets/asset.txt'
{% endhighlight %}

### Download a Probo Asset File

Probo Assets are not available directly through the Build URL, but a step can be added to the `.probo.yaml` file to copy a Probo Asset file to a location accessible through the Probo Build URL.

Below is an example of a Probo Build step in the `.probo.yaml` file that copies the Probo Asset, `asset.txt`, to the docroot of the Build URL site. This will allow the `asset.txt` file to be viewed or downloaded when viewing the Probo Build URL with that file path.

{% highlight yaml%}
assets:
  - asset.txt
steps:
  - name: Copy asset.txt to a location we can download after the build runs.
    command: 'cp /asset/asset.txt /var/www/html'
{% endhighlight %}

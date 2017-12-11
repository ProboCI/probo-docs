---
layout: "docs"
title: Asset Receiver
class: documentation
permalink: /open-source/asset-receiver/
published: true
---

## Asset Receiver
The Probo Asset Receiver is really an important piece for uploading items such as databases and other things you might need when wanting to use this for existing Drupal and WordPress web sites. While designed for use with Probo Uploader, you do not need to use Probo Uploader to use it and this document does not cover use of Probo Uploader.

This example uses AmazonS3 to store files because it is quick, convenient, and I want to save my disc space for builds and not large database files. You can configure it to store files on the Probo Asset Receiver server file system if you wish.

Configure your Probo Asset Receiver with a configuration file as follows modifying the `defaults.config.yaml` file in the git repository you downloaded with the values below:

```yaml
# The host and port to listen on.
host: 0.0.0.0
port: 3070

# The directory in which to store the LevelDB database.
databasePlugin: LevelDB
databaseConfig:
  databaseDataDirectory: db

# Determines the cipher used to encrypt the assets.
# See https://www.openssl.org/docs/manmaster/apps/ciphers.html for options.
encryptionCipher: 'aes-256-cbc'
encryptionPassword: {YOUR CHOSE A SECRET PASS PHRASE}
recipheredOutputDir: null

# API tokens for creating all routes except asset upload (disabled by default)
tokens: null
uploadsPaused: false

# Amazon S3 File Storage Configuration Settings
fileStoragePlugin: AwsS3Storage
fileStorageConfig:
  awsAccessKeyId: {YOUR AWS ACCESS KEY}
  awsSecretAccessKey: {YOUR AWS SECRET ACCESS KEY}
  awsBucket: {FILE BUCKET}
```

Next we build and start the asset receiver:

```bash
cd probo-asset-receiver
npm install
node ./bin/probo-asset-receiver --c default.config.yaml > /dev/null &
```

For the asset receiver, you must create buckets and tokens for each bucket. Once you have done this you can upload files into your buckets for use by Probo. Each file uploaded through the asset receiver is encrypted, so there are no unencrypted files stored on your file servers or S3. Below are examples of curl commands you can use to create buckets and tokens as well as upload and download files from the asset receiver.

**Create A Bucket**  
```bash
curl -XPOST -H "Content-Type: application/json" -i -d '{"some":"metadata"}' http://{ASSET_RECEIVER_URL}:3070/buckets/{BUCKET_NAME}  
```

**Create A Bucket Token**  
```bash
curl -i -XPOST http://{ASSET_RECEIVER_URL}:3070/buckets/{BUCKET_NAME}/token/{TOKEN}  
```

**Upload A File With A Bucket Token**  
```bash
curl -i -XPOST --data-binary @{FILENAME} http://{ASSET_RECEIVER_URL}:3070/asset/{TOKEN}/{FILENAME}  
```

**Download A File With the Bucket Name**  
```bash
curl -O http://{ASSET_RECEIVER_URL}:3070/asset/{BUCKET_NAME}/{FILENAME} > {FILENAME}  
```  

**Calculating Bucket Names and File Names For Use with .probo.yaml files**  
In the asset receiver, bucket names must be calculated in order to work with your `.probo.yaml` file. The asset id must be the same as the asset file name. As such if your database file is `database.sql.gz` both the asset name and asset id specified in the upload string must be `database.sql.gz`

The bucket name must be in the format of `organization-repository_name`. For example, if I was to use the `cmp_build` repository in my `ElusiveMind` organization, the bucket name must be: `Elusivemind-cmp_build`.

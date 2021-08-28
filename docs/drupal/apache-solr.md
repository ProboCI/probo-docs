---
layout: "docs"
title: Using Apache Solr on Probo
class: documentation
permalink: /drupal/solr/
published: true
---
We run Apache Solr on `localhost:8983` with a default Drupal schema that is works in conjunction with with [Search API Solr Search](https://www.drupal.org/project/search_api_solr). We do not support custom schemas at this time. 

Probo has two cores installed. One for Drupal 7, and one for Drupal 8 & 9. The cores are intuitively named `drupal7` and `drupal8`. Note that there is no third core for Drupal 9 as it can use the same as Drupal 8. Below are the current schema versions installed for each version: 

Drupal 7: 7.x-1.15  
Drupal 8/9: 4.2.0  

We will periodically update these and communicate these changes as new versions of these modules are released. Build images are typically updated the first weekend of every month. Please follow the [Changelog](/changelog) for information on specific updates. You can also get the current versions of things in the image by referencing the [Docker Images Page](/build/images/) in the section on `versionizer`.  

The easiest way to integrate SOLR into your **Drupal 8/9** site is to append the following information to the [Drupal Plugin](https://docs.probo.ci/plugins/drupal-plugin/) as part of your `settingsAppend` configuration:  

```yaml
steps:
  - name: Install and Update Drupal
    plugin: Drupal
    database: drupal-database.sql.gz
    databaseGzipped: true
    databaseUpdates: true
    clearCaches: true
    drupalVersion: 8
    settingsAppend: |
      $config['search_api.server.solr']['backend_config']['connector_config']['host'] = 'localhost';
      $config['search_api.server.solr']['backend_config']['connector_config']['core'] = 'drupal8';
```

If you choose not to use the settingsAppend solution, your SOLR settings inside your Probo build need to look as follows:  

<img src='/images/solr.png' alt="SAPI configuration">

Additionally you can automatically import into SOLR using Drush:  

```yaml
  - name: Clear SOLR Index
    command: drush -r /var/www/html sapi-r -y
    
  - name: Index SOLR
    command: drush -r /var/www/html sapi-i --batch-size=100 -y
```

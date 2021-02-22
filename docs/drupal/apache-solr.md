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
Drupal 8/9: 4.1.10  

We will periodically update these and communicate these changes as new versions of these modules are released.  

If you are using [Search API](https://www.drupal.org/project/search_api), your SOLR settings should look like as per the following example. Note you would substitute `drupal8` with `drupal7` for Drupal 7 sites.

<img src='/images/solr.png' alt="SAPI configuration">

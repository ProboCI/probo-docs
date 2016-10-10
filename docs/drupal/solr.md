---
layout: "docs"
title: Using Apache Solr on Probo
class: documentation
permalink: /docs/drupal/solr/
published: true
---
We run Apache Solr on `localhost:8389/solr` with a default Drupal schema that is compatible with both [Search API Solr Search](https://www.drupal.org/project/search_api_solr) and [Apache Solr Search](https://www.drupal.org/project/apachesolr) modules. We do not support custom schemas at this time.

If you are using [Search API](https://www.drupal.org/project/search_api), your settings should look like this:

{% image 'solr.png' alt="SAPI configuration" %}

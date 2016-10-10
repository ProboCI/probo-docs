---
layout: "docs"
title: WordPress Plugin
class: documentation
permalink: /docs/plugins/wordpress-plugin/
published: true
---
The WordPress plugin provides some handy options to make setting up a `.probo.yaml` file for your WordPress site easier. To use this plugin you must declare `plugin: WordPressApp` in your `.probo.yaml` file.

{: .table .table-striped .table-bordered}
| URL Path Configuration |       |
|------------------------|-------|
| devDomain | The URL of the dev site. This is replaced by the Probo URL in the database. Accepts a **string** value. |
| devHome | The homepage URL of the dev site (including the domain). This is replaced by the Probo URL in the database. Accepts a **string** value. |

{: .table .table-striped .table-bordered}
| Database Configuration |       |
|------------------------|-------|
| database | The filename of the database to import if specified. **Note that this database must be added to the Assets section separately.** Accepts a **string** value. |
| databaseName   | The name of the database. Defaults to `wordpress`. Accepts a **string** value. |
| databaseGzipped| Whether the database was sent gzipped and whether it should therefore be gunzipped before importing. Accepts a **boolean** value. |

{: .table .table-striped .table-bordered}
| Additional Options |       |
|--------------------|-------|
| subDirectory | The directory of the actual web root. Defaults to `docroot`. Accepts a **string** value. |
| flushCaches | Whether or not to flush the cache. Accepts a **boolean** value. |

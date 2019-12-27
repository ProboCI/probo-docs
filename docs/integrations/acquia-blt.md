---
layout: "docs"
title: Using Probo with Acquia BLT
class: documentation
permalink: /integrations/acquia-blt/
published: true
---
You can use Acquia BLT's command line tool to generate a `.probo.yaml` file for your BLT project. Run the following command from the project root:

```
blt ci:probo:init
```

The generated configuration file hooks into BLT's tooling so that, in each build, Probo will:

* Install a fresh copy of your BLT site.
* Validate syntax for your composer files, yaml configuration, and twig files.
* Lint your PHP.
* Run the included Behat tests.
* Check for security updates.

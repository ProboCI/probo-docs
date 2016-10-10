---
layout: "docs"
title: The Stack for your Builds
class: documentation
permalink: /docs/stack/
published: true
---
Probo builds run on Ubuntu 14.04 inside of individual Docker containers. Using Docker's container virtualization architecture ensures that each pull request has a fresh testing environment that runs completely independent from other code being worked on in other feature branches. This configuration allows for true continuous integration in your development workflow without disturbing other developers on your team. It also removes the need to slow down development due to other commits or changes in the database from other developers' working on the project.

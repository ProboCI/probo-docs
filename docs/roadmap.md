---
layout: "docs"
title: Probo CI Product Roadmap
class: documentation
permalink: /roadmap/
published: true
---
Below are items that the Probo CI team has identified as items we're committed to building in the near future. This list will be updated and Pull Requests are welcome, though you should chat with a member of the Probo team before putting in time into describing a new feature request for the roadmap. We will link to issues in the various Probo github repositories as they are created. 

*Last updated August 17, 2017*
# Currently Active Roadmap Items
## Branch Builds and Status Badges
**Github Issue:**
**Status:** In Progress

Currently, probo creates a build for every pull request you open and for every new push you make to an existing pull request. Many of our users have said that there are other non-pull request branches that they always want to have a probo environment for. That they would like to verify that a fresh probo build will always work for `master` or for `develop`. We plan to allow you to specify a list of branches that we should always build for every push with or without a pull request. Once we have this we can also provide build badges that you can use in your project README so that everyone can always the status of that branch.

We also plan to provide consistent links to the most recent build for a given branch. This will be especially helpful for building and testing micro-services as you will be able point one service at the most recent build on the appropriate branch of another service, always present and always up to date.

## Live web updates via WebSockets
**Github Issue:**
**Status:** In Progress

When you have a build running you don't want to pound the refresh button and with many CI services you don't have to. We built our infrastructure to support this feature but it has perpetually slipped into "sprint next". This feature is nearing the top of our priority list and we have started to create our WebSocket implementation in a way that will allow us to open source it and also provide this as a part of the forthcoming public API (more on that below). Our WebSocket feature aims to update build statuses, update step statuses, and stream log messages for builds in progress to the browser in realtime.

## Multiple Containers Per-Project
**Github Issue:**
**Status:** In Progress

Currently Probo runs each environment in a "fat container". What does that mean? It means we have a [docker base image](https://hub.docker.com/r/proboci/ubuntu-14.04-lamp/) that contains all of our services and our [simple process manager ](https://github.com/proboci/proboscis) starts the LAMP stack and multiplexes the stdout and stderr output so that all are available outside of docker. This approach has had a number of benefits for us in that we can very easily encapsulate control, and monitor an entire build's environment with the fewest moving parts as possible. It also means, though, that it's harder for us to provide a mix-and-match set of services that you can opt in and out of. We plan to support sets of containers in addition to the single monolith as an upcoming feature to enable an easier mix-and-match of services at different versions. This could also play a part in our matrix build feature further described below.

## First class support for non-LAMP Stacks
**Github Issue:**
**Status:**

Currently Probo provides a LAMP environment as the basis for every build. Some industrious users have coerced Probo into supporting other stacks through means that are not for the faint of heart. It has always been our intention to support other languages and we abhor hacks and have always intended to provide both alternative language images that ship with other languages pre-installed (you can always install them yourself) and to make the services that we start on boot completely configurable.

## Matrix builds
**Github Issue:**
**Status:**

A build matrix can mean different things in different contexts, but it generally describes a single trigger kicking off multiple steps that may execute in parallel and where the result of a "build" is an aggregate of these other steps. This may be used to run the same test suite on multiple versions of your language (say PHP 5 and 7), it may mean running different portions of your test suite in parallel, or it might mean both. We have Matrix Builds on our roadmap with the intention of supporting both use cases grouping and collecting output from a multi-dimensional set of inputs. This may combine with our cached build steps in interesting ways to build a common base environment and then to run portions of your test suites in parallel.

## Cached Build Steps
**Github Issue:**
**Status:**

Some of projects have time consuming and computationally expensive steps necessary to bootstrap their environments. We know first hand how frustrating it can be to kick off a new build and have to wait for some package to install or some database to import before you can get to the new and different part of this particular build. We are planning an exciting feature that would allow you to mark build steps as cacheable and to specify a time-to-live for the cached artifact. That way we can capture that as a customized base image that we can start from for your future builds until you change the configuration for those steps, upload new assets that require a rebuild, or allow the cached artifact to time out.

## SSH Access to Your Build Environments
**Github Issue:**
**Status:**

Nothing is more frustrating than when a CI build on some remote service has failed without any helpful message in the logs and without any way to go and figure out what went wrong. Probo already has a leg up on many services because you can click around your website to see what caused the failed test, but that only works if your build was able to bootstrap the project. If you have a complex build setup getting your initial successful build run can sometimes be a little tricky. Currently we have a probo employee look at your build and answer your questions but we want to empower you so we have always planned to give you SSH access to your build environments. We have even written a simple proof of concept implementation that terminates your SSH connection, fires up your container, and pipes your SSH terminal session into a bash process inside the container. We plan to turn this into a fully supported and open sourced component that will allow you to SSH into any container to do some live exploration and debugging. This will support your proper OpenSSH client and we hope to follow on with a web console as well. It is worth noting that an alternative implementation is already available to enterprise customers.

## Gitlab support
**Github Issue:**
**Status:** In progress on the (Probo Gitlab Handler repository)https://github.com/ProboCI/probo-gitlab

We plan to provide support for both the SaaS and the self-hosted versions of [Gitlab](https://about.gitlab.com/). This will be an open source component just like our other handlers.

## The Probo Secret Service
**Github Issue:**
**Status:**

One of the features that differentiates Probo from many other CI tools is our Asset service. You can upload a set of assets and we store them with a project-specific encryption key and make those files available to builds within that project. The fact that these assets are stored with AES encryption makes them a pretty good way to make secrets available to your build steps (we describe this technique in our [documentation on fetching databases from Pantheon](http://probo.ci/docs/tutorials/pantheon/)) but these tokens will not be automatically stripped from our logging service. We plan to create a secret service allowing you to store encrypted secrets either on our servers or as encrypted blobs in your `.probo.yaml` file. These secrets will also enable other forthcoming features.

## Automatic Synchronization with Acquia and Pantheon
**Github Issue:**
**Status:**

Currently if you want to use a sanitized database from a Drupal site hosted on Aqcuia or Pantheon you either need to download it from the respective dashboard and upload it to Probo manually, create a cron job to do it, or import the database in each build ([as documented](http://probo.ci/docs/tutorials/pantheon/)) which slows down your build. Many of our users are hosting with Acquia and Pantheon and so we plan to roll out first-class integrations as and addition to our [Drupal plugin](http://probo.ci/docs/plugins/drupal-plugin/) to simplify this process.

## Public API
**Github Issue:**
**Status:**

We built Probo API first but as developers we know that an API is a contract with your most invested users. We want to expose and document a REST and WebSocket API that will allow you to fetch information about your organizations, projects, and builds. We plan to allow you to subscribe to changes via our WebSocket API and to allow you to trigger builds over the API. This last point is useful if something has changed external to your code like an updated dependency or new version of a build asset.

## Replace RethinkDB with pgSQL

# Recently Completed Roadmap Items
## Open Source Stash/Bitbucket Server support
**Github Issue: None**
**Status: Done**

We have had support for Bitbucket Server (formerly known as Stash) since we launched the service publicly but have only made it available to enterprise customers of our hosted SaaS edition. On our near-term roadmap is opening our Bitbucket Server (and Stash) integration for use with any of our plans. In addition, we are going to open source our Bitbucket Server Handler under an Apache 2 license just as we have done with our [Bitbucket Handler](https://github.com/proboci/probo-bitbucket) and [Github Handler](https://github.com/ProboCI/probo/blob/master/lib/GithubHandler.js) services.

## A LAMP Image Based on 16.04
**Github Issue:**
**Status:** Done

Our default image is a LAMP image (more on other languages below) built on Ubuntu 14.04 LTS. How did we decide what version of PHP, MySQL, and Redis to support? Easy, we just used the one you get by default with an `apt-get install` and we figured that was going to be one of the most common and well tested targets if we picked the most common and well tested operating systems. 16.04 has been out for some time now and many of us are running it. It ships with PHP 7 which is much faster and has proven to massively improve build times on some projects, we are planning to roll out a 16.04 build based on our [Probo Image Builder](https://github.com/ProboCI/probo-image-builder) project (pull requests very much welcome).

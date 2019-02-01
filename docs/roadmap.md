---
layout: "docs"
title: Probo CI Product Roadmap
class: documentation
permalink: /roadmap/
published: true
---
Below are items that the Probo CI team has identified as items we're committed to building in the near future. This list will be updated and Pull Requests are welcome, though you should chat with a member of the Probo team before putting in time into describing a new feature request for the roadmap. We will link to issues in the various Probo github repositories as they are created. 

*Last updated February 1st, 2019*
# Currently Active Roadmap Items

## A LAMP Image Based on 18.04
**Github Issue:**  https://github.com/ProboCI/docker-ubuntu/issues/2
**Status:** In progress

## First class support for non-LAMP Stacks
**Github Issue:**  
**Status:** Near completion  

Currently Probo provides a LAMP environment as the basis for every build. Some industrious users have coerced Probo into supporting other stacks through means that are not for the faint of heart. It has always been our intention to support other languages and we abhor hacks and have always intended to provide both alternative language images that ship with other languages pre-installed (you can always install them yourself) and to make the services that we start on boot completely configurable.

We recently completed  [we have a more robust service for building and launching images](https://github.com/ProboCI/probo-image-builder), you can find the images as we make them available on the [ProboCI Docker Hub](https://hub.docker.com/u/proboci/). Anything listed on dockerhub can now be used in the Probo app. Please see the [Probo Docs on Images](https://docs.probo.ci/build/images/) for more information on how to use these. 

## .net/MSSQL, Sitecore, Java, node.js plugins
**Github Issue:**  
**Status:**  In progress (.net integration in proof-of-concept at the moment, others to follow)

Our highest priority is to support the wide variety of systems that software delivery organizations need in order to work with their diverse and demanding customers and stakeholders. In order to do that we not only have to support different stacks, we also need to build out plugins to make gettings setup with these systems relatively painless. Our first target for this project is .net, with the goal of supporting Sitecore and other MSSQL apps.  

## Branch Builds and Status Badges
**Github Issue:** https://github.com/ProboCI/probo/issues/44   
**Status:** In progress  

Currently, probo creates a build for every pull request you open and for every new push you make to an existing pull request. Many of our users have said that there are other non-pull request branches that they always want to have a probo environment for. That they would like to verify that a fresh probo build will always work for `master` or for `develop`. We plan to allow you to specify a list of branches that we should always build for every push with or without a pull request. Once we have this we can also provide build badges that you can use in your project README so that everyone can always the status of that branch.

We also plan to provide consistent links to the most recent build for a given branch. This will be especially helpful for building and testing micro-services as you will be able point one service at the most recent build on the appropriate branch of another service, always present and always up to date.

## Live web updates via WebSockets
**Github Issue:**  
**Status:** In progress  

When you have a build running you don't want to pound the refresh button and with many CI services you don't have to. We built our infrastructure to support this feature but it has perpetually slipped into "sprint next". This feature is nearing the top of our priority list and we have started to create our WebSocket implementation in a way that will allow us to open source it and also provide this as a part of the forthcoming public API (more on that below). Our WebSocket feature aims to update build statuses, update step statuses, and stream log messages for builds in progress to the browser in realtime.

## Multiple Containers Per-Project
**Github Issue:**  
**Status:** In progress

Currently Probo runs each environment in a "fat container". What does that mean? It means we have a [docker base image](https://hub.docker.com/r/proboci/ubuntu-14.04-lamp/) that contains all of our services and our [simple process manager ](https://github.com/proboci/proboscis) starts the LAMP stack and multiplexes the stdout and stderr output so that all are available outside of docker. This approach has had a number of benefits for us in that we can very easily encapsulate control, and monitor an entire build's environment with the fewest moving parts as possible. It also means, though, that it's harder for us to provide a mix-and-match set of services that you can opt in and out of. We plan to support sets of containers in addition to the single monolith as an upcoming feature to enable an easier mix-and-match of services at different versions. This could also play a part in our matrix build feature further described below.

## Matrix builds
**Github Issue:**  
**Status:**  Not started  

A build matrix can mean different things in different contexts, but it generally describes a single trigger kicking off multiple steps that may execute in parallel and where the result of a "build" is an aggregate of these other steps. This may be used to run the same test suite on multiple versions of your language (say PHP 5 and 7), it may mean running different portions of your test suite in parallel, or it might mean both. We have Matrix Builds on our roadmap with the intention of supporting both use cases grouping and collecting output from a multi-dimensional set of inputs. This may combine with our cached build steps in interesting ways to build a common base environment and then to run portions of your test suites in parallel.

## "Secrets" Service
**Github Issue:**  
**Status:**

One of the features that differentiates Probo from many other CI tools is our Asset service. You can upload a set of assets and we store them with a project-specific encryption key and make those files available to builds within that project. The fact that these assets are stored with AES encryption makes them a pretty good way to make secrets available to your build steps (we describe this technique in our [documentation on fetching databases from Pantheon](http://probo.ci/docs/tutorials/pantheon/)) but these tokens will not be automatically stripped from our logging service. We plan to create a secret service allowing you to store encrypted secrets either on our servers or as encrypted blobs in your `.probo.yaml` file. These secrets will also enable other forthcoming features.

## Better integrations with hosting providers like WPEngine, Pantheon, Acquia, Azure, and others 
**Github Issue:**  
**Status:**  Not started

In order to make life easier for Probo users, we want to have a first-class integration with the major hosting providers, which will include grabbing the latest database backups, integrating with their dev/stage/live capabiltiies, and possibly providing SSO authentication. Some of our early targets for these integrations include [WPEngine](https://blog.probo.ci/setting-up-a-wpengine-site-probo), [Pantheon](https://docs.probo.ci/tutorials/pantheon/), Acquia, Azure, and other hosts that support some level of automation. 

## More automated "one-click" setup 
**Github Issue:**  
**Status:**  Not started

While the Probo setup may be easy for some power users, many of our core personas--for example business/product owners, project managers, & manual testers--will find it challenging to get started. Our long-term goal is to automate as much of this process as possible. Some examples include, automatically creating a .probo.yaml and pushing it to Github and, for hosts that don't directly integrate with GitHub/Bitbcuket/Gitlab, even setting up a Github repository when it doesn't yet exist. 

## Public API
**Github Issue:**  
**Status:** In progress

We built Probo API first but as developers we know that an API is a contract with your most invested users. We want to expose and document a REST and WebSocket API that will allow you to fetch information about your organizations, projects, and builds. We plan to allow you to subscribe to changes via our WebSocket API and to allow you to trigger builds over the API. This last point is useful if something has changed external to your code like an updated dependency or new version of a build asset.

## Improvements to the Bitbucket Server / Stash integration
**Github Issue:**  
**Status:** Not started  

In order to better integrate with Bitbucket Server (fka Stash) we really need to build a plugin that works from within Bitbucket and which will ensure that upgrading the version of Bitbucket Server doesn't affect the Probo integration.

## Drupal Multisite Support
**Github Issue:** https://github.com/ProboCI/probo/issues/72  
**Status:** In progress 
Many sites, espescially those hosted on Acquia, use Drupal's multi-site functionality, where many sites share one code base, but have their own database or database tables.

## Replace RethinkDB with pgSQL
**Github link:** https://github.com/ProboCI/probo-db  
**Status:**  In progress  
When we built Probo we decided to use RethinkDB to power most of our database needs, but over time we came to feel that rethink was not stable enough, and the company behind Rethink has since gone out of business. We have been removing Rethink piece by piece and will soon be totally onto the much more stable and highly adopted pgSQL. 

## Slack & Hipchat/Stride integration
**Github Issue:**  
**Status:**  In progress  
Currently, if you want to integrate with HipChat or Jira you have to do so via a [Probo Recipe](https://docs.probo.ci/recipes/). We intend to offer Slack and Hipchat/Stride integration directly through the Probo app interface.

## Jira integration
**Github Issue:**  
**Status:**  In progress  
Currently, if you want to integrate with Jira you have to do so via a [Probo Recipe](https://docs.probo.ci/recipes/). We intend to offer Jira integration directly through the Probo app interface. 

## Rancher (& other container orchestration) support for the Open Source Software version of Probo
**Github Issue:**  
**Status:** Not started

One of the Open Source users of Probo would like Probo to work alongside [Rancher, an Open Source Container Orchestration platform](http://rancher.com/), and presumably this could also be extended to other orchistration tools such as [Chef's Habitiat product](https://www.habitat.sh/). The Probo & Zivtech teams don't currently have the need to support Rancher for our clients, as almost all of them use hosting Platforms as a Service like Acquia, Pantheon, or Platform.sh. But we can see the need to provide the same level of testing and support for those who build and maintain their own server infrastructure and we are very interested in figuring out how to support testing in these complex environments. Please [get in touch](https://probo.ci/contact/) if this is a feature your organization would like to sponsor or support. 

# Completed Roadmap Items
## SSH Access to Your Build Environments
**Github Issue:**  
**Status:**  Now Available  

<em>Update: we have changed our thinking around this and have decided to provide a shell within the Probo app that can be used for debugging. This change will be released soon</em>

Nothing is more frustrating than when a CI build on some remote service has failed without any helpful message in the logs and without any way to go and figure out what went wrong. Probo already has a leg up on many services because you can click around your website to see what caused the failed test, but that only works if your build was able to bootstrap the project. If you have a complex build setup getting your initial successful build run can sometimes be a little tricky. Currently we have a probo employee look at your build and answer your questions but we want to empower you so we have always planned to give you SSH access to your build environments. We have even written a simple proof of concept implementation that terminates your SSH connection, fires up your container, and pipes your SSH terminal session into a bash process inside the container. We plan to turn this into a fully supported and open sourced component that will allow you to SSH into any container to do some live exploration and debugging. This will support your proper OpenSSH client and we hope to follow on with a web console as well. It is worth noting that an alternative implementation is already available to enterprise customers.

## GitLab support
**Github Link:** https://github.com/ProboCI/probo-gitlab  
**Status:** Now Available  

We provide support for both the SaaS and the self-hosted versions of [GitLab](https://about.gitlab.com/). This is an open source component, just like our other handlers. 

## Cached Build Steps
**Github Issue:**  
**Status:** Currently running in private beta. If you're a Probo Silver plan customer or higher and want to try it out, <a href="mailto:probo-support@probo.ci">send us an email.

Some of projects have time consuming and computationally expensive steps necessary to bootstrap their environments. We know first hand how frustrating it can be to kick off a new build and have to wait for some package to install or some database to import before you can get to the new and different part of this particular build. We are planning an exciting feature that would allow you to mark build steps as cacheable and to specify a time-to-live for the cached artifact. That way we can capture that as a customized base image that we can start from for your future builds until you change the configuration for those steps, upload new assets that require a rebuild, or allow the cached artifact to time out.
## Run Probo on Probo / Open Source Probo in a Container
**Github Link:** https://github.com/ElusiveMind/probo-docker   
**Status:**  Now available  

[Michael Bagnall](https://github.com/elusivemind) has been working on building out a fully functional version of Open Source Probo, which uses a Drupal site and module to act as the interface. This should allow us to also use Probo while continuing to build Probo, another goal of ours. 

## Open Source Stash/Bitbucket Server support
**Github Issue**:   
**Status:** Now available

We have had support for Bitbucket Server (formerly known as Stash) since we launched the service publicly but have only made it available to enterprise customers of our hosted SaaS edition. On our near-term roadmap is opening our Bitbucket Server (and Stash) integration for use with any of our plans. In addition, we are going to open source our Bitbucket Server Handler under an Apache 2 license just as we have done with our [Bitbucket Handler](https://github.com/proboci/probo-bitbucket) and [Github Handler](https://github.com/ProboCI/probo/blob/master/lib/GithubHandler.js) services.

## A LAMP Image Based on 16.04
**Github Issue:**  
**Status:** Done  

Our default image is a LAMP image (more on other languages below) built on Ubuntu 14.04 LTS. How did we decide what version of PHP, MySQL, and Redis to support? Easy, we just used the one you get by default with an `apt-get install` and we figured that was going to be one of the most common and well tested targets if we picked the most common and well tested operating systems. 16.04 has been out for some time now and many of us are running it. It ships with PHP 7 which is much faster and has proven to massively improve build times on some projects, we are planning to roll out a 16.04 build based on our [Probo Image Builder](https://github.com/ProboCI/probo-image-builder) project (pull requests very much welcome).

---
layout: "docs"
title: Feature Branch Workflow Process
class: documentation
permalink: /tutorials/workflow/
---
Probo.CI leverages pull requests to instigate the creation of sandbox sites. Pull requests are not dependent on one particular workflow, but consider adopting a **Feature Branch Workflow** to get the most out of this tool. In this workflow features are developed in small iterative chunks in individual branches and are merged frequently, engaging in continuous integration.

You’ll be opening pull requests in [Github](/docs/git/github/) or [Bitbucket](/docs/git/bitbucket/) when a feature branch is ready for review, prompting Probo to run a build. You can still push changes to your branch after you’ve opened a pull request; Probo will simply spin up another build when you do. Once all stakeholders are satisfied with the feature and all checks pass, your pull request should be accepted, merging the branch into master.

Changing the way your team works can be an intimidating prospect, but the lasting benefits of this workflow outweigh any initial difficulties that may arise. After you make the switch, you can expect perpetually clean master code, rapid project development/deployment and improved group collaboration, not to mention the valuable functionality of Probo.CI. If you are ready to take the plunge, keep reading to learn more about the feature branch workflow.

## Before You Begin

New to using git or still a little rough with its concepts? You should start by beefing up your git fu. There are great resources available to hone your skills:

- [Codecademy](https://www.codecademy.com/learn/learn-git) helps you learn git interactively and teaches you everything you need to get started.

- You can access the entire [Pro Git e-book](https://git-scm.com/book/en/v2) online for free to get more in-depth training. This site also has video tutorials and a reference guide to quickly look up specific commands.

For the purposes of this guide, it is assumed that you have [created your Probo account](/docs/getting-started/) and added your [configured `.probo.yaml` file](/docs/build-steps/) to the base of your repository.

## Step 1: Get the codebase

You will need a copy of the code on your local machine to begin working on your feature branch. If you are an authorized contributor to the repository, you will need to clone the code by running `git clone <location-of-remote-repository>`. Make sure that you are on the master branch (which doesn’t necessarily need to be named master) after cloning is complete. To verify your base commit is up to date and you are working with the latest code, run `git pull`. This will incorporate any commits that were merged to the repository after you cloned to your local.

## Step 2: Make a feature branch

Working on an isolated feature branch ensures that your code will not accidentally get merged into the master branch and can be reviewed independently of other developers’ work. To create a new branch, run `git checkout -b <name-of-branch>`. The name of the branch should be short but descriptive of the feature and should contain no spaces (dashes and underscores are OK).

## Step 3: Commit your changes and push

At this point you have worked on the feature, and you are ready to commit your code changes for review. Run `git status` to see the file paths that have differences between your local branch and the master branch. Run `git add -p` to review the changes one by one as a final check. This command will also stage the file.

Once all the necessary files are checked and staged, you can create the commit with `git commit -m ‘<Add commit message here>’`. Make concise, frequent commits to make the code easier to review. Repeat these steps as needed for each commit in your branch.

Lastly you need to push the changes to the remote repository. The first time you push commits to your new branch, git will prompt you to run something like `git push --set-upstream origin <name-of-branch>`. You will be able to simply run `git push` for each subsequent push.

## Step 4: Make a pull request

Your commits have been pushed to the repository, but you need to switch to your git version management system’s GUI in order to create a pull request. Pull requests are not a native git feature, so you can’t generate one in the command line. Refer to the application for specific steps on creating a pull request.

You can view the progress of your Probo build as it is being created within your pull request. Remember that each time you make a commit to your feature branch, a new Probo build will be generated, so you don’t need to create a brand new pull request each time you make a change.

## Troubleshooting: Rebasing your branch

One of the main purposes of git is to make sure your project history remains intact. However, there are instances when it needs to be amended. Some examples include:

- Your branch is changing a section of code that has already been changed and merged into master, creating a code conflict.
- An integral change (a bug fix, for example) impacting your feature branch was merged into master after you pulled in the latest code.
- You forgot to `git pull` before creating your branch, so the base commit of your branch was not the most recent when you started working on your feature.

The solution to these issues is **rebasing**, which redefines the base commit of your feature branch to match the latest commit in master. Follow these steps to rebase your branch:

- Checkout your master branch locally by running `git checkout master`.
- Run `git pull` to make sure you have the latest commit on your local master branch.
- Checkout your feature branch and run `git rebase master`. This will rewrite your branch’s history by comparing each of your branch’s commits, one by one, to the latest commit on master.
  - If the rebase finds a conflict between one of your branch’s commits and master, you will need to manually edit the file to resolve it.
  - Run `git rebase --continue` once you’ve resolved the conflict to continue the rebase process. If you run into another conflict, repeat these two steps.
- When the rebase is complete, run `git push --force` to confirm to git that you are sure you want to make this change.

Keep in mind that rebasing could affect your branch’s timeline, so this action should not be taken lightly. Make sure your branch and the master branch are both up to date before you rebase and push to the repository so you don’t risk losing commits.

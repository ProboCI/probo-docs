---
title: Update the Node Version
uid: update_node_version
---

The installed [Node.js](https://nodejs.org/) version in the [Probo Docker Image](https://docs.probo.ci/build/images/) you are using may differ from the Node.js version used for building your project dependencies. Update the node version in your Probo Build by using one of the following methods.

## Update Node.js Using NVM
[NVM](https://github.com/nvm-sh/nvm) is the Node Version Manager.

The example steps below will use NVM to update the Node.js version in your Probo Build to Node 12, which is the current LTS release.

{% highlight yaml%}
steps:
  - name: Update Node.js.
    plugin: Script
    script: |
      echo "Installing NVM...\n"
      curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
      [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
      echo "Updating Node version...\n"
      nvm install 12
      nvm use 12
{% endhighlight %}

## Update Node.js Using N

[N](https://github.com/tj/n) is a package available for Node version management.

The example steps below will use N to update the Node.js version in your Probo Build to the latest Node and install the latest NPM stable release. 

{% highlight yaml%}
steps:
  - name: Update Node.js.
    plugin: Script
    script: |
      npm install --global n
      n latest
  - name: Upgrade npm.
    command: 'npm install --global npm@latest'
{% endhighlight %}

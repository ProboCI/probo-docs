---
title: Using Probo and Jekyll
uid: jekyll_content_editorial_workflow.md
---
{% highlight yaml%}
steps:
  - name: Update system
    plugin: Script
    script:
      - gem uninstall bundler
      - apt-get update
  - name: Install Imagemagick
    plugin: Script
    script:
      - apt-get install -y software-properties-common imagemagick
      - apt-add-repository -y ppa:brightbox/ruby-ng
      - apt-get update
  - name: Install Ruby 2.2
    plugin: Script
    script:
      - apt-get install -y ruby2.2 ruby2.2-dev
      - update-alternatives --config ruby
      - gem install bundler
  - name: Install Jekyll Dependencies
    plugin: Script
    script:
      - cd $SRC_DIR
      - bundle install --path vendor/bundle
  - name: Build Jekyll site
    plugin: Script
    script:
      - locale-gen en_US.UTF-8
      - LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8 bundle exec jekyll build --destination=/var/www/html
{% endhighlight %}

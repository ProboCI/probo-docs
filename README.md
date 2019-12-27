[![Build Status](https://travis-ci.org/ProboCI/probo-docs.svg?branch=master)](https://travis-ci.org/ProboCI/probo-docs)

# Probo documentation

The docs live at https://docs.probo.ci.

## Contributing

Want to add to the docs? Have a fancy `.probo.yaml` file you want to show off? See something outdated that we missed? Contributing is as simple as opening a pull request with some changes.

### Contribute documentation

The docs are written in markdown format and live in the `docs` directory. To contribute:

1. Submit your changes in a pull request.
2. Add the **needs review** label.

That's it! We'll take care of wiring any new pages into the menu.

Need a markdown primer? Check out Adam Pritchard's [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

##### To use syntax highlighting with numbers use this format
 ```
 {% highlight ruby linenos %}
 def foo
   puts 'foo'
 end
 {% endhighlight %}
 ```

 ```
 {% highlight css linenos %}
 body {
   background: red;
 }
 {% endhighlight %}
 ```
##### To use syntax highlighting without numbers use this format:
 ```
 {% highlight yaml %}
 var cli = new ArgumentParser({
   prog:     'js-yaml',
   version:  require('../package.json').version,
   addHelp:  true
 });
 {% endhighlight %}
 ```

### Contribute your .probo.yaml configuration

You can share your `.probo.yaml` in just a few steps:

1. Create a markdown file in the `_examples` directory and paste in the following template.
 ```
 ---
 title:
 author:
 github:
 ---

 {% highlight yaml %}

  Your yaml goes here!

 {% endhighlight %}
 ```
2. Enter a title for your example. You can optionally add you or your organization's name as you would like it displayed and your GitHub username so we can link to your profile.
3. Paste the contents of your `.probo.yaml` file between the `highlight yaml` tags.
4. Submit a pull request and add the **needs review** label.

Thank you for your contribution!

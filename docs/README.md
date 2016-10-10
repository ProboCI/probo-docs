To add a new docs page to the sidebar, edit https://github.com/ProboCI/probo.ci/blob/master/_includes/sidebars/docs.html

To use syntax highlighting with numbers use this format
{% highlight ruby linenos%}
def foo
  puts 'foo'
end
{% endhighlight %}

{% highlight css linenos%}
body {
  background: red;
}
{% endhighlight %}

To use syntax highlighting without numbers use this format
{% highlight yaml%}
var cli = new ArgumentParser({
  prog:     'js-yaml',
  version:  require('../package.json').version,
  addHelp:  true
});
{% endhighlight %}
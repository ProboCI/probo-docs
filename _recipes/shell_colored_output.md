---
title: Colored log output
uid: shell_colored_output
---

You can include ANSI escape code colors (foreground and background) in your log output.
https://en.wikipedia.org/wiki/ANSI_escape_code#Colors

{% highlight yaml %}
steps:
  - name: Output colored text
    command: "echo '\x1B[1;30;42m Hello World! This will display in black text (30) on a green background (42).'"
{% endhighlight %}

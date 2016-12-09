Installation profiles combine Drupal core, contributed modules, pre-defined functionality and configuration for the purpose to quickly set up Drupal sites. You can read more about [Drupal Installation profiles on drupal.org](https://www.drupal.org/project/project_distribution
). A great example of an installation profile is Zivtech's [bear](https://www.drupal.org/project/bear) profile.

You can use the default Shell plugin or the Drupal plugin.

### Examples
**Shell Plugin**
{% highlight bash%}
steps:
  - name: Run the profile script
    command: './$SRC_DIR/.probo-profile-build.sh'
  - name: Run install
    command: "drush site-install --root=/var/www/html bear --db-url='mysqli://root:strongpassword@localhost/bear'"
  - name: Set file directory permissions
    command: 'chown -R www-data:www-data /var/www/html/sites/default/files'
  - name: Run behat tests
    command: 'cd /var/www/html/profiles/bear/tests ; composer install ; ./bin/behat --profile probo --tags "~@javascript"'
{% endhighlight %}



**Drupal Plugin**

Use the Drupal plugin to make it easy to define and declare build steps. The `installArgs` parameter defines any necessary arguments relating to the build. The Drupal plugin is using the makeFile and the drush command `drush site-install`. Look at the [Drush documentation](http://drushcommands.com/drush-7x/core/site-install/) for more about the site-install command. For more parameter options read more in the [docs about different parameter options](/plugins/drupal-plugin/). *Note for this option `drush site-install` will drop and rebuild all the tables in the database.

{% highlight bash%}
steps:
  - name: Probo site setup
    plugin: Drupal
    makeFile: build-bear.make
    installArgs: "--site-name='Install Profile Drupal Plugin Demo'"
    clearCaches: true
    profileName: bear
    runInstall: true
    revertFeatures: true

{% endhighlight %}

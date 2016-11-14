require 'rake-jekyll'

Rake::Jekyll::GitDeployTask.new(:deploy) to |t|
	t.author = -> {
		`git log -n 1 --format='%aN <%aE>'`.strip
	}
end
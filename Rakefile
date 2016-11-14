require 'rake-jekyll'

Rake::Jekyll::GitDeployTask.new(:deploy) do |t|
	t.author = -> {
		`git log -n 1 --format='%aN <%aE>'`.strip
	}
end
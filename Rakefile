# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

task :deploy, :remote do |t, args|
  sh 'git checkout ember-cli'
  sh 'git merge master -m "Merging master for deployment"'
  sh './build.sh'

  sh 'git add -A'
  sh 'git commit -m "Asset compilation for deployment"'

  sh "git push #{args[:remote]} head:master"
end

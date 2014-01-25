source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.0.beta1'

# Use sqlite3 as the database for Active Record
gem 'sqlite3'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0.rc1'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc',          group: :doc, require: false

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/jonleighton/spring
gem 'spring',        group: :development
gem "spring-commands-rspec", "~> 1.0.1", group: :developement

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.1.2'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
gem 'debugger', group: [:development, :test]

gem 'ember-appkit-rails', git: 'https://github.com/dockyard/ember-appkit-rails.git'

group :development, :test do
  gem "phantomjs", ">= 1.8.1.1" # this is optional if you install phantomjs manually (as of teaspoon 0.7.9)
  gem "teaspoon", git: "git@github.com:abuiles/teaspoon.git"
  gem "rspec-rails"
  gem "factory_girl_rails", "~> 4.0"
end

group :test do
  gem "minitest"
  gem 'shoulda-matchers', git: "https://github.com/thoughtbot/shoulda-matchers.git"
end

source 'https://rubygems.org'

ruby "2.0.0"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'
gem 'responders', '~> 2.0'

gem "pg", "~> 0.17.1", group: :production
gem 'sqlite3',         group: :development

gem 'rails_12factor', group: :production

gem 'sass-rails', '~> 4.0.0.rc1'

gem 'uglifier', '>= 1.3.0'

# Use jquery as the JavaScript library
gem 'jquery-rails'

gem 'sdoc',          group: :doc, require: false

gem "spring", "~> 1.0.0", group: :development
gem "spring-commands-rspec", "~> 1.0.1", group: :developement

gem 'debugger', group: [:development, :test]

group :development, :test do
  gem "phantomjs", ">= 1.8.1.1" # this is optional if you install phantomjs manually (as of teaspoon 0.7.9)
  gem "rspec-rails"
  gem "factory_girl_rails", "~> 4.0"
  gem "minitest"
  gem 'shoulda-matchers', git: "https://github.com/thoughtbot/shoulda-matchers.git"
end

gem "paranoia", "~> 2.0.2"
gem "devise", "~> 3.4.1"
gem 'active_model_serializers', '~> 0.8.1'
gem 'redis', '~> 3.1.0'
gem "devise_token_auth", "~> 0.1.31"

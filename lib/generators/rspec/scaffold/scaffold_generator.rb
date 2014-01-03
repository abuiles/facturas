require 'generators/rspec'
require 'rails/generators/resource_helpers'

module Rspec
  module Generators
    class ScaffoldGenerator < Base
      def generate_controller_spec
        return unless options[:controller_specs]

        template 'controller_spec.rb',
          File.join("spec/controllers/v#{::Rails.application.config.ember.api_version}", controller_class_path, "#{controller_file_name}_controller_spec.rb")
      end
    end
  end
end

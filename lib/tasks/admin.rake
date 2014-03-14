namespace :admin do
  desc "Create a daily report"
  task :collect_report => :environment do |t, args|
    Report.collect
  end
end

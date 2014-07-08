class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  private

  def index_html
    redis.get "#{deploy_key}:index.html"
  end

  def deploy_key
    params[:version] ||= 'release'
    case params[:version]
    when 'release' then 'release'
    when 'canary'  then  redis.lindex('releases', 0)
    else
      params[:version]
    end
  end

  def redis
    if Rails.env.development?
      redis = Redis.new()
    else
      Redis.new(:url => ENV['REDISTOGO_URL'])
    end
  end
end

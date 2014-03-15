class User < ActiveRecord::Base
  include Invitational::InvitedTo
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end

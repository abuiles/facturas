class User < ActiveRecord::Base
  include Invitational::InvitedTo

  has_one :account

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end

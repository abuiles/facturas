class Invitation < ActiveRecord::Base
  include ActiveModel::ForbiddenAttributesProtection
  include Invitational::InvitationCore

  belongs_to :user

end

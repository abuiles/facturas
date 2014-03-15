require 'invitational/cancan'

class Ability
  include CanCan::Ability
  include Invitational::CanCan::Ability

  attr_reader :role_mappings, :user

  def initialize(user)

    @role_mappings = {}
    @user = user

    # Example:
    # can :manage, Entity, roles: [:admin]

  end

end

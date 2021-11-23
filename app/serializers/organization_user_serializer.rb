class OrganizationUserSerializer < ActiveModel::Serializer
  attributes :id, :admin, :owner
  has_one :user
  has_one :organization
end

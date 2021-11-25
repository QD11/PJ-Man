class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :priority
  has_one :team
end

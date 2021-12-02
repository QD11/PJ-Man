class SectionProjectSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :project
end

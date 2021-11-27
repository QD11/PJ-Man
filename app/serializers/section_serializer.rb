class SectionSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :project_id
end

class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :priority, :completed
  has_many :sections, serializer: SectionSerializer
  # has_one :team
end

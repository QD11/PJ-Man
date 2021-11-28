class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :priority
  has_many :sections, serializer: SectionSerializer
  # has_one :team
end

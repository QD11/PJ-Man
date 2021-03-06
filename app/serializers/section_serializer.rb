class SectionSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :tasks, serializer: TaskSerializer
end

class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :completed
  has_one :section
end

class TaskSectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :completed, :section
  
  def section
    ::SectionProjectSerializer.new(object.section)
  end

end

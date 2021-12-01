class RecruitmentSerializer < ActiveModel::Serializer
  attributes :id, :code, :email, :joined
  has_one :team
end

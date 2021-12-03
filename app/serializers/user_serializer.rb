class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :profile_picture_thumbnail_url, :profile_picture_url, :cloudinary_public_id
end

class OrganizationsController < ApplicationController

    def organizations_specific_to_user
        user = User.find_by(id: params[:user_id])
        organizations = Organization.joins(:organization_users).where(organization_users: {user_id: user.id})
        render json: organizations
    end

    def create
        organization = Organization.create(name: params[:name], description: params[:description])
        orguser = OrganizationUser.create(user_id: params[:user_id], organization_id: organization.id, admin: true, owner: true)
        render json: organization
    end
end

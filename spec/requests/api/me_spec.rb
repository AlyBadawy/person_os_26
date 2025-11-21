require 'rails_helper'

RSpec.describe "Api::Mes", type: :request do
  let(:user) { create(:user, :confirmed) }

  before do
    sign_in(user, scope: :user)
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/me"
      expect(response).to have_http_status(:success)
    end
  end
end

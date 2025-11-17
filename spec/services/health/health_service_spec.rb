require 'rails_helper'

RSpec.describe Health::HealthService, type: :service do
  let(:user) { create(:user) }

  describe 'initialization' do
    it 'can be instantiated with a user' do
      svc = described_class.new(user)
      expect(svc).to be_a(described_class)
    end

    it 'stores the provided user' do
      svc = described_class.new(user)
      # Access the instance variable to ensure initialization set the user
      expect(svc.instance_variable_get(:@user)).to eq(user)
    end
  end
end

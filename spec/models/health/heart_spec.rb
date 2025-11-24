require 'rails_helper'

RSpec.describe Health::Heart, type: :model do
  describe 'factory' do
    it 'has a valid factory' do
      heart = build(:health_heart)
      expect(heart).to be_valid
    end
  end

  describe 'validations' do
    it 'validates presence of data' do
      heart = build(:health_heart, data: nil)
      expect(heart).not_to be_valid
      expect(heart.errors[:data]).to include("can't be blank")
    end

    it 'validates data is valid JSON object' do
      heart = build(:health_heart, data: 'not-a-json')
      expect(heart).not_to be_valid
      expect(heart.errors[:data]).to include("must be a valid JSON object")
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end
end

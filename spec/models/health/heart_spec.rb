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

    it 'validates bpm is a positive number' do
      heart = build(:health_heart, data: { "bpm" => -10 })
      expect(heart).not_to be_valid
      expect(heart.errors[:data]).to include("bpm must be a positive number")
    end

    it 'validates systolic and diastolic when provided' do
      heart = build(:health_heart, data: { "bpm" => 70, "systolic" => -120, "diastolic" => 80 })
      expect(heart).not_to be_valid
      expect(heart.errors[:data]).to include("systolic must be a positive number when diastolic is provided")

      heart = build(:health_heart, data: { "bpm" => 70, "systolic" => 120, "diastolic" => -80 })
      expect(heart).not_to be_valid
      expect(heart.errors[:data]).to include("diastolic must be a positive number when systolic is provided")
    end

    it 'validates systolic is greater than diastolic' do
      heart = build(:health_heart, data: { "bpm" => 70, "systolic" => 80, "diastolic" => 90 })
      expect(heart).not_to be_valid
      expect(heart.errors[:data]).to include("systolic must be greater than diastolic")
    end

    it 'is valid with correct data' do
      heart = build(:health_heart, data: { "bpm" => 70, "systolic" => 120, "diastolic" => 80 })
      expect(heart).to be_valid
    end

    it 'is valid with only bpm' do
      heart = build(:health_heart, data: { "bpm" => 70 })
      expect(heart).to be_valid
    end

    it 'is invalid with bpm and only systolic' do
      heart = build(:health_heart, data: { "bpm" => 70, "systolic" => 120 })
      expect(heart).not_to be_valid
    end

    it 'is invalid with bpm and only diastolic' do
      heart = build(:health_heart, data: { "bpm" => 70, "diastolic" => 80 })
      expect(heart).not_to be_valid
    end

    it 'is invalid with non-numeric bpm' do
      heart = build(:health_heart, data: { "bpm" => "seventy" })
      expect(heart).not_to be_valid
    end

    it 'is invalid with non-numeric systolic/diastolic' do
      heart = build(:health_heart, data: { "bpm" => 70, "systolic" => "one-twenty", "diastolic" => "eighty" })
      expect(heart).not_to be_valid
    end

    it 'is valid without bpm but with systolic/diastolic' do
      heart = build(:health_heart, data: { "systolic" => 120, "diastolic" => 80 })
      expect(heart).to be_valid
    end

    it 'is invalid without bpm and without systolic/diastolic' do
      heart = build(:health_heart, data: { bpm: nil, systolic: nil, diastolic: nil })
      expect(heart).not_to be_valid
      expect(heart.errors[:data]).to include("must contain at least bpm or both systolic and diastolic")
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end
end

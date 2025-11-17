require 'rails_helper'

RSpec.describe Health::BodyMeasurement, type: :model do
  describe 'factory' do
    it 'has a valid factory' do
      measurement = build(:health_body_measurement, topic: HealthMeasurementsTopics.all.sample)
      expect(measurement).to be_valid
    end
  end

  describe 'validations' do
    it 'validates presence of data' do
      measurement = build(:health_body_measurement, data: nil, topic: HealthMeasurementsTopics.all.sample)
      expect(measurement).not_to be_valid
      expect(measurement.errors[:data]).to include("can't be blank")
    end

    it 'validates presence of topic' do
      measurement = build(:health_body_measurement, topic: nil)
      expect(measurement).not_to be_valid
      expect(measurement.errors[:topic]).to include("can't be blank")
    end

    it 'validates data is valid JSON object' do
      measurement = build(:health_body_measurement, data: 'not-a-json', topic: HealthMeasurementsTopics.all.sample)
      expect(measurement).not_to be_valid
      expect(measurement.errors[:data]).to include("must be a valid JSON object")
    end

    it 'validates topic is valid' do
      measurement = build(:health_body_measurement, topic: 'invalid-topic')
      expect(measurement).not_to be_valid
      expect(measurement.errors[:topic]).to include("must be a valid topic")
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end
end

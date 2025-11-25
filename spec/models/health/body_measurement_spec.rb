require 'rails_helper'

RSpec.describe Health::BodyMeasurement, type: :model do
  describe 'factory' do
    it 'has a valid factory' do
      measurement = build(:health_body_measurement, topic: HealthMeasurementsTopics.oxygen_saturation)
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

    context 'when weight measurements' do
      it 'validates weight data structure' do
        measurement = build(:health_body_measurement, topic: HealthMeasurementsTopics.weight, data: { "wrong_key" => 123 })
        expect(measurement).not_to be_valid
        expect(measurement.errors[:data]).to include("must include 'value_in_grams' as a positive numeric field for weight measurements")
      end
    end

    context 'when heart rate measurements' do
      it 'validates heart rate data structure' do
        measurement = build(:health_body_measurement, topic: HealthMeasurementsTopics.heart_rate, data: { "wrong_key" => 80 })
        expect(measurement).not_to be_valid
        expect(measurement.errors[:data]).to include("must include 'value' as a positive numeric field for heart rate measurements")
      end
    end
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe '#converted_data' do
    it 'returns weight in kilograms when stored in grams' do
      measurement = create(
        :health_body_measurement,
        topic: HealthMeasurementsTopics.weight,
        data: { original_unit: "grams", original_value: 5000, value_in_grams: 5000 } # 5 kg
      )
      expect(measurement.converted_data).to include(value_in_kilograms: 5.0)
    end

    it 'returns data unchanged for non-weight measurements' do
      measurement = create(
        :health_body_measurement,
        topic: HealthMeasurementsTopics.temperature,
        data: { "value" => 75 }
      )
      expect(measurement.converted_data).to eq({ "value" => 75 })
    end
  end
end

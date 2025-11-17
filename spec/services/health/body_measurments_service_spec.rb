require 'rails_helper'

RSpec.describe Health::BodyMeasurmentsService, type: :service do
  let(:user) { create(:user) }
  let(:service) { described_class.new(user) }

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

  describe '#record_body_measurement' do
    context 'when topic is weight' do
      it 'creates a measurement with normalized weight data' do
        result = service.record_body_measurement(HealthMeasurementsTopics.weight, 2.5, WeightUnits.kilograms)

        expect(result).to be_persisted
        expect(result.topic).to eq(HealthMeasurementsTopics.weight)
        expect(result.data).to include(
          'original_unit' => WeightUnits.kilograms,
          'original_value' => 2.5
        )
        expect(result.data['value_in_grams']).to be_within(0.1).of(2500.0)
      end

      it 'raises when value is not numeric' do
        expect {
          service.record_body_measurement(HealthMeasurementsTopics.weight, 'not-a-number', WeightUnits.kilograms)
        }.to raise_error(ArgumentError, /Weight value must be numeric/)
      end

      it 'raises when unit is invalid' do
        expect {
          service.record_body_measurement(HealthMeasurementsTopics.weight, 100, 'invalid_unit')
        }.to raise_error(ArgumentError, /Unit must be a valid WeightUnit/)
      end
    end

    context 'when topic is heart_rate' do
      it 'creates a heart rate measurement with numeric value' do
        m = service.record_body_measurement(HealthMeasurementsTopics.heart_rate, 72)

        expect(m).to be_persisted
        expect(m.topic).to eq(HealthMeasurementsTopics.heart_rate)
        expect(m.data).to include('value' => 72)
      end

      it 'raises when heart rate value is not numeric' do
        expect { service.record_body_measurement(HealthMeasurementsTopics.heart_rate, 'fast') }
          .to raise_error(ArgumentError, /Heart rate value must be numeric/)
      end
    end

    context 'when topic is not implemented' do
      it 'raises for not implemented topic' do
        expect { service.record_body_measurement(HealthMeasurementsTopics.blood_pressure, 120) }
          .to raise_error(ArgumentError, /Normalization not implemented for topic/)
      end
    end

    it 'raises for unknown topic' do
      expect { service.record_body_measurement('unknown_topic', 1) }
        .to raise_error(ArgumentError, /Invalid measurement topic/)
    end
  end

  describe '#get_body_measurements' do
    before do
      # create several measurements with different topics and times
      service.record_body_measurement(HealthMeasurementsTopics.weight, 1.0, WeightUnits.kilograms, 3.days.ago)
      service.record_body_measurement(HealthMeasurementsTopics.heart_rate, 60, nil, 2.days.ago)
      service.record_body_measurement(HealthMeasurementsTopics.weight, 2.0, WeightUnits.kilograms, 1.day.ago)
    end

    it 'raises for invalid topic filter' do
      expect { service.get_body_measurements(topic: 'invalid_topic') }
        .to raise_error(ArgumentError, /Invalid measurement topic/)
    end

    it 'returns measurements filtered by topic' do
      results = service.get_body_measurements(topic: HealthMeasurementsTopics.weight)
      expect(results.count).to eq(2)
      expect(results.pluck(:topic).uniq).to eq([HealthMeasurementsTopics.weight])
    end

    it 'returns measurements within date range' do
      start_date = 2.days.ago.to_date
      end_date = Time.current.to_date
      results = service.get_body_measurements(start_date: start_date, end_date: end_date)
      # Should include the measurements from 2 days ago and 1 day ago (not the 3 days ago)
      expect(results).to all(satisfy { |r| r.measurred_at.to_date >= start_date && r.measurred_at.to_date <= end_date })
    end

    it 'orders measurements by measurred_at desc' do
      results = service.get_body_measurements
      expect(results.first.measurred_at).to be >= results.last.measurred_at
    end
  end
end

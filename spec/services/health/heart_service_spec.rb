require 'rails_helper'

RSpec.describe Health::HeartService, type: :service do
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

  describe '#record_heart_data' do
    it 'creates a heart measurement with provided data' do
      result = service.record_heart_data(70, 120, 80)

      expect(result).to be_persisted
      expect(result.data).to include(
        "bpm" => 70,
        "systolic" => 120,
        "diastolic" => 80
      )
    end

    it 'raises when bpm is not numeric' do
      expect {
        service.record_heart_data('fast', 120, 80)
      }.to raise_error(ActiveRecord::RecordInvalid, /bpm must be a positive number/)
    end

    it 'raises when systolic is not numeric' do
      expect {
        service.record_heart_data(70, 'high', 80)
      }.to raise_error(ActiveRecord::RecordInvalid, /systolic must be a positive number/)
    end

    it 'raises when diastolic is not numeric' do
      expect {
        service.record_heart_data(70, 120, 'low')
      }.to raise_error(ActiveRecord::RecordInvalid, /diastolic must be a positive number/)
    end
  end

  describe '#get_heart_measurements' do
    before do
      @m1 = service.record_heart_data(70, 120, 80, 3.days.ago)
      @m2 = service.record_heart_data(75, 125, 85, 2.days.ago)
      @m3 = service.record_heart_data(72, 118, 78, 1.day.ago)
    end

    it 'retrieves all heart measurements ordered by measured_at desc' do
      results = service.get_heart_measurements

      expect(results).to eq([@m3, @m2, @m1])
    end

    it 'filters measurements by start_date' do
      results = service.get_heart_measurements(start_date: 2.days.ago)

      expect(results).to eq([@m3, @m2])
    end

    it 'filters measurements by end_date' do
      results = service.get_heart_measurements(end_date: 2.days.ago)

      expect(results).to eq([@m2, @m1])
    end
  end

  describe '#get_heart_measurement_by_id' do
    let!(:measurement) { service.record_heart_data(70, 120, 80) }

    it 'retrieves the heart measurement by id' do
      result = service.get_heart_measurement_by_id(measurement.id)
      expect(result).to eq(measurement)
    end

    it 'raises when measurement id does not exist' do
      expect {
        service.get_heart_measurement_by_id(0)
      }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end



  describe '#update_heart_measurement_by_id' do
    let!(:measurement) { service.record_heart_data(70, 120, 80) }

    it 'updates the heart measurement data' do
      updated = service.update_heart_measurement_by_id(
        measurement.id,
        bpm: 75,
        systolic: 125,
        diastolic: 85
      )

      expect(updated.data).to include(
        "bpm" => 75,
        "systolic" => 125,
        "diastolic" => 85
      )
    end

    it 'updates only provided fields' do
      updated = service.update_heart_measurement_by_id(
        measurement.id,
        systolic: 160
      )

      expect(updated.data).to include(
        "bpm" => 70,
        "systolic" => 160,
        "diastolic" => 80
      )
    end

    it 'updates measured_at if provided' do
      new_time = 1.day.ago
      updated = service.update_heart_measurement_by_id(
        measurement.id,
        measured_at: new_time
      )

      expect(updated.measured_at.to_i).to eq(new_time.to_i)
    end

    it 'raises when updating non-numeric bpm' do
      expect {
        service.update_heart_measurement_by_id(measurement.id, bpm: 'fast')
      }.to raise_error(ActiveRecord::RecordInvalid, /bpm must be a positive number/)
    end
  end
end

class Health::HeartService
  def initialize(user)
    @user = user
  end

  def record_heart_data(bpm, systolic, diastolic, measured_at = Time.current)
    @user.health_heart_measurements.create!(
      measured_at: measured_at,
      data: {
      bpm: bpm,
      systolic: systolic,
      diastolic: diastolic,
    }
    )
  end

  def get_heart_measurements(start_date: nil, end_date: nil)
    measurements = @user.health_heart_measurements
    measurements = measurements.where(measured_at: start_date.beginning_of_day..) if start_date.present?
    measurements = measurements.where(measured_at: ..end_date.end_of_day) if end_date.present?
    measurements.order(measured_at: :desc)
  end

  def get_heart_measurement_by_id(id)
    @user.health_heart_measurements.find(id)
  end

  def update_heart_measurement_by_id(id, bpm: nil, systolic: nil, diastolic: nil, measured_at: nil)
    measurement = get_heart_measurement_by_id(id)
    update_attrs = {}
    new_data = measurement.data.dup
    new_data[:bpm] = bpm unless bpm.nil?
    new_data[:systolic] = systolic unless systolic.nil?
    new_data[:diastolic] = diastolic unless diastolic.nil?
    update_attrs[:data] = new_data
    update_attrs[:measured_at] = measured_at if measured_at.present?
    measurement.update!(update_attrs)
    measurement.reload
  end
end

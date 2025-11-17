module Health
  class BodyMeasurementsService
    def initialize(user)
      @user = user
    end

    def record_body_measurement(topic, value, unit = nil, measured_at = Time.current)
      validate_topic(topic)
      new_data = normalize_body_measurement_data(topic, value, unit)
      @user.health_body_measurements.create!(
        topic: topic,
        data: new_data,
        measured_at: measured_at
      )
    end

    def get_body_measurements(topic: nil, start_date: nil, end_date: nil)
      if topic.present? && HealthMeasurementsTopics.all.exclude?(topic.to_s)
        raise ArgumentError, "Invalid measurement topic: #{topic}"
      end

      measurements = @user.health_body_measurements
      measurements = measurements.where(topic: topic) if topic.present?
      measurements = measurements.where(measured_at: start_date.beginning_of_day..) if start_date.present?
      measurements = measurements.where(measured_at: ..end_date.end_of_day) if end_date.present?
      measurements.order(measured_at: :desc)
    end

    private

    def validate_topic(topic)
      allowed_topics = HealthMeasurementsTopics.all
      unless allowed_topics.include?(topic.to_s)
        raise ArgumentError, "Invalid measurement topic: #{topic}"
      end
    end

    def normalize_body_measurement_data(topic, value, unit)
      case topic
      when HealthMeasurementsTopics::WEIGHT
        normalize_weight(value, unit)
      when HealthMeasurementsTopics::HEART_RATE
        normalize_heart_rate(value)
      else
        raise ArgumentError, "Normalization not implemented for topic: #{topic}"
      end
    end

    def normalize_weight(value, unit)
      unless value.is_a?(Numeric)
        raise ArgumentError, "Weight value must be numeric"
      end
      unless unit.present? && WeightUnits.all.include?(unit)
        raise ArgumentError, "Unit must be a valid WeightUnit"
      end
      normalized_value = WeightConverter.convert_value(value, unit, WeightUnits.grams)
      {
        original_unit: unit,
        original_value: value,
        value_in_grams: normalized_value,
      }
    end

    def normalize_heart_rate(value)
      unless value.is_a?(Numeric)
        raise ArgumentError, "Heart rate value must be numeric"
      end
      { value: value }
    end
  end
end

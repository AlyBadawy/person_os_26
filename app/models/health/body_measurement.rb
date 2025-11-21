class Health::BodyMeasurement < ApplicationRecord
  belongs_to :user

  validates :data, presence: true
  validates :topic, presence: true

  validate :data_must_be_valid_json
  validate :topic_must_be_valid
  validate :body_measurement_data_validations

  def converted_data
    case topic
    when HealthMeasurementsTopics::WEIGHT
      {
        value_in_grams: data["value_in_grams"].round(2),
        value_in_kilograms: (data["value_in_grams"] / 1000.0).round(2),
        value_in_pounds: (data["value_in_grams"] / 453.59237).round(2),
        value_in_stones: (data["value_in_grams"] / 6350.29318).round(2),
        original_unit: data["original_unit"],
        original_value: data["original_value"],
      }
    when HealthMeasurementsTopics::HEART_RATE
      {
        value: data["value"],
        unit: "bpm",
      }
    else
      data
    end
  end

  private

  def data_must_be_valid_json
    return if data.blank? # handled by presence validation

    unless data.is_a?(Hash)
      errors.add(:data, "must be a valid JSON object")
    end
  end

  def topic_must_be_valid
    return if topic.blank? # handled by presence validation

    unless HealthMeasurementsTopics.all.include?(topic)
      errors.add(:topic, "must be a valid topic")
    end
  end

  def body_measurement_data_validations
    case topic
    when HealthMeasurementsTopics::WEIGHT
      validate_weight_data
    when HealthMeasurementsTopics::HEART_RATE
      validate_heart_rate_data
    else
      # No additional validations for other topics yet
    end
  end

  def validate_weight_data
    unless data.is_a?(Hash) && data["value_in_grams"].is_a?(Numeric) && data["value_in_grams"] > 0
      errors.add(:data, "must include 'value_in_grams' as a positive numeric field for weight measurements")
    end
  end

  def validate_heart_rate_data
    unless data.is_a?(Hash) && data["value"].is_a?(Numeric) && data["value"] > 0
      errors.add(:data, "must include 'value' as a positive numeric field for heart rate measurements")
    end
  end
end

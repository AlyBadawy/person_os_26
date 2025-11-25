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
        original_unit: data["original_unit"],
        original_value: data["original_value"],
        value_in_grams: WeightConverter.convert_value(data["value_in_grams"], data["original_unit"], WeightUnits.grams).round(2),
        value_in_kilograms: WeightConverter.convert_value(data["original_value"], data["original_unit"], WeightUnits.kilograms),
        value_in_pounds: WeightConverter.convert_value(data["original_value"], data["original_unit"], WeightUnits.pounds),
        value_in_stones: WeightConverter.convert_value(data["original_value"], data["original_unit"], WeightUnits.stones),
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
    unless data.is_a?(Hash) && data["original_unit"].is_a?(String) && WeightUnits.all.include?(data["original_unit"])
      errors.add(:data, "must include 'original_unit' as a non-empty string for weight measurements")
    end
    unless data.is_a?(Hash) && data["original_value"].is_a?(Numeric) && data["original_value"] > 0
      errors.add(:data, "must include 'original_value' as a positive numeric field for weight measurements")
    end
  end

  def validate_heart_rate_data
    unless data.is_a?(Hash) && data["value"].is_a?(Numeric) && data["value"] > 0
      errors.add(:data, "must include 'value' as a positive numeric field for heart rate measurements")
    end
  end
end

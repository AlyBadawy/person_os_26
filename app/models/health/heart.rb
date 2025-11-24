class Health::Heart < ApplicationRecord
  belongs_to :user

  validates :data, presence: true

  validate :data_must_be_valid_json
  validate :heart_data_validations

  private

  def data_must_be_valid_json
    return if data.blank? # handled by presence validation

    unless data.is_a?(Hash)
      errors.add(:data, "must be a valid JSON object")
    end
  end

  def heart_data_validations
    return if data.blank? || !data.is_a?(Hash)


    if data["bpm"].present? && (!data["bpm"].is_a?(Numeric) || data["bpm"] <= 0)
      errors.add(:data, "bpm must be a positive number")
    end

    unless data["systolic"].nil? && data["diastolic"].nil?
      if data["systolic"].nil? || !data["systolic"].is_a?(Numeric) || data["systolic"] <= 0
        errors.add(:data, "systolic must be a positive number when diastolic is provided")
      end

      if data["diastolic"].nil? || !data["diastolic"].is_a?(Numeric) || data["diastolic"] <= 0
        errors.add(:data, "diastolic must be a positive number when systolic is provided")
      end

      if data["systolic"].present? && data["diastolic"].present? && data["systolic"].is_a?(Numeric) && data["diastolic"].is_a?(Numeric) && data["systolic"] <= data["diastolic"]
        errors.add(:data, "systolic must be greater than diastolic")
      end
    end

    unless data["bpm"].present? || data["systolic"].present? || data["diastolic"].present?
      errors.add(:data, "must contain at least bpm or both systolic and diastolic")
    end
  end
end

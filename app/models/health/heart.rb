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
    # Add custom validations for heart data here
  end
end

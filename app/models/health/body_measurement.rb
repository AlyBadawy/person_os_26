class Health::BodyMeasurement < ApplicationRecord
  belongs_to :user

  validates :data, presence: true
  validates :topic, presence: true

  validate :data_must_be_valid_json
  validate :topis_must_be_valid

  private

  def data_must_be_valid_json
    unless data.is_a?(Hash)
      errors.add(:data, "must be a valid JSON object")
    end
  end

  def topis_must_be_valid
    unless HealthMeasurementsTopics.all.include?(topic)
      errors.add(:topic, "must be a valid topic")
    end
  end
end

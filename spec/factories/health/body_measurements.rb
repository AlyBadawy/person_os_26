FactoryBot.define do
  factory :health_body_measurement, class: 'Health::BodyMeasurement' do
    user
    topic { HealthMeasurementsTopics.all.sample }
    measured_at { Time.current }
    data { { value: 70 } }
  end
end

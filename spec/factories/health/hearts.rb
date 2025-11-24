FactoryBot.define do
  factory :health_heart, class: 'Health::Heart' do
    user
    measured_at { Time.current }
    data { { bpm: 70, Systolic: 120, Diastolic: 80 } }
  end
end

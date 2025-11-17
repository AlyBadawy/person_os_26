FactoryBot.define do
factory :user do
    password { "Password123!" }
    password_confirmation { password }
    sequence(:email) { |n| Faker::Internet.unique.email(name: "user#{n}") }

    # Useful traits
    trait :confirmed do
      confirmed_at { Time.current }
    end

    trait :locked do
      failed_attempts { 10 }
      locked_at { Time.current }
    end

    trait :with_reset_token do
      reset_password_token { Devise.token_generator.generate(User, :reset_password_token).first }
      reset_password_sent_at { Time.current }
    end
  end
end

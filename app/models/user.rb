class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable,
         :lockable,
         :trackable

  has_many :health_body_measurements, class_name: "Health::BodyMeasurement", dependent: :destroy

  has_many :health_hearts, class_name: "Health::Heart", dependent: :destroy
end

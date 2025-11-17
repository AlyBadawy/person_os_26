module HealthMeasurementsTopics
  BLOOD_PRESSURE = "blood_pressure"
  BLOOD_GLUCOSE = "blood_glucose"
  WEIGHT = "weight"
  HEART_RATE = "heart_rate"
  TEMPERATURE = "temperature"
  OXYGEN_SATURATION = "oxygen_saturation"

  class << self
    def blood_pressure; BLOOD_PRESSURE end
    def blood_glucose; BLOOD_GLUCOSE end
    def weight; WEIGHT end
    def heart_rate; HEART_RATE end
    def temperature; TEMPERATURE end
    def oxygen_saturation; OXYGEN_SATURATION end

    def all
      [
        BLOOD_PRESSURE,
        BLOOD_GLUCOSE,
        WEIGHT,
        HEART_RATE,
        TEMPERATURE,
        OXYGEN_SATURATION
      ]
    end
  end
end

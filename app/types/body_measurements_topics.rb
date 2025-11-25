module BodyMeasurementsTopics
  WEIGHT = "weight"
  BODY_MASS = "body_mass"
  HEIGHT = "height"


  class << self
    def weight; WEIGHT end
    def body_mass; BODY_MASS end
    def height; HEIGHT end

    def all
      [
        BODY_MASS,
        HEIGHT,
        WEIGHT
      ]
    end
  end
end

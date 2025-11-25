json.array! @measurements do |m|
  json.partial! "api/health/heart_measurements/measurement", m: m
end

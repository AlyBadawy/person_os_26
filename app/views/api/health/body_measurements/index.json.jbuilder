json.array! @measurements do |m|
  json.partial! "api/health/body_measurements/measurement", m: m
end

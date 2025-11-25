require 'rails_helper'

RSpec.describe "Api::Health::BodyMeasurements", type: :request do
  let(:user) { create(:user, :confirmed) }

  before { sign_in(user) }

  describe 'GET /api/health/body_measurements' do
    context 'without filters' do
      before do
        svc = Health::BodyMeasurementsService.new(user)
        svc.record_body_measurement(HealthMeasurementsTopics.weight, 1.0, WeightUnits.kilograms, 3.days.ago)
        svc.record_body_measurement(HealthMeasurementsTopics.height, 70, nil, 2.days.ago)
      end

      it 'returns measurements for the current user as JSON array' do
        get '/api/health/body_measurements'

        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body).to be_an(Array)
        expect(body.size).to eq(2)
        expect(body.first).to include('id', 'topic', 'data')
      end
    end

    context 'with topic filter' do
      before do
        svc = Health::BodyMeasurementsService.new(user)
        svc.record_body_measurement(HealthMeasurementsTopics.weight, 2.0, WeightUnits.kilograms)
        svc.record_body_measurement(HealthMeasurementsTopics.height, 65)
      end

      it 'returns only measurements for given topic' do
        get '/api/health/body_measurements', params: { topic: HealthMeasurementsTopics.weight }

        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body).to all(include('topic' => HealthMeasurementsTopics.weight))
      end
    end

    context 'when invalid topic param given' do
      it 'returns 400 with error message' do
        get '/api/health/body_measurements', params: { topic: 'not_a_topic' }

        expect(response).to have_http_status(:bad_request)
        body = JSON.parse(response.body)
        expect(body).to include('error')
      end
    end

    context 'with date range filters' do
      before do
        svc = Health::BodyMeasurementsService.new(user)
        svc.record_body_measurement(HealthMeasurementsTopics.weight, 1.0, WeightUnits.kilograms, 5.days.ago)
        svc.record_body_measurement(HealthMeasurementsTopics.weight, 2.0, WeightUnits.kilograms, 3.days.ago)
        svc.record_body_measurement(HealthMeasurementsTopics.weight, 3.0, WeightUnits.kilograms, 1.day.ago)
      end

      it 'returns only measurements within the date range' do
        get '/api/health/body_measurements', params: { start_date: 4.days.ago.to_date.to_s, end_date: 2.days.ago.to_date.to_s }

        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body.size).to eq(1)
        expect(Date.parse(body.first['measuredAt'])).to be >= 4.days.ago.to_date
        expect(Date.parse(body.first['measuredAt'])).to be <= 2.days.ago.to_date
      end

      context 'with invalid date range filters' do
        it 'ignores invalid start_date and end_date params' do
          get '/api/health/body_measurements', params: { start_date: 'invalid-date', end_date: 'another-bad-date' }

          expect(response).to have_http_status(:ok)
          body = JSON.parse(response.body)
          expect(body.size).to eq(3) # all measurements returned
        end
      end
    end
  end

  describe 'GET /api/health/body_measurements/:id' do
    let(:measurement) do
      svc = Health::BodyMeasurementsService.new(user)
      svc.record_body_measurement(HealthMeasurementsTopics.weight, 1.0, WeightUnits.kilograms)
    end

    it 'returns the specific measurement as JSON' do
      get "/api/health/body_measurements/#{measurement.id}"

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body).to include('id' => measurement.id, 'topic' => measurement.topic)
    end
  end

  describe 'POST /api/health/body_measurements' do
    it 'creates a weight measurement' do
      params = { topic: HealthMeasurementsTopics.weight, value: 2.5, unit: WeightUnits.kilograms }

      post '/api/health/body_measurements', params: params

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body).to include('id', 'topic', 'data')
      expect(body['topic']).to eq(HealthMeasurementsTopics.weight)
      expect(body['data']).to include('valueInGrams')
    end

    it 'returns 422 for invalid topic' do
      post '/api/health/body_measurements', params: { topic: 'not_a_topic', value: 1 }

      expect(response).to have_http_status(:unprocessable_content)
      body = JSON.parse(response.body)
      expect(body).to include('error')
    end

    it 'returns 422 for invalid data' do
      post '/api/health/body_measurements', params: { topic: HealthMeasurementsTopics.weight, value: 'not_a_number', unit: WeightUnits.kilograms }

      expect(response).to have_http_status(:unprocessable_content)
      body = JSON.parse(response.body)
      expect(body).to include('error')
    end

    it 'rescues from record invalid error' do
      post '/api/health/body_measurements', params: { topic: HealthMeasurementsTopics.weight, value: -5, unit: WeightUnits.kilograms }

      expect(response).to have_http_status(:unprocessable_content)
      body = JSON.parse(response.body)
      expect(body).to include('error')
    end
  end

  describe 'PATCH /api/health/body_measurements/:id' do
    let(:measurement) do
      svc = Health::BodyMeasurementsService.new(user)
      svc.record_body_measurement(HealthMeasurementsTopics.weight, 1.0, WeightUnits.kilograms)
    end

    it 'updates measured_at and data' do
      new_time = 2.days.ago.iso8601
      new_data = { value: 100, unit: WeightUnits.kilograms }

      patch "/api/health/body_measurements/#{measurement.id}", params: { measured_at: new_time, data: new_data }

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      # middleware transforms keys to camelCase for JSON responses
      measured_key = body.key?('measuredAt') ? 'measuredAt' : 'measured_at'
      expect(Time.parse(body[measured_key]).iso8601).to start_with(Time.parse(new_time).iso8601[0..18])
    end

    it 'returns 404 for unknown id' do
      patch "/api/health/body_measurements/#{SecureRandom.uuid}", params: { data: { foo: 'bar' } }
      expect(response).to have_http_status(:not_found)
    end

    it 'returns 422 for invalid data' do
      patch "/api/health/body_measurements/#{measurement.id}", params: { topic: HealthMeasurementsTopics.weight, value: 'not_a_number', unit: WeightUnits.kilograms }

      expect(response).to have_http_status(:unprocessable_content)
      body = JSON.parse(response.body)
      expect(body).to include('error')
    end
  end

  describe 'DELETE /api/health/body_measurements/:id' do
    let(:measurement) do
      svc = Health::BodyMeasurementsService.new(user)
      svc.record_body_measurement(HealthMeasurementsTopics.height, 60)
    end

    it 'deletes the measurement' do
      delete "/api/health/body_measurements/#{measurement.id}"

      expect(response).to have_http_status(:no_content)

      get "/api/health/body_measurements/#{measurement.id}"
      expect(response).to have_http_status(:not_found)
    end

    it 'returns 404 for unknown id' do
      delete "/api/health/body_measurements/#{SecureRandom.uuid}"
      expect(response).to have_http_status(:not_found)
    end
  end
end

require 'rails_helper'

RSpec.describe "Api::Health::HeartMeasurements", type: :request do
  let(:user) { create(:user, :confirmed) }

  before { sign_in(user) }

  describe 'GET /api/health/heart_measurements' do
    context 'without filters' do
      before do
        svc = Health::HeartService.new(user)
        svc.record_heart_data(70, 120, 80, 3.days.ago)
        svc.record_heart_data(75, 115, 75, 2.days.ago)
      end

      it 'returns measurements for the current user as JSON array' do
        get '/api/health/heart_measurements'

        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body).to be_an(Array)
        expect(body.size).to eq(2)
        expect(body.first).to include('id', 'data', 'measuredAt')
      end
    end

    context 'with date range filters' do
      before do
        svc = Health::HeartService.new(user)
        svc.record_heart_data(70, 120, 80, 5.days.ago)
        svc.record_heart_data(75, 115, 75, 3.days.ago)
        svc.record_heart_data(80, 110, 70, 1.day.ago)
      end

      it 'returns only measurements within the date range' do
        get '/api/health/heart_measurements', params: { start_date: 4.days.ago.to_date.to_s, end_date: 2.days.ago.to_date.to_s }
        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body.size).to eq(1)
        expect(Date.parse(body.first['measuredAt'])).to be >= 4.days.ago.to_date
        expect(Date.parse(body.first['measuredAt'])).to be <= 2.days.ago.to_date
      end

      context 'with invalid date range filters' do
        it 'ignores invalid start_date and end_date params' do
          get '/api/health/heart_measurements', params: { start_date: 'invalid-date', end_date: 'another-bad-date' }

          expect(response).to have_http_status(:ok)
          body = JSON.parse(response.body)
          expect(body.size).to eq(3) # all measurements returned
        end
      end
    end
  end

  describe 'GET /api/health/heart_measurements/:id' do
    let(:measurement) do
      svc = Health::HeartService.new(user)
      svc.record_heart_data(70, 120, 80, 5.days.ago)
    end

    it 'returns the specific measurement as JSON' do
      get "/api/health/heart_measurements/#{measurement.id}"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body).to include('id' => measurement.id, 'data' => measurement.data)
    end

    it 'returns 404 for unknown id' do
      get "/api/health/heart_measurements/#{SecureRandom.uuid}"
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'POST /api/health/heart_measurements' do
    it 'creates a heart measurement' do
      params = { bpm: 72, systolic: 118, diastolic: 78 }

      post '/api/health/heart_measurements', params: params

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body).to include('id', 'data', 'measuredAt')
      expect(body['data']['bpm']).to eq(72)
      expect(body['data']['systolic']).to eq(118)
      expect(body['data']['diastolic']).to eq(78)
    end

    it 'returns 422 for invalid data' do
      post '/api/health/heart_measurements', params: { bpm: 'not_a_number', systolic: 118, diastolic: 78 }

      expect(response).to have_http_status(:unprocessable_content)
      body = JSON.parse(response.body)
      expect(body).to include('error')
    end

    it 'rescues from record invalid error' do
      post '/api/health/heart_measurements', params: { bpm: -5, systolic: 118, diastolic: 78 }

      expect(response).to have_http_status(:unprocessable_content)
      body = JSON.parse(response.body)
      expect(body).to include('error')
    end
  end

  describe 'PATCH /api/health/heart_measurements/:id' do
    let(:measurement) do
      svc = Health::HeartService.new(user)
      svc.record_heart_data(70, 120, 80, 5.days.ago)
    end

    it 'updates measured_at and data' do
      new_time = 2.days.ago.iso8601
      new_data = { bpm: 100 }

      patch "/api/health/heart_measurements/#{measurement.id}", params: { measured_at: new_time, data: new_data }

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      # middleware transforms keys to camelCase for JSON responses
      measured_key = body.key?('measuredAt') ? 'measuredAt' : 'measured_at'
      expect(Time.parse(body[measured_key]).iso8601).to start_with(Time.parse(new_time).iso8601[0..18])
    end

    it 'returns 404 for unknown id' do
      patch "/api/health/heart_measurements/#{SecureRandom.uuid}", params: { measurement: { foo: 'bar' } }
      expect(response).to have_http_status(:not_found)
    end

    it 'returns 422 for invalid data' do
      patch "/api/health/heart_measurements/#{measurement.id}", params: { measurement: { bpm: 'not_a_number' } }

      expect(response).to have_http_status(:unprocessable_content)
      body = JSON.parse(response.body)
      expect(body).to include('error')
    end
  end

  describe 'DELETE /api/health/heart_measurements/:id' do
    let(:measurement) do
      svc = Health::HeartService.new(user)
      svc.record_heart_data(70, 120, 80, 5.days.ago)
    end

    it 'deletes the measurement' do
      delete "/api/health/heart_measurements/#{measurement.id}"
      expect(response).to have_http_status(:no_content)

      get "/api/health/heart_measurements/#{measurement.id}"
      expect(response).to have_http_status(:not_found)
    end

    it 'returns 404 for unknown id' do
      delete "/api/health/heart_measurements/#{SecureRandom.uuid}"
      expect(response).to have_http_status(:not_found)
    end
  end
end

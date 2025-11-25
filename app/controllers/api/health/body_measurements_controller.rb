class Api::Health::BodyMeasurementsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    service = Health::BodyMeasurementsService.new(current_user)

    begin
      topic = params[:topic]
      start_date = nil
      end_date = nil

      begin
        start_date = Date.parse(params[:start_date]) if params[:start_date].present?
      rescue ArgumentError
        start_date = nil
      end

      begin
        end_date = Date.parse(params[:end_date]) if params[:end_date].present?
      rescue ArgumentError
        end_date = nil
      end

      @measurements = service.get_body_measurements(topic: topic, start_date: start_date, end_date: end_date)
      render :index
    rescue ArgumentError => e
      render json: { error: e.message }, status: :bad_request
    end
  end

  def show
    service = Health::BodyMeasurementsService.new(current_user)

    begin
      @measurement = service.get_body_measurement_by_id(params[:id])
      render :show
    rescue ActiveRecord::RecordNotFound
      head :not_found
    end
  end

  def create
    service = Health::BodyMeasurementsService.new(current_user)

    begin
      topic = params[:topic] || params.dig(:measurement, :topic)
      value = params[:value] || params.dig(:measurement, :value)
      value = ApplicationHelper.coerce_numeric(value)
      unit = params[:unit] || params.dig(:measurement, :unit)
      measured_at = ApplicationHelper.parse_time_param(params[:measured_at] || params.dig(:measurement, :measured_at))

      @measurement = service.record_body_measurement(topic, value, unit, measured_at)
      render :show, status: :created
    rescue ArgumentError => e
      render json: { error: e.message }, status: :unprocessable_content
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.record.errors.full_messages }, status: :unprocessable_content
    end
  end

  def update
    service = Health::BodyMeasurementsService.new(current_user)

    begin
      @measurement = service.get_body_measurement_by_id(params[:id])

      topic = params[:topic] || params.dig(:data, :topic)
      value = params[:value] || params.dig(:data, :value)
      value = ApplicationHelper.coerce_numeric(value)
      unit = params[:unit] || params.dig(:data, :unit)
      measured_at = ApplicationHelper.parse_time_param(params[:measured_at] || params.dig(:data, :measured_at))

      @measurement = service.update_body_measurement_by_id(@measurement.id, topic: topic, value: value, unit: unit, measured_at: measured_at)
      render :show
    rescue ActiveRecord::RecordNotFound
      head :not_found
    rescue  ActiveRecord::RecordInvalid => e
      render json: { error: e.record.errors.full_messages }, status: :unprocessable_content
    rescue ArgumentError => e
      render json: { error: e.message }, status: :unprocessable_content
    end
  end

  def destroy
    service = Health::BodyMeasurementsService.new(current_user)

    begin
      @measurement = service.get_body_measurement_by_id(params[:id])
      @measurement.destroy!
      head :no_content
    rescue ActiveRecord::RecordNotFound
      head :not_found
    end
  end
end

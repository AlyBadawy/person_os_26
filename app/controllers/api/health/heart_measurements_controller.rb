class Api::Health::HeartMeasurementsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    service = Health::HeartService.new(current_user)

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

    @measurements = service.get_heart_measurements(start_date: start_date, end_date: end_date)
    render :index
  end

  def show
    service = Health::HeartService.new(current_user)
    begin
      @measurement = service.get_heart_measurement_by_id(params[:id])
      render :show
    rescue ActiveRecord::RecordNotFound
      head :not_found
    end
  end

  def create
    service = Health::HeartService.new(current_user)

    begin
      bpm = ApplicationHelper.coerce_numeric_or_nil(params[:bpm] || params.dig(:measurement, :bpm))
      systolic = ApplicationHelper.coerce_numeric_or_nil(params[:systolic] || params.dig(:measurement, :systolic))
      diastolic = ApplicationHelper.coerce_numeric_or_nil(params[:diastolic] || params.dig(:measurement, :diastolic))
      measured_at = ApplicationHelper.parse_time_param(params[:measured_at] || params.dig(:measurement, :measured_at))

      @measurement = service.record_heart_data(bpm, systolic, diastolic, measured_at)
      render :show, status: :created
    rescue ArgumentError => e
      render json: { error: e.message }, status: :unprocessable_content
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.record.errors.full_messages }, status: :unprocessable_content
    end
  end

  def update
    service = Health::HeartService.new(current_user)
    begin
      bpm = ApplicationHelper.coerce_numeric_or_nil(params[:bpm] || params.dig(:measurement, :bpm))
      systolic = ApplicationHelper.coerce_numeric_or_nil(params[:systolic] || params.dig(:measurement, :systolic))
      diastolic = ApplicationHelper.coerce_numeric_or_nil(params[:diastolic] || params.dig(:measurement, :diastolic))
      measured_at = ApplicationHelper.parse_time_param(params[:measured_at] || params.dig(:measurement, :measured_at))

      @measurement = service.update_heart_measurement_by_id(params[:id], bpm: bpm, systolic: systolic, diastolic: diastolic, measured_at: measured_at)
      render :show
    rescue ArgumentError => e
      render json: { error: e.message }, status: :unprocessable_content
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.record.errors.full_messages }, status: :unprocessable_content
    rescue ActiveRecord::RecordNotFound
      head :not_found
    end
  end

  def destroy
    service = Health::HeartService.new(current_user)

    begin
      @measurement = service.get_heart_measurement_by_id(params[:id])
      @measurement.destroy
      head :no_content
    rescue ActiveRecord::RecordNotFound
      head :not_found
    end
  end
end

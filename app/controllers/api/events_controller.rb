class Api::EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
    if @event.save
      render :show
    else
      render json: @event.errors[:base], status: 422
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render :show
    else
      render json: @event.errors[:base], status: 422
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
  end

  def getMonth
    start_stamp = params[:start]
    end_stamp = params[:end]
    @events = Event.where("events.end >= ? AND events.start < ?", params[:start], params[:end])
    render :index
  end

  private

  def event_params
    params.require(:event).permit(:start, :end, :title, :location, :description)
  end
end

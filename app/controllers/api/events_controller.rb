class Api::EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
    if @event.save
      render :show
    else
    end
  end

  def update
  end

  def destroy
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

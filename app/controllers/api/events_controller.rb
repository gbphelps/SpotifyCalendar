class EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
  end

  def update
  end

  def destroy
  end

  private

  def event_params
    params.require(:event).permit(:start, :end, :title, :location, :description)
  end
end

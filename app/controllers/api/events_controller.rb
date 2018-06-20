class Api::EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
    @event.save
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

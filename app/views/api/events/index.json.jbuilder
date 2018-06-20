@events.each do |event|
  json.set! event.id do
    json.extract! event, :id, :start, :end, :title, :location, :description
  end
end

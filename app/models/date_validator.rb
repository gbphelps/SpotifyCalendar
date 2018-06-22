class DateValidator < ActiveModel::Validator
  def validate(record)
    if record.start > record.end
      record.errors[:base] << 'Invalid Time Range'
    end
  end
end

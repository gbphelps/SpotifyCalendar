class CreateEvent < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.datetime :start
      t.datetime :end
      t.string :title
      t.string :string
      t.string :location
      t.text :description
      t.timestamps
    end
  end
end
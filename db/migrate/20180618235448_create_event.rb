class CreateEvent < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.integer :start
      t.integer :end
      t.string :title
      t.string :location
      t.text :description
      t.timestamps
    end
  end
end

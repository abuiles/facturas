class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :balance, default: 0
      t.date :date, null: false
    end

    add_index :reports, :date, unique: true
  end
end

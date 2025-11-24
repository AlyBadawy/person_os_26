class CreateHealthHearts < ActiveRecord::Migration[8.1]
  def change
    create_table :health_hearts, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.datetime :measured_at
      t.jsonb :data

      t.timestamps
    end
  end
end

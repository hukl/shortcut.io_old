class AddImageUuidToUrl < ActiveRecord::Migration
  def self.up
    add_column :urls, :image_uuid, :string
  end

  def self.down
    remove_column :urls, :image_uuid
  end
end

class AddDeltaFlag < ActiveRecord::Migration

  def self.up
    add_column :urls, :delta, :boolean, :default => true, :null => false
  end

  def self.down
    remove_column :urls
  end
end

class AddReferrerToUrl < ActiveRecord::Migration
  def self.up
    add_column :urls, :referrer, :string
  end

  def self.down
    remove_column :urls, :referrer
  end
end

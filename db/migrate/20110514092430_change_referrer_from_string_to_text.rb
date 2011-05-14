class ChangeReferrerFromStringToText < ActiveRecord::Migration
  def self.up
    change_column :urls, :referrer, :text
  end

  def self.down
    change_column :urls, :referrer, :string
  end
end

class ChangeUriFieldFromVarcharToText < ActiveRecord::Migration
  def self.up
    change_column :urls, :uri, :text
  end

  def self.down
    change_column :urls, :uri, :string
  end
end

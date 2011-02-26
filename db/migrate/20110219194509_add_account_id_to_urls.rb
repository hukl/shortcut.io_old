class AddAccountIdToUrls < ActiveRecord::Migration
  def self.up
    add_column :urls, :account_id, :integer
    add_index  :urls, :account_id
  end

  def self.down
    remove_column :urls, :account_id
    remove_index  :urls, :account_id
  end
end

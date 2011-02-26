class DeviseCreateAccounts < ActiveRecord::Migration
  def self.up
    create_table(:accounts) do |t|
      t.string :username
      t.database_authenticatable :null => false
      t.recoverable
      t.rememberable
      t.confirmable
      t.lockable :lock_strategy => :failed_attempts, :unlock_strategy => :both
      t.token_authenticatable
      t.timestamps
    end

    add_index :accounts, :username,             :unique => true
    add_index :accounts, :email,                :unique => true
    add_index :accounts, :reset_password_token, :unique => true
    add_index :accounts, :confirmation_token,   :unique => true
    add_index :accounts, :unlock_token,         :unique => true
  end

  def self.down
    drop_table :accounts
  end
end

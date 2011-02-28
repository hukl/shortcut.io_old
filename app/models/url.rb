class Url < ActiveRecord::Base

  acts_as_taggable_on :tags

  belongs_to :account

  validates_presence_of   :account_id
  validates_uniqueness_of :uri,         :scope => :account_id

  define_index do
    indexes uri
    indexes title
    indexes description

    has account_id

    set_property :delta => true
  end
end

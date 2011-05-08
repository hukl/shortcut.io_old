class Url < ActiveRecord::Base

  acts_as_taggable_on :tags

  belongs_to    :account
  before_create :create_image_uuid
  after_create  :create_thumbnail
  after_save    :update_index
  after_destroy :delete_from_index

  validates_presence_of   :account_id
  validates_uniqueness_of :uri,         :scope => :account_id

  ActiveRecord::Base.include_root_in_json = false

  def action= name
  end

  def controller= name
  end

  def to_hash
    {
      :id           => id,
      :title        => title,
      :description  => description,
      :uri          => uri,
      :image_uuid   => image_uuid,
      :tags         => tag_list.join(", ")
    }
  end

  def generate_image_uuid
    if image_uuid.nil?
      update_attribute :image_uuid, UUID.generate
    end
  end

  def thumbnail_url size
    "http://background.shortcut.io/#{image_uuid[0..3]}/#{image_uuid[4..7]}/#{image_uuid}_#{size}.jpg"
  end

  private

  def create_image_uuid
    self.image_uuid = UUID.generate
  end

  def create_thumbnail
    Resque.enqueue( Thumbnail, self.uri, self.image_uuid )
  end

  def update_index

    url = self

    #Slingshot::Client::RestClient.delete("http://localhost:9200/urls/document/#{self.id}")
    Slingshot.index('urls') do
      store(
        :id               => url.id,
        :title            => url.title,
        :description      => url.description,
        :uri              => url.uri,
        :uri_components   => ( URI.parse(url.uri).host.split(".") rescue [] ),
        :tags             => url.tag_list,
        :image_uuid       => url.image_uuid,
        :account_id       => url.account.id
      )

      refresh
    end
  end

  def delete_from_index
    Slingshot::Client::RestClient.delete("http://localhost:9200/urls/document/#{self.id}")
  end

end

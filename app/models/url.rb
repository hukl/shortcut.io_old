class Url < ActiveRecord::Base

  acts_as_taggable_on :tags

  belongs_to    :account
  before_create :create_image_uuid
  after_create  :create_thumbnail
  after_save    :update_index
  after_destroy :delete_from_index

  validates_presence_of   :account_id
  validates_presence_of   :uri
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
      :tags         => tag_list.join(", "),
      :referrer     => referrer,
      :created_at   => created_at.utc.iso8601
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

  def update_index

    url = self

    begin

      options = {
        :id                   => url.id,
        :title                => url.title,
        :description          => url.description,
        :uri                  => url.uri,
        :uri_components       => uri_components( url.uri ),
        :tags                 => url.tag_list,
        :image_uuid           => url.image_uuid,
        :account_id           => url.account.id,
        :referrer             => url.referrer,
        :referrer_domain      => uri_domain( url.referrer ),
        :search_term          => uri_search( url.referrer ),
        :created_at           => url.created_at.utc.iso8601
      }

      Tire.index('urls') do
        store( options )
        refresh
      end

    rescue
      logger.warn "Could not index: #{self.inspect}"
    end

  end

  private

  def uri_components uri
    host = URI.parse( uri ).host
    host.split(".")
  end

  def uri_domain uri
    if uri
      host = URI.parse( uri ).host
      host.match(/\w+\.\w+$/)[0] if host
    end
  end

  def uri_search uri
    if uri
      query_params = URI.parse( uri ).query
      if query_params
        search_term  = query_params.split("&").select {|p| p =~ /^q=.+$/ }[0]
        search_term.sub(/^q=/, "") unless search_term.nil?
      end
    end
  end

  def create_image_uuid
    self.image_uuid = UUID.generate
  end

  def create_thumbnail
    ThumbnailClient.request( self.uri, self.image_uuid )
  end

  def delete_from_index
    Tire::Client::RestClient.delete("http://localhost:9200/urls/document/#{self.id}")
  end

end

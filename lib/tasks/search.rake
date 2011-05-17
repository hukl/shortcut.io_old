require 'uri'

namespace :search do

  desc "import all bookmarks in es"
  task :import => :environment do

    Slingshot.index 'urls' do
      delete
      create

      Url.all.each_with_index do |url, index|
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
        puts index
      end
    end
  end

  task :reindex => :environment do
    Tire.index 'urls' do
      delete
      create :mappings => {
        :url => {
          :properties => {
            :id               => { :type => 'long' },
            :title            => { :type => 'string',   :boost => 2.0 },
            :description      => { :type => 'string' },
            :uri              => { :type => 'string' },
            :image_uuid       => { :type => 'string',   :index => 'no' },
            :tags             => { :type => 'string' },
            :account_id       => { :type => 'long',     :index => 'not_analyzed', :store => true },
            :uri_components   => { :type => 'string' },
            :referrer         => { :type => 'string',   :index => 'no', :include_in_all => false },
            :referrer_domain  => { :type => 'string' },
            :search_term      => { :type => 'string' },
            :created_at => { :type => 'date' }
          }
        }
      }
    end

    Url.all.each(&:update_index)
  end


end

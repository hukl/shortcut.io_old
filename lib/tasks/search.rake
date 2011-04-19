require 'slingshot-rb'

namespace :search do

  desc "import all bookmarks in es"
  task :import => :environment do

    Slingshot.index 'urls' do
      delete
      create

      Url.all.each_with_index do |url, index|
        store(
          :id           => url.id,
          :title        => url.title,
          :description  => url.description,
          :uri          => url.uri,
          :tags         => url.tag_list,
          :image_uuid   => url.image_uuid,
          :account_id   => url.account.id
        )
        puts index
      end
    end
  end


end
# encoding: UTF-8
require 'iconv'

class BookmarkImport

  @queue = :bookmark_import

  @@converter = Iconv.new('UTF-8//IGNORE', 'UTF-8')

  def self.perform bookmarks, account_id

    bookmarks = @@converter.iconv( bookmarks )

    doc = Nokogiri::HTML::Document.parse( bookmarks )

    Url.record_timestamps = false

    doc.css("a").each do |node|

      if node.attributes['add_date']
        add_date = Time.at( node.attributes['add_date'].text.to_i )
      else
        add_date = Time.now
      end

      options = {
        :title      => node.text,
        :uri        => node.attributes['href'].text,
        :created_at => add_date,
        :account_id => account_id
      }

      url =  Url.new( options )
      url.tag_list = node.attributes['tags'].text if node.attributes['tags']

      url.save
    end
  end
end

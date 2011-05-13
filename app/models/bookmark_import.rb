require 'iconv'

class BookmarkImport

  @queue = :bookmark_import

  @@converter = Iconv.new('UTF-8//IGNORE', 'UTF-8')

  def self.perform bookmarks, account_id

    bookmarks = @@converter.iconv( bookmarks )

    doc = Nokogiri::HTML::Document.parse( bookmarks )

    Url.record_timestamps = false

    doc.css("a").each do |node|
      url =  Url.new(
        :title      => node.text,
        :uri        => node.attributes['href'].text,
        :created_at => Time.at(node.attributes['add_date'].text.to_i),
        :account_id => account_id
      )
      url.tag_list = node.attributes['tags'].text

      url.save
    end
  end
end

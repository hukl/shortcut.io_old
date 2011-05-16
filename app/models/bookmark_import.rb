# encoding: UTF-8
require 'iconv'

class BookmarkImport

  @queue = :bookmark_import

  @@converter = Iconv.new('UTF-8//IGNORE', 'UTF-8')

  def self.perform bookmarks, account_id

    bookmarks = @@converter.iconv( bookmarks )

    unless bookmarks =~ /\<\/DT\>/ && bookmarks =~ /\<\/DD\>/
      bookmarks.gsub!(/\<DD\>(.*)$/) do |match|
        "<DD>" + $1 + "</DD>"
      end

      bookmarks.gsub!(/\<\/A\>$/, "</A></DT>")
      bookmarks.gsub!(/\<\/DL\>\<p\>/, "</DL></p>")
    end

    doc = Nokogiri::HTML::Document.parse( bookmarks )

    Url.record_timestamps = false

    doc.css("dt").each do |node|
      ahref = node.css("a").first

      if ahref.attributes['add_date']
        add_date = Time.at( ahref.attributes['add_date'].text.to_i )
      else
        add_date = Time.now
      end

      options = {
        :title      => ahref.text,
        :uri        => ahref['href'],
        :created_at => add_date,
        :account_id => account_id
      }

      if node.next_element.name == "dd"
        options.merge!( :description => node.next_element.text )
      end


      url =  Url.new( options )
      url.tag_list = ahref.attributes['tags'].text if ahref.attributes['tags']

      url.save
    end
  end
end

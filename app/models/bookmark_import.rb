class BookmarkImport

  @queue = :bookmark_import

  def self.perform bookmarks, account_id
    bookmarks.gsub!(/\<DD\>(.*)$/) do |match|
      "<DD>" + $1 + "</DD>"
    end

    bookmarks.gsub!(/\<\/A\>$/, "</A></DT>")
    bookmarks.gsub!(/\<\/DL\>\<p\>/, "</DL></p>")

    File.open("/tmp/boogie.html", "w+") do |file|
      file.write bookmarks
    end

    doc = Nokogiri::XML::Document.parse( bookmarks )

    Url.record_timestamps = false

    doc.css("DT A").each do |node|
      url =  Url.new(
        :title      => node.text,
        :uri        => node['HREF'],
        :created_at => Time.at(node['ADD_DATE'].to_i),
        :account_id => account_id
      )
      url.tag_list = node['TAGS']

      url.save
    end
  end
end

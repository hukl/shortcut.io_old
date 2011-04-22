class ToolsController < ApplicationController

  def import
  end

  def convert
    bookmarks = params[:upload].read

    bookmarks.gsub!(/^\<DD\>(.+)$/) do |match|
      "<DD>" + $1 + "</DD>"
    end

    bookmarks.gsub!(/\<\/A\>$/, "</A></DT>")
    bookmarks.gsub!(/\<\/DL\>\<p\>/, "</DL></p>")

    doc = Nokogiri::XML::Document.parse( bookmarks )

    Url.record_timestamps = false

    doc.css("DT A").each do |node|
      url =  Url.new(
        :title      => node.text,
        :uri        => node['HREF'],
        :created_at => Time.at(node['ADD_DATE'].to_i),
        :account_id => current_account.id
      )
      url.tag_list = node['TAGS']

      url.save
    end

    Url.record_timestamps = true

    redirect_to :controller => :home, :action => :index
  end

end

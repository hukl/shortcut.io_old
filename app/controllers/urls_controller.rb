class UrlsController < ApplicationController

  before_filter :authenticate_account!

  def index
   @urls = current_account.urls.order("created_at DESC").all
  end

  def new
  end

  def create
    tags = params[:url].delete( :tags )

    params[:url].merge!(:account_id => current_account.id)

    @url = Url.new( params[:url] )
    @url.tag_list = tags

    if @url.save
      respond_to do |format|
        format.js {
          render :json => { :status => 'success', :message => 'saved'}.to_json
        }
        format.html
      end
    else
      respond_to do |format|
        format.js {
          render :json => { :status => 'error', :message => 'duplicate'}.to_json
        }
      end
    end
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def search
    params[:query] = [] if params[:query] =~ /^all$/
    
    if 2 < params[:query].size
      @urls = Url.search(
        "*" + params[:query] + "*",
        :with => { :account_id => current_account.id },
        :limit => 20
      )
    else
      @urls = Url.where(
        :account_id => current_account.id
      ).order("created_at desc")
    end
    render :partial => @urls
  end

end

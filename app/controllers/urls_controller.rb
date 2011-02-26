class UrlsController < ApplicationController

  before_filter :authenticate_account!

  def index
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

  def live_search
    if 2 < params[:query].size
      @urls = Url.search(params[:query] + "*")
    else
      @urls = Url.where(:account_id => current_account.id)
    end
    render :partial => @urls
  end

end

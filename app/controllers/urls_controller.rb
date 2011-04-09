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
    case params[:query_type]
      
    when 'filter'
      if params[:query] =~ /^all$/
        query = "" 
      else
        query = "*" + params[:query] + "*"
      end
      
      @urls = Url.search(
        query,
        :with       => { :account_id => current_account.id },
        :limit      => 20,
        :sort_mode => :extended,
        :order => "created_at DESC"
      )
    end
    
    render :partial => @urls
  end

end

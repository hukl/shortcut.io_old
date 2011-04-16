class UrlsController < ApplicationController

  before_filter :authenticate_account!

  def index
    respond_to do |format|
      format.html {}
      format.js do
        @urls = Url.where(
          :account_id => 4
        ).order(
          "created_at DESC"
        ).paginate(
          :page     => params[:page],
          :per_page => 20
        )

        render :json => @urls
      end
    end
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
    url = Url.find( params[:id] )

    response = { :url => {
      :id           => url.id,
      :title        => url.title,
      :description  => url.description,
      :uri          => url.uri,
      :thumbnail    => url.thumbnail_url(300),
      :tags         => url.tag_list
    }}

    respond_to do |format|
      format.html {}
      format.js do
        render :json => response.to_json
      end
    end
  end

  def edit
  end

  def update
    @url = Url.find( params[:id] )

    tags = params.delete( :tags )

    @url.tag_list = tags

    if @url.update_attributes( params )
      render :json => {:status => :ok}.to_json
    else
      render :json => {:status => :error}.to_json
    end
  end

  def destroy
    url = Url.find( params[:id] )
    url.destroy if url

    respond_to do |format|
      format.html {}
      format.js { render :json => {:status => :ok} }
    end
  end

  def search
    case params[:query_type]

    when 'filter_search'
      @urls = search_for( params[:query] )
    when 'filter_tags'
      @urls = Url.where(
        :account_id => current_account.id
      ).tagged_with( params[:query] )
    end

    render :partial => @urls
  end

  def search_for query
    if query =~ /^all$/
      sphinx_query = ""
    else
      sphinx_query = "*" + query + "*"
    end

    @urls = Url.search(
      sphinx_query,
      :with       => { :account_id => current_account.id },
      :limit      => 20,
      :sort_mode => :extended,
      :order => "created_at DESC"
    )
  end
end

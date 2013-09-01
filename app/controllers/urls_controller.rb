class UrlsController < ApplicationController

  before_filter :authenticate_account!
  before_filter :verify_ownership, :only => :update

  layout 'interface'

  def index
    respond_to do |format|
      @urls = Url.where(
        :account_id => current_account.id
      ).order(
        "created_at DESC"
      ).paginate(
        :page     => params[:page],
        :per_page => 30
      )

      format.html {}
      format.js do
        render :json => @urls.map { |u| u.to_hash }
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

    response = { :url => url.to_hash }

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
    valid_keys   = ["uri", "title", "description", "tags"]
    clean_params = params.select do |param|
      valid_keys.include? param
    end

    tags = clean_params.delete( "tags" )

    @url.tag_list = tags.gsub(/\s/, "").split(",")

    if @url.update_attributes( clean_params )
      render :json => @url.to_hash
    else
      render :nothing => true
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
    search_term = "#{params[:search_term]}*"
    page        = params[:page] || 0
    account_id  = current_account.id

    #s = Tire.search 'urls' do
      #query do
        #string search_term
      #end

      #filter :term, :account_id => account_id

      #size(30)

      #from page.to_i * 30
    #end


    s = Tire.search('urls') do |search|
      search.query do |query|
        query.string search_term
      end

      search.filter :term, :account_id => account_id
      search.size(30)
      search.from page.to_i * 30
    end

    render :json => s.results
  end

  private

  def verify_ownership
    @url = Url.find( params[:id] )

    if @url.account_id != current_account.id
      render :nothing => true, :status => 401
      return
    end
  end
end

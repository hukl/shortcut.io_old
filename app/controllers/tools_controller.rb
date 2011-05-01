class ToolsController < ApplicationController

  before_filter :authenticate_account!

  layout 'tools'

  def index

  end

  def import
  end

  def export
    render :layout => false
  end

  def reset
    current_account.urls.destroy_all
    redirect_to tools_index_path
  end

  def convert
    if params[:upload]
      Resque.enqueue( BookmarkImport, params[:upload].read, current_account.id )
    end
    redirect_to tools_index_path
  end

end

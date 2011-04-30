class HomeController < ApplicationController

  def index
    if current_account
      redirect_to urls_path
    else
      render :layout => false
    end
  end

end

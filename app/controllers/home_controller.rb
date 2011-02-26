class HomeController < ApplicationController

  before_filter :authenticate_account!

  def index
    @urls = Url.where(
      :account_id => current_account.id
    ).order("created_at DESC")
  end

end

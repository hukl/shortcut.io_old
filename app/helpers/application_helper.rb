module ApplicationHelper

  Tokens = %w(8ea5a734-629c-11e0-8969-27c4823e266e)

  def invited?
    Tokens.include? params[:invitation_token]
  end

  def title_for_page
    if content_for?( :title )
      content_for( :title )
    else
      params[:action]
    end
  end
end

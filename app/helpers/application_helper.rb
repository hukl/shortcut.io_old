module ApplicationHelper
                     
  Tokens = %w(8ea5a734-629c-11e0-8969-27c4823e266e)
  
  def invited?               
    Tokens.include? params[:invitation_token]
  end
end

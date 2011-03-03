module HomeHelper

  def bookmarklet
    "javascript:var%20b=document.body;"\
    "var%20t='#{current_account.authentication_token}';"\
    "if(b&&!document.xmlVersion){"\
      "void(z=document.createElement('script'));"\
      "void(z.type='text/javascript');"\
      "void(z.src='#{request.protocol+request.host_with_port}/"\
      "bookmarklet_#{Rails.env}.js?auth_token='+t);"\
      "void(b.appendChild(z));"\
    "}else{}"
  end

end

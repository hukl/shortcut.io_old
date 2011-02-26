module HomeHelper

  def bookmarklet
    "javascript:var%20b=document.body;"\
    "var%20t='#{current_account.authentication_token}';"\
    "if(b&&!document.xmlVersion){"\
      "void(z=document.createElement('script'));"\
      "void(z.type='text/javascript');"\
      "void(z.src='http://127.0.0.1:3000/bookmarklet.js?auth_token='+t);"\
      "void(b.appendChild(z));"\
    "}else{}"
  end

end

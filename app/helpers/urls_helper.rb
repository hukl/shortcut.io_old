module UrlsHelper
  
  def thumbnail_url url
    "http://background.shortcut.io/#{url.image_uuid[0..3]}/#{url.image_uuid[4..7]}/#{url.image_uuid}_200.jpg"
  end
end

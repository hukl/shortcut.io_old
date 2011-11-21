require 'resque'
require 'fileutils'

Resque.redis = '127.0.0.1:6379'

XVFB          = "/usr/bin/xvfb-run"
XVFB_ARGS     = '--server-args="-screen 0, 1024x768x24"'
ASSET_PATH    = File.join( "/", "var", "www", "assets" )
WKHTML2IMAGE  = "/usr/local/bin/wkhtmltoimage-amd64 --height 1024 --width 1024 --javascript-delay 1000"
IMAGE_MAGICK  = "/usr/bin/convert"

class Thumbnail
  @queue = :thumbnail

  def self.perform url, uuid
    base_dir  =  File.join( ASSET_PATH, uuid[0..2], uuid[3..5] )
    base_path =  File.join( base_dir, uuid )

    unless Dir.exist? base_dir
      FileUtils.mkdir_p( base_dir )
    end

    fetch_image( url, (base_path + ".jpg") )
    convert_image( base_path )

    puts "Processed a job!"
  end

  def self.fetch_image url, path
    %x(#{WKHTML2IMAGE} '#{url}' #{path})
  end

  def self.convert_image path
    %x(#{IMAGE_MAGICK} #{(path + '.jpg')} -resize 500x500 #{path}_500.jpg)
    %x(#{IMAGE_MAGICK} #{(path + '.jpg')} -resize 300x300 #{path}_300.jpg)
    %x(#{IMAGE_MAGICK} #{(path + '.jpg')} -resize 200x200 #{path}_200.jpg)
    %x(#{IMAGE_MAGICK} #{(path + '.jpg')} -resize 100x100 #{path}_100.jpg)
  end
end

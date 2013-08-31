module ThumbnailClient
  def self.request(uri, image_uuid)
    host  = "127.0.0.1"
    port  = 8789

    puts($udp_socket.inspect)

    # <<UriLength:16/big,Uri:UriLength/binary,UudiLength:16/big,Uudi:UuidLength/binary>>
    packet = [uri.length, uri, image_uuid.length, image_uuid].pack(
      "nA*#{uri.length}nA*#{image_uuid.length}"
    )

    $udp_socket.send( packet, 0, host, port )
  # rescue
  #   if @udp_socket.closed?
  #     @udp_socket = UDPSocket.new
  #   end

  #   false
  end

  def self.find_urls_without_thumbs
    Url.all.reject do |url|
      image_uuid = url.image_uuid

      prefix = "/usr/local/www/background.shortcut.io/assets/"
      path = "#{image_uuid[0..2]}/#{image_uuid[3..5]}/#{image_uuid}.jpg"

      absolute_path = prefix + path

      File.exists? absolute_path
    end
  end
end

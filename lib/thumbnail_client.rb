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
end
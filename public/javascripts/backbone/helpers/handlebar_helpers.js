Handlebars.registerHelper('truncate', function(title, length) {
  console.log(length)
  return title.substring(0, length) + "…";
});

Handlebars.registerHelper('thumbnail_url', function(image_uuid, size) {
  var segments = [
    "http://background.shortcut.io",
    image_uuid.substring(0,3),
    image_uuid.substring(3,6),
    (image_uuid + "_" + size + ".jpg")
  ];

  return segments.join("/");
});

Handlebars.registerHelper('short_referrer', function(referrer) {
  if ( result = referrer.match(/^https?:\/\/(.+)\//) ) {
    return result[1];
  }
});

Handlebars.registerHelper('nice_date', function(iso_date) {
  var date = new Date(iso_date)
  return ( date.toLocaleDateString() + " "  + date.toLocaleTimeString() )
});


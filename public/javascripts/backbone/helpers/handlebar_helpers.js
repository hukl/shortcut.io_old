Handlebars.registerHelper('truncate', function(title) {
  return title.substring(0, 30);
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
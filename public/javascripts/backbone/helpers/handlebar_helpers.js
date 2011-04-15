Handlebars.registerHelper('truncate', function(title) {
  return title.substring(0, 30);
});

Handlebars.registerHelper('thumbnail_url_200', function(image_uuid) {
  var segments = [
    "http://background.shortcut.io",
    image_uuid.substring(0,4),
    image_uuid.substring(4,8),
    (image_uuid + "_200.jpg")
  ];

  return segments.join("/");
});

Handlebars.registerHelper('thumbnail_url_300', function(image_uuid) {
  var segments = [
    "http://background.shortcut.io",
    image_uuid.substring(0,4),
    image_uuid.substring(4,8),
    (image_uuid + "_300.jpg")
  ];

  return segments.join("/");
});

Shortcut.io is an open source software to build a bookmarking service.

[![Flattr Shortcut.io](http://api.flattr.com/button/flattr-badge-large.png)](http://flattr.com/thing/438691/Shortcut-io-Bookmarking)

## Background

Early 2011 I have started to build my own bookmarking service as I was unsatisfied
with the existing ones. While it is trivial to store bookmarks with any service
it was much harder to ever find a certain bookmark again once you have 1000+ of
them. Shortcut.io has the goal to make finding bookmarks as easy as storing them.
Then, when I got done about 60-70% of the initial public release I started working
for a new company and had not enough time to continue working on it. Now, many
months later I have realized that I will not finish it any time soon and that
there are already enough commercial bookmarking services. Therefor it would be
a complete waste of time if I would let this project die without any benefit for
anybody. This is why I have decided to open source it.

The service is up and running on http://shortcut.io and can be use free of charge.
Either people will like it, contribute to it and maybe even install it on their
own or it will just fade away. Personally I would be extremely happy if it evolves
into a nice little community driven project.

So if you care to get involved write me a message - I will help you getting it
to run.

## Features

* Slim and fast interface driven by [backbone.js](http://documentcloud.github.com/backbone/)
* Fast and flexible search powered by [elasticsearch](http://www.elasticsearch.org/)
* Visual bookmark thumbnails generated asynchronously
* Import and export of bookmarks from other services / to other services via common file format
* Easy to use Bookmarklet

## Screenshot

![Shortcut.io Screenshot](http://smyck.org/shortcutio.jpg)

## Usage

Basically you go to https://shortcut.io and sign up. Then you either import bookmarks or use the bookmarklet in the main menu to add new bookmarks.

## Unfinished Features / Ideas

* Discover / browse bookmarks from friends
* Smart folders based on search terms / tags
* Ad-hoc collections for web research ( say you're looking for a new gadget or apartment and save all related bookmarks in a special collection)
* Public bookmarks
* Improved Elasticsearch indeces
* Browse by tags
* Browse by timeline
* Advanced search
* Polished UI
* Replace wkhtmltoimage with phantom.js as they have fixed all issues I filed in the meantime
* Tests frontend / backend
* Chrome / Safari / FF Extensions
* Serve thumbnails via https
* Edit account details
…

## Dependencies

* Ruby / Rails
* SQLite / MySQL / Postgres
* Redis
* wkhtmltoimage

## Icons
The icons I used are from this icon set: http://gentleface.com/free_icon_set.html

I bought the library but they are also available for free under the
Creative Commons Attribution-NonCommercial license.

If you want to use them for a commercial project you have to buy a license!

## About the service running on http://shortcut.io/

The bookmarks are backupped every hour and synced to an offsite
location to make sure nobody including myself loses any of them.

It currently runs on two machines, one running rails, elasticsearch, redis and
resue and the other one processes the thumbnails and serves them.

The service is available through ssl. The thumbnails however are served via http
because I didn't want to spend more money on certificates at that point.

## License

Copyright (C) 2011 by John-Paul Bader

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
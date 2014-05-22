---
layout: 'content'
title: 'Local'
menuTitle: 'How To Run Locally'
---
# Running Locally #

### RVM ###
Make Sure The Latest Version Is Installed By Running `rvm get stable` In Terminal

### Ruby ###
* Find Latest Version Number [Here](https://www.ruby-lang.org/en/downloads/)

* Enter `rvm get x.x` To Terminal, Where x.x Is The Latest Version

* Verify Installation By Running `ruby --version` Command In Terminal

### Redis ###
Start Redis By Entering `redis server` In A Deticated Terminal Window

### Github ###

Clone The Following Projects:

* https://github.com/gurdotan/highway
* https://github.com/refaelos/backyard
* https://github.com/refaelos/back-of-generator

#### Linking ####
Create Soft Links In The `/backyard/public` Folder By Running These Commands In Terminal

* `ln -s ../../storefront/src storefront`
* `ln -s ../../storefront-themes storefront-themes`

### Rails ###
In Terminal, Enter The `/backyard` Folder, Next:

* Enter `bundle install` Into Terminal
(If you don't have bundle install run `gem install bundler` first)

** You Can Now Run *backyard* By Entering `rails server` In The Same Terminal Location **

### Node ###

Next, In Each Of The `/highway`, `/back-of-generator` Folders

* Run `npm install`

**You Can Now Run Both Programs By Entering The Following In Each Locations Terminal**

#### * `node app.js` for *highway*
#### * `node server.js` for *back-of-generator*

### Running Locally ###
Update Your Hosts File By Running `sudo nano /private/etc/hosts`
Add A New Rule:

* `highway-dev.soom.la		localhost`

* Next, Use Your Browser To Sign Up And Login via [http://localhost:3000](http://localhost:3000)

* Create A Game, A Storefront, And Export The Storefront To iOS.

* Open The .xproj File In XCode, And Run The Simulator











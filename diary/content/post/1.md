---
title: "First Day - Setting up my environment and watching intro videos on YouTube"
date: 2020-11-12T14:02:10+02:00
draft: false
---
Today I :
- Set up my environment
- Watched intro videos on APIs and Node.js

## Setting up my Environement ##

I have set up a local GIT repository for my Back-End course work. I have also decided to use VS Code as my development environment.

My repository will have separate folders for the course assignments:
- **coursework**
- **diary**: I have set up a [Hugo](https://gohugo.io/) blog site to keep my learning diary.
- **project**

I will be skipping the Git tutorials as I have some Git experience from another course.

I have already set up Git on my machine. I made an initial commit to my new Git ropo, and pushed to [GitHub](https://github.com/itsjan/Back-end.git).


## Back-end ##

### REST Intro ###

Watched this [video](https://www.youtube.com/watch?v=7YcW25PHnAA&ab_channel=WebConcepts) on YouTube.
- Face book has a REST api. I tried the [sample](https://graph.facebook.com/youtube) on the video, but I don't get the same result. Instead, I'm getting an error saying _An access token is required to request this resource._ I have some idea what this means. Would need to make the request with an API client, such as [Postman](https://www.postman.com/product/api-client/)? I googled this [document](https://developers.facebook.com/docs/graph-api/using-graph-api/) on using the Facebook Graph API; maybe I'll have a loot at it later. 
- The google maps api sample doesn't work either, error message saying an API key is required for each request.
- Instagram API example is also outdated. Just realised I am watching a 2014 video.
- [ProgrammableWeb](https://www.programmableweb.com/) is an API directory.
- **OAuth** is used to authenticate to many APIs. 

### NodeJS Tutorial ###

Project home page: [NodeJs.org](https://nodejs.org/en/)

This course uses version 12. I believe I have this version already installed on my machine.

````
% node --version
v0.12.7
````

Tutorial [video](https://www.youtube.com/watch?v=fBNz5xF-Kx4).  _OK this is a long one..._

 Create an HTTP server from scratch without Express, then deploy to Heroku. Covers modules such as as [path](https://nodejs.org/docs/latest-v12.x/api/path.html), [url](https://nodejs.org/docs/latest-v12.x/api/url.html), [fs](https://nodejs.org/docs/latest-v12.x/api/fs.html), [events](https://nodejs.org/docs/latest-v12.x/api/events.html).

Node is a JavaScript Runtime.

Recommended to know first:
- [**HTTP**](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) ([status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes), [headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields), etc..)
- [**JSON**](https://en.wikipedia.org/wiki/JSON)
- [Arrow Functions](https://www.w3schools.com/js/js_arrow_function.asp)
- [Promises](https://www.w3schools.com/js/js_promise.asp)
- [MVC Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

Learned that the best use cases and types of projects for Node are those that are not CPU intensive:
- REST API & Microservices
- Realtime services (Chat, Live Updates)
- CRUD Apps (Blogs, Shopping carts, Social Networks)
- Tools & Utilities
- etc..

### NPM - Node Package manager ###


- **npm init** _Generates a package.json file_
  - Lists all dependencies
  - Packages are stored in the **node_modules** folder
- **npm install express** _Installs a package locally_
- **npm install -g nodemon** _Installs a package globally_


### The tutorial project ###

- Created a new folder ````coursework/node_crash_course````
- ````npm init````
- ````npm install uuid````

Npm did not add the package dependencies in the package.json file. I tried with --save but nothing happens. I decided to update my npm .. but it didn't work without updating node, too. I'll probably have some problems later on as I am not using the recommended version 12. I don't want to spend time on this right now. Watching this video is slow...

#### Dev dependencies ###

````npm install -D nodemon````

Created a .gitignore with folder node_modules. No need to check these into VCS. npm install will recreate the directory.


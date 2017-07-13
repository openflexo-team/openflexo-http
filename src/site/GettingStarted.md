# Getting started with the federation server

OpenFlexo federation server provides HTTP/REST and WebSocket access to federated models. This page explains how to build, access and customize your own server to allow its deployment.

## Build the server

The OpenFlexo server as all OpenFlexo components doesn't do much own it's own, it's with connectors and resources that it reaches its full potential. The first thing to do it to package the server with the needed connectors and resource centers.

### Package a server

One easy way to package the server is to use a build tool, gradle for instance. Here is an example of a gradle buid file that packages the server and a handfull of connectors:

```gradle
group 'org.openflexo.test'
version '1.0-SNAPSHOT'

buildscript {
    ext.openflexo_version = '1.8.1-SNAPSHOT'
}

apply plugin: 'java'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
    maven { url "https://maven.openflexo.org/artifactory/openflexo-deps/" }
}

dependencies {
    // dependency to the server
   compile "org.openflexo:http-server:${openflexo_version}"
 
    // set of connectors
    compile "org.openflexo:docxconnector:${openflexo_version}"
    compile "org.openflexo:excelconnector:${openflexo_version}"
    compile "org.openflexo:pdfconnector:${openflexo_version}"
    compile "org.openflexo:jdbcconnector:${openflexo_version}"
    compile "org.openflexo:flexodiagram:${openflexo_version}"
    compile "org.openflexo:ginaconnector:${openflexo_version}"
 
    testCompile group: 'junit', name: 'junit', version: '4.12'
}
```

### Run the server

Once the packaging is done, the main server class is `org.openflexo.http.server.OpenFlexoServer`. Here are the arguments the server accepts:

```
Usage: server [options]

- -h|--help: show this help.
- -v|--verbose: verbose mode.
- --port port: server port.
- --host host: server host.
- --center path: resource center to register (may have several).
- --project path: path for a project to open (may have several).
```

## Access the server

Once the server runs, it provides the REST and WebSocket API described [here][1] but it also provides a set of static examples HTML files and JavaScript libraries to help the use of the API.
 
### HTML example pages

The `index.html` provides a simple page showing the technology adapters, resource centers and resources provided by the server. The `test.html` file provides a simple application allowing testing the API through simple exploration.  

![][image-1]

The `Context` field can receive urls for objects in the federation server to show its contents. The contents is navigable click on hyperlinks allowing the exploration of the content.

The `Right` field supports the evaluation of [Connie][2] expressions (named bindings). A such expression must have a context to evaluated upon, it’s uses the `Context` field as its context.

The expandable `Left` field supports [Connie][3] expressions as `Right` field does. These expressions must be settable allowing to assign its value to the `Right` field. 

### Javascript libraries

**TODO**

## Customize the server

**TODO**

## Deploy the server

**TODO**

[1]:	API.md
[2]:	https://connie.openflexo.org/
[3]:	https://connie.openflexo.org/

[image-1]:	ServerTestApplication.png "Test Application"

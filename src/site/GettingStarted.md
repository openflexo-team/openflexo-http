# Getting started with the federation server

OpenFlexo federation server provides HTTP/REST and WebSocket access to federated models. This page explains how to build, access and customize your own server to allow its deployment.

## Build the server

The OpenFlexo server as all OpenFlexo components doesn't do much own it's own, it's with connectors and resources that it reaches its full potential. The first thing to do it to package the server with the needed connectors and resource centers.

### Package a server

One easy way to package the server is to use a build tool, gradle for instance. Here is an example of a gradle build file that packages the server and a handful of connectors:

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

The `Right` field supports the evaluation of [Connie][2] expressions (named bindings). A such expression must have a context to evaluated upon, it’s uses the `Context` field as its context. When the `detailed` checkbox is checked the result will contains more details.

The expandable `Left` field supports [Connie][3] expressions as `Right` field does. These expressions must be settable allowing to assign its value to the `Right` field. 

The save icon will send a post request on the given `Context`. In case of resource urls it saves the resource.

### Javascript libraries

OpenFlexo client side is developed using [TypeScript][4], both TypeScript and Javascript files are provided. 

**Api**

The folder `/js/openflexo/api` contains utility classes and interfaces to help the use of the federation server [API][5]. An instance of the `Api` class in `/js/openflexo/api/Api.ts` provides call to REST objects and Connie expressions on a given server. While it’s not required to use this library to access the federation server, it’s recommended to simplify the use of Connie expressions.

- Here is an example to retrieve information for a REST object:
```typescript
import { Api } from "./openflexo/api/Api";
import { Resource } from "./openflexo/api/resource";

const api = new Api();
let promise = api.call<Resource>("/resource/aHR0cDovL3d3dy5jeWFuZS5ldS9jYXJib3NvdXJjZS9Nb2RlbGlzYXRpb24udmlld3BvaW50");
promise.then(resource => {
    console.log(resource);
}).catch((error) => {
    console.log(error);
});
```

- Here is an example to evaluate a binding:
```typescript
import { Api, runtimeBinding } from "./openflexo/api/Api";

const api = new Api();
const vmi = "/ta/fmlrt/vmi/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvNC9zb3VyY2VfMTQ5MjE4MjI3NTEwNC9UeUFyTWVuZXpSZXRELnZpZXcvaW5zdGFsbGF0aW9uLnZteG1s/object/3";
// constructs the binding
const binding = runtimeBinding("name", vmi, vmi);
const promise = api.evaluate(binding, false);
promise.then(value => {
    console.log("Name = " + value);
}).catch((error) => {
    console.log(error);
});

// listens to changes for this binding
api.addChangeListener(binding, (event) => {
    console.log("Name changed to " + event.value);
});
```

- Here is an example to assign a binding:
```typescript
import { Api, runtimeBinding } from "./openflexo/api/Api";

const api = new Api();
const vmi = "/ta/fmlrt/vmi/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvNC9zb3VyY2VfMTQ5MjE4MjI3NTEwNC9UeUFyTWVuZXpSZXRELnZpZXcvaW5zdGFsbGF0aW9uLnZteG1s/object/3";
// constructs the binding
const binding = runtimeBinding("name", vmi, vmi);
const newValue = runtimeBinding('"newName"', vmi, vmi);
const promise = api.assign(binding, newValue, false);
promise.then(value => {
    console.log("Name = " + value);
}).catch((error) => {
    console.log(error);
});
```

These typescript examples need to have the OpenFlexo typescript files on hand to compile without errors.

**UI**

*TODO*

**MVC**

*TODO*

## Customize the server

**TODO**

## Deploy the server

**TODO**

[1]:	API.md
[2]:	https://connie.openflexo.org/
[3]:	https://connie.openflexo.org/
[4]:	https://www.typescriptlang.org
[5]:	API.md

[image-1]:	ServerTestApplication.png "Test Application"

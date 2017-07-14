# Getting started with the federation server

OpenFlexo federation server provides HTTP/REST and WebSocket access to federated models. This page explains how to build, access and customize your own server to allow its deployment.

**Important**: To run and build an OpenFlexo application a Java 8 virtual machine is required.

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

The following typescript examples need to have the OpenFlexo typescript files on hand to compile without errors.

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

**UI**

The folder `/js/openflexo/ui` contains a set of UI classes based on [MDL][6]. It allows to construct:

- [Buttons][7]
- [Cards][8]
 - [Grids][9]
- [Tabs][10]
- [Icons][11]
- [List][12]
- [List][13]
- [Tables][14]
- [TextFields][15]

- Here is an example for a button:

```typescript
import { Button } from "./openflexo/ui/Button";
const button = new Button("Name");
button.container.onclick = (event) => {
    console.log("click");
}
```

- Here is an example for a text field:

```typescript
import { TextField } from "./openflexo/ui/TextField";
const textfield = new TextField("test", "here a value", "Label", true);
textfield.container.onchange = (event) => {
    console.log("Changed test");
}
```

**MVC**

The folder `/js/openflexo/mvc` contains a set of classes of UI classes controlled by Connie expression. 
They combine the two previous sections: API and UI. 
For example, a `BoundTextField` constructs a textfield controlled by a binding. 
Every time the value is changed on the client it assigns the new value and sends it to the server. 
It also listens to the changes from the server and update the value on the client when changed.

Here is the current list of bound controllers:

- `BoundButton`
- `BoundLabel`
- `BoundTable`
- `BoundTextField`

- Here is an exemple for a table, label, button and textfield:

```typescript
let binding = runtimeBinding("virtualModelInstance.allDevices()", resource.modelUrl, resource.modelUrl);
let columns = [
    new BoundColumn(
        "Type", 
        (api, element: any) => element.flexoConcept.name
    ),
    new BoundColumn(
        "Nom",  
        (api, element) => new BoundTextField(api, runtimeBinding("name", element.url), "Nom", false)
    ),
    new BoundColumn(
        "URI", 
        (api, element) => new BoundTextField(api, runtimeBinding("uri", element.url), "URI", true)
    ),
    new BoundColumn(
        "Status", 
        (api, element) => new BoundLabel(api, runtimeBinding("status", element.url))
    ),
    new BoundColumn(
        "Delete", (api, element) => 
            new BoundButton(api, 
                runtimeBinding("virtualModelInstance.delete(flexoConceptInstance)", element.url), 
                null, new Icon("delete"), "icon"
            )
    )
];
const table = new BoundTable(this.api, binding, columns);
```

## Customize the server

The federation server can be customize for client and server side. Static resources may be added or replaced allowing to write a new client. On the other side, Java services add new behaviors to the federation server.

### Static resources

The OpenFlexo server packaging contains a set of static resources (as seen in previous section) embedded in the jar of the application.
To embedded your own content there are two solutions: 
- adds a `webroot` folder in the directory where you run the server or
- adds a `webroot` folder in the sources you add to the server.
In the latter, the resources will be added to the jar simplify the deployment of the server (See [Vertx][16] documentation for more information on this matter).

Alls the files in our `webroot` folder will be served with a higher priority than the existing one in the federation server (allowing to replace existing one like `index.html`).

### Server services

** TODO**

**Technology Adapter**

[TechnologyAdatperRoutes][17]

[ComplementJson][18]

**Application routes**
 
[ApplicationRoutes][19]

## Deploy the server

There are many ways to deploy the server. An easy one is to use the gradle `application` plugin. Add the following to grade build file in the `build` section (See [gradle][20] documentation on the plugin):

```gradle
apply plugin: 'application'
mainClassName = "org.openflexo.http.server.OpenFlexoServer"
distributions {
    main {
        contents { from('./webroot') into "./webroot" }
    }
}
```

This will allow you to run and construct a distribution for deployment.

[1]:	API.md
[2]:	https://connie.openflexo.org/
[3]:	https://connie.openflexo.org/
[4]:	https://www.typescriptlang.org
[5]:	API.md
[6]:	https://getmdl.io "Material Design Lite"
[7]:	https://getmdl.io/components/index.html#buttons-section
[8]:	https://getmdl.io/components/index.html#cards-section
[9]:	https://getmdl.io/components/index.html#layout-section/grid
[10]:	https://getmdl.io/components/index.html#layout-section/tabs
[11]:	http://google.github.io/material-design-icons/
[12]:	https://getmdl.io/components/index.html#lists-section
[13]:	https://getmdl.io/components/index.html#tables-section
[14]:	https://getmdl.io/components/index.html#textfields-section
[15]:	https://getmdl.io/components/index.html#textfields-section
[16]:	http://vertx.io/docs/vertx-web/java/#_serving_static_resources
[17]:	TechnologyAdatperRoutes.md
[18]:	ComplementJson.md
[19]:	ApplicationRoutes.md
[20]:	https://docs.gradle.org/current/userguide/application_plugin.html

[image-1]:	ServerTestApplication.png "Test Application"

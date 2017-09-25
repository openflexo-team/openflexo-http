
# OpenFlexo REST API

The OpenFlexo's HTTP server provides a REST API to access:

- resources in all resources centers
- apis from technology adapters:
	- federated models `FML`/`FML-RT` 
	- gina views `Gina`
	- diagrams `Diana`

It also provides a WebSocket API to handle connie expressions and updates the server.

## General view

Each REST object provided by the server will contain: 

- `id` is the internal id for the object, 
- `type` gives information concerning it's type,
- `url` provide a path to access the object,
- a `name` if it exists and
- a series of properties specific to the object.

The first 4 fields constitute a reference for an object. 
For instance, a `FlexoConceptInstance` refers to it `FlexoConcept` using a reference like so:

```json
"flexoConcept" : {
   "name" : "Directory",
   "id" : "11",
   "url" : "/ta/fml/model/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5L0RlbW8uZm1s/object/11",
   "type" : "FlexoConcept"
}
```

## Resource Centers

The registered resource centers are presented with the prefix: `/rc`.

**Note**: The TypeScript definition file for the resource centers is 
[here](https://github.com/openflexo-team/openflexo-http/blob/1.8.1/http-server/src/main/resources/webroot/js/openflexo/api/resource.ts).

### Get

- Get on **`/rc`**  lists of resource centers, for instance:

```json
[{
   "name" : "demo",
   "type" : "ResourceCenter",
   "uri" : "http://www.openflexo.org/projects/2017/9/Untitled_1505918219989",
   "id" : "aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5",
   "url" : "/rc/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5",
   "resourceUrl" : "/rc/aHR0cDovL3d3dy5vcGVuZmxleG8ub3JnL3Byb2plY3RzLzIwMTcvOS9VbnRpdGxlZF8xNTA1OTE4MjE5OTg5/resource"
 }, {
  "name" : "http://openflexo.org/docx-test",
  "type" : "ResourceCenter",
  "uri" : "http://openflexo.org/docx-test",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0/resource"
}, {
  "name" : "http://openflexo.org/excel-test",
  "type" : "ResourceCenter",
  "uri" : "http://openflexo.org/excel-test",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZXhjZWwtdGVzdA",
  "url" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZXhjZWwtdGVzdA",
  "resourceUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZXhjZWwtdGVzdA/resource"
}]
```

- Get on **`/rc/{rc_id}`** returns the information for resource center with given id.

Example results for `/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0`:

```json
{
  "name" : "http://openflexo.org/docx-test",
  "type" : "ResourceCenter",
  "uri" : "http://openflexo.org/docx-test",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0/resource"
}
```

- Get on **`/rc/{rc_id}/resource{path}`** lists of resources for resource center with given id.

Example results for `/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0/resource`:

```json
[{
  "name" : "Step3-alter-MSWord.docx",
  "type" : "Resource",
  "uri" : "http://openflexo.org/docx-test/TestResourceCenter/HeterogeneousDocumentEdition2/Step3-alter-MSWord.docx",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9IZXRlcm9nZW5lb3VzRG9jdW1lbnRFZGl0aW9uMi9TdGVwMy1hbHRlci1NU1dvcmQuZG9jeA",
  "modified" : false,
  "resourceCenterId" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceCenterUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9IZXRlcm9nZW5lb3VzRG9jdW1lbnRFZGl0aW9uMi9TdGVwMy1hbHRlci1NU1dvcmQuZG9jeA",
  "contentUrl" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9IZXRlcm9nZW5lb3VzRG9jdW1lbnRFZGl0aW9uMi9TdGVwMy1hbHRlci1NU1dvcmQuZG9jeA/contents",
  "technologyAdapterId" : "docx",
  "technologyAdapterUrl" : "/ta/docx"
}, {
  "name" : "Step2.docx",
  "type" : "Resource",
  "uri" : "http://openflexo.org/docx-test/TestResourceCenter/MSWordDocumentEdition/Step2.docx",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9NU1dvcmREb2N1bWVudEVkaXRpb24vU3RlcDIuZG9jeA",
  "modified" : false,
  "resourceCenterId" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceCenterUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9NU1dvcmREb2N1bWVudEVkaXRpb24vU3RlcDIuZG9jeA",
  "contentUrl" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9NU1dvcmREb2N1bWVudEVkaXRpb24vU3RlcDIuZG9jeA/contents",
  "technologyAdapterId" : "docx",
  "technologyAdapterUrl" : "/ta/docx"
}]
```

Example results for `/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0/resource/TestResourceCenter`:

```json
[ {
  "name" : "DocumentWithImage.docx",
  "type" : "Resource",
  "uri" : "http://openflexo.org/docx-test/TestResourceCenter/DocumentWithImage.docx",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9Eb2N1bWVudFdpdGhJbWFnZS5kb2N4",
  "modified" : false,
  "resourceCenterId" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceCenterUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9Eb2N1bWVudFdpdGhJbWFnZS5kb2N4",
  "contentUrl" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9Eb2N1bWVudFdpdGhJbWFnZS5kb2N4/contents",
  "technologyAdapterId" : "docx",
  "technologyAdapterUrl" : "/ta/docx"
}, {
  "name" : "DocumentWithManyTables.docx",
  "type" : "Resource",
  "uri" : "http://openflexo.org/docx-test/TestResourceCenter/DocumentWithManyTables.docx",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9Eb2N1bWVudFdpdGhNYW55VGFibGVzLmRvY3g",
  "modified" : false,
  "resourceCenterId" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceCenterUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9Eb2N1bWVudFdpdGhNYW55VGFibGVzLmRvY3g",
  "contentUrl" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9Eb2N1bWVudFdpdGhNYW55VGFibGVzLmRvY3g/contents",
  "technologyAdapterId" : "docx",
  "technologyAdapterUrl" : "/ta/docx"
} ]
```

## Resources 

The resources in all resource centers are presented with the prefix `/resource`.
One resource can be accessed using it's URI encoded in Base64 to avoid forbidden characters in URLs. 

Here is an example:

- uri: `http://openflexo.org/docx-test/TestResourceCenter/TestLibraryViewPoint2.fml/LibraryVirtualModel.fml`
- id: `aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9UZXN0TGlicmFyeVZpZXdQb2ludDIuZm1sL0xpYnJhcnlWaXJ0dWFsTW9kZWwuZm1s`
      
A resource is described with several properties:
- `loaded` thats indicate if the resource has been loaded. 
- A resource description indicates if the resource is loaded or not with the `loaded` property. 

**Note**: The TypeScript definition file for the resources is 
[here](https://github.com/openflexo-team/openflexo-http/blob/1.8.1/http-server/src/main/resources/webroot/js/openflexo/api/resource.ts).

### Get

- Get on **`/resource`** lists of all resources in all resource centers.

Example results for `/resource`:

```json
[ {
    "name" : "LibraryVirtualModel",
    "type" : "Resource",
    "uri" : "http://openflexo.org/docx-test/TestResourceCenter/TestLibraryViewPoint2.fml/LibraryVirtualModel.fml",
    "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9UZXN0TGlicmFyeVZpZXdQb2ludDIuZm1sL0xpYnJhcnlWaXJ0dWFsTW9kZWwuZm1s",
    "modified" : false,
    "loaded" : false,
    "resourceCenterId" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
    "resourceCenterUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
    "url" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9UZXN0TGlicmFyeVZpZXdQb2ludDIuZm1sL0xpYnJhcnlWaXJ0dWFsTW9kZWwuZm1s",
    "contentUrl" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9UZXN0TGlicmFyeVZpZXdQb2ludDIuZm1sL0xpYnJhcnlWaXJ0dWFsTW9kZWwuZm1s/contents",
    "technologyAdapterId" : "fml",
    "technologyAdapterUrl" : "/ta/fml",
    "objectsUrl" : "/ta/fml/model/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RSZXNvdXJjZUNlbnRlci9UZXN0TGlicmFyeVZpZXdQb2ludDIuZm1sL0xpYnJhcnlWaXJ0dWFsTW9kZWwuZm1s/object"
} ]
```

- Get on **`/resource/{resource_id}`** retrieves information for one resource with given id.

- Get on **`/resource/{resource_id}/contents`** retrieves raw content for the resource with given id.

### Post

- Post on **`/resource/{resource_id}`** will **save** the resource with the given id.

## Technology adapters

All found technology adapters are presented with the prefix: `/ta`.

**Note**: The TypeScript definition file for the technology adapter description is 
[here](https://github.com/openflexo-team/openflexo-http/blob/1.8.1/http-server/src/main/resources/webroot/js/openflexo/api/resource.ts).

### Get

- Get on **`/ta`** lists of technology adapters

Example results for `/ta`:

```json
[ {
  "name" : "FML technology adapter",
  "type" : "TechnologyAdapter",
  "id" : "fml",
  "activated" : true,
  "url" : "/ta/fml",
  "complemented" : true,
  "virtualModelResourceUrl" : "/ta/fml/model"
}, {
  "name" : "FML@runtime technology adapter",
  "type" : "TechnologyAdapter",
  "id" : "fmlrt",
  "activated" : true,
  "url" : "/ta/fmlrt",
  "complemented" : true,
  "fmlrtVirtualModelInstanceResourceUrl" : "/ta/fmlrt/instance"
}, {
  "name" : "DocX Technology Adapter",
  "type" : "TechnologyAdapter",
  "id" : "docx",
  "activated" : true,
  "url" : "/ta/docx",
  "complemented" : false
}, {
  "name" : "Excel technology adapter",
  "type" : "TechnologyAdapter",
  "id" : "xls",
  "activated" : true,
  "url" : "/ta/xls",
  "complemented" : false
}, {
  "name" : "GINA Technology Adapter",
  "type" : "TechnologyAdapter",
  "id" : "gina",
  "activated" : true,
  "url" : "/ta/gina",
  "complemented" : false
} ]
```

- Get on **`/ta/{id}`** retrieves information for the technology adapter of given id

### Complements

When a technology adapters provides specific objects by implementing a `TechnologyAdapterRouteComplement` it sets the `complemented` field to true.
It may also provide new routes for new objects. The next sections are technology adapter complements. 

Resources that are complemented by a technology adapter will contains two more attributes:
- `objectsUrl` that contains the url for the list of all objects contained in the resource. 
- `modelUrl` that presents the root object of the resource. It's present only if the resource is loaded.

If the resource isn't `loaded`, an access to one of it's objects or to the list of all the objects will automatically load it.
Thus if there is no technology adapter complement for a given resource, it will never be loaded. 

See how to complement a technology adapter [here](ComplementTA.md).

## FML


The FML complement adds the route `/ta/fml/model` to list all virtual models found in the resource centers.

**Note**: The TypeScript definition file for the FML is 
[here](https://github.com/openflexo-team/openflexo-http/blob/1.9.0/http-server/src/main/resources/webroot/js/openflexo/api/fml.d.ts).

### Get

**TODO**

## FML@runtime

**TODO**

**Note**: The TypeScript definition file for the FML@Runtime is 
[here](https://github.com/openflexo-team/openflexo-http/blob/1.9.0/http-server/src/main/resources/webroot/js/openflexo/api/fml.d.ts).

## Gina

**TODO**

**Note**: The TypeScript definition file for the Fib Components is 
[here](https://github.com/openflexo-team/openflexo-http/blob/1.9.0/http-server/src/main/resources/webroot/js/openflexo/api/fib.d.ts).

## Diana

Diana isn't implemented yet.



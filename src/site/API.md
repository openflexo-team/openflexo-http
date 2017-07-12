
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
    "name" : "Hub",
    "id" : "6",
    "type" : "FlexoConcept",
    "url" : "/ta/fml/virtualmodel/aHR0cDovL3d3dy5jeWFuZS5ldS9jYXJib3NvdXJjZS9Nb2RlbGlzYXRpb24udmlld3BvaW50L0luc3RhbGxhdGlvbg/object/6"
}
```


## Resource Centers

The registered resource centers are presented with the prefix: `/rc`.

### Get

- Get on **`/rc`**  lists of resource centers, for instance:

```json
[{
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

### Get

- Get on **`/resource`** lists of all resources in all resource centers.

Example results for `/resource`:

```json
[ {
  "name" : "TestLibraryViewPoint",
  "type" : "Resource",
  "uri" : "http://openflexo.org/docx-test/TestLibraryViewPoint",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50",
  "modified" : false,
  "resourceCenterId" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceCenterUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50",
  "contentUrl" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50/contents",
  "technologyAdapterId" : "fml",
  "technologyAdapterUrl" : "/ta/fml",
  "modelUrl" : "/ta/fml/viewpoint/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50/object/2"
}, {
  "name" : "DocumentVirtualModel",
  "type" : "Resource",
  "uri" : "http://openflexo.org/docx-test/TestLibraryViewPoint/DocumentVirtualModel",
  "id" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50L0RvY3VtZW50VmlydHVhbE1vZGVs",
  "modified" : false,
  "resourceCenterId" : "aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "resourceCenterUrl" : "/rc/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0",
  "url" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50L0RvY3VtZW50VmlydHVhbE1vZGVs",
  "contentUrl" : "/resource/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50L0RvY3VtZW50VmlydHVhbE1vZGVs/contents",
  "technologyAdapterId" : "fml",
  "technologyAdapterUrl" : "/ta/fml",
  "modelUrl" : "/ta/fml/virtualmodel/aHR0cDovL29wZW5mbGV4by5vcmcvZG9jeC10ZXN0L1Rlc3RMaWJyYXJ5Vmlld1BvaW50L0RvY3VtZW50VmlydHVhbE1vZGVs/object/1"
}]
```

- Get on **`/resource/{resource_id}`** retrieves information for one resource with given id.

- Get on **`/resource/{resource_id}/contents`** retrieves raw content for the resource with given id.

### Post

- Post on **`/resource/{resource_id}`** will **save** the resource with the given id.

## Technology adapters

All found technology adapters are presented with the prefix: `/ta`.

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
  "VirtualModelResourceUrl" : "/ta/fml/virtualmodel",
  "ViewPointResourceUrl" : "/ta/fml/viewpoint"
}, {
  "name" : "FML@runtime technology adapter",
  "type" : "TechnologyAdapter",
  "id" : "fmlrt",
  "activated" : true,
  "url" : "/ta/fmlrt",
  "complemented" : true,
  "ViewResourceUrl" : "/ta/fmlrt/view",
  "VirtualModelInstanceResourceUrl" : "/ta/fmlrt/vmi"
}, {
  "name" : "DocX Technology Adapter",
  "type" : "TechnologyAdapter",
  "id" : "docx",
  "activated" : true,
  "url" : "/ta/docx",
  "complemented" : false
}]
```

- Get on **`/ta/{id}`** retrieves information for the technology adapter of given id

If a technology adapters provides 

## FML

**TODO**

## FML@runtime

**TODO**

## Gina

Gina isn't implemented yet.

## Diana

Diana isn't implemented yet.



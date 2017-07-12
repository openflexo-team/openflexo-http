
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

Resource centers are presented with the prefix: `/rc`.

### Get

- Get on **`/rc`**  returns the list of resource centers, for instance:

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

- Get on **`/rc/{rc_id}`:** returns the information for resource center with given id.

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

- Get on **`/rc/{rc_id}/resource{path}`:** returns the list of resources for resource center with given id.

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

Resources are presented with the prefix `/resource`

### Get

- **`/resource`:** List of all resources

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

## Resources

- **`/resource/{resource_id}`:** Information for resource with given id in the given resource center.

Example results for `/rc/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03`:

```json 
{
    "name": "Animals.diagram", "uri": "http://animals", "version": "0.1", "type": "Diagram",
    "id": "af8bca0b3983d28a03", "url": "/rc/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03",
    "contentUrl": "/rc/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03/contents"
}
```

- **`/resource/{resource_id}/contents`**: Raw content for the resource with given id.

Example results for `/resource/af8bca0b3983d28a03/contents`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Diagram id="1" name="Animals" uri="http://www.agilebirds.com/openflexo/ViewPoints/Basic/BasicOntology.owl/DiagramSpecification/DiagramSpecification.diagramspecification/Animals" userID="FLX">
  <DrawingGraphicalRepresentation id="2" width="1000.0" height="1000.0" drawWorkingArea="true" selectionColor="0,0,255" 
        focusColor="255,0,0" backgroundColor="255,255,255" identifier="root" layer="0" hasText="true" isMultilineAllowed="false" 
        continuousTextEditing="true" relativeTextX="0.5" relativeTextY="0.5" absoluteTextX="0.0" absoluteTextY="0.0" textAlignment="CENTER" 
        isSelectable="true" isFocusable="true" drawControlPointsWhenFocused="true" drawControlPointsWhenSelected="true" isReadOnly="false" 
        isLabelEditable="true" isVisible="true" userID="FLX">
...
```

## Technology adapters

- **`/ta`:** List of technology adapters

Example results for `/ta`:

```json
[ 
  { "name": "FML technology adapter", "id": "org.openflexo.foundation.fml.FMLTechnologyAdapter", 
    "type" : "TechnologyAdapter", "url": "/ta/org.openflexo.foundation.fml.FMLTechnologyAdapter"},
  { "name": "FML@runtime technology adapter", "id": "org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter", 
    "type" : "TechnologyAdapter", "url": "/ta/org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter"},
  { "name" : "DocX Technology Adapter", "id" : "org.openflexo.technologyadapter.docx.DocXTechnologyAdapter",
    "type" : "TechnologyAdapter", "url" : "/ta/org.openflexo.technologyadapter.docx.DocXTechnologyAdapter" }
]
```

- **`/ta/{id}`:** Information for the technology adapter of given id

Example results for `/ta/org.openflexo.foundation.fml.rt.FMLRTTechnologyAdapter`:

```json
{
  "name": "FML technology adapter", "id": "org.openflexo.foundation.fml.FMLTechnologyAdapter",
  "url": "/ta/org.openflexo.foundation.fml.FMLTechnologyAdapter", "activated": true,
  "type" : "TechnologyAdapter"
}
```

Each technology adapter presents a series of standard entries for resources, actions and models...

**ToDo**

A technology adapter can also provide new API entries using the interface `To Be Defined`

## FML



## FML@runtime

## Gina

## Diana

## Excel

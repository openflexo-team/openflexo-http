
# OpenFlexo REST API

The OpenFlexo's HTTP server provides a REST API to access:

- resources in all resources centers
- apis from technology adapters:
	- federated models `FML`/`FML-RT` 
	- gina views `Gina`
	- diagrams `Diana`
- connie expressions

## Resource Centers

- **`/rc`:** List of resource centers

```json
[ 
  { "name": "Demo resource center", "uri": "http://www.openflexo.org/demos-rc", 
    "id": "347d5ab625ede4b9d7", "url":"/rc/347d5ab625ede4b9d7" },
  { "name": "Demo resource center", "uri": "http://www.openflexo.org/http", 
    "id": "2e7661e55f3631cbce", "url":"/rc/2e7661e55f3631cbce" }  
]
```

- **`/rc/{rc_id}`:** Information for resource center with given id.

Example results for `/rc/347d5ab625ede4b9d7`:

```json
{ 
  "name": "Demo resource center", "uri": "http://www.openflexo.org/demos-rc",
  "id": "347d5ab625ede4b9d7", "url":"/rc/347d5ab625ede4b9d7",
  "enable_resource_center": false, "allows_edit": true, 
  "allows_publish": true, "watch_resource_center_every": 2
}
```

## Resources lists for center

- **`/rc/{rc_id}/resource{path}`:** List of resources for resource center with given id.

Example results for `/rc/347d5ab625ede4b9d7/resource`:

```json
[ 
  { "name": "Animals.diagram", "uri": "http://animals", "version": "0.1", "type": "Diagram",
    "id": "af8bca0b3983d28a03", "url": "/rc/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03" },
  { "name": "People.diagram", "uri": "http://people", "version": "0.5", "type": "Diagram",
    "id": "db835d8f1a32e5234c", "url": "/rc/347d5ab625ede4b9d7/resource/db835d8f1a32e5234c" }
]
```

Example results for `/rc/347d5ab625ede4b9d7/resource/ViewPointRC/EMF/Cities`:

```json
[ 
  { "name": "CityMapping", "uri": "http://simpleVP/CityMapping", "version": "0.2", "type": "EMF",
    "id": "f455f327a9f3a57de0", "url": "/rc/347d5ab625ede4b9d7/resource/f455f327a9f3a57de0" },
  { "name": "CityViews", "uri": "http://simpleVP/CityViews", "version": "0.2", "type": "EMF",
    "id": "890822e1ec66f5b1a6", "url": "/rc/347d5ab625ede4b9d7/resource/890822e1ec66f5b1a6" }
]
```

## Resources list

- **`/resource`:** List of all resources

Example results for `/resource`:

```json
[ 
  { "name": "Animals.diagram", "uri": "http://animals", "version": "0.1", "type": "Diagram",
    "id": "af8bca0b3983d28a03", "url": "/rc/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03" },
  { "name": "People.diagram", "uri": "http://people", "version": "0.5", "type": "Diagram",
    "id": "db835d8f1a32e5234c", "url": "/rc/347d5ab625ede4b9d7/resource/db835d8f1a32e5234c" }
  { "name": "CityMapping", "uri": "http://simpleVP/CityMapping", "version": "0.2", "type": "EMF",
    "id": "f455f327a9f3a57de0", "url": "/rc/347d5ab625ede4b9d7/resource/f455f327a9f3a57de0" },
  { "name": "CityViews", "uri": "http://simpleVP/CityViews", "version": "0.2", "type": "EMF",
    "id": "890822e1ec66f5b1a6", "url": "/rc/347d5ab625ede4b9d7/resource/890822e1ec66f5b1a6" }
]
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

<!--markpress-opt
{
	"layout": "horizontal",
	"autoSplit": true,
	"sanitize": false,
	"theme": "light",
	"noEmbed": false
}
markpress-opt-->

# OpenFlexo HTTP services

> Project `openflexo-server` adds to OpenFlexo a set of HTTP capabilities including a HTTP REST server and serveral clients.


# REST Server

- resources in all resources centers
- apis from technology adapters:
	- federated models `FML`/`FML-RT` 
	- gina views `Gina`
	- diagrams `Diana`
- connie expressions

# Resource Centers

- **`/center`:** List of resource centers

```json
[ 
  { "name": "Demo resource center", "uri": "http://www.openflexo.org/demos-rc", 
    "id": "347d5ab625ede4b9d7", "url":"/center/347d5ab625ede4b9d7" },
  { "name": "Demo resource center", "uri": "http://www.openflexo.org/http", 
    "id": "2e7661e55f3631cbce", "url":"/center/2e7661e55f3631cbce" }  
]
```

- **`/center/{center_id}`:** Information for resource center with given id.

Example results for `/center/347d5ab625ede4b9d7`:

```json
{ 
  "name": "Demo resource center", "uri": "http://www.openflexo.org/demos-rc",
  "id": "347d5ab625ede4b9d7", "url":"/center/347d5ab625ede4b9d7",
  "enable_resource_center": false, "allows_edit": true, 
  "allows_publish": true, "watch_resource_center_every": 2
}
```

# Resources lists

- **`/center/{center_id}/resource{path}`:** List of resources for resource center with given id.

Example results for `/center/347d5ab625ede4b9d7/resource`:

```json
[ 
  { "name": "Animals.diagram", "uri": "http://animals", "version": "0.1", "type": "Diagram",
    "id": "af8bca0b3983d28a03", "url": "/center/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03" },
  { "name": "People.diagram", "uri": "http://people", "version": "0.5", "type": "Diagram",
    "id": "db835d8f1a32e5234c", "url": "/center/347d5ab625ede4b9d7/resource/db835d8f1a32e5234c" }
]
```

Example results for `/center/347d5ab625ede4b9d7/resource/ViewPointRC/EMF/Cities`:

```json
[ 
  { "name": "CityMapping", "uri": "http://simpleVP/CityMapping", "version": "0.2", "type": "EMF",
    "id": "f455f327a9f3a57de0", "url": "/center/347d5ab625ede4b9d7/resource/f455f327a9f3a57de0" },
  { "name": "CityViews", "uri": "http://simpleVP/CityViews", "version": "0.2", "type": "EMF",
    "id": "890822e1ec66f5b1a6", "url": "/center/347d5ab625ede4b9d7/resource/890822e1ec66f5b1a6" }
]
```

# Resources

- **`/center/{center_id}/resource/{resource_id}`:** Information for resource with given id in the given resource center.

Example results for `/center/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03`:

```json 
{
    "name": "Animals.diagram", "uri": "http://animals", "version": "0.1", "type": "Diagram",
    "id": "af8bca0b3983d28a03", "url": "/center/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03" 
}
```

- **`/center/{center_id}/resource/{resource_id}/contents`**: Raw content for the resource with given id.

Example results for `/center/347d5ab625ede4b9d7/resource/af8bca0b3983d28a03/contents`:

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

# Technology adapters

- **`/ta`:** List of technology adapters

Example results for `/ta`:

```json
[ { "name": "FML technology adapter", "id": "fml", "url": "/ta/fml"},
  { "name": "FML@runtime technology adapter", "id": "fml-rt", "url": "/ta/fml-rt"},
  { "name": "GINA Technology Adapter", "id": "gina", "url": "/ta/gina"},
  { "name": "Excel technology adapter", "id": "xls", "url": "/ta/xls"}]
```

- **`/ta/{id}`:** Information for the technology adapter of given id

Example results for `/ta/fml`:

```json
{
  "name": "FML technology adapter", "id": "fml", "url": "/ta/fml"
}
```

# REST Client

- retrieves `FML` objects from URLs

# XML-RPC Client

TODO

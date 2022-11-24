package org.openflexo.http.server.core.serializers;

import io.vertx.core.json.JsonObject;
import org.openflexo.foundation.FlexoObject;
import org.openflexo.foundation.FlexoProject;
import org.openflexo.foundation.fml.*;
import org.openflexo.foundation.fml.rt.FlexoConceptInstance;
import org.openflexo.foundation.fml.rt.VirtualModelInstance;
import org.openflexo.foundation.resource.FlexoResource;
import org.openflexo.foundation.resource.FlexoResourceCenter;
import org.openflexo.foundation.resource.ResourceData;
import org.openflexo.foundation.resource.ResourceRepository;
import org.openflexo.foundation.technologyadapter.TechnologyAdapter;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterResource;
import org.openflexo.foundation.technologyadapter.TechnologyAdapterResourceRepository;
import org.openflexo.http.server.core.TechnologyAdapterRouteComplement;
import org.openflexo.http.server.core.TechnologyAdapterRouteService;
import org.openflexo.http.server.util.IdUtils;
import org.openflexo.http.server.util.ResourceRestService;
import org.openflexo.http.server.util.ResourceUtils;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * A class for defining Json serializers
 *
 * @author Ihab Benamer
 */
public class JsonSerializer {

    /** Map of technology adapters to corresponding {@link TechnologyAdapterRouteComplement} */
    private final static Map<TechnologyAdapter<?>, TechnologyAdapterRouteComplement> complementMap = new LinkedHashMap<>();
    /** Map of registered {@link org.openflexo.http.server.util.PamelaResourceRestService}s for each technology adapters */
    private final static Map<TechnologyAdapter<?>, List<ResourceRestService>> restServices = new HashMap<>();

    /**
     * It takes a FlexoProject and returns a JsonObject that contains the project's name, uri, id, and resource center id
     *
     * @param project the project to serialize
     * @return A JsonObject
     */
    public static JsonObject projectSerializer(FlexoProject<?> project) {
        String uri          = project.getProjectURI();
        String id           = IdUtils.encodeuri(uri);
        JsonObject result   = new JsonObject();

        result.put("name", project.getDisplayableName());
        result.put("resource_type", "Project");
        result.put("uri", uri);
        result.put("id", id);
        result.put("resource_center_id", project.getResourceCenter().getFlexoID());

        return result;
    }

    /**
     * It takes a VirtualModel object and returns a JsonObject that contains the name, resource_type, uri, id, visibility,
     * and is_abstract fields
     *
     * @param virtualModel The VirtualModel object that you want to serialize.
     * @return A JsonObject
     */
    public static JsonObject virtualModelSerializer(VirtualModel virtualModel) {
        String uri          = virtualModel.getURI();
        String id           = IdUtils.encodeuri(uri);
        JsonObject result   = new JsonObject();

        result.put("name", virtualModel.getName());
        result.put("resource_type", "VirtualModel");
        result.put("uri", uri);
        result.put("id", id);
        result.put("visibility", virtualModel.getVisibility());
        result.put("is_abstract", virtualModel.isAbstract());

        return result;
    }

    /**
     * It takes a PrimitiveRole object and returns a JsonObject
     *
     * @param role the role to serialize
     * @return A JsonObject
     */
    public static JsonObject primitivePropertySerializer(PrimitiveRole<?> role) {
        JsonObject result = new JsonObject();

        result.put("name", role.getRoleName());
        result.put("resource_type", "PrimitiveProperty");
        result.put("cardinality", role.getCardinality());
        result.put("type", role.getPrimitiveType());
        result.put("virtual_model_id", IdUtils.encodeuri(role.getDeclaringVirtualModel().getURI()));

        return result;
    }

    /**
     * It takes a FlexoBehaviour object and returns a JsonObject that contains all the information that we want to send to
     * the client
     *
     * @param behaviour the behaviour to serialize
     * @return A JsonObject
     */
    public static JsonObject behaviourSerializer(FlexoBehaviour behaviour){
        JsonObject result = new JsonObject();

        result.put("name", behaviour.getName());
        result.put("resource_type", "Behaviour");
        result.put("id", behaviour.getURI());
        result.put("type", behaviour.getFlexoBehaviourType().getTypeName());
        result.put("visibility", behaviour.getVisibility());
        result.put("is_abstract", behaviour.isAbstract());
        result.put("description", behaviour.getDescription());
        result.put("signature", behaviour.getSignature());
        result.put("virtual_model_id", IdUtils.encodeuri(behaviour.getDeclaringVirtualModel().getURI()));

        return result;
    }

    /**
     * It takes a FlexoBehaviourParameter object and returns a JsonObject that contains all the information about the
     * parameter
     *
     * @param parameter the parameter to serialize
     * @return A JsonObject
     */
    public static JsonObject behaviourParameterSerializer(FlexoBehaviourParameter parameter){
        JsonObject result = new JsonObject();

        result.put("name", parameter.getName());
        result.put("resource_type", "BehaviourParameter");
        result.put("type", parameter.getType().getTypeName());
        result.put("default_value", parameter.getDefaultValue().toString());
        result.put("is_required", parameter.getIsRequired());
        result.put("description", parameter.getDescription());
        result.put("behaviour_id", IdUtils.encodeuri(parameter.getBehaviour().getURI()));

        return result;
    }

    /**
     * It takes a FlexoConcept and returns a JsonObject
     *
     * @param concept the concept to serialize
     * @return A JsonObject
     */
    public static JsonObject conceptSerializer(FlexoConcept concept) {
        JsonObject result           = new JsonObject();

        result.put("id", concept.getName());
        result.put("name", concept.getName());
        result.put("uri", concept.getURI());
        result.put("resource_type", "Concept");
        result.put("visibility", concept.getVisibility().toString());
        result.put("parent_concepts", concept.getParentFlexoConcepts().size());
        result.put("is_required", concept.isAbstract());
        result.put("description", concept.getDescription());
        result.put("behaviour_id", IdUtils.encodeuri(concept.getURI()));

        return result;
    }

    /**
     * It takes a VirtualModelInstance object and returns a JsonObject that contains the name, uri, resource_type, title,
     * and virtual_model_uri of the VirtualModelInstance
     *
     * @param instance the VirtualModelInstance object to serialize
     * @return A JsonObject
     */
    public static JsonObject virtualModelInstanceSerializer(VirtualModelInstance instance) {
        JsonObject result           = new JsonObject();

        result.put("name", instance.getName());
        result.put("uri", instance.getURI());
        result.put("resource_type", "VirtualModelInstance");
        result.put("title", instance.getTitle());
        result.put("virtual_model_uri", instance.getVirtualModel().getURI());

        return result;
    }

    /**
     * It takes a FlexoConceptInstance and returns a JsonObject that contains the FlexoConceptInstance's flexoID, resource
     * type, and concept URI
     *
     * @param instance the instance of the concept to serialize
     * @return A JsonObject
     */
    public static JsonObject conceptInstanceSerializer(FlexoConceptInstance instance) {
        JsonObject result           = new JsonObject();

        result.put("flexo_id", instance.getFlexoID());
        result.put("resource_type", "FlexoConceptInstance");
        result.put("concept_uri", instance.getFlexoConceptURI());

        return result;
    }

    public static JsonObject getCenterDescription(FlexoResourceCenter<?> center) {
        String uri = center.getDefaultBaseURI();
        String id = IdUtils.encodeuri(uri);
        JsonObject centerDescription = new JsonObject();
        centerDescription.put("name", center.getDisplayableName());
        centerDescription.put("type", "ResourceCenter");
        centerDescription.put("uri", uri);
        centerDescription.put("id", id);
        centerDescription.put("url", "/rc/" + id);
        centerDescription.put("resourceUrl", "/rc/" + id + "/resource");
        return centerDescription;
    }

    public static JsonObject getRepositoryDescription(ResourceRepository<?, ?> repository) {
        String uri = repository.getDefaultBaseURI();
        String id = IdUtils.encodeuri(uri);
        JsonObject description = new JsonObject();
        description.put("name", repository.getDisplayableName());
        description.put("type", "ResourceRepository");
        description.put("uri", uri);
        description.put("id", id);
        description.put("url", "/rc/" + id);
        description.put("resourceUrl", "/rc/" + id + "/resource");
        if (repository instanceof TechnologyAdapterResourceRepository) {
            String taId = IdUtils
                    .getTechnologyAdapterId(((TechnologyAdapterResourceRepository<?, ?, ?, ?>) repository).getTechnologyAdapter());
            description.put("technologyAdapterId", taId);
            description.put("technologyAdapterUrl", "/ta/" + taId);
        }
        return description;

    }

    public static JsonObject getFolderDescription(String name, String path, String rcId) {
        JsonObject folderDescription = new JsonObject();
        folderDescription.put("name", name);
        folderDescription.put("type", "Folder");
        String id = path + (path.endsWith("/") ? "" : "/") + name;
        folderDescription.put("id", id);

        String rcUrl = "/rc/" + rcId;
        folderDescription.put("url", rcUrl + "/resource" + id);
        folderDescription.put("resourceCenterId", rcId);
        folderDescription.put("resourceCenterUrl", rcUrl);
        return folderDescription;
    }

    public static JsonObject getResourceDescription(FlexoResource<?> resource, TechnologyAdapterRouteService service) {
        String uri = resource.getURI();
        String id = IdUtils.encodeuri(uri);
        JsonObject resourceDescription = new JsonObject();
        resourceDescription.put("name", resource.getName());
        resourceDescription.put("type", "Resource");
        resourceDescription.put("uri", uri);
        resourceDescription.put("id", id);
        resourceDescription.put("modified", resource.isModified());
        resourceDescription.put("loaded", resource.isLoaded());
        resourceDescription.put("hash", resource.hash());

        if (resource.getResourceCenter() != null) {
            String centerId = IdUtils.encodeuri(resource.getResourceCenter().getDefaultBaseURI());
            resourceDescription.put("resourceCenterId", centerId);
            resourceDescription.put("resourceCenterUrl", "/rc/" + centerId);
        }
        else {
            System.out.println("Resource '" + resource.getName() + "' has no rc.");
        }
        resourceDescription.put("url", "/resource/" + id);
        resourceDescription.put("contentUrl", "/resource/" + id + "/contents");
        if (resource instanceof TechnologyAdapterResource) {
            TechnologyAdapterResource<?, ?> technologyAdapterResource = (TechnologyAdapterResource<?, ?>) resource;
            TechnologyAdapter<?> technologyAdapter = technologyAdapterResource.getTechnologyAdapter();
            String taId = IdUtils.getTechnologyAdapterId(technologyAdapter);
            resourceDescription.put("technologyAdapterId", taId);
            resourceDescription.put("technologyAdapterUrl", "/ta/" + taId);

            String prefix = service.getPrefix(resource);
            if (prefix != null) {
                if (resource.isLoaded()) {
                    ResourceData<?> data = ResourceUtils.safeGetResourceOrNull(resource);
                    if (data instanceof FlexoObject) {
                        String url = IdUtils.getUrl(data, service);
                        if (url != null) {
                            resourceDescription.put("modelUrl", url);
                        }
                    }
                }
                resourceDescription.put("objectsUrl", prefix + "/" + id + "/object");
            }
        }
        return resourceDescription;
    }

    public static JsonObject getTechnologyAdapterDescription(String id, TechnologyAdapter<?> adapter, TechnologyAdapterRouteService service) {
        JsonObject result = new JsonObject();
        result.put("name", adapter.getName());
        result.put("type", "TechnologyAdapter");

        result.put("id", id);
        result.put("activated", adapter.isActivated());

        String url = "/ta/" + id;
        result.put("url", url);

        service.complementTechnologyAdapter(adapter, result);

        return result;
    }
}

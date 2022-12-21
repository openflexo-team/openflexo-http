package org.openflexo.http.server.core;


import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({
    TestResourceCenters.class, TestFlexoProjects.class, TestVirtualModels.class,
    TestEnums.class, TestFlexoConcepts.class, TestProperties.class,
    TestBehaviours.class, TestParameters.class, TestBehaviourActions.class,
    TestVirtualModelInstances.class, TestConceptInstances.class
})
public class IntegrationTestLauncher {

}

package org.openflexo.http.server.core;


import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({TestResourceCenters.class, TestFlexoProjects.class})
public class IntegrationTestLauncher {

}

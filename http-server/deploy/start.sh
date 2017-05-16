#!/bin/sh

java -cp `find libs | xargs | sed "s/ /:/g"` org.openflexo.http.server.OpenFlexoServer

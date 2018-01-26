/*
 * Copyright (c) 2013-2017, Openflexo
 *
 * This file is part of Flexo-foundation, a component of the software infrastructure
 * developed at Openflexo.
 *
 * Openflexo is dual-licensed under the European Union Public License (EUPL, either
 * version 1.1 of the License, or any later version ), which is available at
 * https://joinup.ec.europa.eu/software/page/eupl/licence-eupl
 * and the GNU General Public License (GPL, either version 3 of the License, or any
 * later version), which is available at http://www.gnu.org/licenses/gpl.html .
 *
 * You can redistribute it and/or modify under the terms of either of these licenses
 *
 * If you choose to redistribute it and/or modify under the terms of the GNU GPL, you
 * must include the following additional permission.
 *
 *           Additional permission under GNU GPL version 3 section 7
 *           If you modify this Program, or any covered work, by linking or
 *           combining it with software containing parts covered by the terms
 *           of EPL 1.0, the licensors of this Program grant you additional permission
 *           to convey the resulting work.
 *
 * This software is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE.
 *
 * See http://www.openflexo.org/license.html for details.
 *
 *
 * Please contact Openflexo (openflexo-contacts@openflexo.org)
 * or visit www.openflexo.org if you need additional information.
 *
 */

package org.openflexo.http.connector.model.xmlrpc;

import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.openflexo.connie.type.TypeUtils;
import org.openflexo.http.connector.model.ContentSupport;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.logging.FlexoLogger;

import de.timroes.axmlrpc.XMLRPCClient;

/**
 * 
 * @author sylvain
 *
 */
public class MapSupport implements ContentSupport<Map<?, ?>> {

	private static final Logger logger = FlexoLogger.getLogger(MapSupport.class.getPackage().toString());

	private HttpVirtualModelInstance owner;

	private Map<?, ?> map;

	private boolean complete = false;
	private long lastUpdated = -1l;

	public MapSupport(HttpVirtualModelInstance owner, Map<?, ?> map) {
		this.owner = owner;
		this.map = map;
		lastUpdated = System.nanoTime();
		complete = (map != null);

		for (Object key : map.keySet()) {
			System.out.println("key " + key + "[" + key.getClass().getSimpleName() + "]=" + map.get(key) + "["
					+ map.get(key).getClass().getSimpleName() + "]");
		}
	}

	private boolean needUpdate() {
		return (System.nanoTime() - lastUpdated) > (60 * 1_000_000_000l);
	}

	@Override
	public String getIdentifier() {
		return null;
	}

	@Override
	public boolean hasValue(String name) {
		return map.get(name) != null;
	}

	@Override
	public Object getValue(String name, Type type) {
		// System.out.println("getValue() name=" + name + " type=" + type);

		if (map.get(name) == null) {
			return null;
		}

		if (map.get(name) instanceof Boolean) {
			if ((type != Boolean.class) && (type != Boolean.TYPE)) {
				return null;
			}
		}

		if (map.get(name).getClass().isArray()) {
			// Hack for Odoo, is this generalizable ???
			// In this case, we are about to handle a reference to another object
			Object[] oList = (Object[]) map.get(name);
			if (oList != null && oList.length > 0) {
				// System.out.println("retrieve object with id " + oList[0]);
				return oList[0];
			}
		}
		/*if (type instanceof FlexoConceptInstanceType && map.get(name).getClass().isArray()) {
			// In this case, we are about to handle a reference to another object
			Object[] oList = (Object[]) map.get(name);
			if (oList != null && oList.length > 1) {
				System.out.println("retrieve object with id " + oList[0] + "(" + oList[1] + ")");
			}
		}*/

		/*if (name.equals("company_id")) {
			System.out.println("Tiens mon company_id c'est " + map.get(name) + " of " + map.get(name).getClass());
			if (map.get(name).getClass().isArray()) {
				Object[] oList = (Object[]) map.get(name);
				for (Object o : oList) {
					System.out.println("> " + o);
				}
			}
			return (T) new Integer(42);
		}*/

		return TypeUtils.castTo(map.get(name), type);

	}

	@Override
	public void setValue(String name, Object value) {
		System.out.println("setValue() name=" + name + " value=" + value);
		System.out.println("Not implemented");
	}

	public static void mainOld(String... prout) throws MalformedURLException/*, XmlRpcException*/ {

		// final XmlRpcClient client = new XmlRpcClient();

		URL url = new URL("https://odoo.openflexo.org");

		// final XmlRpcClientConfigImpl common_config = new XmlRpcClientConfigImpl();
		/*common_config.setServerURL(url = new URL(String.format("%s/xmlrpc/common", url)));
		System.out.println("url: " + url);
		System.out.println("version()");
		System.out.println(client.execute(common_config, "version", Collections.emptyList()));
		System.out.println("about()");
		System.out.println(client.execute(common_config, "about", Collections.emptyList()));*/

		// <?xml version="1.0"?>
		// <methodCall>
		// <methodName>about</methodName>
		// </methodCall>

		String userName = "admin@dynalec.fr";
		String db = "dynalec_openflexo";
		String passwd = "dynalec#2016";

		// int uid = (int) client.execute(common_config, "authenticate", Arrays.asList(db, userName, passwd, Collections.emptyMap()));

		// System.out.println("uid=" + uid);

		/* <?xml version="1.0"?>
		 <methodCall>
		    <methodName>authenticate</methodName>
		    <params>
		       <param>
		          <value>dynalec_openflexo</value>
		       </param>
		       <param>
		          <value>admin@dynalec.fr</value>
		       </param>
		       <param>
		          <value>dynalec#2016</value>
		       </param>
		      <param>
		  <array>
		    <data>
		   </data>
		    </array>
		      </param>
		     </params>
		 </methodCall> */

		// 'login', 'about', 'timezone_get', 'get_server_environment', 'login_message','get_stats', 'check_connectivity',
		// 'list_http_services', 'version', 'authenticate'

		// final XmlRpcClientConfigImpl models_config = new XmlRpcClientConfigImpl();
		// models_config.setServerURL(url = new URL(String.format("%s/xmlrpc/2/object", url)));

		// Map m = new HashMap();
		// m.put("raise_exception", false);

		// client.execute(models_config, "execute_kw",
		// Arrays.asList(db, uid, passwd, "res.partner", "check_access_rights", Arrays.asList("read")/*, m*/));

		/* <?xml version="1.0"?>
		 <methodCall>
		    <methodName>execute_kw</methodName>
		    <params>
		       <param>
		          <value>dynalec_openflexo</value>
		       </param>
		       <param>
		          <value><int>1</int></value>
		       </param>
		       <param>
		          <value>dynalec#2016</value>
		       </param>
		       <param>
		          <value>res.partner</value>
		       </param>
		       <param>
		          <value>check_access_rights</value>
		       </param>
		       <param>
		         <array>
		           <data>
		              <value>read</value>
		           </data>
		         </array>
		       </param>
		     </params>
		 </methodCall> */

	}

	public static void main(String[] args) throws Exception {
		URL urlCommon = new URL("https://odoo.openflexo.org/xmlrpc/common");

		XMLRPCClient common = new XMLRPCClient(urlCommon);
		System.out.println("Calling version");
		Object version = common.call("version");
		System.out.println(version);

		System.out.println("Calling about");
		Object about = common.call("about");
		System.out.println(about);

		System.out.println("Calling authenticate");
		String userName = "admin@dynalec.fr";
		String db = "dynalec_openflexo";
		String passwd = "dynalec#2016";

		int uid = (int) common.call("authenticate", db, userName, passwd, Collections.emptyMap());
		System.out.println(uid);

		URL urlObject = new URL("https://odoo.openflexo.org/xmlrpc/2/object");
		XMLRPCClient object = new XMLRPCClient(urlObject);

		System.out.println("Calling execute_kw");
		Object kw = object.call("execute_kw", db, uid, passwd, "res.partner", "check_access_rights", Arrays.asList("read"));
		System.out.println(kw);

		System.out.println("Calling execute_kw (search)");
		Object[] search = (Object[]) object.call("execute_kw", db, uid, passwd, "res.partner", "search",
				Arrays.asList(Arrays.asList(Arrays.asList("is_company", "=", true), Arrays.asList("customer", "=", true))));
		System.out.println(search);
		for (int i = 0; i < search.length; i++) {
			System.out.println("search[" + i + "]=" + search[i]);
		}

		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("offset", 10);
		map.put("limit", 5);
		System.out.println("Calling execute_kw (search with pagination)");
		Object[] search2 = (Object[]) object.call("execute_kw", db, uid, passwd, "res.partner", "search",
				Arrays.asList(Arrays.asList(Arrays.asList("is_company", "=", true), Arrays.asList("customer", "=", true))), map);
		System.out.println(search2);
		for (int i = 0; i < search2.length; i++) {
			System.out.println("search2[" + i + "]=" + search2[i]);
		}

		System.out.println("res.partner.size=" + object.call("execute_kw", db, uid, passwd, "res.partner", "search_count",
				Arrays.asList(Arrays.asList(Arrays.asList("is_company", "=", true), Arrays.asList("customer", "=", true)))));

		System.out.println("Calling search and read");
		Map<String, Integer> m2 = new HashMap<String, Integer>();
		m2.put("limit", 5);
		List<Object> ids = Arrays.asList((Object[]) object.call("execute_kw", db, uid, passwd, "res.partner", "search",
				Arrays.asList(Arrays.asList(Arrays.asList("is_company", "=", true), Arrays.asList("customer", "=", true)))), m2);
		System.out.println(ids);

		for (Object id : ids) {
			System.out.println("id=" + id + " of " + id.getClass());
		}

		// Map m = new HashMap();
		// Object returned = object.call("execute_kw", db, uid, passwd, "res.partner", "read",
		// Arrays.asList(Arrays.asList(Arrays.asList("is_company", "=", true), Arrays.asList("customer", "=", true))),
		// /*Arrays.asList(ids)*//*ids*/new HashMap());

		// System.out.println("returned=" + returned);*/

		Map<String, List<String>> map2 = new HashMap<String, List<String>>();
		map2.put("attributes", Arrays.asList("string", "help", "type", "company_id"));
		Object returned = object.call("execute_kw", db, uid, passwd, "res.partner", "fields_get", Collections.emptyList(), map2);

		System.out.println("returned=" + returned);
		System.out.println("returned is a " + returned.getClass());

		Map results = (Map) returned;

		for (Object key : results.keySet()) {
			System.out.println("Key " + key + " value=" + results.get(key) + " of " + results.get(key).getClass());
		}

		/*(Map<String, Map<String, Object>>)models.execute("execute_kw", asList(
			    db, uid, password,
			    "res.partner", "fields_get",
			    emptyList(),
			    new HashMap() {{
			        put("attributes", asList("string", "help", "type"));
			    }}
			));*/

		Map<String, Object> map3 = new HashMap<String, Object>();
		map3.put("fields", Arrays.asList("name", "country_id", "comment", "siren", "company_id"));
		map3.put("limit", 30);
		// map3.put("offset", 20);
		System.out.println("Calling execute_kw to retrieve some res.partners");
		Object[] searchAndRead = (Object[]) object.call("execute_kw", db, uid, passwd, "res.partner", "search_read", Collections.emptyList()
		/*Arrays.asList(Arrays.asList(Arrays.asList("is_company", "=", true), Arrays.asList("customer", "=", true)))*/, map3);
		System.out.println(searchAndRead);
		for (int i = 0; i < searchAndRead.length; i++) {
			System.out.println("searchAndRead[" + i + "]=" + searchAndRead[i]);
		}

		System.out.println("Now search company with id=1");
		Object[] foundObject = (Object[]) object.call("execute_kw", db, uid, passwd, "res.company", "search_read",
				Arrays.asList(Arrays.asList(Arrays.asList("id", "=", 1))), map3);
		System.out.println(foundObject);
		for (int i = 0; i < foundObject.length; i++) {
			System.out.println("foundObject[" + i + "]=" + foundObject[i]);
		}

	}

}

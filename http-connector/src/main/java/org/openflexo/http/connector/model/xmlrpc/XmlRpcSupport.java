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

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.openflexo.connie.type.TypeUtils;
import org.openflexo.http.connector.model.AccessPoint;
import org.openflexo.http.connector.model.ContentSupport;
import org.openflexo.http.connector.model.HttpVirtualModelInstance;
import org.openflexo.logging.FlexoLogger;

import com.fasterxml.jackson.core.JsonPointer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;

import de.timroes.axmlrpc.XMLRPCClient;

/**
 * Created by charlie on 17/05/2017.
 */
public class XmlRpcSupport implements ContentSupport {

	private static final Logger logger = FlexoLogger.getLogger(XmlRpcSupport.class.getPackage().toString());

	private final HttpVirtualModelInstance owner;

	private final String path;
	private ObjectNode source;
	private JsonPointer pointer;

	private boolean complete = false;
	private long lastUpdated = -1l;

	public XmlRpcSupport(HttpVirtualModelInstance owner, String path, ObjectNode source, JsonPointer pointer) {
		this.owner = owner;
		if (path == null && source != null) {

		}
		this.path = path;
		this.source = source;
		this.pointer = pointer;
		if (source != null) {
			lastUpdated = System.nanoTime();
		}
		complete = source != null;
	}

	private boolean needUpdate() {
		return (System.nanoTime() - lastUpdated) > (60 * 1_000_000_000l);
	}

	@Override
	public String getIdentifier() {
		return path;
	}

	@Override
	public <T> T getValue(String name, Type type) {
		update(false);
		if (source != null) {
			JsonNode node = source.get(name);
			if (node != null) {
				return convertNode(type, node);
			}
			else if (!complete) {
				update(true);
				node = source.get(name);
				if (node != null) {
					return convertNode(type, node);
				}
			}
		}
		return null;
	}

	@Override
	public void setValue(String name, Object value) {
		source.set(name, value != null ? TextNode.valueOf(value.toString()) : NullNode.getInstance());
	}

	private <T> T convertNode(Type type, JsonNode node) {
		// TODO work on conversion
		Object value = node.textValue();
		return TypeUtils.isAssignableTo(value, type) ? (T) value : null;
	}

	public void update(boolean force) {
		if (needUpdate() || force) {
			synchronized (this) {
				if (needUpdate() || force) {

					AccessPoint accessPoint = owner.getAccessPoint();
					String url = accessPoint.getUrl() + path;
					HttpGet httpGet = new HttpGet(url);
					accessPoint.contributeHeaders(httpGet);
					try (CloseableHttpResponse response = owner.getHttpclient().execute(httpGet);
							InputStream stream = response.getEntity().getContent()) {

						if (response.getStatusLine().getStatusCode() == 200) {
							ObjectMapper mapper = new ObjectMapper();
							JsonNode node = mapper.readTree(stream);
							if (pointer != null) {
								node = node.at(pointer);
							}

							if (node instanceof ObjectNode) {
								source = (ObjectNode) node;
							}
							else {
								logger.log(Level.SEVERE, "Read json from '" + url + "' isn't an object (" + node + ")");
							}
						}
						else {
							logger.log(Level.SEVERE, "Can't access '" + url + "': " + response.getStatusLine());
						}

					} catch (IOException e) {
						logger.log(Level.SEVERE, "Can't read '" + url + "'", e);
					} finally {
						complete = true;
						lastUpdated = System.nanoTime();
					}
				}
			}
		}
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

		Map map = new HashMap();
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
		Map m2 = new HashMap();
		m2.put("limit", 5);
		List ids = Arrays.asList((Object[]) object.call("execute_kw", db, uid, passwd, "res.partner", "search",
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

		Map map2 = new HashMap();
		map2.put("attributes", Arrays.asList("string", "help", "type"));
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

		Map map3 = new HashMap();
		map3.put("fields", Arrays.asList("name", "country_id", "comment"));
		map3.put("limit", 5);
		System.out.println("Calling execute_kw (search with pagination)");
		Object[] searchAndRead = (Object[]) object.call("execute_kw", db, uid, passwd, "res.partner", "search_read",
				Arrays.asList(Arrays.asList(Arrays.asList("is_company", "=", true), Arrays.asList("customer", "=", true))), map3);
		System.out.println(searchAndRead);
		for (int i = 0; i < searchAndRead.length; i++) {
			System.out.println("searchAndRead[" + i + "]=" + searchAndRead[i]);
		}

	}

}

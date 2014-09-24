package com.lib;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;

import com.form.User;

public class Jackson {
	
	static ObjectMapper mapper = new ObjectMapper(); // can reuse, share
														// globally
	static User user;

	public static void main(String[] args) throws Exception {
		
		user = mapper.readValue(new File("D:\\百度云同步盘\\code\\java\\petHospital\\src\\com\\lib\\user.json"), User.class);
		
		mapper.writeValue(new File("D:\\百度云同步盘\\code\\java\\petHospital\\src\\com\\lib\\user-modified.json"), user);
		
		Map<String,Object> userData = new HashMap<String,Object>();
		Map<String,String> nameStruct = new HashMap<String,String>();
		nameStruct.put("first", "Joe");
		nameStruct.put("last", "Sixpack");
		userData.put("name", nameStruct);
		userData.put("gender", "MALE");
		userData.put("verified", Boolean.FALSE);
		userData.put("userImage", "Rm9vYmFyIQ==");
		
		System.out.println(userData);
		mapper.writeValue(new File("D:\\百度云同步盘\\code\\java\\petHospital\\src\\com\\lib\\user-modified1.json"), userData);
		
		/**
		 *	JSON 					Type
		----------------------------------------------------------------------------
		-	Java Type
		-	object					LinkedHashMap<String,Object>
		-	array					ArrayList<Object>
		-	string					String
		-	number (no fraction)	Integer, Long or BigInteger (smallest applicable)
		-	number (fraction)		Double (configurable to use BigDecimal)
		-	true|false				Boolean
		-	null					null
		-*/
	}
	
}
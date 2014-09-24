package com.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.DTO.Owner;
import com.lib.DBHelper;

public class LoginDao {
	
	public static void main(String[] args){ }
	
	private final DBHelper dBHelper = new DBHelper();
	
	public List<Owner> executeOwnersQuery(String name, String password){
		List<Owner> owners = new ArrayList<Owner>();
		String sql = String.format("select * from owner m where m.name='%s' and m.password='%s' ",name, password );
		
		try {
			ResultSet rs = this.dBHelper.queryExecuteSQL(sql);
			if(rs.next()){
				Owner owner = new Owner();
//				owner.setAddress(rs.getString(int column));			//XXX
				owner.setAddress(rs.getString("address"));
				owner.setCity(rs.getString("city"));
				owner.setId(rs.getInt("id"));
				owner.setName(rs.getString("name"));
				owner.setPhone(rs.getString("phone"));
				
				owners.add(owner);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} //.executeQuery(sql);// (sql);
		
		return owners;
	}
}

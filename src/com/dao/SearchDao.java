package com.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.DTO.Doctor;
import com.DTO.Pet;
import com.DTO.PetsOwner;

public class SearchDao {
	
	/**
	 * search for pets by pets' name or owners' name
	 * @param petName
	 * @param ownerName
	 * @return
	 */
	public List<Pet> searchPets(String petName, String ownerName){
		
		if(petName.equals(null)&&ownerName.equals(null)){
			System.out.println("fuck,please input some infor");
			return null;
		}
		
		String _sql = "SELECT * FROM pets p "+
//		String _sql = "SELECT p.pet_name pet,p.pet_number petId,o.id ownerId,o.name owner FROM pets p "+
				"INNER JOIN pet_owner po ON p.pet_number=po.petId "+
				"INNER JOIN OWNER o ON o.id=po.ownerId ";
/*		if (!petName.equals("") && !ownerName.equals("")) {//TODO: the SQL was error
			_sql+=" where p.pet_name like '%"+petName+"%' or o.name like '%" + ownerName +"%'";
//			_sql+=" where p.pet_name = '"+petName+"' or o.name = '" + ownerName +"'";
		}else if(petName.equals("")&& !ownerName.equals("")){
			_sql+=" where p.pet_name = '"+petName +"'";
		}else if(ownerName.equals("")&& !petName.equals("")){
			_sql+=" where o.name = '"+ownerName +"'";
		}*/
		
		com.lib.DBHelper dbHelper = new com.lib.DBHelper();
		List<Pet> list = new ArrayList<Pet>();
		try {
			ResultSet rs = dbHelper.queryExecuteSQL(_sql);
			while(rs.next()){
				Pet pet = new Pet();
				pet.setBirthday(rs.getString("birthday"));
				pet.setName(rs.getString("pet_name"));
				pet.setNumber(rs.getInt("pet_number"));
				pet.setOwner_address(rs.getString("owner_address"));
				pet.setOwner_city(rs.getString("owner_city"));
				pet.setOwner_name(rs.getString("owner_name"));
				pet.setOwner_phone(rs.getString("owner_phone"));
				pet.setType(rs.getInt("type"));
				list.add(pet);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			dbHelper.closeConnection();
		}
		return list;
	}
	
	public List<Doctor> searchDoctors(String name, String major){
		String _sql = "SELECT * FROM doctor d ";
		if (!name.equals("") && !major.equals("")) {//TODO: the SQL was error
			_sql+=" where d.name = '"+name +"' or d.major = '" + major+ "'";
		}else if(name.equals("")&& !major.equals("")){
			_sql+=" where d.major = '"+major+ "'";
		}else if(major.equals("")&& !name.equals("")){
			_sql+=" where d.name = '"+name+ "'";
		}
		
		com.lib.DBHelper dbHelper = new com.lib.DBHelper();
		List<Doctor> list = new ArrayList<Doctor>();
		try {
			ResultSet rs = dbHelper.queryExecuteSQL(_sql);
			while(rs.next()){
				com.DTO.Doctor d = new com.DTO.Doctor();
				
				d.setId(rs.getInt("id"));
				d.setMajor(rs.getString("major"));
				d.setName(rs.getString("name"));
				list.add(d);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			dbHelper.closeConnection();
		}
		return list;
	}
	
}

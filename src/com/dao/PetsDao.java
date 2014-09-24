package com.dao;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import javax.xml.crypto.Data;

import com.form.Pet;
import com.lib.DBHelper;

public class PetsDao {
	
	public static void main(String[] args){
		
		Pet pet = new Pet();
		new PetsDao().addPetExecute(pet);
	}
	
	private final DBHelper dBHelper = new DBHelper();
	
	public ArrayList<Pet> executePetsQuery(String str){
		Statement statement = this.dBHelper.createStatement();
		ArrayList<Pet> pets = new ArrayList<Pet>();
		ResultSet rs = null;
		Pet pet = new Pet();
		try {
			rs = statement.executeQuery(str);
			while (rs.next()) {
				pet.setName(rs.getString("pet_name"));
				pet.setOwner(rs.getString("pet_number"));
				pet.setOwner(rs.getString("owner_name"));
				pet.setOwner(rs.getString("owner_address"));
				pet.setOwner(rs.getString("owner_city"));
				pet.setOwner(rs.getString("owner_phone"));
				pet.setOwner(rs.getString("birthday"));
				pet.setOwner(rs.getString("type"));
				pets.add(pet);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally{
			
		}
		return pets;
	}
	
	public ArrayList<Pet> queryPets(){
		String sql = "select * from pets";
		ArrayList<Pet> pets = this.executePetsQuery(sql);
		return pets;
	}
	
	public /*Pet*/ void queryPetsByPetName(String name){//XXX
		String sql = "select * from pets p where p.pet_name = 'fuck'";
		Statement stat = this.dBHelper.createStatement();
		java.sql.ResultSet pet = null;
		try {
			pet = stat.executeQuery(sql);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
//		return pet;
	}
	
	public void addPetExecute(Pet pet){
		//TODO:  change string to data
		
		String sBirthday = pet.getBirthday();
		SimpleDateFormat sdf = new SimpleDateFormat("MMM dd yyyy");
		try {
//			Date birthday =(Date)sdf.parse(sBirthday);//TODO
			String sql = "INSERT INTO pets(pet_name,pet_number,owner_name, owner_address,owner_city,owner_phone,birthday, type)"+
							"VALUES('pet_name5',5, 'ownerName5', '上海市浦东5','上海市5',1381647055, '20130915', 5)";
			this.dBHelper.executeSQL(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updatePetExecute(Pet pet){
		String sBirthday = pet.getBirthday();
		SimpleDateFormat sdf = new SimpleDateFormat("MMM d yyyy");
		try {
//			Date birthday =(Date)sdf.parse(sBirthday);//TODO
			String sql = "UPDATE pets set owner_phone=138164756" +
					" where owner_phone=1381647056";
			this.dBHelper.executeSQL(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void deletePetExecute(Pet pet){
		
		String sql = "DELETE FROM pets";
//		String sql = "DELETE FROM student_scores WHERE student_id = '1000003'";
		try {
			this.dBHelper.executeSQL(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

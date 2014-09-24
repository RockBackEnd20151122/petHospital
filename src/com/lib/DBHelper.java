/**
 * 
 */
package com.lib;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Rock
 * 
 */
public class DBHelper {

	private final String driver = "com.mysql.jdbc.Driver";
	private final String url = "jdbc:mysql://localhost:3306/pet_hospital";
	private Connection con = null;
	private String user = "root";
	private String password = "root";
	
	private java.sql.Connection getConnection() throws SQLException, ClassNotFoundException {
			Class.forName(driver);
			con = DriverManager.getConnection(url, user, password );
		return con;
	}
	
	public java.sql.Statement createStatement(){
		try {
			return this.getConnection().createStatement();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;			//TODO:
	}
	
	public void closeConnection() {
		try {
			con.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	public void executeSQL(String sql) throws SQLException{
		this.createStatement().execute(sql);
//		this.closeConnection();
	}
	/**
	 * for query data 
	 * @param sql
	 * @throws SQLException
	 */
	public ResultSet queryExecuteSQL(String sql) throws SQLException{
		ResultSet rs = this.createStatement().executeQuery(sql);
		return rs;
//		this.closeConnection();
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}

	public DBHelper() {}

}
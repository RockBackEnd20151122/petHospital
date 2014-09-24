/**
 * 
 */
package com.DTO;

import java.sql.Date;

/**
 * @author Rock
 *
 */
public class Sick {
	
	private String name;
	private int number;
	private int type;
	private String owner_name;
	private Date put_time;
	private Date test_time;
	private String notice;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getOwner_name() {
		return owner_name;
	}
	public void setOwner_name(String owner_name) {
		this.owner_name = owner_name;
	}
	public Date getPut_time() {
		return put_time;
	}
	public void setPut_time(Date put_time) {
		this.put_time = put_time;
	}
	public Date getTest_time() {
		return test_time;
	}
	public void setTest_time(Date test_time) {
		this.test_time = test_time;
	}
	public String getNotice() {
		return notice;
	}
	public void setNotice(String notice) {
		this.notice = notice;
	}
	
}

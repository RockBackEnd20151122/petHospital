/**
 * 
 */
package com.test;

import com.dao.PetsDao;
import com.form.Pet;

/**
 * @author Rock
 *
 */
public class PetsDaoTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PetsDao dao = new PetsDao();
//		dao.queryPets();
		
		Pet pet = new Pet();
//		dao.deletePetExecute(pet);
		
		pet.setBirthday("2013 09 12");
		dao.addPetExecute(pet);
//		dao.updatePetExecute(pet);
	}

}

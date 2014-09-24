package com.biz;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.DTO.Doctor;
import com.DTO.Pet;


public class PetAndOwnerSearchService extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public PetAndOwnerSearchService() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String s = request.getParameter("id");
		System.out.println(s);
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the GET method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		
		HttpSession session = request.getSession();
		Cookie[] cookies = request.getCookies();
		
		Cookie cookie = new Cookie("sessionId", session.getId());
		cookie.setMaxAge(3600);
		cookie.setPath("/");
		response.addCookie(cookie);
		
		Cookie cookie2 = new Cookie("JSESSIONID2", session.getId()+"-000");
		cookie.setMaxAge(3600);
		cookie.setPath("/");
		response.addCookie(cookie2);
		
		com.dao.SearchDao searchDao = new com.dao.SearchDao();
		String searchType = request.getParameter("searchType");
		if(searchType.equals("pets")){
			String petName = request.getParameter("petName");
			String ownerName = request.getParameter("ownerName");
			
			List<Pet> list = searchDao.searchPets(petName, ownerName);
			String url = "/petHospital/static/pages/petsHospital/searchPetResults.jsp";
			request.getSession().setAttribute("Pets", list);
			response.sendRedirect(url);
		}else{
			String doctorName = request.getParameter("doctorName");
			String major = request.getParameter("major");
			List<Doctor> list = new com.dao.SearchDao().searchDoctors(doctorName, major);
			String url = "/petHospital/static/pages/petsHospital/searchDoctorResults.jsp";
			request.getSession().setAttribute("Doctors", list);
			response.sendRedirect(url);
		}
//		searchDoctors

		/*response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the POST method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();*/
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}

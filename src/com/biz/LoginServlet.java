package com.biz;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.DTO.Owner;
import com.dao.LoginDao;
public class LoginServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public LoginServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	public final static String CASHIER_URI="(^.*cashier.*/([0-9]*)/.*$)";
	
	/**
	 * The doDelete method of the servlet. <br>
	 *
	 * This method is called when a HTTP delete request is received.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doDelete(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// Put your code here
	}
	
	public static boolean isAjaxRequest(final HttpServletRequest request) {
		return (request.getHeader("x-requested-with") != null 
				&& request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest"));
	}

	public String getCashierOptionUrl(String requestUri) {
		try {
			Pattern pattern = Pattern.compile(CASHIER_URI);
			Matcher matcher = pattern.matcher(requestUri);
			if (matcher.matches()) {
				String orderId = matcher.group(2);
				if (orderId!=null) {
					StringBuilder sb = new StringBuilder();
					sb.append("/cashier/");
					sb.append(orderId);
					sb.append("/*");
					return sb.toString();
				}
			}
		} catch (Exception oe) {}
		
		return null;
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

		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		LoginDao loginDao = new LoginDao();
		List<Owner> owners = loginDao.executeOwnersQuery(userName, password);
		Owner owner = new Owner();
		owner.setName(userName);
		
		if(owners.size()>0){
			request.setAttribute("user", owner); 	//1. jsp八大隐式对象;java web层
			
			HttpSession ses = request.getSession();		//2. session
			ses.setAttribute("user", owners.get(0));					// userName = Rock, 不是输入的rock
			//3 application 作用域更大
			//response.sendRedirect("/petHospital/static/pages/success.html?userName="+ userName +"&password="+ password);
			response.sendRedirect("/petHospital/static/pages/petsHospital/Login.jsp");
		} else {
			response.sendRedirect("/petHospital/static/pages/error.html");
		}

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

/*		if(isAjaxRequest(request)){
			response.setHeader("sessionStatus", "timeout");
			StringBuilder sb = new StringBuilder();
			sb.append(request.getContextPath());
			sb.append("?returnURL=");
			sb.append(URLEncoder.encode(this.getCashierOptionUrl(request.getRequestURI()), "UTF-8"));
			
			response.setHeader("gotoUrl", sb.toString());
			response.setStatus(303);
			response.getWriter().print("timeout");
			
			String url = "/petHospital/static/pages/petsHospital/index.jsp";									// /sitename/test.html
			response.sendRedirect(url);
		}*/
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		
		LoginDao loginDao = new LoginDao();
		List<Owner> owners = loginDao.executeOwnersQuery(userName, password);
		
		if(owners.size()>0){
			request.setAttribute("username", owners.get(0).getName());
		}
		
		HttpSession ses = request.getSession();		//2. session
		ses.setAttribute("user", owners.get(0));					// userName = Rock, 不是输入的rock
		//3 application 作用域更大
		//response.sendRedirect("/petHospital/static/pages/success.html?userName="+ userName +"&password="+ password);
		response.sendRedirect("/petHospital/static/pages/petsHospital/Login.jsp");
		
		/*response.setContentType("text/html");
		String userName = request.getParameter("userName");  
		Enumeration<String> enumeration = request.getParameterNames();
		
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
		out.close();
		
		String jsonStr = readJsonFromRequestBody(request);
		System.out.print(jsonStr);
		
		 response.setContentType("text/html;charset=utf-8");   
//	        String userName = request.getParameter("userName");  
//	        
//	        System.out.print(request.getParameterValues("userName"));
	        
	        PrintWriter pw = response.getWriter();    
	        pw.print(""); */
	}

	/**
	 * The doPut method of the servlet. <br>
	 *
	 * This method is called when a HTTP put request is received.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Put your code here
	}

	/**
	 * Returns information about the servlet, such as 
	 * author, version, and copyright. 
	 *
	 * @return String information about this servlet
	 */
	public String getServletInfo() {
		return "This is my default servlet created by Eclipse";
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}
	

	/**
	 * 从请求体中读取客户端发送的JSON串
	 * 
	 * @param request
	 *            请求对象
	 * @return String 类型，接收到的JSON串
	 */
	private String readJsonFromRequestBody(HttpServletRequest req) {
		StringBuffer jsonBuf = new StringBuffer();
		char[] buf = new char[2048];
		int len = -1;
		try {
			BufferedReader reader = req.getReader();
			while ((len = reader.read(buf)) != -1) {
				jsonBuf.append(new String(buf, 0, len));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonBuf.toString();
	}


}

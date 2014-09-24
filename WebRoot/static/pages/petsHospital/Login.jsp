<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- page指令，始终在第一行 -->
<%@ page import="com.DTO.Owner"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!-- basePath : http://localhost:8080/petHospital/ -->
<!-- basePath 影响到include 指令 -->
<!DOCTYPE >
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'Login.jsp' starting page</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="<%=basePath%>/static/css/_.css" rel="stylesheet" />
<link href="<%=basePath%>/static/css/layout.css" rel="stylesheet" />
<style type="text/css">
.loginForm{
}
</style>

</head>

<body class="bg1">
	<header>
		<div>
			<%
				/* Owner requestOwner = (Owner) request.getAttribute("user"); */
				
				javax.servlet.http.HttpSession httpSession = request.getSession(false);

				Owner owner = (Owner) httpSession.getAttribute("user");
				if (owner != null/*  && requestOwner.getName().equals(owner.getName()) */) {
					out.println("欢迎登录:" + owner.getName());
				} else {
					out.println("请登录");
				}

				/* if(name != null ){
					out.println("欢迎登录:"+ name);
				} */
			%>
		</div>
	</header>
	<div class="transparentBg"></div>
	<div class="main">
			<%
				if (owner == null) {
					out.println("<form class=\"loginForm\" class=\"loginForm\" action=\"/petHospital/servlet/LoginServlet\" method=\"get\">"+
						"<ul class=\"loginUl font14 \">" +
						"<li class=\"align_center height_40 font18 font_b\">我的宠物医院</li>" +
						"<li><span class=\"l font14 font_b\">用户名</span> <input type=\"text\"" +
						"name=\"userName\" value=\"\" class=\"j_userName iptR font14 font_b\" /></li>"+
						"<li><span class=\"l font14 font_b\">密码</span> <input type=\"password\" "+
						"name=\"password\" value=\"\" class=\"j_password iptR font14 font_b\" /></li>" +
						"<li><input type=\"submit\" value=\"登录\" class=\"j_login btnLogin font14\" disabled />"+
						"<input type=\"reset\" value=\"重置\" class=\"j_reset btnReset font14\" /></li></ul></form>");
				}else{
					out.println("<a class=\"searchA\" href=\"static/pages/petsHospital/search.jsp \">进入查询</a>");
				}
			%>
	</div>
	<%-- <%@include file="/static/pages/petsHospital/Login.jsp" %> --%>

	<script src="<%=basePath%>static/js/CONFIG.js"></script>
	<script data-main="<%=basePath%>static/js/modules/petsHospital/main.js"
		src="<%=basePath%>static/js/lib/require.js"></script>
</body>
</html>

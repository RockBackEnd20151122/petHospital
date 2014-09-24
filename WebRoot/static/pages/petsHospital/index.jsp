<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- page指令，始终在第一行 -->
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!-- http://localhost:8080/petHospital/ -->
<!DOCTYPE >
<html>
<head>

<base href="<%=basePath%>">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Pets Hospital: Login</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!-- <link rel="stylesheet" href="styles.css"> -->

</head>

<body>
	<header>
	
	</header>
		<div class="main">
		<form class="loginForm" action="/petHospital/servlet/LoginServlet" method="get">
			<ul class="loginUl">
				<li class="align_center height_40 font14 font_b">登录宠物医院</li>
				<li>
					<span class="l">用户名</span>
					<input type="text" name="userName" class="iptR" />
				</li>
				<li>
					<span class="l">密码</span>
					<input type="text" name="password" class="iptR" />
				</li>
				<li>
					<input type="submit" value="登录" class="j_login btnLogin font14" />
					<input type="reset" value="重置" class="j_reset btnReset font14" />
				</li>
			</ul>
		</form>
	</div>
	<footer>
	
	</footer>
	
	<script src="<%=basePath%>static/js/CONFIG.js"></script>
	<script data-main="<%=basePath%>static/js/modules/petsHospital/main.js"
		src="<%=basePath%>static/js/lib/require.js"></script>
	<!-- Then the basePath is: <%=basePath%> -->

	<script id="" type="type/template">

	</script>
</body>
</html>
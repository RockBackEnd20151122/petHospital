<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ page import="com.DTO.Doctor"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'searchResults.jsp' starting page</title>

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
</head>

<body>
	<header>查询结果</header>
	<div class="transparentBg"></div>
	<div class="main">
		<%
			List<Doctor> list = (List<Doctor>) request.getSession().getAttribute("list");
			
			String str = (String)request.getSession().getAttribute("searchType");
		%>
		<table>
			<tr><td>兽医名</td><td>兽医专业</td></tr>
			<%
				for (int i = 0; i < list.size(); i++) {
			%>
			<tr>
				<td>
					<a href="/petHospital/?id=<%=list.get(i).getName() %>">
					<%=list.get(i).getName() %>
					</a>
				</td>
				<td>
					<a href="/petHospital/?id=<%=list.get(i).getMajor() %>">
					<%=list.get(i).getMajor() %>
					</a>
				</td>
			</tr>
			<%
				}
			%>
		</table>
	</div>
	<script type="text/javascript">
	</script>
</body>
</html>

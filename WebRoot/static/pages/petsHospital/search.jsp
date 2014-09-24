<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE >
<html>
<head>
<base href="<%=basePath%>">

<title>Search webpage</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link href="<%=basePath%>/static/css/_.css" rel="stylesheet" />
<link href="<%=basePath%>/static/css/layout.css" rel="stylesheet" />
<style type="text/css">

</style>
</head>

<body class="bg2">
	<header>查询</header>
	<div class="transparentBg"></div>
	<div class="main">
		<form class="loginForm" action="/petHospital/servlet/PetAndDoctorSearchService" method="post">
			<ul class="loginUl">
				<li class="align_center height_40 font18 font_b border_btm">信息查询</li>
				<li class="align_center height_40 font14">
					查询：
					<label for="pets">宠物</label><input type="radio" class="j_searchType" checked name="searchType" value="pets" id="pets" />
					<label for="pets" class="font_b">兽医</label><input type="radio" class="j_searchType" name="searchType" value="doctor" id="doctor" />
				</li>
			</ul>
			<ul class="searchDoctor none">
				<li class="">
					<span class="l">兽医名称</span>
					<input type="text" name="doctorName" class="j_doctorName iptR" />
				</li>
				<li class="">
					<span class="l">专业</span>
					<input type="text" name="major" class="j_major iptR" />
				</li>
			</ul>
			<ul class="searchPets">
				<li class="">
					<span class="l">宠物名称</span>
					<input type="text" name="petName" class="j_petName iptR" />
				</li>
				<li class="">
					<span class="l">所有人名称</span>
					<input type="text" name="ownerName" class="j_ownerName iptR" />
				</li>
			</ul>
			<ul class="loginUl">
				<li>
					<input type="submit" value="查询" class="j_search btnLogin font14" />
					<input type="reset" value="重置" class="btnReset font14" />
				</li>
			</ul>
		</form>
	</div>
	<script src="<%=basePath%>static/js/CONFIG.js"></script>
	<script data-main="<%=basePath%>static/js/modules/petsHospital/view/SearchView.js" 
		src="<%=basePath%>static/js/lib/require.js"></script>
	<script>
	</script>
</body>
</html>

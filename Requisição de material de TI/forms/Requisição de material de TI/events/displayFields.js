function displayFields(form,customHTML){
	
	var atv = getValue("WKNumState");

	customHTML.append("<script>");
	customHTML.append("        function getWKNumState(){ return " + atv + "};");
	customHTML.append("</script>");


}
function displayFields(form, customHTML) {
  var activity = getValue("WKNumState");
  if (activity == 5 || activity == 44) {

  customHTML.append("<script>");
  customHTML.append(
    "$('*[name=\"checkbox00\"]').css('display', 'none');var closers = $('*[name=\"checkbox00\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"checkbox00\"]').closest('.form-field').css('display', 'none');}"
  );
  customHTML.append("</script>");
  customHTML.append("<script>");
  customHTML.append('$(\'*[name="checkbox00"]\').closest("li").hide()');
  customHTML.append("</script>");

  customHTML.append("<script>");
  customHTML.append(
    "$('*[name=\"checkbox01\"]').css('display', 'none');var closers = $('*[name=\"checkbox01\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"checkbox01\"]').closest('.form-field').css('display', 'none');}"
  );
  customHTML.append("</script>");
  customHTML.append("<script>");
  customHTML.append('$(\'*[name="checkbox01"]\').closest("li").hide()');
  customHTML.append("</script>");


  customHTML.append("<script>");
  customHTML.append(
    "$('*[name=\"checkbox03\"]').css('display', 'none');var closers = $('*[name=\"checkbox03\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"checkbox03\"]').closest('.form-field').css('display', 'none');}"
  );
  customHTML.append("</script>");
  customHTML.append("<script>");
  customHTML.append('$(\'*[name="checkbox03"]\').closest("li").hide()');
  customHTML.append("</script>");

  customHTML.append("<script>");
  customHTML.append(
    "$('*[name=\"checkbox04\"]').css('display', 'none');var closers = $('*[name=\"checkbox04\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"checkbox04\"]').closest('.form-field').css('display', 'none');}"
  );
  customHTML.append("</script>");
  customHTML.append("<script>");
  customHTML.append('$(\'*[name="checkbox04"]\').closest("li").hide()');
  customHTML.append("</script>");


}

}

function displayFields(form, customHTML) {
  var activity = getValue("WKNumState");
  if (activity == 17) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"reenviar\"]').css('display', 'none');var closers = $('*[name=\"reenviar\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"reenviar\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="reenviar"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 4 || activity == 0) {

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"titulos_vencido\"]').css('display', 'none');var closers = $('*[name=\"titulos_vencido\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"titulos_vencido\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="titulos_vencido"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"juros\"]').css('display', 'none');var closers = $('*[name=\"juros\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"juros\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="juros"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"juros\"]').css('display', 'none');var closers = $('*[name=\"juros\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"juros\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="juros"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"aprov_diret\"]').css('display', 'none');var closers = $('*[name=\"aprov_diret\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"aprov_diret\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="aprov_diret"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"reenviar\"]').css('display', 'none');var closers = $('*[name=\"reenviar\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"reenviar\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append('$(\'*[name="reenviar"]\').closest("li").hide()');
    customHTML.append("</script>");

    form.setValue("vendedor", getValue("WKUser"));

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"aprov_financ\"]').css('display', 'none');var closers = $('*[name=\"aprov_financ\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"aprov_financ\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="aprov_financ"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"teste1\"]').css('display', 'none');var closers = $('*[name=\"teste1\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"teste1\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="teste1"]\').closest("li").hide()');
    customHTML.append("</script>");

  }
  if (activity == 5) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"reenviar\"]').css('display', 'none');var closers = $('*[name=\"reenviar\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"reenviar\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="reenviar"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 7) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"reenviar\"]').css('display', 'none');var closers = $('*[name=\"reenviar\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"reenviar\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="reenviar"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
}

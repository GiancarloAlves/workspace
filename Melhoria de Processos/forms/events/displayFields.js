function displayFields(form, customHTML) {
  var activity = getValue("WKNumState");
  if (activity == 3 || activity == 0) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"DecisorFinal\"]').css('display', 'none');var closers = $('*[name=\"DecisorFinal\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"DecisorFinal\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="DecisorFinal"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ComentarioSolic\"]').css('display', 'none');var closers = $('*[name=\"ComentarioSolic\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ComentarioSolic\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ComentarioSolic"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"Feedback\"]').css('display', 'none');var closers = $('*[name=\"Feedback\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"Feedback\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="Feedback"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"Solucao\"]').css('display', 'none');var closers = $('*[name=\"Solucao\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"Solucao\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="Solucao"]\').closest("li").hide()');
    customHTML.append("</script>");
    form.setValue("Matricula", getValue("WKUser"));

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"Atendeu\"]').css('display', 'none');var closers = $('*[name=\"Atendeu\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"Atendeu\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="Atendeu"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 4) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"Feedback\"]').css('display', 'none');var closers = $('*[name=\"Feedback\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"Feedback\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="Feedback"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"DecisorFinal\"]').css('display', 'none');var closers = $('*[name=\"DecisorFinal\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"DecisorFinal\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="DecisorFinal"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"Atendeu\"]').css('display', 'none');var closers = $('*[name=\"Atendeu\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"Atendeu\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="Atendeu"]\').closest("li").hide()');
    customHTML.append("</script>");


  }
}
function displayFields(form, customHTML) {
  var activity = getValue("WKNumState");
  if (activity == 5 || activity == 0) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"AvaliacaoAtend\"]').css('display', 'none');var closers = $('*[name=\"AvaliacaoAtend\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"AvaliacaoAtend\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="AvaliacaoAtend"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblResolv\"]').css('display', 'none');var closers = $('*[name=\"RdProblResolv\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblResolv\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblResolv"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"PqUrgencia\"]').css('display', 'none');var closers = $('*[name=\"PqUrgencia\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"PqUrgencia\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="PqUrgencia"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdUrgAdequada\"]').css('display', 'none');var closers = $('*[name=\"RdUrgAdequada\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdUrgAdequada\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdUrgAdequada"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ResolucaoTI\"]').css('display', 'none');var closers = $('*[name=\"ResolucaoTI\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ResolucaoTI\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ResolucaoTI"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"DataHrManut\"]').css('display', 'none');var closers = $('*[name=\"DataHrManut\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"DataHrManut\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="DataHrManut"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ObsUsuario\"]').css('display', 'none');var closers = $('*[name=\"ObsUsuario\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ObsUsuario\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ObsUsuario"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"EsclarecSolicit\"]').css('display', 'none');var closers = $('*[name=\"EsclarecSolicit\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"EsclarecSolicit\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="EsclarecSolicit"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblResolv\"]').css('display', 'none');var closers = $('*[name=\"RdProblResolv\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblResolv\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblResolv"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblemClarez\"]').css('display', 'none');var closers = $('*[name=\"RdProblemClarez\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblemClarez\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblemClarez"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 7) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"AvaliacaoAtend\"]').css('display', 'none');var closers = $('*[name=\"AvaliacaoAtend\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"AvaliacaoAtend\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="AvaliacaoAtend"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblResolv\"]').css('display', 'none');var closers = $('*[name=\"RdProblResolv\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblResolv\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblResolv"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ObsUsuario\"]').css('display', 'none');var closers = $('*[name=\"ObsUsuario\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ObsUsuario\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ObsUsuario"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 8) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"AvaliacaoAtend\"]').css('display', 'none');var closers = $('*[name=\"AvaliacaoAtend\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"AvaliacaoAtend\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="AvaliacaoAtend"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblResolv\"]').css('display', 'none');var closers = $('*[name=\"RdProblResolv\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblResolv\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblResolv"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ObsUsuario\"]').css('display', 'none');var closers = $('*[name=\"ObsUsuario\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ObsUsuario\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ObsUsuario"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 9) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"AvaliacaoAtend\"]').css('display', 'none');var closers = $('*[name=\"AvaliacaoAtend\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"AvaliacaoAtend\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="AvaliacaoAtend"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblResolv\"]').css('display', 'none');var closers = $('*[name=\"RdProblResolv\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblResolv\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblResolv"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ObsUsuario\"]').css('display', 'none');var closers = $('*[name=\"ObsUsuario\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ObsUsuario\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ObsUsuario"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 14) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ObsUsuario\"]').css('display', 'none');var closers = $('*[name=\"ObsUsuario\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ObsUsuario\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ObsUsuario"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"AvaliacaoAtend\"]').css('display', 'none');var closers = $('*[name=\"AvaliacaoAtend\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"AvaliacaoAtend\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="AvaliacaoAtend"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblResolv\"]').css('display', 'none');var closers = $('*[name=\"RdProblResolv\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblResolv\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblResolv"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"PqUrgencia\"]').css('display', 'none');var closers = $('*[name=\"PqUrgencia\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"PqUrgencia\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="PqUrgencia"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdUrgAdequada\"]').css('display', 'none');var closers = $('*[name=\"RdUrgAdequada\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdUrgAdequada\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdUrgAdequada"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ResolucaoTI\"]').css('display', 'none');var closers = $('*[name=\"ResolucaoTI\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ResolucaoTI\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ResolucaoTI"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdProblemClarez\"]').css('display', 'none');var closers = $('*[name=\"RdProblemClarez\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdProblemClarez\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdProblemClarez"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"DataHrManut\"]').css('display', 'none');var closers = $('*[name=\"DataHrManut\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"DataHrManut\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="DataHrManut"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
}

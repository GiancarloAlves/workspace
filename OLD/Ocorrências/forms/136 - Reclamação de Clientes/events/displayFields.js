function displayFields(form, customHTML) {
  var activity = getValue("WKNumState");
  if (activity == 17) {

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"OrigemEcommerce\"]').css('display', 'none');var closers = $('*[name=\"OrigemEcommerce\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"OrigemEcommerce\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="OrigemEcommerce"]\').closest("li").hide()');
    customHTML.append("</script>");
  }

  if (activity == 22) {    
    customHTML.append("<script>");

    customHTML.append(
        "$('*[name=\"OrigemEcommerce\"]').css('display', 'none');var closers = $('*[name=\"OrigemEcommerce\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"OrigemEcommerce\"]').closest('.form-field').css('display', 'none');}"
      );
      customHTML.append("</script>");
      customHTML.append("<script>");
      customHTML.append('$(\'*[name="OrigemEcommerce"]\').closest("li").hide()');
      customHTML.append("</script>");      

  }

  if (activity == 7 || activity == 0) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdClienteSatisf\"]').css('display', 'none');var closers = $('*[name=\"RdClienteSatisf\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdClienteSatisf\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdClienteSatisf"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdContCliente\"]').css('display', 'none');var closers = $('*[name=\"RdContCliente\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdContCliente\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdContCliente"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdGerenSatisfei\"]').css('display', 'none');var closers = $('*[name=\"RdGerenSatisfei\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdGerenSatisfei\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdGerenSatisfei"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"RdContGerencia\"]').css('display', 'none');var closers = $('*[name=\"RdContGerencia\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdContGerencia\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="RdContGerencia"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"ObsGerente\"]').css('display', 'none');var closers = $('*[name=\"ObsGerente\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ObsGerente\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="ObsGerente"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");

    customHTML.append(
      "$('*[name=\"PqReclamacao\"]').css('display', 'none');var closers = $('*[name=\"PqReclamacao\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"PqReclamacao\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="PqReclamacao"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");


    customHTML.append(
      "$('*[name=\"SolucaoReclamac\"]').css('display', 'none');var closers = $('*[name=\"SolucaoReclamac\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"SolucaoReclamac\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="SolucaoReclamac"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"OrigemEcommerce\"]').css('display', 'none');var closers = $('*[name=\"OrigemEcommerce\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"OrigemEcommerce\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="OrigemEcommerce"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"Gerente\"]').css('display', 'none');var closers = $('*[name=\"Gerente\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"Gerente\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="Gerente"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 9) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"OrigemEcommerce\"]').css('display', 'none');var closers = $('*[name=\"OrigemEcommerce\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"OrigemEcommerce\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="OrigemEcommerce"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 10) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"OrigemEcommerce\"]').css('display', 'none');var closers = $('*[name=\"OrigemEcommerce\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"OrigemEcommerce\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="OrigemEcommerce"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
        "$('*[name=\"ObsGerente\"]').css('display', 'none');var closers = $('*[name=\"ObsGerente\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"ObsGerente\"]').closest('.form-field').css('display', 'none');}"
      );
      customHTML.append("</script>");
      customHTML.append("<script>");
      customHTML.append('$(\'*[name="ObsGerente"]\').closest("li").hide()');
      customHTML.append("</script>");

      customHTML.append("<script>");
      customHTML.append(
          "$('*[name=\"RdContGerencia\"]').css('display', 'none');var closers = $('*[name=\"RdContGerencia\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdContGerencia\"]').closest('.form-field').css('display', 'none');}"
        );
        customHTML.append("</script>");
        customHTML.append("<script>");
        customHTML.append('$(\'*[name="RdContGerencia"]\').closest("li").hide()');
        customHTML.append("</script>");

        customHTML.append("<script>");
        customHTML.append(
            "$('*[name=\"RdGerenSatisfei\"]').css('display', 'none');var closers = $('*[name=\"RdGerenSatisfei\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"RdGerenSatisfei\"]').closest('.form-field').css('display', 'none');}"
          );
          customHTML.append("</script>");
          customHTML.append("<script>");
          customHTML.append('$(\'*[name="RdGerenSatisfei"]\').closest("li").hide()');
          customHTML.append("</script>");

  }
  if (activity == 11) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"OrigemEcommerce\"]').css('display', 'none');var closers = $('*[name=\"OrigemEcommerce\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"OrigemEcommerce\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="OrigemEcommerce"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 12) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"OrigemEcommerce\"]').css('display', 'none');var closers = $('*[name=\"OrigemEcommerce\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"OrigemEcommerce\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="OrigemEcommerce"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
}

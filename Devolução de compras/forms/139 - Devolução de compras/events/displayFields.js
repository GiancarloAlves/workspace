function displayFields(form, customHTML) {
  var activity = getValue("WKNumState");
  if (activity == 2 || activity == 0) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"end_exped\"]').css('display', 'none');var closers = $('*[name=\"end_exped\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"end_exped\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="end_exped"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"peso\"]').css('display', 'none');var closers = $('*[name=\"peso\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"peso\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="peso"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"num_volumes\"]').css('display', 'none');var closers = $('*[name=\"num_volumes\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"num_volumes\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="num_volumes"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"acerto\"]').css('display', 'none');var closers = $('*[name=\"acerto\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"acerto\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="acerto"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"cred_nota\"]').css('display', 'none');var closers = $('*[name=\"cred_nota\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"cred_nota\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="cred_nota"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"valor_nota\"]').css('display', 'none');var closers = $('*[name=\"valor_nota\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"valor_nota\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="valor_nota"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"data_prev_cheg\"]').css('display', 'none');var closers = $('*[name=\"data_prev_cheg\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"data_prev_cheg\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="data_prev_cheg"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"data_envio\"]').css('display', 'none');var closers = $('*[name=\"data_envio\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"data_envio\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="data_envio"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"radio21\"]').css('display', 'none');var closers = $('*[name=\"radio21\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"radio21\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="radio21"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"num_nf\"]').css('display', 'none');var closers = $('*[name=\"num_nf\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"num_nf\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="num_nf"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
  if (activity == 10) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"aceite_fornec\"]').css('display', 'none');var closers = $('*[name=\"aceite_fornec\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"aceite_fornec\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="aceite_fornec"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
}

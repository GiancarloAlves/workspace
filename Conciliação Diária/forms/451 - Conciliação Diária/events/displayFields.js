function displayFields(form, customHTML) {
  var activity = getValue("WKNumState");
  if (activity == 6) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"recebredecard\"]').css('display', 'none');var closers = $('*[name=\"recebredecard\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"recebredecard\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="recebredecard"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"vendasredecard\"]').css('display', 'none');var closers = $('*[name=\"vendasredecard\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"vendasredecard\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="vendasredecard"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratobanri\"]').css('display', 'none');var closers = $('*[name=\"extratobanri\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratobanri\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratobanri"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"cobrancabb\"]').css('display', 'none');var closers = $('*[name=\"cobrancabb\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"cobrancabb\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="cobrancabb"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratobb\"]').css('display', 'none');var closers = $('*[name=\"extratobb\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratobb\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratobb"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"cobrancaitau2\"]').css('display', 'none');var closers = $('*[name=\"cobrancaitau2\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"cobrancaitau2\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="cobrancaitau2"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratoitau2\"]').css('display', 'none');var closers = $('*[name=\"extratoitau2\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratoitau2\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratoitau2"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"cobrancaitau\"]').css('display', 'none');var closers = $('*[name=\"cobrancaitau\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"cobrancaitau\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="cobrancaitau"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratoitau\"]').css('display', 'none');var closers = $('*[name=\"extratoitau\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratoitau\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratoitau"]\').closest("li").hide()');
    customHTML.append("</script>");
  }

  if (activity == 44 || activity == 0) {
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"baixasmnanuais\"]').css('display', 'none');var closers = $('*[name=\"baixasmanuais\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"baixasmanuais\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append('$(\'*[name="baixasmanuais"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"retornobb\"]').css('display', 'none');var closers = $('*[name=\"retornobb\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"retornobb\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append('$(\'*[name="retornobb"]\').closest("li").hide()');
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"retornoitau2\"]').css('display', 'none');var closers = $('*[name=\"retornoitau2\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"retornoitau2\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append('$(\'*[name="retornoitau2"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"retornoitau\"]').css('display', 'none');var closers = $('*[name=\"retornoitau\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"retornoitau\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="retornoitau"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"recebredecard\"]').css('display', 'none');var closers = $('*[name=\"recebredecard\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"recebredecard\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="recebredecard"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"vendasredecard\"]').css('display', 'none');var closers = $('*[name=\"vendasredecard\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"vendasredecard\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="vendasredecard"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratobanri\"]').css('display', 'none');var closers = $('*[name=\"extratobanri\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratobanri\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratobanri"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"cobrancabb\"]').css('display', 'none');var closers = $('*[name=\"cobrancabb\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"cobrancabb\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="cobrancabb"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratobb\"]').css('display', 'none');var closers = $('*[name=\"extratobb\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratobb\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratobb"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"cobrancaitau2\"]').css('display', 'none');var closers = $('*[name=\"cobrancaitau2\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"cobrancaitau2\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="cobrancaitau2"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratoitau2\"]').css('display', 'none');var closers = $('*[name=\"extratoitau2\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratoitau2\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratoitau2"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"cobrancaitau\"]').css('display', 'none');var closers = $('*[name=\"cobrancaitau\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"cobrancaitau\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="cobrancaitau"]\').closest("li").hide()');
    customHTML.append("</script>");

    customHTML.append("<script>");
    customHTML.append(
      "$('*[name=\"extratoitau\"]').css('display', 'none');var closers = $('*[name=\"extratoitau\"]').closest('.form-field').find('input, textarea, select');var hideDiv = true;$.each(closers, function(i, close) {if (close.style.display != 'none' && close.type != 'hidden') {hideDiv = false;}});if (hideDiv == true) {$('*[name=\"extratoitau\"]').closest('.form-field').css('display', 'none');}"
    );
    customHTML.append("</script>");
    customHTML.append("<script>");
    customHTML.append('$(\'*[name="extratoitau"]\').closest("li").hide()');
    customHTML.append("</script>");
  }
}

function enableFields(form) {
    var activity = getValue("WKNumState");
  
    if (activity == 2 || activity == 0) { // EVENTO_INICIO
      // Desabilita todas as variáveis de outros estados para o estado INICIO
      form.setEnabled("quantidade", false);
      form.setEnabled("volume", false);
      form.setEnabled("peso", false);
      form.setEnabled("obs_separacao", false);
      form.setEnabled("filtroNF", false);
      form.setEnabled("valorNF", false);
      form.setEnabled("obs_recebimento", false);
      form.setEnabled("dtEmbarque", false);
      form.setEnabled("dtChegada", false);
      form.setEnabled("obs_embarque", false);
      form.setEnabled("credito", false);
      form.setEnabled("obsfinal", false);
      form.setEnabled("obs_remessa", false);
    }
  
    if (activity == 4) { // SEPARACAO

      form.setEnabled("codfornec", false);
      form.setEnabled("fornecedor", false);
      form.setEnabled("comprador", false);
      form.setEnabled("matcomprador", false);
      form.setEnabled("pessoa", false);
      form.setEnabled("motivoDevolucao", false);
      form.setEnabled("telefone", false);
      form.setEnabled("email", false);
      form.setEnabled("contatoFin", false);
      form.setEnabled("frete", false);
      form.setEnabled("transportadora", false);
      form.setEnabled("acertoCredito", false);
      form.setEnabled("aceite", false);
      form.setEnabled("tipoDev", false);
      form.setEnabled("rdLigarCliente", false);
      form.setEnabled("observacao", false);
      form.setEnabled("numNota", false);
      form.setEnabled("codProd", false);
      form.setEnabled("descprod", false);
      form.setEnabled("destino", false);
      form.setEnabled("historico", false);

      // Estado EMISSAO
      form.setEnabled("filtroNF", false);
      form.setEnabled("valorNF", false);
      form.setEnabled("obs_recebimento", false);

      // Estado EMBARQUE
      form.setEnabled("dtEmbarque", false);
      form.setEnabled("dtChegada", false);
      form.setEnabled("obs_embarque", false);

      // Estado CREDITO
      form.setEnabled("credito", false);

      // Estado STANDBY
      form.setEnabled("obsfinal", false);

      // Estado RETORNO
      form.setEnabled("obs_remessa", false);
    }
  
    if (activity == 7) { // EMISSAO
      // Desabilita todas as variáveis de outros estados para o estado EMISSAO
      // Estado INICIO
      form.setEnabled("codfornec", false);
      form.setEnabled("fornecedor", false);
      form.setEnabled("comprador", false);
      form.setEnabled("matcomprador", false);
      form.setEnabled("pessoa", false);
      form.setEnabled("motivoDevolucao", false);
      form.setEnabled("telefone", false);
      form.setEnabled("email", false);
      form.setEnabled("contatoFin", false);
      form.setEnabled("frete", false);
      form.setEnabled("transportadora", false);
      form.setEnabled("acertoCredito", false);
      form.setEnabled("aceite", false);
      form.setEnabled("tipoDev", false);
      form.setEnabled("rdLigarCliente", false);
      form.setEnabled("observacao", false);
      form.setEnabled("numNota", false);
      form.setEnabled("codProd", false);
      form.setEnabled("descprod", false);
      form.setEnabled("destino", false);
      form.setEnabled("historico", false);

      // Estado SEPARACAO
      form.setEnabled("quantidade", false);
      form.setEnabled("volume", false);
      form.setEnabled("peso", false);
      form.setEnabled("obs_separacao", false);

      // Estado EMBARQUE
      form.setEnabled("dtEmbarque", false);
      form.setEnabled("dtChegada", false);
      form.setEnabled("obs_embarque", false);

      // Estado CREDITO
      form.setEnabled("credito", false);

      // Estado STANDBY
      form.setEnabled("obsfinal", false);

      // Estado RETORNO
      form.setEnabled("obs_remessa", false);

    }
  
    if (activity == 8) { // EMBARQUE
      // Desabilita todas as variáveis de outros estados para o estado EMBARQUE
      // Estado INICIO
      form.setEnabled("codfornec", false);
      form.setEnabled("fornecedor", false);
      form.setEnabled("comprador", false);
      form.setEnabled("matcomprador", false);
      form.setEnabled("pessoa", false);
      form.setEnabled("motivoDevolucao", false);
      form.setEnabled("telefone", false);
      form.setEnabled("email", false);
      form.setEnabled("contatoFin", false);
      form.setEnabled("frete", false);
      form.setEnabled("transportadora", false);
      form.setEnabled("acertoCredito", false);
      form.setEnabled("aceite", false);
      form.setEnabled("tipoDev", false);
      form.setEnabled("rdLigarCliente", false);
      form.setEnabled("observacao", false);
      form.setEnabled("numNota", false);
      form.setEnabled("codProd", false);
      form.setEnabled("descprod", false);
      form.setEnabled("destino", false);
      form.setEnabled("historico", false);

      // Estado SEPARACAO
      form.setEnabled("quantidade", false);
      form.setEnabled("volume", false);
      form.setEnabled("peso", false);
      form.setEnabled("obs_separacao", false);

     // Estado STANDBY
      form.setEnabled("obsfinal", false);

      // Estado RETORNO
      form.setEnabled("obs_remessa", false);

    }
  
    if (activity == 10) { // CREDITO
      // Desabilita todas as variáveis de outros estados para o estado CREDITO
      // Estado INICIO
      form.setEnabled("codfornec", false);
      form.setEnabled("fornecedor", false);
      form.setEnabled("comprador", false);
      form.setEnabled("matcomprador", false);
      form.setEnabled("pessoa", false);
      form.setEnabled("motivoDevolucao", false);
      form.setEnabled("telefone", false);
      form.setEnabled("email", false);
      form.setEnabled("contatoFin", false);
      form.setEnabled("frete", false);
      form.setEnabled("transportadora", false);
      form.setEnabled("acertoCredito", false);
      form.setEnabled("aceite", false);
      form.setEnabled("tipoDev", false);
      form.setEnabled("rdLigarCliente", false);
      form.setEnabled("observacao", false);
      form.setEnabled("numNota", false);
      form.setEnabled("codProd", false);
      form.setEnabled("descprod", false);
      form.setEnabled("destino", false);
      form.setEnabled("historico", false);

            // Estado SEPARACAO
      form.setEnabled("quantidade", false);
      form.setEnabled("volume", false);
      form.setEnabled("peso", false);
      form.setEnabled("obs_separacao", false);

      // Estado EMISSAO
      form.setEnabled("filtroNF", false);
      form.setEnabled("valorNF", false);
      form.setEnabled("obs_recebimento", false);

      // Estado STANDBY
      form.setEnabled("obsfinal", false);

      // Estado RETORNO
      form.setEnabled("obs_remessa", false);

    }
  
    if (activity == 28) { // STANDBY
      // Desabilita todas as variáveis de outros estados para o estado STANDBY
    }
  
    if (activity == 9) { // RETORNO
      // Desabilita todas as variáveis de outros estados para o estado RETORNO
    }
  }
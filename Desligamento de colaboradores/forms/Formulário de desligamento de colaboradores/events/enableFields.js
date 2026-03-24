function enableFields(form) {

    const EVENTO_INICIO = 4
    const AGENDAMENTO_BLOQUEIO = 5
    const BLOQUEIO_TI = 6
    const EFETIVACAO_CANCELAMENTO = 11
    const FIM = 12

  var activity = getValue("WKNumState");


  if (activity == 0) {
    form.setEnabled("obsdp", false);

  }

  if (activity == AGENDAMENTO_BLOQUEIO){
    form.setEnabled("nome", false);
    form.setEnabled("matricula", false);
    

  }

  if (activity == EFETIVACAO_CANCELAMENTO){
    form.setEnabled("nome", false);
    form.setEnabled("matricula", false);
    form.setEnabled("desligamento", false);
    
  }


  if (activity == BLOQUEIO_TI){
    form.setEnabled("nome", false);
    form.setEnabled("matricula", false);
    form.setEnabled("desligamento", false);
    form.setEnabled("obsdp", false);
    form.setEnabled("aviso", false);


  }

}




// function enableFields(form) {

//     const EVENTO_INICIO = 4
//     const AGENDAMENTO_BLOQUEIO = 5
//     const BLOQUEIO_TI = 6
//     const EFETIVACAO_CANCELAMENTO = 11
//     const FIM = 12

//   var activity = getValue("WKNumState");

//   switch(activity) {

//     case 0:
//     case EVENTO_INICIO:
//     form.setEnabled("desligamento", false);
//     form.setEnabled("obsdp", false);

//         break

//     case AGENDAMENTO_BLOQUEIO:
//     form.setEnabled("matricula", false);
//     form.setEnabled("nome", false);
    
//         break

//     case EFETIVACAO_CANCELAMENTO:
//     form.setEnabled("matricula", false);
//     form.setEnabled("nome", false);
        
//         break

//     case BLOQUEIO_TI:
//     form.setEnabled("matricula", false);
//     form.setEnabled("nome", false);

//         break

// }

// }
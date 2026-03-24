function validateForm(form) {

	if (form.getValue("TipoMov") == "Selecione") {
		throw "Selecione o tipo de movimento!";
	}

	if (form.getValue("CodCliente") == "") {
		throw "Selecione o código do cliente!";
	}

	if (form.getValue("Cliente") == "") {
		throw "Selecione o cliente!";
	}

	if (form.getValue("NumNF") == "") {
		throw "Número da NF não pode ser em branco!";
	}
}
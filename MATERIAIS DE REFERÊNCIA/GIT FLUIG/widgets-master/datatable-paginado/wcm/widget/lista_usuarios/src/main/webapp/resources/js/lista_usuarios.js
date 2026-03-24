var ListaUsuarios = SuperWidget.extend({
	//Variável que receberá contexto da datatable
	table : null,	
	
    init: function() {
		//Verifica se a widget está no modo de visualização
    	if(!this.isEditMode)
			//Realiza chamada para listar usuários no datatable
    		this.carregaDatatableUsuarios();
    },
  
	//Estrutura padrão de binding de eventos. Não está sendo utilizado nesta widget
    bindings: {
        local: {},
        global: {}
    },
    
	/**
	 * Função responsável em consumir o endpoint '/api/public/wcm/user/findUsingFilter' e
	 * listar o resultado na datatable.
	 */
    carregaDatatableUsuarios : function() {
		/*
		 * A variável 'that' recebe o contexto da widget para ser utilizado
		 * dentro de outra função que possui outro contexto.
		 */
    	let that = this;
		
		/*
		 * Instancia o componente datatable padrão do fluig Style Guide.
		 * Mais informações em https://style.fluig.com/javascript.html#fluig-datatable
		 */
    	this.table = FLUIGC.datatable('#listaUsuarios_' + this.instanceId, {
    	    dataRequest: {
    	        url: '/api/public/wcm/user/findUsingFilter?',
    	        options: {
    	            contentType:'application/json',
    	            dataType: 'json'
    	        },
    	        root: 'content',
    	        limit: 10,
    	        offset: 0,
    	        patternKey: 'pattern',
    	        limitkey: 'limit',
    	        offsetKey: 'offset',
    	        formatData: function(data) {
					//Retorna o resultado da função para alterar o valor do status de 'ACTIVE' para 'Sim'
    	            return that.formataStatusUsuarios(data);
    	        }
    	    },
    	    renderContent: '.tpl-users',
    	    header: [
    	        {
    	            'title': '',
    	            'size': 'col-md-1'
    	        },
    	        {
    	            'title': 'Matrícula',
    	            'dataorder': 'userCode',
    	            'size': 'col-md-2',
    	        },
    	        {
    	            'title': 'Nome',
    	            'dataorder': 'fullName',
    	            'standard' : true,
    	            'size': 'col-md-3'
    	        },
    	        {
    	            'title': 'Login',
    	            'dataorder': 'login',
    	            'size': 'col-md-2'
    	        },
    	        {
    	            'title': 'E-mail',
    	            'dataorder': 'email',
    	            'size': 'col-md-3'
    	        },
    	        {
    	            'title': 'Ativo',
    	            'dataorder': 'state',
    	            'size': 'col-md-1'
    	        }
    	    ],
    	    multiSelect: false,
    	    classSelected: 'info',
    	    search: {
    	        enabled: true,
    	        onlyEnterkey: false,
    	        searchAreaStyle: 'col-md-3'
    	    },
    	    actions: {
    	        enabled: false
    	    },
    	    navButtons: {
    	        enabled: true,
    	        forwardstyle: 'btn-primary',
    	        backwardstyle: 'btn-primary',
    	    },
    	    emptyMessage: '<div class="text-center">Nenhum usuário encontrado.</div>',
    	    tableStyle: 'table-striped'
    	}, function(err, data) {
    	});
    },
	
	/* 
	 * Recebe os dados originais da consulta e realiza a transformação dos dados recebidos antes da renderização.
	 * Nesse caso, altera o valor do atributo 'state', quando igual a 'ACTIVE', para 'Sim'.
	 */
	formataStatusUsuarios : function(data) {
		let newData = {};
		Object.assign(newData, data);
		for(let i in newData.content) {
			if(newData.content[i].state == "ACTIVE") 
				newData.content[i].state = "Sim";
			else
				newData.content[i].state = "Não";
		}
		return newData;
	}
});

var graficos = SuperWidget.extend({
	//Objeto para montagem do gráfico fica nesta variável, assim quando alteramos o tipo de gráfico não é necessário realizar a consulta dos dados novamente.
	data: null,
	
	//Objeto para mostrar feature de carregamento de tela.
	loading: FLUIGC.loading(".div-grafico"),
	
	init: function () {    	
		//No carregamento da widget, chama a função para recuperar os dados do gráfico
	    this.retornaGrafico();
	},
	
	bindings: {
	    local: {
			//Chama a função para recuperar os dados do gráfico ao alterar o campo 'Gráfico'
	    	'chart-data': ['change_retornaGrafico'],
	    	
			//Chama a função para montar o gráfico ao alterar o campo 'Tipo'
	    	'chart-type': ['change_montarGrafico']
	    }
	},
	
	retornaGrafico: function(){
		//Recupera o valor do campo 'Gráfico' para saber qual dado buscar no Fluig
		let chart = $("#tipo_grafico_"+this.instanceId).val();
		
		//Recupera os dados baseado no valor do campo 'Gráfico'
		if (chart == "usuarios_ativos") {
			this.retornaUsuariosAtivos();
		} else if (chart == "usuarios_admins") {
			this.retornaUsuariosAdmin();
		} else if (chart == "grupos") {
			this.retornaUsuariosPorGrupo();
		} else if (chart == "papeis") {
			this.retornaUsuariosPorPapel();
		}
	},
	
	/**
	 * Recupera total de usuários ativos para adicionar no gráfico
	 */
	retornaUsuariosAtivos: function(){
		let that = this;
		that.loading.show();
		
		DatasetFactory.getDataset("colleague", ["active"], null, null, {
			success : function(data) {
				if (data != null && data.values.length > 0) {
					let actives = 0;
					let inactives = 0;
					
					//Laço para definir usuários ativos e bloqueados
					for (let i= 0; i < data.values.length; i++) {
						data.values[i]["active"] == "true" ? actives++ : inactives++;
					}
					
					//Array de objetos utilizado para gerar os gráficos
					let users = [
			            {
			                value: actives,
			                color:"green",
			                label: "Ativos"
			            }, {
			                value: inactives,
			                color: "red",
			                label: "Inativos"
			            }
			        ];
					
					//Insere no objeto da superwidget para poder ser utilizado em outras funções, 'globalmente'
					that.data = users;
					
					//Chama função para montar o gráfico
					that.montarGrafico();
				} else {
					FLUIGC.toast({
					   title: '',
					   message: 'Nenhum usuário encontrado no Fluig',
					   type: 'warning'
				   });
				}
			}, error : function(err) {
				console.error("Erro ao consultar usuários.");
			}
		});								
	},
	
	/**
	 * Recupera total de usuários administradores para adicionar no gráfico
	 */
	retornaUsuariosAdmin: function(){
		let that = this;
		that.loading.show();
		
		DatasetFactory.getDataset("colleague", ["adminUser"], null, null, {
			success : function(data) {
				if (data != null && data.values.length > 0) {
					let admins = 0;
					let normal = 0;
	
					//Laço para definir usuários admins e normais
					for (let i = 0; i < data.values.length; i++) {
						data.values[i]["adminUser"] == "true" ? admins++ : normal++;
					}
					
					//Array de objetos utilizado para gerar os gráficos
					let users = [
			            {
			                value: admins,
			                color:"green",
			                label: "Admin"
			            }, {
			                value: normal,
			                color: "red",
			                label: "Normal"
			            }
			        ];
					
					//Insere no objeto da superwidget para poder ser utilizado em outras funções, 'globalmente'
					that.data = users;
					
					//Chama função para montar o gráfico
					that.montarGrafico();
				} else {
					that.loading.hide();
					FLUIGC.toast({
					   title: '',
					   message: 'Nenhum usuário encontrado no Fluig',
					   type: 'warning'
				   });
				}
			}, error : function(err) {
				that.loading.hide();
				console.error("Erro ao consultar usuários.");
			}
		});						
    },  
	  
		/**
	 * Recupera total de usuários por grupo para adicionar no gráfico
	 */
	retornaUsuariosPorGrupo: function(){
		let that = this;
		that.loading.show();
		
		let constraints = [];
		//Filtra por empresa corrente
		constraints.push(DatasetFactory.createConstraint("companyId", WCMAPI.tenantCode, WCMAPI.tenantCode, ConstraintType.MUST));
		
		//Chama o dataset para recuperar todos os grupos
		DatasetFactory.getDataset("group", null, constraints, null, {
			success : function(data) {
				if (data != null && data.values.length > 0) {
					//Array de objetos utilizado para gerar os gráficos
					let groups = [];
					
					for (let i = 0; i < data.values.length; i++) {
						let values = data.values[i];
						
						//Cria o objeto que será usado no grafico
						let group = {};
						
						//Informa a label que irá aparecer no gráfico para o grupo
						group.label = values["groupDescription"];
						
						//Informa a cor que irá aparecer no gráfico para o grupo - como temos 'n' registros, está sendo setado randomicamente
						group.color = '#' + (Math.random().toString(16) + "000000").substring(2,8);
						
						let constraints = [];
						//Filtro para buscar quantos usuários estão no grupo atual
				    	constraints.push(DatasetFactory.createConstraint("groupId", values["groupPK.groupId"], values["groupPK.groupId"], ConstraintType.MUST));
				    	
				    	//Chama o dataset para recuperar os usuários por grupo
						let ds = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
						
						if (ds && ds.values.length) {
							//Informa a quantidade de pessoas no grupo para o grafico
							group.value = ds.values.length;
							
							//Insere o grupo corrente no array de objetos que será utilizado para montar o gráfico
							groups.push(group);
						} else {
							that.loading.hide();
						}			
					}
					
					//Insere no objeto da superwidget para poder ser utilizado em outras funções, 'globalmente'
					that.data = groups;
					
					//Chama função para montar o gráfico
					that.montarGrafico();
				} else {
					that.loading.hide();
					FLUIGC.toast({
					   title: '',
					   message: 'Nenhum grupo encontrado no Fluig.',
					   type: 'warning'
				   });
				}
			}, error : function(err) {
				console.error("Erro ao consultar grupos do Fluig.");
			}
		});						
    },
	  
	/**
	 * Recupera total de usuários por papel para adicionar no gráfico
	 */
	retornaUsuariosPorPapel: function(){
		let that = this;
		that.loading.show();
		
		let constraints = [];
		//Filtra por empresa corrente
		constraints.push(DatasetFactory.createConstraint("companyId", WCMAPI.tenantCode, WCMAPI.tenantCode, ConstraintType.MUST));
		
		//Array de objetos utilizado para gerar os gráficos
		let roles = [];
		
		//Chama o dataset para recuperar todos os papéis
		DatasetFactory.getDataset("workflowRole", null, constraints, null, {
			success : function(data) {
				if (data != null && data.values.length > 0) {
					for (let i = 0; i < data.values.length; i++) {
						let values = data.values[i];
						
						//Cria o objeto que será usado no grafico
						let role = {};
						
						//Informa a label que irá aparecer no gráfico para o papel
						role.label = values["roleDescription"];
						
						//Informa a cor que irá aparecer no gráfico para o papel - como temos 'n' registros, está sendo setado randomicamente
						role.color = '#' + (Math.random().toString(16) + "000000").substring(2,8);
						
						let constraints = [];
						//Filtro para buscar quantos usuários estão no papel atual
				    	constraints.push(DatasetFactory.createConstraint("roleId", values["workflowRolePK.roleId"], values["workflowRolePK.roleId"], ConstraintType.MUST));
				    	
				    	//Chama o dataset para recuperar os usuários por papel
						let ds = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
						if (ds && ds.values.length) {
							//Informa a quantidade de pessoas no papel para o grafico
							role.value = ds.values.length;
							
							//Insere o papel corrente no array de objetos que será utilizado para montar o gráfico
							roles.push(role);
						} else {
							that.loading.hide();
						}			
					}
					
					//Insere no objeto da superwidget para poder ser utilizado em outras funções, 'globalmente'
					that.data = roles;
					
					//Chama função para montar o gráfico
					that.montarGrafico();
				} else {
					that.loading.hide();
					FLUIGC.toast({
					   title: '',
					   message: 'Nenhum papel encontrado no Fluig.',
					   type: 'warning'
				   });
				}
			}, error : function(err) {
				console.error("Erro ao consultar papéis do Fluig.");
			}
		});						
	},
	
	/**
	 * Função responsável em renderizar o gráfico em tela
	 * com base nos dados selecionados
	 */
	montarGrafico: function(){    	
		//Instancia o grafico na div que deve ser construido
		let chart = FLUIGC.chart("#div-grafico_" + this.instanceId);
		
		//Recupera o array de objetos já construido/populado pelas funções
		let chartData = this.data;
		
		//Recupera o tipo de grafico a ser montado
		let chartType = $("#tipo_"+this.instanceId).val();
		let options = null;
		
		//Monta os graficos de acordo com o tipo escolhido
		if (chartType == "pie") {
			chart.pie(chartData, options);
		} else if (chartType == "polar") {
			chart.polar(chartData, options);
		} else if (chartType == "doughnut") {
			chart.doughnut(chartData, options);
		}
		
		//Esconde o loading
		this.loading.hide();
	}
});
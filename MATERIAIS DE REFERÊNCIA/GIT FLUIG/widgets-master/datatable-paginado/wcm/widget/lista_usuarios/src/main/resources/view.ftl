<div id="ListaUsuarios_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="ListaUsuarios.instance()">
	<div class="panel panel-default">
	    <div class="panel-heading">
	        <h3 class="panel-title">Relatório de usuários</h3>
	    </div>
	    <div class="panel-body">
	    	<div id="listaUsuarios_${instanceId}"></div>
	    </div>
	</div>
</div>

<#-- Template Mustache que será utilizado para renderizar linhas do datatable -->
<script type="text/template" class="tpl-users">
	<tr>
		<td>
			<img class="lista-usuario-img" width="32" src="/api/public/social/community/imageBySize/{{login}}/80"></img>
		</td>
		<td>
			{{userCode}}
		</td>
		<td>
			{{fullName}}
		</td>
		<td>
			{{login}}
		</td>
		<td>
			{{email}}
		</td>
		<td>
			{{state}}
		</td>
	</tr>
</script>
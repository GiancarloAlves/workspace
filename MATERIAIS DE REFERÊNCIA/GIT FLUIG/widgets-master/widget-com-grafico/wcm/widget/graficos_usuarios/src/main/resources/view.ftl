<div id="graficos_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="graficos.instance({})">

	<div class="panel panel-default">
	    <div class="panel-heading">
	        <h3 class="panel-title">Gráficos de usuários</h3>
	    </div>
	    <div class="panel-body">
	    	<div class="form-group row">
	    		<div class="col-md-6">
		   			<label for="grafico">Tipo de dado</label>
		            <select class="form-control" id="tipo_grafico_${instanceId}" name="tipo_grafico_${instanceId}" data-chart-data>
		                <option value="usuarios_ativos">Usuários ativos</option>
		                <option value="usuarios_admins">Usuários admins</option>
		                <option value="grupos">Usuários por grupo</option>
		                <option value="papeis">Usuários por papel</option>
		            </select>
	            </div>
	            <div class="col-md-6">
		   			<label for="tipo">Modelo de gráfico</label>
		            <select class="form-control" id="tipo_${instanceId}" name="tipo_${instanceId}" data-chart-type>
		                <option value="pie">Pizza</option>
		                <option value="polar">Radar</option>
		                <option value="doughnut">Rosca</option>
		            </select>
	            </div>
	   		</div>
	   		<div class="form-group row">
	   			<div id="div-grafico_${instanceId}" class="div-grafico"></div>
   			</div>
	    </div>
	</div>
</div>

<#-- Importação da biblioteca para consulta de dataset -->
<script src="/webdesk/vcXMLRPC.js" type="text/javascript"></script>
/**
 *
 * @autor Andres Duarte M.
 *
 */
 

for( var i = 1; i <= 960; i++ ){
	if( i === 12 ){
		$('#cmbMeses').append('<option value="12" selected>12</option>');		
	}else{
		$('#cmbMeses').append($('<option>', {
		    value: i,
		    text : i 
		}));
	}
} 

$( document ).ready(function() {

	$("#btnCalcular").on( "click", function() {
		var capital 	= $('#inTxtCapital').val();
		var r 			= $('#inTxtR').val();
		var ahorro 		= $('#inTxtAhorro').val();
		var total_meses = $('#cmbMeses').val();

		if( total_meses > 960 ){
			$("#alerta").load("alerta.html");
			return false;
		}

		oRentabilidad = new RentabilidadAhorro(capital, r, ahorro);

		var x = 0;
		var data = [];
		for(var mes=1; mes <= total_meses; mes++){
			oRentabilidad.calcular(mes, x);
			x = oRentabilidad.saldoFinal;
			data.push(oRentabilidad.resultado);
		}

		$('#tblRentabilidad').bootstrapTable({data: data});
	});

	$("#btnCalcular").click();

    var $table = $('#tblRentabilidad'), $button = $('#btnCalcular');
    $(function () {
        $button.click(function () {
            $table.bootstrapTable('load', getData());
        });
    });

    function getData() {
		var capital 	= $('#inTxtCapital').val();
		var r 			= $('#inTxtR').val();
		var ahorro 		= $('#inTxtAhorro').val();
		var total_meses = $('#cmbMeses').val();

		if( total_meses > 960 ){
			$("#alerta").load("alerta.html");
			return false;
		}

		oRentabilidad = new RentabilidadAhorro(capital, r, ahorro);

		var x = 0;
		var data = [];
		for(var mes=1; mes <= total_meses; mes++){
			oRentabilidad.calcular(mes, x);
			x = oRentabilidad.saldoFinal;
			data.push(oRentabilidad.resultado);
		}
		return data;
    }

	$('#exportarCSV').on('click', function(){
		$('#tblRentabilidad').tableExport({type:'csv'});
	});

	$('#exportarXSL').on('click', function(){
		$('#tblRentabilidad').tableExport({type:'excel'});
	});

});

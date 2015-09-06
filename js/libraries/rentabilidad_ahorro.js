/**
 *
 * @autor Andres Duarte M.
 *
 */

function RentabilidadAhorro(capitalInicial, r, montoAhorro){
	this.capitalInicial = parseInt(capitalInicial); 
	this.r				= r/100;
	this.montoAhorro	= parseInt(montoAhorro);
	this.resultado = {};
}

RentabilidadAhorro.prototype.calcular = function (mes, saldoFinal){
	var capitalInicial 	= this.capital_inicial(mes, saldoFinal);
	var saldo 			= this.saldo(mes, saldoFinal);
	var nuevoSaldoFinal = this.saldo_final(mes, this.montoAhorro, saldoFinal);
	var difSaldoFinal	= this.dif_saldo_final(saldoFinal, mes, this.montoAhorro);
	var rMas1 = this.r + 1;

	this.resultado = {
		mes				: mes,
		capitalInicial	: separadorDeMiles.call(capitalInicial.toString().split('.').join(''),'.','.'),
		rMas1 			: normalizarDecimal(rMas1),
		saldo 			: separadorDeMiles.call(saldo.toString().split('.').join(''),'.','.'),
		ahorroMes		: separadorDeMiles.call(this.montoAhorro.toString().split('.').join(''),'.','.'),
		nuevoSaldoFinal	: separadorDeMiles.call(nuevoSaldoFinal.toString().split('.').join(''),'.','.'),
		difSaldoFinal	: separadorDeMiles.call(difSaldoFinal.toString().split('.').join(''),'.','.')
	};

	this.saldoFinal = nuevoSaldoFinal;
}

RentabilidadAhorro.prototype.capital_inicial = function (mes, saldoFinal){
	if( mes === 1 )
		result = this.capitalInicial;
	else if( mes > 1)
		result = saldoFinal;
	return Math.round(result);
};

RentabilidadAhorro.prototype.saldo = function (mes, saldoFinal){
	return Math.round(this.capital_inicial(mes, saldoFinal) * (1 + this.r));
};

RentabilidadAhorro.prototype.saldo_final = function (mes, montoAhorro, saldoFinal){
	return Math.round(this.saldo(mes, saldoFinal) + montoAhorro);
};

RentabilidadAhorro.prototype.dif_saldo_final = function (saldo, mes, montoAhorro){
	return Math.round(this.saldo_final(mes, montoAhorro, saldo) - saldo);
};
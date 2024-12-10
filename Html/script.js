function startApp() {
    window.location.href = 'calculadora.html';
}

function calculate() {
    let entrada = parseFloat(document.getElementById('entrada').value);
    let salida = parseFloat(document.getElementById('salida').value);
    let costo = parseFloat(document.getElementById('costo').value);
    let valorRango = parseFloat(document.getElementById('valorRango').value);
    let modoDesarrollo = document.getElementById('modoDesarrollo').value;

    if (isNaN(entrada) || isNaN(salida) || isNaN(costo) || isNaN(valorRango)) {
        alert("Por favor, ingrese todos los valores correctamente.");
        return;
    }

    let a, b, c, d, minRango, maxRango;
    switch (modoDesarrollo) {
        case 'organico':
            a = 3.2; b = 1.05; c = 2.5; d = 0.38; minRango = 50; maxRango = 80;
            break;
        case 'semiAcoplado':
            a = 3.0; b = 1.12; c = 2.5; d = 0.35; minRango = 81; maxRango = 100;
            break;
        case 'acoplado':
            a = 2.8; b = 1.20; c = 2.5; d = 0.32; minRango = 101; maxRango = 150;
            break;
        default:
            alert("Modo de desarrollo no válido.");
            return;
    }

    if (valorRango < minRango || valorRango > maxRango) {
        alert("Valor rango fuera del rango permitido para " + modoDesarrollo + ".");
        return;
    }

    let LDC = (entrada + salida) * valorRango;
    let MLDC = LDC / 1000;
    let E = (Math.pow(MLDC, b) * a);
    let TD = c * Math.pow(E, d);
    let P = LDC / E;
    let PN = E / TD;
    let COSTO = costo * E;
    let COSTO_LDC = COSTO / LDC;

    let result = [
        ['Líneas de código (LDC)', LDC.toFixed(2)],
        ['Miles de líneas de código (MLDC)', MLDC.toFixed(2)],
        ['Esfuerzo (E)', E.toFixed(2)],
        ['Tiempo de desarrollo (TD)', TD.toFixed(2)],
        ['Personal necesario (PN)', PN.toFixed(2)],
        ['Productividad (P)', P.toFixed(2)],
        ['Costo total (COSTO)', COSTO.toFixed(2)],
        ['Costo por línea de código (COSTO_LDC)', COSTO_LDC.toFixed(2)]
    ];

    localStorage.setItem('result', JSON.stringify(result));
    window.location.href = 'resultados.html';
}

function goBack() {
    window.location.href = 'calculadora.html';
}

window.onload = function() {
    if (window.location.pathname.endsWith('resultados.html')) {
        let resultData = JSON.parse(localStorage.getItem('result'));
        let resultTable = document.getElementById('result');
        resultData.forEach(item => {
            let row = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            cell1.textContent = item[0];
            cell2.textContent = item[1];
            row.appendChild(cell1);
            row.appendChild(cell2);
            resultTable.appendChild(row);
        });
    }
}

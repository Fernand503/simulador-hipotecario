// ==========================================
// ELEMENTOS PRINCIPALES
// ==========================================

const btnCalcular =
    document.getElementById("btnCalcular");

const btnRestablecer =
    document.getElementById("btnRestablecer");

const btnCopiar =
    document.getElementById("btnCopiar");


// Formato monetario
const formatoDinero =
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });


// ==========================================
// CALCULAR
// ==========================================

btnCalcular.addEventListener("click", function () {

    // --------------------------------------
    // LEEMOS LOS DATOS
    // --------------------------------------

    const precio =
        Number(document.getElementById("precio").value);

    const prima =
        Number(document.getElementById("prima").value);

    const ingresos =
        Number(document.getElementById("ingresos").value);

    const otrasCuotas =
        Number(document.getElementById("otrasCuotas").value);

    const tasa =
        Number(document.getElementById("tasa").value);

    const plazo =
        Number(document.getElementById("plazo").value);

    const seguroDanosInput =
        Number(document.getElementById("seguroDanosInput").value);


    // --------------------------------------
    // VALIDACIONES
    // --------------------------------------

    if (precio <= 0) {

        alert(
            "Ingresa un valor válido para la propiedad."
        );

        return;
    }


    if (prima < 0 || prima >= 100) {

        alert(
            "La prima debe estar entre 0% y 99%."
        );

        return;
    }


    if (ingresos <= 0) {

        alert(
            "Ingresa los ingresos familiares mensuales."
        );

        return;
    }


    if (otrasCuotas < 0) {

        alert(
            "Las otras cuotas no pueden ser negativas."
        );

        return;
    }


    if (tasa < 0) {

        alert(
            "La tasa de interés no puede ser negativa."
        );

        return;
    }


    if (plazo <= 0) {

        alert(
            "Selecciona un plazo válido."
        );

        return;
    }

    if (seguroDanosInput < 0) {

        alert("El seguro de daños no puede ser negativo.");

        return;
    }

    // ======================================
    // CÁLCULOS
    // ======================================

    // Prima
    const montoPrima =
        precio * (prima / 100);


    // Financiamiento
    const financiamiento =
        precio - montoPrima;


    // Tasa mensual
    const tasaMensual =
        (tasa / 100) / 12;


    // --------------------------------------
    // CUOTA HIPOTECARIA
    // --------------------------------------

    let cuotaHipoteca;


    // Caso especial: tasa 0%
    if (tasaMensual === 0) {

        cuotaHipoteca =
            financiamiento / plazo;

    } else {

        cuotaHipoteca =
            financiamiento *
            (
                tasaMensual *
                Math.pow(
                    1 + tasaMensual,
                    plazo
                )
            )
            /
            (
                Math.pow(
                    1 + tasaMensual,
                    plazo
                ) - 1
            );

    }


    // --------------------------------------
    // SEGUROS
    // --------------------------------------

    const seguroVida =
        financiamiento * 0.0006;


    const seguroDanos =
        seguroDanosInput;


    // --------------------------------------
    // CUOTA TOTAL
    // --------------------------------------

    const cuotaBanco =
        cuotaHipoteca +
        seguroVida +
        seguroDanos;

    const cargaMensualTotal =
        cuotaBanco +
        otrasCuotas;


    // --------------------------------------
    // CAPACIDAD DE PAGO
    // --------------------------------------

    const porcentajeComprometido =
        (cargaMensualTotal / ingresos) * 100;

    const cuotaMaxima =
        ingresos * 0.60;

    const ingresoMinimo =
        cargaMensualTotal / 0.60;


    // ======================================
    // MOSTRAR RESULTADOS
    // ======================================

    document
        .getElementById("cuotaTotalTexto")
        .textContent =
        formatoDinero.format(cuotaBanco);


    document
        .getElementById("capitalInteresTexto")
        .textContent =
        formatoDinero.format(cuotaHipoteca);


    document
        .getElementById("seguroVidaTexto")
        .textContent =
        formatoDinero.format(seguroVida);


    document
        .getElementById("seguroDanosTexto")
        .textContent =
        formatoDinero.format(seguroDanos);


    document
        .getElementById("financiamientoTexto")
        .textContent =
        formatoDinero.format(financiamiento);


    document
        .getElementById("primaTexto")
        .textContent =
        formatoDinero.format(montoPrima)
        + " (" + prima + "%)";


    document
        .getElementById("cuotaConOtrasTexto")
        .textContent =
        formatoDinero.format(cargaMensualTotal);


    document
        .getElementById("ingresosTexto")
        .textContent =
        formatoDinero.format(ingresos);


    document
        .getElementById("cuotaMaximaTexto")
        .textContent =
        formatoDinero.format(cuotaMaxima);


    document
        .getElementById("ingresoMinimoTexto")
        .textContent =
        formatoDinero.format(ingresoMinimo);


    document
        .getElementById("plazoTexto")
        .textContent =
        plazo;


    document
        .getElementById("tasaTexto")
        .textContent =
        tasa;


    // --------------------------------------
    // PORCENTAJE
    // --------------------------------------

    const porcentajeFormateado =
        porcentajeComprometido.toFixed(1) + "%";


    document
        .getElementById("porcentajeTexto")
        .textContent =
        porcentajeFormateado;


    document
        .getElementById("porcentajeDescripcion")
        .textContent =
        porcentajeFormateado;


    // --------------------------------------
    // MEDIDOR CIRCULAR
    // --------------------------------------

    const medidorCircular =
        document.getElementById(
            "medidorCircular"
        );


    medidorCircular.style.setProperty(
        "--porcentaje",
        Math.min(
            porcentajeComprometido,
            100
        )
    );


    // ======================================
    // ESTADO
    // ======================================

    const estadoResultado =
        document.getElementById(
            "estadoResultado"
        );


    const textoAplica =
        document.getElementById(
            "textoAplica"
        );


    const badgeEstado =
        document.getElementById(
            "badgeEstado"
        );


    if (aplica) {

        textoAplica.textContent =
            "Sí aplica según los datos ingresados";


        badgeEstado.textContent =
            "✓ ELEGIBLE";


        estadoResultado
            .classList
            .remove("no-aplica");

    } else {

        textoAplica.textContent =
            "La cuota supera el límite establecido";


        badgeEstado.textContent =
            "✕ SUPERA EL LÍMITE";


        estadoResultado
            .classList
            .add("no-aplica");

    }


    // --------------------------------------
    // MOSTRAMOS RESULTADO
    // --------------------------------------

    document
        .getElementById("resultado")
        .classList
        .remove("d-none");


    // Habilitamos copiar
    btnCopiar.disabled = false;

});


// ==========================================
// RESTABLECER
// ==========================================

btnRestablecer.addEventListener(
    "click",
    function () {

        document
            .getElementById("precio")
            .value = "";


        document
            .getElementById("prima")
            .value = 10;


        document
            .getElementById("ingresos")
            .value = "";


        document
            .getElementById("otrasCuotas")
            .value = 0;


        document
            .getElementById("tasa")
            .value = 7.5;


        document
            .getElementById("plazo")
            .value = 360;

        document
            .getElementById("seguroDanosInput")
            .value = 0;


        // Ocultamos resultados
        document
            .getElementById("resultado")
            .classList
            .add("d-none");


        // Volvemos al estado positivo visual
        document
            .getElementById("estadoResultado")
            .classList
            .remove("no-aplica");


        // Reiniciamos medidor
        document
            .getElementById("medidorCircular")
            .style
            .setProperty(
                "--porcentaje",
                0
            );


        // Deshabilitamos copiar
        btnCopiar.disabled = true;

    }
);


// ==========================================
// COPIAR DATOS
// ==========================================

btnCopiar.addEventListener(
    "click",
    function () {


        // Seguridad extra
        const panelResultado =
            document.getElementById(
                "resultado"
            );


        if (
            panelResultado
                .classList
                .contains("d-none")
        ) {

            alert(
                "Primero calcula el financiamiento."
            );

            return;
        }


        // ----------------------------------
        // LEEMOS RESULTADOS
        // ----------------------------------

        const cuotaTotal =
            document
                .getElementById("cuotaTotalTexto")
                .textContent;


        const capitalInteres =
            document
                .getElementById("capitalInteresTexto")
                .textContent;


        const seguroVida =
            document
                .getElementById("seguroVidaTexto")
                .textContent;


        const seguroDanos =
            document
                .getElementById("seguroDanosTexto")
                .textContent;


        const financiamiento =
            document
                .getElementById("financiamientoTexto")
                .textContent;


        const prima =
            document
                .getElementById("primaTexto")
                .textContent;


        const cuotaConOtras =
            document
                .getElementById("cuotaConOtrasTexto")
                .textContent;


        const ingresos =
            document
                .getElementById("ingresosTexto")
                .textContent;


        const cuotaMaxima =
            document
                .getElementById("cuotaMaximaTexto")
                .textContent;


        const ingresoMinimo =
            document
                .getElementById("ingresoMinimoTexto")
                .textContent;


        const plazo =
            document
                .getElementById("plazoTexto")
                .textContent;


        const tasa =
            document
                .getElementById("tasaTexto")
                .textContent;


        const porcentaje =
            document
                .getElementById("porcentajeTexto")
                .textContent;


        const resultado =
            document
                .getElementById("textoAplica")
                .textContent;


        // ----------------------------------
        // RESUMEN
        // ----------------------------------

        const resumen = `
SIMULACIÓN HIPOTECARIA BUENAVENTURA

Resultado:
${resultado}

Cuota mensual del banco: ${cuotaTotal}

Capital + interés: ${capitalInteres}
Seguro de vida/deuda: ${seguroVida}
Seguro de daños: ${seguroDanos}

Financiamiento: ${financiamiento}
Prima: ${prima}

Otras obligaciones mensuales: ${
            formatoDinero.format(
                Number(document.getElementById("otrasCuotas").value)
            )
        }

Carga mensual considerada: ${cuotaConOtras}

Ingresos considerados: ${ingresos}
Ingresos comprometidos: ${porcentaje}
Cuota máxima al 60%: ${cuotaMaxima}
Ingreso mínimo requerido: ${ingresoMinimo}

Plazo: ${plazo} meses
Tasa nominal anual: ${tasa}%

Cálculo aproximado sujeto a condiciones y evaluación de la institución financiera.
`.trim();


        // ==================================
        // COPIAMOS
        // ==================================

        navigator
            .clipboard
            .writeText(resumen)

            .then(function () {

                const textoOriginal =
                    btnCopiar.innerHTML;


                btnCopiar.innerHTML =
                    "✓ Datos copiados";


                setTimeout(
                    function () {

                        btnCopiar.innerHTML =
                            textoOriginal;

                    },
                    2000
                );

            })

            .catch(function (error) {

                console.error(
                    "Error al copiar:",
                    error
                );


                alert(
                    "No se pudo copiar el resumen."
                );

            });

    }
);
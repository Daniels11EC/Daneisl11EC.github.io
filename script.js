const tarea_e = document.getElementById("tarea");
const boton = document.getElementById("agregar");
const lista = document.getElementById("lista");
const alerta = new Audio ('./sonido/alerta.mp3')

function AgregarTarea() {
    const texto = tarea_e.value.trim();
    if (texto === "") return;

    const li = document.createElement("li");
    li.className = "flex flex-col bg-gray-100 p-3 rounded";

    const contenido = document.createElement("div");
    contenido.className = "flex items-center justify-between";

    const span = document.createElement("span");
    span.textContent = texto;
    span.className = "text-gray-800 tx-lg italic";

    // Botón Eliminar
    const boton_e = document.createElement("button");
    boton_e.textContent = "Eliminar";
    boton_e.className = "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2";
    boton_e.addEventListener("click", () => {
        clearInterval(cuentaAtras); // detener el temporizador si se elimina
        li.remove();
    });

    // Botón Empezar
    const boton_empezar = document.createElement("button");
    boton_empezar.textContent = "Empezar";
    boton_empezar.className = "bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded ml-2";

    // Contador
    const contador = document.createElement("p");
    contador.className = " italic mt-2 text-4xl text-gray-700 font-semibold";

    let cuentaAtras; // para manejar el setInterval

    boton_empezar.addEventListener("click", () => {
        let tiempo = 1 * 60; // 30 minutos en segundos

        if (cuentaAtras) clearInterval(cuentaAtras);

        cuentaAtras = setInterval(() => {
            const minutos = Math.floor(tiempo / 60);
            const segundos = tiempo % 60;

            contador.textContent = `⏱️ ${minutos.toString().padStart(2, "0")}:${segundos
                .toString()
                .padStart(2, "0")}`;

            if (tiempo <= 0) {
                // Crear barra circular con DaisyUI
                clearInterval(cuentaAtras);
                contador.textContent = "⏱️ ¡Tiempo terminado, disfrutalo!";

                alerta.play();

                // Crear barra circular (progreso 0%)
                const progreso = document.createElement("div");
                progreso.className = "radial-progress text-black-500 text-2xl mx-auto my-4";
                progreso.setAttribute("style", "--value:0");
                progreso.setAttribute("role", "progressbar");
                progreso.textContent = "0%";
                li.appendChild(progreso);

                // Simular carga del 0% al 100%
                let porcentaje = 0;
                const intervaloCarga = setInterval(() => {
                    porcentaje += 5;
                    progreso.setAttribute("style", `--value:${porcentaje}`);
                    progreso.textContent = `${porcentaje}%`;

                    if (porcentaje >= 100) {
                        clearInterval(intervaloCarga);

                        // Mostrar imagen cuando termine la carga
                        const imagenes = [
                            "./img/1.jpeg",
                            "./img/2.jpeg",
                            "./img/3.jpeg",
                            "./img/4.jpeg",
                            "./img/5.jpeg",
                            "./img/6.jpeg",
                            "./img/7.jpeg",
                            "./img/8.gif",
                            "./img/9.jpeg",
                            "./img/10.jpeg",
                            "./img/11.jpeg",
                            "./img/12.jpeg"
                        ];
                        const rutaAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

                        const imagen = document.createElement("img");
                        imagen.src = rutaAleatoria;
                        imagen.alt = "¡Completado!";
                        imagen.className = "mt-4 w-[400px] h-auto mx-auto opacity-0 transition-opacity duration-125000ms";
                        li.appendChild(imagen);
                        setTimeout(() => {
                            imagen.classList.remove("opacity-0");
                            imagen.classList.add("opacity-100");
                            }, 50);

                            progreso.remove();
                    }
                }, 50);
            }
            tiempo--;
        }, 1000);
    });

    const botones = document.createElement("div");
    botones.className = "flex gap-2";
    botones.appendChild(boton_empezar);
    botones.appendChild(boton_e);

    contenido.appendChild(span);
    contenido.appendChild(botones);

    li.appendChild(contenido);
    li.appendChild(contador);

    lista.appendChild(li);

    tarea_e.value = "";
    tarea_e.focus();
}

boton.addEventListener("click", AgregarTarea);

tarea_e.addEventListener("keydown", (e) => {
    if (e.key === "Enter") AgregarTarea();
});

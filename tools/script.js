// La ruta de tu archivo CSV
const CSV_URL = 'enlaces.csv';
const linksContainer = document.getElementById('links-container');
const loadingMessage = document.getElementById('loading-message');

/**
 * Función que crea y devuelve un elemento HTML (tarjeta) para un enlace.
 * @param {string} enlace - La URL del recurso.
 * @param {string} descripcion - La descripción o título del recurso.
 */
function createLinkCard(enlace, descripcion) {
    // La estructura de tarjeta de Bulma
    const column = document.createElement('div');
    column.className = 'column is-one-third'; // Puedes cambiar a is-half o is-full
    
    const card = document.createElement('div');
    card.className = 'card link-card';
    
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    
    const content = document.createElement('div');
    content.className = 'content';
    
    const anchor = document.createElement('a');
    anchor.href = enlace;
    anchor.target = '_blank'; // Abrir en nueva pestaña
    anchor.className = 'title is-5';
    anchor.textContent = descripcion;
    
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle is-7 has-text-grey-light mt-2';
    subtitle.textContent = new URL(enlace).hostname; // Muestra el dominio
    
    content.appendChild(anchor);
    content.appendChild(subtitle);
    cardContent.appendChild(content);
    card.appendChild(cardContent);
    column.appendChild(card);
    
    return column;
}

// 1. Incluir la librería PapaParse para leer el CSV
const papaParseScript = document.createElement('script');
papaParseScript.src = 'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js';
papaParseScript.onload = () => {
    // 2. Leer el archivo CSV una vez que PapaParse esté cargado
    Papa.parse(CSV_URL, {
        download: true, // Permite descargar el archivo CSV
        header: true,   // Trata la primera fila como encabezado (enlace, descripcion)
        complete: function(results) {
            linksContainer.innerHTML = ''; // Limpiar el contenedor
            loadingMessage.style.display = 'none'; // Ocultar el mensaje de carga
            
            // 3. Iterar sobre los datos y crear las tarjetas
            results.data.forEach(row => {
                // Asegurarse de que ambas columnas existan y no estén vacías
                if (row.enlace && row.descripcion) {
                    const card = createLinkCard(row.enlace, row.descripcion);
                    linksContainer.appendChild(card);
                }
            });
            
            // Si no hay datos (excepto el encabezado)
            if (results.data.length === 0) {
                linksContainer.innerHTML = '<p class="has-text-centered is-size-5">No hay enlaces disponibles.</p>';
            }
        },
        error: function(error) {
            loadingMessage.innerHTML = `<p class="has-text-danger">Error al cargar el CSV: ${error.message}</p>`;
            console.error('Error al parsear CSV:', error);
        }
    });
};
document.head.appendChild(papaParseScript);

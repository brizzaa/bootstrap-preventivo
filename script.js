
// seleziono il form 
const formInput = document.querySelector("form");
const validCodes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// creo un oggetto e in base al lavoro prendo un numero diverso.

const hourlyRates = {
    backend: 20.5, 
    frontend: 15.3, 
    analysis: 33.6,
};


const hours = 10;

formInput.addEventListener("submit", function handleForm(event) {
    event.preventDefault();
    
    // prendo i valori dal form 
    let nomeInput = document.getElementById("nome").value;
    let cognomeInput = document.getElementById("cognome").value;
    let emailInput = document.getElementById("email").value;
    let lavoroInput = document.getElementById("tipoLavoro").value;
    let textareaInput = document.getElementById("textarea").value;
    let codiceInput = document.getElementById("codicePromozionale").value;
    let privacyPolicyInput = document.getElementById("privacyPolicy").checked;


    let price;
    // in base al lavoro cambio il prezzo/ora 
    switch (lavoroInput) {
        case "1": 
            price = hourlyRates.backend;
            break;
        case "2": 
            price = hourlyRates.frontend;
            break;
        case "3": 
            price = hourlyRates.analysis;
            break;
        default: break
    }

    let totalPrice = hours * price;

  // controllare il codice inserito
    let discountApplied = false;
    if (codiceInput && validCodes.includes(codiceInput.toUpperCase())) {
        discountApplied = true;
        totalPrice *= 0.75;
    }
    // formattare il prezzo 
    const formattedPrice = totalPrice.toFixed(2) + "€";


    let outputDiv = document.querySelector(".output-container");

    // per non far duplicare le div
    if (!outputDiv) {
        outputDiv = document.createElement("div");
        outputDiv.classList.add("output-container", "my-5", "px-3", "border", "rounded", "py-3", "text-center");
        const formContainer = document.querySelector(".col-md-8");
        formContainer.appendChild(outputDiv);
    }

    //output
    outputDiv.innerHTML = `
        <h3>Resoconto Preventivo</h3>
        <p><strong>Nome:</strong> ${nomeInput}</p>
        <p><strong>Cognome:</strong> ${cognomeInput}</p>
        <p><strong>Email:</strong> ${emailInput}</p>

        <p><strong>Commissione:</strong> ${lavoroInput === "1" ? "Sviluppo Backend" : lavoroInput === "2" ? "Sviluppo Frontend" : "Analisi Progettuale"}</p>

        <p><strong>Descrizione del lavoro</strong> ${textareaInput}</p>
  
        <p><strong>Codice Promozionale:</strong> ${codiceInput || "Nessuno"}</p>
        ${discountApplied ? "<p class='text-success'>Sconto del 25% applicato!</p>" : codiceInput ? "<p class='text-danger'>Codice promozionale non valido!</p>" : ""}
        
        
        <p><strong>Prezzo Finale:</strong> ${formattedPrice}</p>
        `;
        // <p><strong>Privacy Policy Accepted:</strong> ${privacyPolicyInput ? "Si" : "No"}</p>

   // reset del form 
    formInput.reset();
});


// prove extra
/*
let tipoLavoro;
if (lavoroInput === "1") {
    tipoLavoro = "Sviluppo Backend";
} else if (lavoroInput === "2") {
    tipoLavoro = "Sviluppo Frontend";
} else {
    tipoLavoro = "Analisi Progettuale";
} */

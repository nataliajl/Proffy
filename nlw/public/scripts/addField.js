document.querySelector("#add-time").addEventListener('click', cloneFiel); // busca botão 'novo horario' e pega evento clique

function cloneFiel() { // função de conagem do campo de horarios
    
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true); // pega div com a classe e clona a tag html
    const fields = newFieldContainer.querySelectorAll('input'); // pega campos tipo input de newFieldContainer e cria lista com elementos
    
    
    fields.forEach(clean); // cria um for para a lista e executa a função dentro dos parametro


    document.querySelector("#schedule-items").appendChild(newFieldContainer); // adiciona filho a região do id na pagina
}

function clean(currentlyField){ // recebe variavel para acessar valor
    currentlyField.value = ""; // limpa valores dos campos
}
 

function select_answer(event){
    let i=0; //mi indica che griglia sto visualizzando al momento (per aggiornare il numero di risposte ad ognuna di esse)
    let flag=false;
    let num_risp=0;

    const image=event.currentTarget;
    const grids=document.querySelectorAll('.choice-grid');

    for(const grid of grids){ //scorro le griglie
        const boxes=grid.querySelectorAll('.choice-grid div');

        for(const box of boxes){ //scorro le box per vedere se trovo l'immagine
            const box_image=box.querySelector('img');

            if(box_image===image){
                flag=true; //dato che ho trovato l'immagine, allora pongo flag a true
                const check=box.querySelector('img.checkbox');
                check.src="images/checked.png";
                box.classList.add('check');
                box.classList.remove('uncheck');
                answers[i]=box.dataset.choiceId; //dico che nella griglia i troviamo una risposta
            }
        }

        if(flag===true){
            for(const box of boxes){ //scorro le box della griglia, ora pero' per assegnare lo stile unchecked solo se flag e' true
                const box_image=box.querySelector('img');
                if(box_image!==image){
                        const check=box.querySelector('img.checkbox');
                        check.src="images/unchecked.png";
                        box.classList.add('uncheck');
                        box.classList.remove('check');
                        box_image.addEventListener("click",select_answer); //se e' tra quelli non scelti, rimetto la possibilita' di sceglierlo
                }
            }
        }

        flag=false; //riassegno flag=false perche' sto scorrendo una nuova griglia
        i++; //incremento l'indice della griglia
    }

    image.removeEventListener("click",select_answer);

    //controllo se tutte le griglie hanno una risposta o meno
    for(let i=0;i<3;i++){
        if(answers[i]!=='0'){
            num_risp++;
        }
    }
    
    //se tutte le griglie hanno una risposta, allora ho finito il test
    if(num_risp===3){

        for(let i=0;i<3;i++){
            results[answers[i]]++; //aggiorno la mappa delle personalità
        }

        const images=document.querySelectorAll('.choice-grid div img');
        for(const image of images){
            image.removeEventListener("click",select_answer);
        }
        //controllo qual è la personalità con più risposte
        let max=0;
        let personality='null';
        for( let name in results){
            if(results[name]>max){
                max=results[name];
                personality=name;
            }
        }
        //se però il max è 1, e ciò significa che non ho una personalità prevalente, allora il risultato è la risposta alla prima
        if(max===1){
            personality=answers[0];
        }
        //stampo i risultati
        const result=document.querySelector('#result');
        result.classList.add('result_visible');

        const titolo=result.querySelector('h1');
        const descrizione=result.querySelector('div');

        titolo.textContent=RESULTS_MAP[personality].title; 
        descrizione.textContent=RESULTS_MAP[personality].contents;

        const new_button=document.createElement('button');
        new_button.textContent="Ricomincia il quiz";
        new_button.classList.add('button');
        new_button.classList.add('button:hover');
        result.appendChild(new_button);
        new_button.addEventListener("click",reset);
    }
}



//funzione che azzera tutto quando premo il bottone ricomincia
function reset(event){
    const boxes= document.querySelectorAll('.choice-grid div');
    for(const box of boxes){
        const check=box.querySelector('img.checkbox');
        check.src="images/unchecked.png";
        box.classList.remove('check');
        box.classList.remove('uncheck');
        const box_image=box.querySelector('img');
        box_image.addEventListener("click",select_answer);
    }

    const button=document.querySelector('button');
    button.remove();
    
    const title=document.querySelector('#result h1');
    title.textContent=('');

    const description=document.querySelector('#result div');
    description.textContent=('');

    const result=document.querySelector('#result');
    result.classList.add('result_invisible');
    result.classList.remove('result_visible');

    answers=['0','0','0']; //azzero la lista
    results ={ //azzero la mappa delle personalità
        blep: 0,
        burger: 0,
        cart: 0,
        dopey: 0,
        happy: 0,
        nerd: 0,
        shy: 0,
        sleeping: 0,
        sleepy: 0
    };
}




let answers=['0','0','0']; //lista per vedere la risposta per ogni griglia 
let results ={ //mappa per vedere quante risposte ha una determinata personalità
    blep: 0,
    burger: 0,
    cart: 0,
    dopey: 0,
    happy: 0,
    nerd: 0,
    shy: 0,
    sleeping: 0,
    sleepy: 0
};

const choices= document.querySelectorAll('.choice-grid div img');
for(const choice of choices){
    choice.addEventListener("click",select_answer);
}


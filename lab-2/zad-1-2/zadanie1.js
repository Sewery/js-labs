
function script_begin(){
    window.prompt("Tekst1","Tekst2");
    (()=>{
    for(i=0;i<4;i++){
        let war = window.prompt("Wczytuje","Wpisz");
        console.log(`${war}:${typeof(war)}`)
    }
    })();
}
function funkcja_zwrotna(){
    const poleTesktoweElement = document.forms[0].elements['pole_tekstowe'];
    console.log(`${poleTesktoweElement.value}:${typeof(poleTesktoweElement.value)}`)
    const poleLiczboweElement = document.forms[0].elements['pole_liczbowe'];
    console.log(`${poleLiczboweElement.value}:${typeof(poleLiczboweElement.value)}`)
}
function set_up_form(){
    const form = window.document.forms[0];
    const pole_tekstowe = form.elements['pole_tekstowe'];
    const pole_liczbowe = form.elements['pole_liczbowe'];
    const out = window.document.getElementsByName('wynik')[0]
    form.addEventListener(
        "input",
        ()=>{
            out.value=sum_strings_numbers(pole_tekstowe.value, pole_liczbowe.value)
            console.log(sum_strings_numbers(pole_tekstowe.value , pole_liczbowe.value))
        })
}    

function sum_strings_numbers(a,b) {
    let sum =0
    a.split("").forEach((el)=>{
        if(!isNaN(parseInt(el)))
            sum+=parseInt(el)
    });
    b.split("").forEach((el)=>{
        if(!isNaN(parseInt(el)))
            sum+=parseInt(el)
    });
    return sum
}
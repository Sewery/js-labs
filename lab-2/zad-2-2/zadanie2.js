

function sum_strings(x) {
    let sum =0
    console.log(x)
    if(Array.isArray(x)){
        x.forEach(element => {
            if(!isNaN(parseInt(element)))
                sum+=parseInt(element)
        });
    }else if(typeof(x)==String){
        s.split("").forEach((el)=>{
            if(!isNaN(parseInt(el)))
                sum+=parseInt(el)
        });
    }
    return sum
}
const digits = (s)=>{
    let [even,odd] = [0,0]
    s.split("").forEach((el,ind)=>{
        if(!isNaN(parseInt(el))){
            if(ind%2==0){
                even+=parseInt(el)
            }else{
                odd+=parseInt(el)
            }
        }
    });

    return [even,odd]
}
const letters = (s)=>{
    let [lower,upper] = [0,0]
    s.split("").forEach((el)=>{
        if(el.charCodeAt(0)>='a'.charCodeAt(0) && el.charCodeAt(0)<='z'.charCodeAt(0))
            lower+=1
        if(el.charCodeAt(0)>='A'.charCodeAt(0) && el.charCodeAt(0)<='Z'.charCodeAt(0))
            upper+=1
    });
    return [lower,upper]
}

export {sum_strings,digits,letters}
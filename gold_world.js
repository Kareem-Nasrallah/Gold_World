let in21 = document.getElementById('in21');
let gram = document.getElementById('gram')
let goldenPound = document.getElementById('goldenPound');
let poundcount = document.getElementById('poundcount');
let ghprice = document.getElementById('ghprice');
let GPprice = document.getElementById('GPprice');
let totalprice = document.getElementById('totalprice');
let realdat = new Date;
let realtimenaw;
let save = document.getElementById('save');
let tbody = document.querySelector('tbody');
let allhistory;


// calcolat the price
let gram21 = function(){
    ghprice.value = Math.round(+in21.value * +gram.value);
    total();
}
let goldenPoundprice = function(){
    GPprice.value = +goldenPound.value * +poundcount.value;
    total();
}
function total(){
    totalprice.value = +ghprice.value + +GPprice.value;
}


// get time
function x(){
    realdat = new Date;
    realtimenaw = realdat.toLocaleString();
}


// save data
if(localStorage.history != null){
    allhistory = JSON.parse(localStorage.history)
    showdata()
}else{
    allhistory = []
}
let xobject = {}
let saveStorage = _ =>{
    x()
    xobject = {
        in21: in21.value,
        goldenPound: goldenPound.value,
        totalprice:totalprice.value,
        realtimenaw:realtimenaw
    }
    allhistory.push(xobject)
    localStorage.history = JSON.stringify(allhistory)
}


// on click
save.onclick = _ =>{
    x();
    saveStorage();
    showdata();
    clear();
    getloweupper();
}

// show the data
function showdata(){
    let data = '';
    for(let i = 0; i<allhistory.length; i++){
        data += `
        <tr class="color${i}">
            <td>
                <span>${allhistory[i].in21}</span>
            </td>
            <td>
                <span>${allhistory[i].goldenPound}</span>
            </td>
            <td>
                <span class="allprice${i}">${allhistory[i].totalprice}</span>
            </td>
            <td>
                <span class='red'>${allhistory[i].realtimenaw}</span>
            </td>
        </tr>`
    }
    tbody.innerHTML = data
}

function clear(){
    in21.value = ''
    goldenPound.value = ''
    totalprice.value = ''
    GPprice.value = ''
    ghprice.value = ''
    gram.value = ''
    poundcount.value = ''
}


function getloweupper(){
    let lower=0;
    let upper=0;
    let i =0
    for(let n=(i+1); n<allhistory.length;n++){
        if(+allhistory[i].totalprice > +allhistory[n].totalprice){
            i = n;
            lower=i;
        }
    }
    let lowernumbers = document.querySelectorAll(`.color${lower} td span`)
    lowernumbers.forEach(lowernumber => {
        lowernumber.style.background = '#a20'
    });
    i=0;
    for(let n=(i+1); n<allhistory.length;n++){
        if(+allhistory[i].totalprice < +allhistory[n].totalprice){
            upper = n
            i = n;
        }
    }
    let uppernumbers = document.querySelectorAll(`.color${upper} td span`)
    uppernumbers.forEach(uppernumber =>{
        uppernumber.style.background = '#282'
    })
}
getloweupper()
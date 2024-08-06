const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdowns){
    for (Currcode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText= Currcode;
       newOption.value= Currcode;
       if(select.name==="from"&& Currcode==="USD"){
        newOption.selected="selected";
       }else if(select.name==="to"&& Currcode==="INR") {
        newOption.selected="selected";
       }
       select.append(newOption);
       
    }
    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
    
}




const updateFlag=(element)=>{
    let currCode= element.value;
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
   
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal= 1;
        amount.value="1";  
    }
    
    const URL = `https://v6.exchangerate-api.com/v6/20a5d9ee03a07ac584d908d1/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

   
})



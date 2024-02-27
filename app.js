const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"



const dropdowns = document.querySelectorAll(".dropdown select")

const btn=document.querySelector("form button")

const fromCurr=document.querySelector(".from select")

const toCurr=document.querySelector(".to select")

const msg=document.querySelector(".msg")

const  exbtn=document.querySelector(".dropdown i")


window.addEventListener("load",()=>{

updateExchangeRate();

})








for (let select of dropdowns) {

    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }

        else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected"
        }



        select.append(newOption)
    }


    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })

}



const updateFlag = (element) => {
    let currCode=element.value
    let countryCode= countryList[currCode]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc
}





btn.addEventListener("click", (evt)=>{

    evt.preventDefault();
    updateExchangeRate();
   
})

const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value;

  if(amtVal==="" || amtVal<1){
    amtVal=1;
    amount.value="1"
  }


const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];
let finalAmount = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}




let sc1 = document.querySelector(".one");
let sc2 = document.querySelector(".two");
let isToggled = false; // Flag to track the state

exbtn.addEventListener("click", () => {
    // Toggle the flag for the next click
    isToggled = !isToggled;

    if (isToggled) {
        // Apply new styles for sc1 and sc2
        sc1.style.position = 'relative';
        sc1.style.zIndex = '3';
        sc1.style.left = '144px';

        sc2.style.position = 'relative';
        sc2.style.right = '150px';
        
        // Call the first exchange rate update function
        updateExchangeRate2();
    } else {
        // Revert to previous styles for sc1 and sc2
        sc1.style.removeProperty('position');
        sc1.style.removeProperty('zIndex');
        sc1.style.removeProperty('left');

        sc2.style.removeProperty('position');
        sc2.style.removeProperty('right');
        
        // Call the second exchange rate update function
        updateExchangeRate1();
    }
});

const updateExchangeRate1 = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    

    if (!fromCurr || !toCurr) {
        console.error("fromCurrency or toCurrency element not found");
        return;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
};

const updateExchangeRate2 = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    

    if (!fromCurr || !toCurr) {
        console.error("fromCurrency or toCurrency element not found");
        return;
    }

    const URL = `${BASE_URL}/${toCurr.value.toLowerCase()}/${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()];
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${toCurr.value} = ${finalAmount} ${fromCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
};

// Initial call to one of the functions based on the initial state
if (isToggled) {
    updateExchangeRate2();
} else {
    updateExchangeRate1();
}

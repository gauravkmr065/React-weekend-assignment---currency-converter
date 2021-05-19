import React, {useState,useEffect}  from "react";
import CurrencyConverter from './CurrencyConverter';
import '../styles/App.css';
const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=65d067ce7b1b523af7ace5fa7d0f1d6e';

 
const App = () => {
   const[currencyOption,setCurrencyOption]= useState([]);
    const[fromCurr,setFromcurr] = useState();
    const[toCurr,setTocurr] = useState();
    const [exchangeRate, setExchangeRate]= useState();
    const[amount, setAmount] =useState(0);
    const[amountFromCurr,setAmountFromcurr]= useState(true);
   
    let toAmount , fromAmount ;
    if(amountFromCurr){
      fromAmount=amount;
      toAmount=amount*exchangeRate;
    }else{
      toAmount= amount;
      fromAmount =amount/exchangeRate;
    }

  useEffect(()=>{
    fetch(BASE_URL)
     .then(res=>res.json())
     .then(data=>{
       const Firstcurr = Object.keys(data.rates)[0];
       setCurrencyOption([data.base, ...Object.keys(data.rates)])
       setFromcurr(data.base);
       setTocurr(Firstcurr);
       setExchangeRate(data.rates[Firstcurr]);
     });
 },[])

 useEffect(()=>{
     if(fromCurr!=null && toCurr!=null){
         fetch(`{BASE_URL}?base=${fromCurr}&symbols=${toCurr}`)
         .then(res=>res.json())
         .then(data=>setExchangeRate(data.rates[toCurr]));
     }
 },[fromCurr,toCurr])

 function handleFromAmount(e){
   setAmount(e.target.value);
   setAmountFromcurr(true);
 }
 function handleToAmount(e){
   setAmount(e.target.value);
   setAmountFromcurr(false);
 }
 
  return (
    <div id="main">
      <h1>Currency Converter</h1>
      <br/>
      <CurrencyConverter 
            currencyOption={currencyOption} 
            selectedCurr={fromCurr}
            onchangeCurr={e=>setFromcurr(e.target.value)}
            amount = {fromAmount}
            onchangeAmount ={handleFromAmount}
            defaultCurr = "USD"
            />
      <br/>
      <CurrencyConverter  currencyOption={currencyOption} selectedCurr={toCurr}
          onchangeCurr={e=>setTocurr(e.target.value)}
           amount = {toAmount.toFixed(2)}
           onchangeAmount ={handleToAmount}
           defaultCurr = "INR"

       />
    </div>
  )
}


export default App;

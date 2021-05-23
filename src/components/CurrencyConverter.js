import React from 'react'
import '../styles/App.css';

export default function CurrencyConverter(props) {
    const {currencyOption,selectedCurr,onchangeCurr,amount,onchangeAmount} = props;
    let i=1;
    return (
        <div id="curencyCon">
            <select id="option" value={selectedCurr} onChange={onchangeCurr}>
                {currencyOption.map(option => {
                  return   <option key ={i++}value={option}>{option}</option>
              })}
            </select> 
            <input type="number" min="0" value={amount}  onChange={onchangeAmount} />
        </div>
    )
}

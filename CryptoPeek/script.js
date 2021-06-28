// select the button using ID
var button = document.querySelector('#translateBtn');
var Crypto = "BTC";
var LastPrice = "0";
const list = document.querySelector('#historyList')
var SymbolArr = [];
var PriceArr = [];
var temp = 0;

CryptoFresh(Crypto);

button.onclick = function () {
  historyWrite(Crypto,LastPrice);

  SymbolArr.unshift(Crypto);
  PriceArr.unshift(LastPrice);
    
  window.localStorage.setItem('Symbol',JSON.stringify(SymbolArr));
  window.localStorage.setItem('Price',JSON.stringify(PriceArr));

  historyADD();
  temp++;
  if(temp<5){
    list.removeChild(list.lastElementChild);
  }

  Crypto = document.getElementById('userInput').value.toLocaleUpperCase()
  CryptoFresh(Crypto);
    
}

function CryptoFresh(symbolCrypto) {
  $.getJSON('https://min-api.cryptocompare.com/data/price?fsym='+ symbolCrypto +'&tsyms=USD', function(data) {
    console.log(data);
    Object.keys(data).map(function(i) {
      console.log(i, data[i])
      document.getElementById('price').innerText = ("1 "+ symbolCrypto +" = " + data[i] + " " + i);
      LastPrice = data[i];
      return null;
    })
  });
}

function timestamp() {
      document.getElementById('timestamp').innerText = new Date();
      return null;
}

var x = window.setInterval(timestamp, 1000);

function historyWrite(Symbol,Price){
  
  const li = document.createElement('li');
  const CryptoName = document.createElement('span');
  const CryptoPrice = document.createElement('span');
  
  CryptoName.textContent = Symbol+" = ";
  CryptoPrice.textContent = Price+" USD";
  console.log(Price);
  li.appendChild(CryptoName);
  li.appendChild(CryptoPrice);
  list.appendChild(li);

}

function historyADD(){
  for(i=0 ; i<1 ;i++){
    historyWrite(SymbolArr[i],PriceArr[i]);
  }
}
function loadHistory(){
  if(localStorage.getItem('Symbol')){
    SymbolArr = JSON.parse(window.localStorage.getItem('Symbol'))
 }
  if(localStorage.getItem('Price')){
    PriceArr = JSON.parse(window.localStorage.getItem('Price'))
  }
  for(i=0 ; i<6 ;i++){
    historyWrite(SymbolArr[i],PriceArr[i]);
  }
}

window.onload = loadHistory();
const colorInput = document.getElementById('input'),
      schemeEl = document.getElementById('scheme'),
      generateBtn = document.getElementById('generate-btn'),
      colorsEl = document.querySelectorAll('.color'),
      hexEl = document.querySelectorAll('#hex');


let inputValue = '';
colorInput.addEventListener('change', (e) => {
  inputValue = e.target.value.slice(1);
});


let schemeValue = '';

schemeEl.addEventListener('change',(e) => {
  schemeValue = e.target.value
  console.log(schemeValue);
});

generateBtn.addEventListener('click', function() {
  getColorScheme(inputValue,schemeValue)
});

function getColorScheme(input, scheme) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${input}&mode=${scheme}&count=5`)
      .then(res => res.json())
      .then(data => {
        // Need to figure out how to loop using forEach with idx
          // data.colors.forEach((color, idx) => {
          //   colorsEl[idx].style.backgroundColor = `${data.color[idx].hex.value}`
          // })
  
          // setting colors to ColorsEl
          for(let i = 0; i < data.colors.length; i++) {
            colorsEl[i].style.backgroundColor = `${data.colors[i].hex.value}`
            hexEl[i].textContent = data.colors[i].hex.value
          }      
      })
  
}

hexEl.forEach(hex => hex.addEventListener('click', function(e){
  navigator.clipboard.writeText(e.target.textContent)
}))

colorsEl.forEach(colorEl => colorEl.addEventListener('click', function(e){
  const bgHex = window.getComputedStyle(colorEl)
  navigator.clipboard.writeText(bgHex.getPropertyValue('background-color'))
}))


getColorScheme('000000', 'monochrome')

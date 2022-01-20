// Grab Html Elements 
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('slider-text');
const alteredColorDiv = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

// EventListener to add/remove classes for the Lighten/Darken text
toggleBtn.addEventListener('click', () => {
    if (!toggleBtn.checked) {
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected')
    } else {
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    }

    reset();
})

// EventListener to clear the input field and populate it with a #
hexInput.addEventListener('focus', () => {
    hexInput.value = '#';
})

// EventListener to change the BG color based on user Input
hexInput.addEventListener('keyup', () => {
    let hex = hexInput.value;

    if (hex.lastIndexOf('#')) hex = hex.replace('#', '');
    if (!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');

    inputColor.style.backgroundColor = '#' + strippedHex;
    alteredColorDiv.style.backgroundColor = '#' + strippedHex;
})

// Function to check for hex value validity
const isValidHex = (hex) => {
    if (!hex) return false;

    const srtippedHex = hex.replace('#', '');
    const reg = /[g-z]/;

    if (reg.test(srtippedHex)) {
        return false;
    } else {
        return srtippedHex.length === 3 || srtippedHex.length === 6;
    }
}

// Function to convert Hex values to RGB
const convertHexToRGB = (hex) => {
    if (!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if (strippedHex.length === 3) {
        let s = '';
        for (let i = 0; i < strippedHex.length; i++) {
            s += strippedHex[i] + strippedHex[i]
        }
        strippedHex = s;
    }

    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r,g,b}
}

// Function to convert RGB values to Hex
const convertRGBToHex = (r,g,b) => {
    // Cool way to do it
    // Add a leading zero to every result, and if the length is > than 2, slice and return the last 2 items.
    const firstPair = ('0' + r.toString(16)).slice(-2);
    const secondPair = ('0' + g.toString(16)).slice(-2);
    const thirdPair = ('0' + b.toString(16)).slice(-2);

    const hex = '#' + firstPair + secondPair + thirdPair;

    return hex;

    // In this method, vals is a rest argument:
    // e.g convertRGBToHex = (...vals)
    // let hex = vals;
    // let hexVal = '';
    
    // for (let i = 0; i < hex.length; i++) {
    //     let rgbVal = hex[i].toString(16);
    //     if (rgbVal.length < 2) {
    //         rgbVal = '0' + rgbVal;
    //     }
    //     hexVal += rgbVal;
    // }
    // return '#' + hexVal;
}

// Function to check and constrain Hex values to within the 0 to 255 range
const increaseWithin0To255 = (hex, amount) => {
    const newHex = hex + amount;
    if (newHex > 255) return 255;
    if (newHex < 0) return 0;
    return newHex;

    // JS Trick
    // return Math.min(255, Math.max(0, hex + amount))
}

// Function to alter color change
const alteredColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex);
    const amount = Math.floor((percentage / 100) * 255);
    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);

    return convertRGBToHex(newR, newG,newB);
}

// EventListener for the slider range input
slider.addEventListener('input', () => {
    let hex = hexInput.value;

    sliderText.innerHTML = `${slider.value}%`;

    if (hex.lastIndexOf('#')) hex = hex.replace('#', ''); 
    if (!isValidHex(hex)) return;

    const valueAddition = 
        !toggleBtn.checked ? -slider.value : slider.value;
    const alteredHex = alteredColor(hex, valueAddition);

    alteredColorDiv.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `ALtered Color ${alteredHex}`;
})

// Function to reset the input
const reset = () => {
    slider.value = 0;
    sliderText.innerText = `0%`;
    alteredColorDiv.style.backgroundColor = hexInput.value;

    if (!isValidHex(hex)) {
        return
    } else {
        alteredColorText.innerText = `Altered Color ${hexInput.value}`
    };
}

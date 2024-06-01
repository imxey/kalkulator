document.addEventListener("DOMContentLoaded", function() {
    const layar = document.getElementById('layar');
    const tombol = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let selectedFunction = '';
    
    tombol.forEach(function(button) {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '2';
                selectedFunction = '';
                layar.value = '0';
            } else if (value === 'del') {
                currentInput = currentInput.slice(0, -1);
                layar.value = currentInput || '0';
            } else if (value === '=') {
                if (currentInput !== '' || selectedFunction !== '') {
                    if (selectedFunction) {
                        currentInput = parseFloat(currentInput);
                        if (selectedFunction === 'sin') {
                            currentInput = Math.sin(currentInput * Math.PI / 180);
                        } else if (selectedFunction === 'cos') {
                            currentInput = Math.cos(currentInput * Math.PI / 180);
                        } else if (selectedFunction === 'tan') {
                            currentInput = Math.tan(currentInput * Math.PI / 180);
                        } else if (selectedFunction === 'sqrt') {
                            currentInput = Math.sqrt(currentInput);
                        }
                        selectedFunction = '';
                    } else if (operator) {
                        previousInput = parseFloat(previousInput);
                        currentInput = parseFloat(currentInput);
                        if (operator === '^') {
                            currentInput = Math.pow(previousInput, currentInput);
                        } else if (operator === 'root') {
                            previousInput = 2;
                            currentInput = Math.pow(currentInput, 1 / previousInput);
                        } else if (operator === 'xx') {
                            currentInput = 2;
                            currentInput = Math.pow(previousInput, currentInput);
                        } else {
                            currentInput = eval(previousInput + operator + currentInput);
                        }
                        operator = '';
                    }
                    layar.value = currentInput;
                    previousInput = currentInput;
                    currentInput = '';
                }
            } else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '^' || value === 'root' || value === 'xx') {
                if (currentInput !== '') {
                    if(value == 'xx'){
                        previousInput = currentInput;
                        currentInput = '2';
                    }
                    else{
                        previousInput = currentInput;
                        currentInput = '';
                    }
                }
                operator = value;
                
            } else if (value === 'sin' || value === 'cos' || value === 'tan' || value === 'sqrt') {
                selectedFunction = value;
                layar.value = value;
            } else {
                currentInput += value;
                layar.value = currentInput;
            }
        });
    });
});

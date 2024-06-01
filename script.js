document.addEventListener("DOMContentLoaded", function() {
    const layar = document.getElementById('layar');
    const tombol = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    tombol.forEach(function(button) {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                layar.value = '0';
            } else if (value === 'del') {
                currentInput = currentInput.slice(0, -1);
                layar.value = currentInput || '0';
            } else if (value === '=') {
                if (operator && previousInput !== '') {
                    if (operator === '^') {
                        currentInput = Math.pow(previousInput, currentInput);
                    } else if (operator === 'root') {
                        currentInput = Math.pow(currentInput, 1 / previousInput);
                    } else if (operator === 'xx'){
                        currentInput = 2
                        currentInput = Math.pow(previousInput, currentInput);
                    } else {
                        currentInput = eval(previousInput + operator + currentInput);
                    }
                    layar.value = currentInput;
                    operator = '';
                    previousInput = '';
                }
            } else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '^' || value === 'root' || value === "xx") {
                if (currentInput === '' && previousInput !== '') {
                    operator = value;
                } else if (currentInput !== '') {
                    if (operator) {
                        if (operator === '^') {
                            currentInput = Math.pow(previousInput, currentInput);
                        } else if (operator === 'xx'){
                            currentInput = 2
                            currentInput = Math.pow(previousInput, currentInput);
                        } else if (operator === 'root') {
                            currentInput = Math.pow(currentInput, 1 / previousInput);
                        } else {
                            currentInput = eval(previousInput + operator + currentInput);
                        }
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                    layar.value = previousInput;
                }
            } else if (value === 'sin' || value === 'cos' || value === 'tan' || value === 'sqrt') {
                if (currentInput !== '') {
                    if (value === 'sin') {
                        currentInput = Math.sin(currentInput * Math.PI / 180);
                    } else if (value === 'cos') {
                        currentInput = Math.cos(currentInput * Math.PI / 180);
                    } else if (value === 'tan') {
                        currentInput = Math.tan(currentInput * Math.PI / 180);
                    } else if (value === 'sqrt') {
                        currentInput = Math.sqrt(currentInput);
                    }
                    layar.value = currentInput;
                    previousInput = currentInput;
                    operator = '';
                    currentInput = '';
                }
            } else {
                currentInput += value;
                layar.value = currentInput;
            }
        });
    });
});

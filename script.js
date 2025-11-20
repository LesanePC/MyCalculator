document.getElementById("toggle-theme").onclick = function () {
            const calc = document.querySelector(".calculator");
            if (calc.classList.contains("dark")) {
                calc.classList.remove("dark");
                calc.classList.add("light");
            } else {
                calc.classList.remove("light");
                calc.classList.add("dark");
            }
        };

        const screen = document.getElementById("screen");
        const buttons = document.querySelectorAll(".calculator-buttons button");
        let input = "";
        const MAX_LENGTH = 10;

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const val = btn.textContent;

                if (val === "C") {
                    input = "";
                    screen.textContent = "";
                } else if (val === "=") {
                    if (input.trim().length === 0) {
                        screen.textContent = "Введите выражение";
                        return;
                    }
                    const result = calculate(input);
                    if (result === "Ошибка!" || result === "Ошибка (деление на 0)") {
                        screen.textContent = result;
                    } else {
                        screen.textContent = "= " + result;
                    }
                    input = "";
                } else {
                    if (input.length < MAX_LENGTH) {
                        input += val;
                        screen.textContent = input;
                    } else {
                        screen.textContent = input + " (максимум символов)";
                    }
                }
            });
        });

        function calculate(str) {
            const match = str.match(/^(-?\d+(\.\d+)?)\s*([+\-*/])\s*(-?\d+(\.\d+)?)$/);
            if (!match) return "Ошибка!";
            const [, num1, , op, num2] = match;
            switch (op) {
                case "+":
                    return (+num1) + (+num2);
                case "-":
                    return (+num1) - (+num2);
                case "*":
                    return (+num1) * (+num2);
                case "/":
                    return +num2 === 0 ? "Ошибка (деление на 0)" : (+num1) / (+num2);
                default:
                    return "Ошибка!";
            }
        }
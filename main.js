/**
 * Lotto Ball Component
 */
class LottoBall extends HTMLElement {
  connectedCallback() {
    const number = this.getAttribute('number');
    this.render(number);
  }

  render(number) {
    // Dynamic color based on number range
    const hue = (number * 8) % 360;
    this.style.setProperty('--primary-color', `oklch(70% 0.15 ${hue})`);
    this.style.backgroundColor = `oklch(95% 0.01 ${hue})`;
    this.style.border = `2px solid oklch(70% 0.15 ${hue})`;
    this.style.color = `oklch(40% 0.15 ${hue})`;
    
    this.textContent = number;
  }
}

/**
 * Lotto Set Component
 */
class LottoSet extends HTMLElement {
  connectedCallback() {
    // Animation delay for children
    const balls = this.querySelectorAll('lotto-ball');
    balls.forEach((ball, index) => {
      ball.style.animationDelay = `${index * 0.1}s`;
    });
  }
}

customElements.define('lotto-ball', LottoBall);
customElements.define('lotto-set', LottoSet);

/**
 * Application Controller
 */
const numberDisplayContainer = document.querySelector('.number-display');
const generateBtn = document.getElementById('generate-btn');

function generateSingleLottoSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function createLottoSetElement(numbers) {
    const setElement = document.createElement('lotto-set');
    numbers.forEach(num => {
        const ball = document.createElement('lotto-ball');
        ball.setAttribute('number', num);
        setElement.appendChild(ball);
    });
    return setElement;
}

async function handleGenerate() {
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    
    numberDisplayContainer.innerHTML = '';
    
    // Generate 3 sets for a cleaner look
    for (let i = 0; i < 3; i++) {
        const numbers = generateSingleLottoSet();
        const setElement = createLottoSetElement(numbers);
        setElement.style.animationDelay = `${i * 0.3}s`;
        numberDisplayContainer.appendChild(setElement);
        
        // Brief pause between sets
        await new Promise(r => setTimeout(r, 200));
    }
    
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Numbers';
}

generateBtn.addEventListener('click', handleGenerate);

// Initial generation
handleGenerate();

class LottoSetDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const numbers = JSON.parse(this.getAttribute('data-numbers'));
    const sortedNumbers = numbers.sort((a, b) => a - b);

    const style = document.createElement('style');
    style.textContent = `
      .lotto-set {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        gap: 0.5rem;
      }
      .lotto-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #4CAF50;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.classList.add('lotto-set');

    sortedNumbers.forEach(number => {
      const numberEl = document.createElement('div');
      numberEl.classList.add('lotto-number');
      numberEl.textContent = number;
      wrapper.appendChild(numberEl);
    });

    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define('lotto-set-display', LottoSetDisplay);

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

function generateAndDisplaySets() {
  const displayContainer = document.getElementById('lotto-display');
  displayContainer.innerHTML = ''; 
  for (let i = 0; i < 5; i++) {
    const lottoNumbers = generateLottoNumbers();
    const lottoSetEl = document.createElement('lotto-set-display');
    lottoSetEl.setAttribute('data-numbers', JSON.stringify(lottoNumbers));
    displayContainer.appendChild(lottoSetEl);
  }
}

document.getElementById('generate-btn').addEventListener('click', generateAndDisplaySets);

generateAndDisplaySets();

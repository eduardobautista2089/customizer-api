(function () {
  console.log('✅ Customizer Widget Loaded');

  if (document.getElementById('customizer-button')) return;

  const button = document.createElement('button');
  button.id = 'customizer-button';
  button.innerText = 'Customize Design';
  button.style = `
    padding: 12px 20px;
    background: #1a202c;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    margin-top: 20px;
    cursor: pointer;
  `;

  const modal = document.createElement('div');
  modal.id = 'customizer-modal';
  modal.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 9999;">
      <div style="width: 800px; height: 600px; background: white; border-radius: 10px; overflow: hidden; position: relative;">
        <button id="close-customizer" style="position: absolute; top: 10px; right: 10px; background: #e53e3e; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; z-index: 10000;">X</button>
        <iframe src="https://customizer-api-l1w1.onrender.com/index.html" style="width: 100%; height: 100%; border: none;"></iframe>
      </div>
    </div>
  `;
  modal.style.display = 'none';

  document.body.appendChild(modal);

  button.onclick = (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  };

  document.addEventListener('click', async (e) => {
    if (e.target.id === 'close-customizer') {
      modal.style.display = 'none';

      const sessionId = localStorage.getItem('customizerToken');
      if (!sessionId) return;

      try {
        const res = await fetch(`https://customizer-api-l1w1.onrender.com/customize/${sessionId}`);
        const data = await res.json();

        if (!document.querySelector('[name="properties[tshirtColor]"]')) {
          const form = document.querySelector('form[action="/cart/add"], .form');
          if (!form) {
            console.warn('Product form not found at injection time.');
            return;
          }

          ['tshirtColor', 'fontStyle', 'message'].forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = `properties[${key}]`;
            input.value = data[key];
            form.appendChild(input);
          });
          console.log('Injected customization data into form:', data);
        }
      } catch (err) {
        console.error('Could not fetch customization session data:', err);
      }
    }
  });

  const target = document.querySelector('form[action="/cart/add"], .form');
  if (target) {
    target.appendChild(button);
  } else {
    console.log('Could not find target form to inject button.');
  }
})();

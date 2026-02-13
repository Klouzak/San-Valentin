// CÓDIGO DE FLORES (original)
document.querySelectorAll('.flower-container').forEach(el => {
    el.innerHTML = `<div class="flower-top">
        <div class="flower-petal flower-petal__1"></div>
        <div class="flower-petal flower-petal__2"></div>
        <div class="flower-petal flower-petal__3"></div>
        <div class="flower-petal flower-petal__4"></div>
        <div class="flower-petal flower-petal__5"></div>
        <div class="flower-petal flower-petal__6"></div>
        <div class="flower-petal flower-petal__7"></div>
        <div class="flower-petal flower-petal__8"></div>
        <div class="flower-circle"></div>
        <div class="flower-light flower-light__1"></div>
        <div class="flower-light flower-light__2"></div>
        <div class="flower-light flower-light__3"></div>
        <div class="flower-light flower-light__4"></div>
        <div class="flower-light flower-light__5"></div>
        <div class="flower-light flower-light__6"></div>
        <div class="flower-light flower-light__7"></div>
        <div class="flower-light flower-light__8"></div>
    </div>

    <div class="flower-bottom">
        <div class="flower-stem"></div>
        <div class="flower-leaf flower-leaf__1"></div>
        <div class="flower-leaf flower-leaf__2"></div>
        <div class="flower-leaf flower-leaf__3"></div>
        <div class="flower-leaf flower-leaf__4"></div>
        <div class="flower-leaf flower-leaf__5"></div>
        <div class="flower-leaf flower-leaf__6"></div>
        <div class="flower-grass flower-grass__1"></div>
        <div class="flower-grass flower-grass__2"></div>
        <div class="flower-grass flower-grass__3"></div>
        <div class="flower-grass flower-grass__4"></div>
    </div>`;
});

// Animación de las flores
const flowers = Array.from(document.querySelectorAll('.flower-container'));
const animatedClass = 'animate';

flowers[0].classList.add(animatedClass);

setTimeout(() => {
    for (let i = 1; i <= 2 && i < flowers.length; i++) {
        flowers[i].classList.add(animatedClass);
    }

    let remaining = flowers.slice(3);
    const interval = setInterval(() => {
        if (remaining.length === 0) {
            clearInterval(interval);
            return;
        }

        const randomIndex = Math.floor(Math.random() * remaining.length);
        const el = remaining.splice(randomIndex, 1)[0];
        el.classList.add(animatedClass);
    }, 500);
}, 3000);

// INTERACCIÓN DE SAN VALENTÍN
document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('whisperYes');
    const noBtn = document.getElementById('whisperNo');
    const whisperEl = document.querySelector('.valentine-whisper');
    const niceTryEl = document.getElementById('niceTryMessage');
    const invitationEl = document.getElementById('invitationMessage');
    const closeBtn = document.getElementById('closeInvitation');
    
    // Verificar que todos los elementos existen
    if (!yesBtn || !noBtn || !whisperEl || !niceTryEl || !invitationEl || !closeBtn) {
        console.log('Esperando a que carguen los elementos...');
        return;
    }


    // SECUENCIA DE RESPUESTAS PARA EL BOTÓN "NO"
      const noResponses = [
          { text: "¿Cómo que no?", emoji: "😡😡😡", delay: 1800 },
          { text: "Ah bueno ¿vas a seguir? Dale que si", emoji: "😠😡", delay: 2000 },
          { text: "Estas graciosita", emoji: "😒😒", delay: 1800 },
          { text: "¿De verdad no quieres?", emoji: "😔😔🥺", delay: 3000 },
          { text: "YAAAAA Bastaaaa, di que sí. La vamos a pasar muy lindo ", emoji: "🥺🥺", delay: 4200 },
          { text: "Bueno😔, si tanto deseas salir con el otro. Dale una vez más que no y todo se acabará", emoji: "😥😥😥", delay: 3500 },
          { text: "¿De verdad fuiste capaz de darle no de nuevo? No vale", emoji: "Que mega Red Flag😡", delay: 4000 },
          { text: "Bueno ya basta!. No tienes opción, esto lo programé yo y solo acepto sí por respuesta", emoji: "😡😡", delay: 3200 }
      ];
    
    
    let noClickCount = 0;
    
    // Respuesta para "sí" - muestra la invitación
    yesBtn.addEventListener('click', function() {
        whisperEl.style.opacity = '0';
        setTimeout(() => {
            whisperEl.style.display = 'none';
            invitationEl.classList.add('show');
        }, 500);
    });
    
    // Cerrar invitación y volver a la pregunta
    closeBtn.addEventListener('click', function() {
        invitationEl.classList.remove('show');
        
        setTimeout(() => {
            whisperEl.style.display = 'block';
            whisperEl.style.opacity = '1';
        }, 500);
    });
    
    // Respuesta para "no" - secuencia de mensajes
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (noClickCount < noResponses.length) {
            // Mostrar el mensaje correspondiente
            const response = noResponses[noClickCount];
            
            // Hacer que el botón tiemble
            noBtn.style.animation = 'shake 0.3s ease-in-out';
            
            // Mostrar mensaje emergente con el texto personalizado
            const niceTryText = niceTryEl.querySelector('.nice-try-text');
            const niceTryDecoration = niceTryEl.querySelector('.nice-try-decoration');
            
            niceTryText.textContent = response.text;
            niceTryDecoration.textContent = response.emoji;
            niceTryEl.classList.add('show');
            
            // Después de un tiempo, restaurar todo
            setTimeout(() => {
                noBtn.style.animation = '';
                niceTryEl.classList.remove('show');
            }, response.delay);
            
            noClickCount++;
        } 
        
        if (noClickCount === noResponses.length) {
            // Después de todas las respuestas, el botón "no" se convierte en "bueno, sí"
            const noButtonText = noBtn.querySelector('.btn-label');
            const noButtonEmoji = noBtn.querySelector('.btn-dot');
            
            noButtonText.textContent = "Obviamente, sí.";
            noButtonEmoji.textContent = "💜";
            
            // Cambiar el color del botón
            noBtn.style.background = 'rgba(155, 89, 182, 0.2)';
            noBtn.style.borderRadius = '50px';
            noBtn.style.padding = '0.5rem 1.5rem';
            
            // Quitar el event listener de "no" y agregar el de "sí"
            const newNoBtn = noBtn.cloneNode(true);
            noBtn.parentNode.replaceChild(newNoBtn, noBtn);
            
            // Agregar event listener al nuevo botón
            newNoBtn.addEventListener('click', function() {
                whisperEl.style.opacity = '0';
                setTimeout(() => {
                    whisperEl.style.display = 'none';
                    invitationEl.classList.add('show');
                }, 500);
            });
        }
    });
    
    // Efectos hover
    noBtn.addEventListener('mouseenter', function() {
        if (!niceTryEl.classList.contains('show')) {
            noBtn.style.transform = 'scale(0.95)';
            noBtn.style.opacity = '0.7';
        }
    });
    
    noBtn.addEventListener('mouseleave', function() {
        noBtn.style.transform = 'scale(1)';
        noBtn.style.opacity = '1';
    });
});

// Animación de shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
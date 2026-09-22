document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btn-login');
    const btnLogout = document.getElementById('btn-logout');
    const userDisplay = document.getElementById('user-display');
    const loginContainer = document.getElementById('login-container');
    const userLogat = localStorage.getItem('user');

    function actualizeazaInterfata(nume) {
        if (!loginContainer) return;
        if (btnLogin) btnLogin.style.display = 'none';
        if (btnLogout) btnLogout.style.display = 'inline-block';
        if (userDisplay) {
            userDisplay.textContent = `Salut, ${nume}! `;
        }
    }

    if (userLogat) {
        actualizeazaInterfata(userLogat);
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            const usernameInput = prompt("Introdu user (ex: admin):");
            const passwordInput = prompt("Introdu parola (ex: fcsb123):");
            fetch('users.json')
                .then(response => response.json())
                .then(users => {
                    const userGasit = users.find(u => u.username === usernameInput && u.parola === passwordInput);

                    if (userGasit) {
                        alert("Te-ai logat cu succes!");
                        localStorage.setItem('user', userGasit.nume);
                        actualizeazaInterfata(userGasit.nume);
                    } else {
                        alert("Date incorecte! Încearcă admin / fcsb123");
                    }
                })
                .catch(err => console.error("Eroare la citirea users.json:", err));
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload();
        });
    }

    const listaStiri = document.getElementById('lista-stiri');
    const btnIncarca = document.getElementById('incarca-stiri');
    if (btnIncarca && listaStiri) {
        btnIncarca.addEventListener('click', () => {
            fetch('stiri.json')
                .then(res => res.json())
                .then(stiri => {
                    listaStiri.innerHTML = '';
                    stiri.forEach(stire => {
                        const li = document.createElement('li');
                        li.style.borderBottom = "1px solid rgba(255,255,255,0.2)";
                        li.style.padding = "10px 0";
                        li.style.display = "flex";
                        li.style.justifyContent = "space-between";
                        li.style.alignItems = "center";
                        const textContainer = document.createElement('span');
                        textContainer.innerHTML = `
                            <a href="${stire.link}" target="_blank" style="color: white; text-decoration: none; font-weight: bold;">
                                📰 ${stire.titlu}
                            </a>
                            <br>
                            <small style="color: #FFD700; font-size: 0.8rem;">${stire.data}</small>
                        `;

                        const btnSterge = document.createElement('button');
                        btnSterge.textContent = "X";
                        btnSterge.style.marginLeft = "10px";
                        btnSterge.style.background = "#cc0000";
                        btnSterge.style.color = "white";
                        btnSterge.style.border = "none";
                        btnSterge.style.borderRadius = "3px";
                        btnSterge.style.cursor = "pointer";
                        btnSterge.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const elementDeSters = e.currentTarget.parentElement;
                            listaStiri.removeChild(elementDeSters);
                        });
                        li.appendChild(textContainer);
                        li.appendChild(btnSterge);
                        listaStiri.appendChild(li);
                    });
                })
                .catch(err => console.error("Eroare la citirea stiri.json:", err));
        });
    }

    const ceasElement = document.getElementById('ceas-digital');
    if (ceasElement) {
        setInterval(() => {
            const acum = new Date();
            const ora = acum.toLocaleTimeString('ro-RO');
            ceasElement.textContent = ora;
        }, 1000);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const rangeInput = document.getElementById('rating');
        const rangeValueDisplay = document.getElementById('rating-value');
        const btnTrimite = document.getElementById('btn-trimite');
        if (rangeInput) {
            rangeInput.addEventListener('input', (e) => {
                rangeValueDisplay.textContent = e.target.value;
            });
        }

        if (btnTrimite) {
            btnTrimite.addEventListener('mouseenter', () => {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                btnTrimite.style.backgroundColor = `rgb(${r},${g},${b})`;
            });
            btnTrimite.addEventListener('mouseleave', () => {
                btnTrimite.style.backgroundColor = ''; 
            });
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const termeniCheckbox = document.getElementById('termeni');
            const mesajEroare = document.getElementById('mesaj-eroare');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const stilMesaj = window.getComputedStyle(mesajEroare);
            if (!emailRegex.test(emailInput.value)) {
                mesajEroare.style.color = 'red';
                mesajEroare.textContent = "Te rugăm să introduci un email valid!";
                return;
            }

            if (!termeniCheckbox.checked) {
                mesajEroare.style.color = 'orange';
                mesajEroare.textContent = "Trebuie să fii de acord cu termenii GDPR!";
                return;
            }

            mesajEroare.style.color = '#00FF00';
            mesajEroare.textContent = "Mesaj trimis cu succes!";
            contactForm.reset();
            setTimeout(() => {
                mesajEroare.textContent = "";
            }, 3000);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === '/' || e.key === '/') {
            document.body.classList.toggle('night-mode');
            if (document.body.classList.contains('night-mode')) {
                document.body.style.backgroundImage = 'none';
                document.body.style.backgroundColor = '#111';
                alert("Modul 'Noapte' activat! (Imaginea de fundal ascunsă)");
            } else {
                document.body.style.backgroundImage = '';
                document.body.style.backgroundColor = '';
            }
        }
    });

});
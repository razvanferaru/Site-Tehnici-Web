# FCSB Fan Portal - Interactive Web Application

Un proiect web frontend dezvoltat pentru a pune în aplicare cunoștințele de HTML5, CSS3 și JavaScript (Vanilla) printr-o aplicație web interactivă cu mai multe pagini (Acasă, Echipa, Istorie, Contact).

## Arhitectură și Tehnologii
* **Frontend:** HTML5, CSS3 (Flexbox, Grid, manipulare pseudo-elemente și keyframes)
* **Logică și Interactivitate:** Vanilla JavaScript (ES6+)
* **Gestiunea datelor:** JSON, Fetch API, LocalStorage

## Funcționalități Tehnice

* **Sistem de Autentificare (Mock):** Validarea datelor de logare se face prin compararea input-ului utilizatorului cu datele dintr-un fișier local (`users.json`). Sesiunea este persistată folosind `LocalStorage`, interfața actualizându-se automat (ascunderea butonului de login și afișarea numelui utilizatorului) chiar și la reîncărcarea paginii.
* **Încărcare și Manipulare DOM Asincronă:** Preluarea articolelor din `stiri.json` utilizând Fetch API și popularea dinamică a DOM-ului. Fiecare știre generată primește un buton dedicat care elimină nodul respectiv din interfață la apăsare.
* **Validare Formular și Evenimente Dinamice:** Pagina de contact folosește expresii regulate (Regex) pentru validarea structurii adresei de email și verifică bifarea obligatorie a acordului GDPR înainte de procesarea formularului. Formularul include un input de tip range care își actualizează valoarea afișată în timp real.
* **Manipulare Evenimente de Mouse și Tastatură:** Butonul de submit își schimbă culoarea de fundal într-o valoare RGB generată aleatoriu la declanșarea evenimentului `mouseenter`. Există un "Night Mode" global care poate fi activat sau dezactivat prin interceptarea evenimentului `keydown` pentru tasta `/`.
* **Actualizare Timp Real:** Implementarea unui ceas digital care își actualizează valoarea în fiecare secundă pe baza funcției `setInterval` și a obiectului `Date`.
* **Design și Layout-uri Complexe:** Utilizarea CSS Grid și Flexbox pentru structurarea responsivă a paginilor. Pagina dedicată echipei prezintă un teren de fotbal unde poziționarea jucătorilor este realizată prin coordonate absolute, incluzând tooltip-uri interactive la evenimentul de hover. Animații CSS de tip pulsare sunt aplicate elementelor de titlu.

## Instalare și Rulare
Fiind un proiect pur frontend de tip Vanilla, nu necesită un proces complex de build. 
1. Clonează repository-ul: `git clone https://github.com/razvanferaru/Site-Tehnici-Web.git`
2. Deschide fișierele HTML într-un browser. 
Notă: Deoarece aplicația folosește funcția `fetch()` pentru a citi fișierele JSON locale, este recomandată rularea printr-un Live Server (ex: extensia din VS Code) pentru a evita erorile de tip CORS generate de browser.

window.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('header ul li a');
    const sections = document.querySelectorAll('.section');
    const modal = document.getElementById('pdfModal');
    let currentPdf = null;
    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;

    function activateMenuAtCurrentSection() {
        const fromTop = window.scrollY + 80; // Altura da barra de menu

        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Ajuste para a altura da barra de menu
            const sectionBottom = sectionTop + section.offsetHeight;

            if (fromTop >= sectionTop && fromTop < sectionBottom) {
                currentSection = section;
            }
        });

        if (currentSection) {
            menuLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header ul li a[href="#${currentSection.id}"]`).classList.add('active');
        } else {
            menuLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('header ul li a[href="#home"]').classList.add('active');
        }
    }

    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToTarget(targetId);

            menuLinks.forEach(function(link) {
                link.classList.remove('active');
            });

            link.classList.add('active');

            activateMenuAtCurrentSection();
        });
    });

    window.addEventListener('scroll', activateMenuAtCurrentSection);
    activateMenuAtCurrentSection();

    const homeLink = document.querySelector('header ul li a[href="#home"]');
    homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function scrollToTarget(targetId) {
        const offset = targetId === 'home' ? 90 : 50; // Ajuste para a seção home
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
        } else if (targetId === 'home') {
            window.scrollTo({
                top: 90,
                behavior: 'smooth'
            });
        }
    }

    // Função para filtrar projetos
    function filterProjects() {
        const keyword = document.getElementById('keywordFilter').value.toLowerCase(); // Obter o valor do filtro selecionado
        const projectCards = document.querySelectorAll('.project-card'); // Selecionar todos os cards de projeto

        projectCards.forEach(card => {
            const keywords = card.getAttribute('data-keywords').toLowerCase(); // Obter as keywords do atributo data-keywords

            if (keyword === 'all' || keywords.includes(keyword)) {
                card.style.display = 'block'; // Mostrar o card se corresponder à keyword selecionada ou se 'Todas' estiver selecionado
            } else {
                card.style.display = 'none'; // Ocultar o card se não corresponder à keyword selecionada
            }
        });
    }

    // Ativar o menu na seção atual ao carregar a página
    activateMenuAtCurrentSection();
});
        function toggleView(button) {
            const pdfFrame = button.closest('.pdf-frame');
            const pdfEmbed = pdfFrame.querySelector('.pdf-embed');
            const textView = pdfFrame.querySelector('.text-view');

            if (pdfEmbed.classList.contains('active')) {
                pdfEmbed.classList.remove('active');
                textView.classList.add('active');
            } else {
                pdfEmbed.classList.add('active');
                textView.classList.remove('active');
            }
        }

        function filterProject(projectTitle) {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const title = card.querySelector('h2');
                if (title === projectTitle) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
 // Função para filtrar apenas o projeto selecionado
function filterProject(button) {
    const projectCard = button.closest('.project-card');
    const keyword = projectCard.getAttribute('data-keywords').toLowerCase();
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const keywords = card.getAttribute('data-keywords').toLowerCase();
        if (card === projectCard) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Mostra o botão para reverter o filtro
    const revertButton = document.getElementById('revertFilter');
    revertButton.style.display = 'block';
}

// Função para reverter o filtro e mostrar todos os projetos
function revertFilter() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.display = 'block';
    });

    // Esconde o botão de reverter filtro
    const revertButton = document.getElementById('revertFilter');
    revertButton.style.display = 'none';
}
       

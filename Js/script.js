window.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('header ul li a');
    const sections = document.querySelectorAll('.section');

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
});
function scrollToTarget(targetId) {
    if (targetId === 'portfolio') {
        window.scrollTo({
            top: 820, // Defina a quantidade específica de pixels para descer
            behavior: 'smooth'
        });
        menuLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`header ul li a[href="#portfolio"]`).classList.add('active');
    } else {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Ajuste para a altura da barra de menu
                behavior: 'smooth'
            });
            menuLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header ul li a[href="#${targetId}"]`).classList.add('active');
        } else if (targetId === 'home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            menuLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('header ul li a[href="#home"]').classList.add('active');

        }
    }
}
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToTarget(targetId);
            
        });
    });

    window.addEventListener('scroll', activateMenuAtCurrentSection);
    activateMenuAtCurrentSection();

    function filterProjects() {
        var filter = document.getElementById('keywordFilter').value.toLowerCase();
        var projects = document.getElementsByClassName('project-card');

        for (var i = 0; i < projects.length; i++) {
            var keywords = projects[i].getAttribute('data-keywords').toLowerCase();
            if (filter === 'all' || keywords.includes(filter)) {
                projects[i].style.display = 'block';
            } else {
                projects[i].style.display = 'none';}
            }}
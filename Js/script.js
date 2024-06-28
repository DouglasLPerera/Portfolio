window.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('header ul li a');
    const sections = document.querySelectorAll('.section');
    const modal = document.getElementById('pdfModal');
    const pdfContent = document.getElementById('pdfContent');
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
        if (targetId === 'portfolio') {
            window.scrollTo({
                top: document.getElementById('portfolio').offsetTop - 50,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                let offset = 50;
                if (targetId === 'home') {
                    offset = 90; // Ajuste para a seção home
                }
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
    }
    
    
     
    

    // Expandir PDF no modal
    const pdfEmbeds = document.querySelectorAll('.pdf-embed');
    pdfEmbeds.forEach(function(pdfEmbed) {
        pdfEmbed.addEventListener('click', function(event) {
            event.preventDefault();
            const embedSrc = pdfEmbed.getAttribute('src');
            currentPdf = embedSrc; // Armazenar o PDF atualmente exibido
            showModal(embedSrc);
        });
    });

    function showModal(src) {
        modal.style.display = 'block';
        showPage(1); // Exibir a primeira página quando abrir o modal
    }

    function closeModal() {
        modal.style.display = 'none';
        currentPdf = null;
        pageNum = 1;
        pdfDoc = null;
        pdfContent.innerHTML = ''; // Limpar o conteúdo do modal ao fechar
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const homeSection = document.getElementById('home');
        const portfolioSection = document.getElementById('portfolio');
        const portfolioOffsetTop = portfolioSection.offsetTop;

        if (currentScrollPosition >= portfolioOffsetTop) {
            document.querySelector('header ul li a[href="#home"]').classList.remove('active');
            document.querySelector('header ul li a[href="#portfolio"]').classList.add('active');
        } else {
            document.querySelector('header ul li a[href="#portfolio"]').classList.remove('active');
            document.querySelector('header ul li a[href="#home"]').classList.add('active');
        }
    });

    // Ativa o menu na seção atual ao carregar a página
    activateMenuAtCurrentSection();

    // Função para navegar entre as páginas do PDF
    function showPage(pageNumber) {
        if (!pdfDoc) return;
        pageRendering = true;
        pdfDoc.getPage(pageNumber).then(function(page) {
            const canvas = document.getElementById('pdfCanvas');
            const ctx = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            page.render(renderContext).promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    showPage(pageNumPending);
                    pageNumPending = null;
                }
            });

            // Atualiza o número da página exibida
            pageNum = pageNumber;
            document.getElementById('pageNum').textContent = pageNumber;
        });
    }

    // Botões de navegação do PDF
    document.querySelector('#pdfModal .modal-content .prevPage').addEventListener('click', function() {
        if (pageNum <= 1) return;
        pageNum--;
        showPage(pageNum);
    });

    document.querySelector('#pdfModal .modal-content .nextPage').addEventListener('click', function() {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        showPage(pageNum);
    });

    // Carregar o PDF quando o modal é aberto
    modal.addEventListener('shown.bs.modal', function() {
        if (currentPdf) {
            pdfjsLib.getDocument(currentPdf).promise.then(function(pdfDoc_) {
                pdfDoc = pdfDoc_;
                showPage(1);
            }).catch(function(error) {
                console.error('Error loading PDF:', error);
            });
        }
    });

    // Função para filtrar projetos
    function filterProjects() {
        const filter = document.getElementById('keywordFilter').value.toLowerCase(); // Obtém o valor do filtro selecionado
        const projects = document.querySelectorAll('.project-card'); // Seleciona todos os cards de projeto

        projects.forEach(project => {
            const keywords = project.getAttribute('data-keywords').toLowerCase(); // Obtém as palavras-chave do projeto
            const keywordsArray = keywords.split(' '); // Transforma as palavras-chave em um array

            if (filter === 'all' || keywordsArray.includes(filter)) {
                project.style.display = 'block'; // Mostra o projeto se estiver incluído nas palavras-chave filtradas ou se o filtro for "all"
            } else {
                project.style.display = 'none'; // Oculta o projeto se não estiver incluído nas palavras-chave filtradas
            }
        });
    }

    // Ativa o menu na seção atual ao carregar a página
    activateMenuAtCurrentSection();
});
function filterProjects() {
    const filter = document.getElementById('keywordFilter').value.toLowerCase(); // Obtém o valor do filtro selecionado
    const projects = document.querySelectorAll('.project-card'); // Seleciona todos os cards de projeto

    projects.forEach(project => {
        const keywords = project.getAttribute('data-keywords').toLowerCase(); // Obtém as palavras-chave do projeto

        if (filter === 'all' || keywords.includes(filter)) {
            project.style.display = 'block'; // Mostra o projeto se estiver incluído nas palavras-chave filtradas ou se o filtro for "all"
        } else {
            project.style.display = 'none'; // Oculta o projeto se não estiver incluído nas palavras-chave filtradas
        }
    });
}
// Função para ajustar a altura do PDF embed com base na altura do project-card
function ajustarAlturaPDF() {
    var projectCard = document.querySelector('.project-card');
    var pdfEmbed = projectCard.querySelector('.pdf-embed');
    var alturaProjectCard = projectCard.clientHeight;
    
    // Defina a altura do PDF embed
    pdfEmbed.style.height = (alturaProjectCard * 0.66) + 'px'; // 66% da altura do project-card
}

// Chame a função após a página ser carregada e sempre que o tamanho da janela for alterado
window.addEventListener('load', ajustarAlturaPDF);
window.addEventListener('resize', ajustarAlturaPDF);

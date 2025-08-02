document.addEventListener('DOMContentLoaded', function () {
    // Elementos do carrossel
    const slide = document.querySelector('.carrossel-slides');
    const images = document.querySelectorAll('.slides');
    const prevBtn = document.getElementById('antBtn');
    const nextBtn = document.getElementById('proxBtn');
    const indicators = document.querySelectorAll('.indicator');

    let counter = 0;
    const size = images[0].clientWidth;
    const totalImages = images.length;
    let interval;

    // Configuração inicial
    function setupCarousel() {
        slide.style.transform = `translateX(${-size * counter}px)`;
        startAutoPlay();
    }

    // Atualiza a posição do carrossel
    function updateCarousel() {
        slide.style.transform = `translateX(${-size * counter}px)`;

        // Atualiza indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === counter);
        });
    }

    // Navegação próxima
    function nextSlide() {
        if (counter >= totalImages - 1) {
            counter = -1;
        }
        counter++;
        updateCarousel();
    }

    // Navegação anterior
    function prevSlide() {
        if (counter <= 0) {
            counter = totalImages;
        }
        counter--;
        updateCarousel();
    }

    // Auto-play
    function startAutoPlay() {
        interval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(interval);
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(interval);
        prevSlide();
        startAutoPlay();
    });

    // Indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            clearInterval(interval);
            counter = parseInt(indicator.getAttribute('data-slide'));
            updateCarousel();
            startAutoPlay();
        });
    });

    // Pausa ao passar o mouse
    slide.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // Retoma ao remover o mouse
    slide.addEventListener('mouseleave', startAutoPlay);

    // Redimensionamento
    window.addEventListener('resize', () => {
        const newSize = images[0].clientWidth;
        slide.style.transition = 'none';
        slide.style.transform = `translateX(${-newSize * counter}px)`;
        setTimeout(() => {
            slide.style.transition = 'transform 0.5s ease-in-out';
        }, 10);
    });

    // Inicialização
    setupCarousel();
});
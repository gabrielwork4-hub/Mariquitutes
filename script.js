document.addEventListener('DOMContentLoaded', () => {

    const imageLists = {
        'bolos': [
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.54_22944406.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.55_1a862957.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.55_b951f358.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.56_41310c40.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.56_d957ab8a.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.57_2e0b5acf.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.57_ad8211f0.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.58_767c4dc1.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.58_7c32ce5f.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.11.59_43302398.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.12.01_dbc310cb.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.12.01_e9d1be69.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.12.02_4f0607be.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.12.02_ae66fc57.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.12.03_b0cf7f13.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.32_411c4d4a.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.33_035f46c2.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.33_8536e2ab.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.34_01d301d4.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.34_92b9ed3f.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.35_9ca1ad8b.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.35_ed27aa7a.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.36_95865487.jpg",
            "Imagem do WhatsApp de 2024-10-22 à(s) 23.15.36_c1753a4c.jpg"
        ],
        'salgados': [
            "Imagem do WhatsApp de 2024-11-01 à(s) 17.36.44_57f8d39a.jpg",
            "Imagem do WhatsApp de 2024-11-01 à(s) 17.36.46_65068fe3.jpg",
            "Imagem do WhatsApp de 2024-11-01 à(s) 17.36.48_6246192e.jpg",
            "Imagem do WhatsApp de 2024-11-01 à(s) 17.37.00_484fb58e.jpg",
            "Imagem do WhatsApp de 2024-11-01 à(s) 17.37.00_7c067f82.jpg",
            "Imagem do WhatsApp de 2024-11-01 à(s) 17.37.06_e0ad9292.jpg",
            "Imagem do WhatsApp de 2024-11-01 à(s) 17.37.09_2c7863d6.jpg"
        ],
        'doces': [
            "brigadeiros-tradicionais-morango-e-chocolate.webp",
            "docinho-de-leite-ninho-receita-nutritiva.webp",
            "docinho-de-leite-ninho.webp",
            "docinhos-cajuzinhos-e-beijinhos.webp",
            "docinhos-festa-coloridos-variados.webp",
            "docinhos-variados-bichos-de-pé-cajuzinho-beijinho.webp",
            "variedade-de-brigadeiros-tradicionais-comestiveis-de-colher.webp"
        ]
    };

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const folder = carousel.getAttribute('data-folder');
        const track = carousel.querySelector('.carousel-track');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const images = imageLists[folder] || [];

        images.forEach((imgName, index) => {
            const img = document.createElement('img');
            img.src = `${encodeURIComponent(imgName)}`;
            
            let altText = "";
            if (imgName.includes("WhatsApp")) {
                const categoriaSEO = folder === 'bolos' ? 'Bolos Personalizados Artesanais' : folder === 'salgados' ? 'Bolos Salgados e Salgadinhos' : 'Doces Finos e Artesanais';
                altText = `${categoriaSEO} — Mari Quitutes São Paulo (Foto ${index + 1})`;
            } else {
                let friendlyName = decodeURIComponent(imgName).replace('.webp.webp', '').replace('.webp', '').replace('.jpg', '').split('-').join(' ');
                friendlyName = friendlyName.charAt(0).toUpperCase() + friendlyName.slice(1);
                altText = `${friendlyName} — Mari Quitutes São Paulo`;
            }
            img.alt = altText;

            if (index !== 0) img.loading = 'lazy';
            img.decoding = 'async';
            track.appendChild(img);

            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para a foto ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);
        let currentIndex = 0;
        let slideCount = images.length;

        if (slideCount === 0) return;

        function moveToSlide(index) {
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;

            track.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');

            currentIndex = index;
        }

        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');

        prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => moveToSlide(index));
        });

        let autoplayInterval = setInterval(() => moveToSlide(currentIndex + 1), 3500);

        carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => moveToSlide(currentIndex + 1), 3500);
        });
    });

    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            accordions.forEach(otherAcc => {
                if (otherAcc !== acc && otherAcc.classList.contains('active')) {
                    otherAcc.classList.remove('active');
                }
            });
            acc.classList.toggle('active');
        });
    });
});

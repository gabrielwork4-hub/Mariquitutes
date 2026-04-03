document.addEventListener('DOMContentLoaded', () => {

    const imageLists = {
        'bolos': [
            "bolo-80-anos-marina.webp",
            "bolo-9-meses-poderosaliz.webp",
            "bolo-aniversario-1-ano-urso-castelo.webp",
            "bolo-aniversario-10-anos-casamento-rosas-vermelhas.webp",
            "bolo-aniversario-21-anos-mulher-rosa-borboletas-estrelas.webp",
            "bolo-aniversario-divertidamente-6-meses-beatriz.webp",
            "bolo-aniversario-florido-borboletas-lusinete-62-anos.webp",
            "bolo-aniversario-homem-aranha.webp",
            "bolo-aniversario-moana-3-anos-laura-jpg.webp",
            "bolo-aniversario-peppapig-personagens-marinhos.webp",
            "bolo-aniversario-rei-trono-ha-jonatas-32-anos.webp",
            "bolo-aniversario-stitch-lorenzo-10anos.webp",
            "bolo-aniversario-super-mario-heroico.webp",
            "bolo-casa-rosa-clinica-estetica-avancada-jpg.webp",
            "bolo-de-aniversario-henrique-5-anos-bob-esponja.webp",
            "bolo-de-aniversario-infantil-tema-fazenda-para-beatryz.webp",
            "bolo-de-aniversario-para-bebe-anya-com-tema-de-ovelhinhas-e-nuvens-png.webp",
            "bolo-de-aniversario-rosa-46-anos.webp",
            "bolo-de-cor-de-floresta-encantada-unicornio-3-meses-beatuz.webp",
            "bolo-de-crisma-com-igreja-e-oracao.webp",
            "bolo-de-quase-um-ano-bebe-tema-advogado-jpg.webp",
            "torta-aniversario-infantil-tema-de-aviao-ursinho-1-mes.webp"
        ],
        'salgados': [
            "efiha-de-escarola-em-preparacao.webp",
            "empadas-de-frango-com-catupiry.webp",
            "esfiha-de-carne-caseira.webp",
            "esfiha-de-escarola-caseira.webp",
            "esfiha-de-frango-caseira.webp",
            "risoles-de-presunto-e-queijo.webp",
            "salgadinhos-de-festa-varios-tipos-emcaixas-para-venda.webpsalgadinhos-de-festa-varios-tipos-em-caixas-para-venda.webp"
        ],
        'doces': [
            "brigadeiros-e-bixos-de-pe.webp",
            "brigadeiros-e-docinhos-de-morango.webp",
            "brigadeiros-tradicionais-morango-e-chocolate.webp",
            "docinho-de-leite-ninho-receita-nutritiva.webp",
            "docinho-de-leite-ninho.webp",
            "docinhos-cajuzinhos-e-beijinhos.webp",
            "docinhos-de-coco-beijinho.webp",
            "docinhos-festa-coloridos-variados.webp",
            "docinhos-sortidos-gourmet.webp",
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

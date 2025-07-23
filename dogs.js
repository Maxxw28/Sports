document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('dog-gallery');
    const loader = document.getElementById('loader');
    const reloadBtn = document.getElementById('reload-btn');

    const randomDescriptions = [
        'Chasing squirrels like a champ.',
        'Snoozing all day long.',
        'Loves peanut butter!',
        'Certified good boy.',
        'Part-time zoomie specialist.',
        'Has more toys than you.',
        'Enjoys long walks on the beach.',
        'Just had a bath, still wet.',
        'Thinks it’s a lap dog.',
        'Secretly judges you.'
    ];

    async function fetchDogImage() {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        return data.message;
    }

    function getRandomDescription() {
        const index = Math.floor(Math.random() * randomDescriptions.length);
        return randomDescriptions[index];
    }

    function showLoader() {
        loader.classList.add('visible');
    }

    function hideLoader() {
        loader.classList.remove('visible');
    }

    async function loadDogs(count = 10) {
        gallery.innerHTML = '';
        showLoader();

        try {
            const dogPromises = Array.from({ length: count }, fetchDogImage);
            const dogImages = await Promise.all(dogPromises);

            dogImages.forEach((url, index) => {
                const card = document.createElement('div');
                card.className = 'dog-card';
                card.style.setProperty('--index', index);

                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Random dog';

                const desc = document.createElement('p');
                desc.textContent = getRandomDescription();

                card.appendChild(img);
                card.appendChild(desc);
                gallery.appendChild(card);
            });
        } catch (err) {
            console.error('Failed to load dogs:', err);
            gallery.innerHTML = '<p>Failed to load dog images 😢</p>';
        } finally {
            hideLoader();
        }
    }

    loadDogs();

    reloadBtn.addEventListener('click', () => loadDogs());
});

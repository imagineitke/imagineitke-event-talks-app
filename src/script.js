document.addEventListener('DOMContentLoaded', () => {
    const talkData = JSON.parse(document.getElementById('talk-data').textContent);
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('category-search');

    function renderSchedule(filter = '') {
        scheduleContainer.innerHTML = '';
        const filterLowerCase = filter.toLowerCase();

        talkData.forEach(item => {
            const isTalk = item.type === 'talk';
            let matchesFilter = true;

            if (isTalk && filter) {
                matchesFilter = item.categories.some(category => 
                    category.toLowerCase().includes(filterLowerCase)
                );
            }

            const itemDiv = document.createElement('div');
            itemDiv.className = `schedule-item ${item.type}`;
            
            const timeDiv = document.createElement('div');
            timeDiv.className = 'schedule-time';
            timeDiv.textContent = `${item.startTime} - ${item.endTime}`;
            itemDiv.appendChild(timeDiv);

            const titleDiv = document.createElement('h2');
            titleDiv.className = 'talk-title';
            titleDiv.textContent = item.title;
            itemDiv.appendChild(titleDiv);

            if (isTalk) {
                const speakersDiv = document.createElement('div');
                speakersDiv.className = 'talk-speakers';
                speakersDiv.textContent = `Speakers: ${item.speakers.join(', ')}`;
                itemDiv.appendChild(speakersDiv);

                const categoriesDiv = document.createElement('div');
                categoriesDiv.className = 'talk-categories';
                categoriesDiv.innerHTML = item.categories.map(cat => `<span>${cat}</span>`).join('');
                itemDiv.appendChild(categoriesDiv);

                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'talk-description';
                descriptionDiv.textContent = item.description;
                itemDiv.appendChild(descriptionDiv);
            }

            if (!matchesFilter) {
                itemDiv.classList.add('hidden');
            }

            scheduleContainer.appendChild(itemDiv);
        });
    }

    searchInput.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    renderSchedule();
});

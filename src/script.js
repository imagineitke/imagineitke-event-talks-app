document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const talkDetailsContainer = document.getElementById('talk-details-container');
    let activeFilter = 'all';
    let activeTalkId = null;

    function renderCategoryFilters() {
        const categories = ['all', ...new Set(talkData.flatMap(item => item.categories || []))];
        categoryFiltersContainer.innerHTML = categories.map(category => 
            `<button data-category="${category}" class="${activeFilter === category ? 'active' : ''}">${category}</button>`
        ).join('');

        categoryFiltersContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                activeFilter = button.dataset.category;
                renderSchedule();
                renderCategoryFilters();
            });
        });
    }

    function renderSchedule() {
        scheduleContainer.innerHTML = '';
        talkData.forEach((item, index) => {
            const isTalk = item.type === 'talk';
            let matchesFilter = true;

            if (activeFilter !== 'all' && isTalk) {
                matchesFilter = item.categories.includes(activeFilter);
            }

            if (matchesFilter) {
                const itemDiv = document.createElement('div');
                itemDiv.className = `schedule-item ${item.type}`;
                itemDiv.dataset.id = index;
    
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

                    itemDiv.addEventListener('click', () => {
                        activeTalkId = index;
                        renderTalkDetails();
                        updateActiveTalk();
                    });
                }
    
                scheduleContainer.appendChild(itemDiv);
            }
        });
        updateActiveTalk();
    }

    function renderTalkDetails() {
        if (activeTalkId === null) {
            talkDetailsContainer.innerHTML = '<div class="talk-details-placeholder">Click on a talk to see details</div>';
            return;
        }

        const item = talkData[activeTalkId];
        talkDetailsContainer.innerHTML = `
            <div class="schedule-time">${item.startTime} - ${item.endTime}</div>
            <h2 class="talk-title">${item.title}</h2>
            <div class="talk-speakers">Speakers: ${item.speakers.join(', ')}</div>
            <div class="talk-categories">${item.categories.map(cat => `<span>${cat}</span>`).join('')}</div>
            <p class="talk-description">${item.description}</p>
        `;
    }

    function updateActiveTalk() {
        scheduleContainer.querySelectorAll('.schedule-item').forEach(item => {
            if (item.dataset.id == activeTalkId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    renderCategoryFilters();
    renderSchedule();
    renderTalkDetails();
});

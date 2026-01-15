const fs = require('fs');
const path = require('path');

const talks = [
    {
        type: 'talk',
        title: 'The Future of Artificial Intelligence',
        speakers: ['Dr. Evelyn Reed'],
        categories: ['AI', 'Machine Learning'],
        description: 'A deep dive into the latest advancements in AI and what we can expect in the coming years.',
    },
    {
        type: 'talk',
        title: 'Modern JavaScript Frameworks in 2026',
        speakers: ['John Doe', 'Jane Smith'],
        categories: ['JavaScript', 'Web Development'],
        description: 'An overview of the most popular JavaScript frameworks and their ecosystems.',
    },
    {
        type: 'talk',
        title: 'Building Scalable Cloud Architectures',
        speakers: ['Peter Jones'],
        categories: ['Cloud', 'DevOps'],
        description: 'Learn how to design and build cloud infrastructure that can handle millions of users.',
    },
    {
        type: 'talk',
        title: 'The Quantum Computing Revolution',
        speakers: ['Dr. Albert Cho'],
        categories: ['Quantum Computing', 'Future Tech'],
        description: 'An introduction to the mind-bending world of quantum computers.',
    },
    {
        type: 'talk',
        title: 'Cybersecurity in a Connected World',
        speakers: ['Maria Garcia'],
        categories: ['Cybersecurity'],
        description: 'Protecting our digital lives from ever-increasing threats.',
    },
    {
        type: 'talk',
        title: 'The Art of UI/UX Design',
        speakers: ['Emily White'],
        categories: ['UI/UX', 'Design'],
        description: 'Creating beautiful and intuitive user experiences.',
    },
];

const schedule = [];
let currentTime = new Date();
currentTime.setHours(10, 0, 0, 0);

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

talks.forEach((talk, index) => {
    const startTime = new Date(currentTime);
    const endTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

    schedule.push({
        ...talk,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
    });

    currentTime.setTime(endTime.getTime() + 10 * 60 * 1000);

    if (index === 2) {
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
        schedule.push({
            type: 'break',
            title: 'Lunch Break',
            startTime: formatTime(lunchStartTime),
            endTime: formatTime(lunchEndTime),
        });
        currentTime.setTime(lunchEndTime.getTime());
    }
});


const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

const htmlTemplate = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(srcDir, 'style.css'), 'utf-8');
const js = fs.readFileSync(path.join(srcDir, 'script.js'), 'utf-8');

const scheduleHtml = schedule.map(item => {
    let itemHtml = `<div class="schedule-item ${item.type}">
        <div class="schedule-time">${item.startTime} - ${item.endTime}</div>
        <h2 class="talk-title">${item.title}</h2>`;

    if (item.type === 'talk') {
        itemHtml += `<div class="talk-speakers">Speakers: ${item.speakers.join(', ')}</div>
            <div class="talk-categories">${item.categories.map(cat => `<span>${cat}</span>`).join('')}</div>
            <div class="talk-description">${item.description}</div>`;
    }

    itemHtml += `</div>`;
    return itemHtml;
}).join('');

let finalHtml = htmlTemplate.replace('/* CSS will be injected here */', css);
finalHtml = finalHtml.replace('// JavaScript will be injected here', `
    const talkData = ${JSON.stringify(schedule)};
    ${js}
`);

// The script.js expects a script tag with id 'talk-data', which is not ideal.
// Let's adapt the build script to inject the data in a way the script can use it.

const finalJs = `
const talkData = ${JSON.stringify(schedule)};
${js.replace(`JSON.parse(document.getElementById('talk-data').textContent)`, 'talkData')}
`;

finalHtml = htmlTemplate.replace('/* CSS will be injected here */', css);
finalHtml = finalHtml.replace('// JavaScript will be injected here', finalJs);
finalHtml = finalHtml.replace('<!-- Schedule will be injected here -->', scheduleHtml);


if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);

console.log('Website built successfully! Find it in the dist directory.');

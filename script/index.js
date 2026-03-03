// for synonyms in modal
const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="opacity-80 bg-[#EDF7FF] p-2">${el}</span>`);
    return htmlElements.join(` &nbsp;&nbsp; `);
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(datas => displayLessosn(datas.data))
}

function removeActive() {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach(btn => btn.classList.remove('active'));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // remove the active lesson and hightlight the active lesson
            removeActive();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            clickedBtn.classList.add('active');
            
            displayLevelWord(data.data);
        })
}

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (word) => {
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
    <div>
        <h2 class="font-semibold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> ${word.pronunciation})</h2>
    </div>
    <div>
        <h3 class="font-semibold pb-1">Meaning</h3>
        <p>${word.meaning}</p>
    </div>
    <div>
        <em class="">${word.partsOfSpeech}</em>
    </div>
    <div>
        <h3 class="font-semibold pb-1">Example</h3>
        <p>${word.sentence}</p>
    </div>
    <div>
        <h3 class="font-bangla font-medium pb-3">সমার্থক শব্দ গুলো</h3>
        <div>${createElements(word.synonyms)}</div>
    </div>
    `;
    // <span class="opacity-80 bg-[#EDF7FF] p-2">${word.synonyms}</span>
    document.getElementById('word_modal').showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full py-9 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="alert sign">
            <p class="text-[#79716B] text-xs">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="text-3xl font-medium text-[#292524]">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }

    words.forEach(word => {
        // handled wrror with truthy - ternary
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl text-center py-10 px-12">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যাইনি"}</h2>
            <p class="font-medium text-lg pt-3 pb-5">Meaning / Pronunciation</p>
            <div class="font-semibold text-xl opacity-80">"${word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যাইনি"}"</div>
            <div class="flex justify-between items-center mt-9">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a90ff22] rounded-lg px-3 py-4 hover:bg-[#1a90ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a90ff20] rounded-lg px-3 py-4 hover:bg-[#1a90ff80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
}

const displayLessosn = (lessons) => {
    // 1. get the container an empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // 2. get into every lessons
    for (let lesson of lessons) {
        // 3. create elemet
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
        `;
        // 4. append
        levelContainer.append(btnDiv);
    }
    
}
loadLessons()
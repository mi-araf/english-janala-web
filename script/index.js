const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(datas => displayLessosn(datas.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))
}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl text-center py-10 px-12">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-medium text-lg pt-3 pb-5">Meaning / Pronunciation</p>
            <div class="font-semibold text-xl opacity-80">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center mt-9">
                <button class="btn bg-[#1a90ff22] rounded-lg px-3 py-4 hover:bg-[#1a90ff80]"><i class="fa-solid fa-circle-info"></i></button>
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}</button>
        `;
        // 4. append
        levelContainer.append(btnDiv);
    }
    
}
loadLessons()
const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
        displayLesson(json.data)
});
};

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord =(id) =>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) =>{

        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")
         displayLevelWord(data.data)
        });
};

const loadWordDetail= async(id) =>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) =>{
    console.log(word);
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
    <div class="">
    <h2 class = "text-2xl font-bold">
    ${word.word}(<i class="fa-solid fa-microphone-slash"></i> :${word.pronunciation})</h2>
    </div>
    
    <div class="">
    <h2 class = "font-bold">Meanign
    </h2>
    <p>${word.meaning}</p>
    </div>

    <div class="">
    <h2 class="font-bold">Example</h2>
    <p>${word.sentence}</p>
    </div>

    <div class="">
    <h2 class = "font-bold">Synonym</h2>
    <span class="btn">Syn1</span>
    <span class="btn">Syn1</span>
    <span class="btn">Syn1</span>
    </div>
    `
    document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";


    if(words.length == 0){
        wordContainer.innerHTML=`
        <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">

        <img class="mx-auto" src="./assets/alert-error.png"/>
      <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
    </div>
        `
    }

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">

      <h2 class="font-bold text-2xl">${word.word ? word.word : "Not found"}</h2>
      <p class="font-semibold">Meaning /Pronunciation</p>
      <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "Not found"} / ${word.pronunciation ? word.pronunciation : "Not found"}"</div>
      <div class="flex justify-between items-center">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>

        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
      </div>

    </div>
        `;
        wordContainer.append(card);
    })
}

const displayLesson = (lessons) =>{
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML ="";

    for(let lesson of lessons){

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class= "btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no} </button>
        `;
        levelContainer.append(btnDiv);
    }
};

loadLessons();
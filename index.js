import { catsData } from './data.js'

//dom
let emotionRadiosDisplay = document.getElementById('emotion-radios')

//iterate the cats and cat.emotionTags
function getEmotionsArray(cats) {
	const emotionsArray = []
	for (let cat of cats) {
		for (let emotion of cat.emotionTags) {
			//only push array 1 at a time
			if (!emotionsArray.includes(emotion)) {
				emotionsArray.push(emotion)
			}
		}
	}
	return emotionsArray
}

// display emotion radio
function renderEmotionRadio(cats) {
	let emotions = getEmotionsArray(cats)
	let emotionRadio = ''
	//iterate the emotions again
	for (let emotion of emotions) {
		emotionRadio += `
        <div class="radio">
            <label for=${emotion}>${emotion}</label>
                <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                />
        </div>
       `
	}
	emotionRadiosDisplay.innerHTML = emotionRadio
}
renderEmotionRadio(catsData)

//target the event.data using change event
emotionRadiosDisplay.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e) {
	document
		.getElementById(e.target.id)
		.parentElement.classList.add('highlight')
}

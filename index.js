import { catsData } from './data.js'

//dom
let emotionRadiosDisplay = document.getElementById('emotion-radios')
let getImageButton = document.getElementById('get-image-btn')
let gifstOnlyOption = document.getElementById('gifs-only-option')
let memeModal = document.getElementById('meme-modal')
let memeModalInner = document.getElementById('meme-modal-inner')
let memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

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

//highlight the radio
function highlightCheckedOption(e) {
	//2.remove all the highlight in element
	let radioArray = document.getElementsByClassName('radio')
	for (let radio of radioArray) {
		radio.classList.remove('highlight')
	}
	//1.add highlight by parentElement
	document
		.getElementById(e.target.id)
		.parentElement.classList.add('highlight')
}

//selected cat by getImageButton
getImageButton.addEventListener('click', renderCat)

function getMatchingCatsArray() {
	if (document.querySelector('input[type="radio"]:checked')) {
		const selectedEmotion = document.querySelector(
			'input[type="radio"]:checked'
		).value
		const isGif = gifstOnlyOption.checked

		const matchingCatsArray = catsData.filter(function (cat) {
			if (isGif) {
				return cat.emotionTags.includes(selectedEmotion) && cat.isGif
			} else {
				return cat.emotionTags.includes(selectedEmotion)
			}
		})
		return matchingCatsArray
	}
}

function getSingleCatObject() {
	const catsArray = getMatchingCatsArray()
	if (catsArray.length === 1) {
		return catsArray[0]
	} else {
		let randomNumber = Math.floor(Math.random() * catsArray.length)
		return catsArray[randomNumber]
	}
}

function renderCat() {
	const catObject = getSingleCatObject()

	memeModalInner.innerHTML = `
		<img 
		class="cat-img" 
		src="./images/${catObject.image}"
		alt="${catObject.alt}"
    >
    `
	memeModal.style.display = 'flex'
}
memeModalCloseBtn.addEventListener('click', function () {
	memeModal.style.display = 'none'
})

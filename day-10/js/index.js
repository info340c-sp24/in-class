'use strict';


// Class Puppy
class Puppy {
    // Constructor: takes in an img url, and a sound
    constructor(img, sound) {
        this.img = img;
        this.sound = sound;
    }

    // Method for "speaking" using responsiveVoice

    bark() {
        responsiveVoice.speak(this.sound);
    }

    // Render a Div that you can click on to bark

    render() {
        let puppyCard = document.createElement('div');
        puppyCard.setAttribute('title', `puppy that says ${this.sound}`);
        puppyCard.setAttribute('class', 'puppyCard col-sm-4');
        puppyCard.style.backgroundImage = `url(${this.img})`;
        puppyCard.addEventListener('click', () => this.bark());

        return puppyCard;
    }

}


// Class Form
class PuppyForm {
    // Contructor: takes in a callback function you can do
    constructor(callback) {
        this.callback = callback;
    }

    // Render: build the form with submit event
    render() {
        // Build form and input elements
        let form = $('<form>');
        let urlInput = $('<input class="url">');
        urlInput.attr({
            type: "text",
            placeholder: "Puppy URL...",
            class: "form-control"
        });
        let soundInput = $('<input class="sound">');
        soundInput.attr({
            type: "text",
            placeholder: "Sound to make...",
            class: "form-control"
        });
        form.append(urlInput);
        form.append(soundInput);
        form.append($('<button class="btn btn-primary mb-3" type="submit">Add a puppy!</button>'));

        // On submit, do the callback function
        form.on('submit', (event) => {
            event.preventDefault();
            this.callback(urlInput.val(), soundInput.val());
            return false;
        });
        return form;
    }
}

// Class for the app
class PuppyApp {
    // Constructor: takes in a parent element and list of puppies
    constructor(parentElement, puppyList) {
        this.parentElement = parentElement;
        this.puppyList = puppyList;
    }

    // Add puppy: pushes new data into list of puppies and re-renders the app

    addPuppy(img, sound) {
        console.log(this);

        this.puppyList.push({
            url: img,
            sound: sound
        });
        this.render();
    }


    // Render;
    render() {
        // Empty parent element
        this.parentElement.innerHTML = '';

        // Create and render a new form
        let form = new PuppyForm(this.addPuppy.bind(this));
        this.parentElement.appendChild(form.render()[0]);

        // Append puppy list element to parent (in a wrapper div)
        let puppyWrapper = document.createElement('div');
        puppyWrapper.className = 'row';
        this.parentElement.appendChild(puppyWrapper);

        this.puppyList.map((puppyInfo) => {
            let newPuppy = new Puppy(puppyInfo.url, puppyInfo.sound);
            puppyWrapper.appendChild(newPuppy.render());
        })

    }
}

// Create a new app with a single puppy
let app = new PuppyApp(
    document.getElementById('content'),
    [{
        url: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
        sound: "bark"
    }]
)


// Render the app
app.render();

// Main.js file
'use strict';

// Data: a group of people
const PEOPLE_LIST = [
    { name: "James", interest: "Board Games" },
    { name: "Jacob", interest: "Music" },
    { name: "Bob", interest: "Music" }
];

// Functional component for an individual person
function Person({name, interest}) {

    return (
        <div class="person">
            <p>Hello, my name is {name}. My interest is in {interest}</p>
        </div>
    )
}

// Functional component to represent a group of people
function People(props) {
    let { group } = props;
    return (
        group.map((data) => {
            return <Person key={data.name} name={data.name} interest={data.interest} />
        })
    )
}

// Render your component in the `main` section
let myPeople = <People group={PEOPLE_LIST} />

ReactDOM.render(myPeople, document.querySelector('main'));
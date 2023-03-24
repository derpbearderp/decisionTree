import { DecisionTree } from "./libraries/decisiontree.js"

const predic = document.getElementById("predic");
const labelOneBtn = document.querySelector("#prediction");
labelOneBtn.addEventListener("click", () => loadSavedModel());

function loadSavedModel() {
    fetch("model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)
    let Glucose = document.getElementById('Glucose').value
    let bmi = document.getElementById('bmi').value

    // test om te zien of het werkt
    
    let diabetes = { bmi: bmi ,Glucose: Glucose }
    let prediction = decisionTree.predict(diabetes)
    console.log("predicted " + prediction)

    if (prediction == 0){
        predic.innerText =`You have no diabetes`
    } else {
        predic.innerText =`You have diabetes`
    }

}

// loadSavedModel()
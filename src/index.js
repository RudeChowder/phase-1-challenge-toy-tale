let addToy = false
const url = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  const toyCollection = document.querySelector("#toy-collection")
  const newToyForm = document.querySelector(".add-toy-form")
  const formInputs = document.querySelectorAll(".input-text")

  const createToyCard = (toy) => {
    const newDiv = document.createElement("div")
    newDiv.classList.add("card")
    const newH2 = document.createElement("h2")
    newH2.innerHTML = toy.name
    newDiv.append(newH2)

    const newImg = document.createElement("img")
    newImg.src = toy.image
    newImg.classList.add("toy-avatar")
    newDiv.append(newImg)

    const newP = document.createElement("p")
    newP.innerHTML = `${toy.likes} Likes`
    newDiv.append(newP)

    const newBtn = document.createElement("button")
    newBtn.classList.add("like-btn")
    newBtn.id = `${toy.id}`
    newBtn.innerHTML = "Like"
    newDiv.append(newBtn)
    newBtn.addEventListener("click", () => {
      const configurationObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: parseInt(newP.innerHTML.slice(0, -5)) + 1
        })
      }
      fetch(`${url}/${newBtn.id}`, configurationObj)
        .then(resp => resp.json())
        .then(data => {
          newP.innerHTML = `${data.likes} Likes`
        })
    })

    toyCollection.append(newDiv)
  }

  const fetchToys = () => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        data.forEach(toy => createToyCard(toy))
      })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })

  newToyForm.addEventListener("submit", event => {
    event.preventDefault()
    const newToyName = formInputs[0].value
    const newToyImg = formInputs[1].value
    formInputs[0].value = ""
    formInputs[1].value = ""
    const configurationObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application.json"
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImg,
        likes: 0
      })
    }
    fetch(url, configurationObj)
      .then(resp => resp.json())
      .then(data => {
        createToyCard(data)
      })
  })
  fetchToys()
})

//console.log('Client side file')



// connects this code to the html code in index.hbs
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// # lets you refer to id name in index.hbs
const messOne = document.querySelector('#mess-one')
const messTwo = document.querySelector('#mess-two')
const messThree = document.querySelector('#mess-three')



// runs when user clicks search in the website
// gets the value from the search box
weatherForm.addEventListener('submit', (e) => {
  // prevents the website from refreshing
  e.preventDefault()
  // gets the value from the search box
  const value = search.value

  messOne.textContent = 'Loading...'
  messTwo.textContent = ''
  messThree.textContent = ''


  const url = 'http://localhost:3000/weather?address=' + value
  // http request on client side
  fetch(url).then((response) => {
    response.json().then((data) => {

      // change the text data of messeges from index.hbs
      messOne.textContent = data.location
      messTwo.textContent = data.forecastData
      messThree.textContent = data.error

    })
  })

})

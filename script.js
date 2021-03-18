const insert = document.getElementById('insert')
const insertInput = document.getElementById('insert-input')
const search = document.getElementById('search')
const searchInput = document.getElementById('search-input')
const listContainer = document.getElementById('list-container')
const activeSelection = document.getElementById('active-selection')
const list = document.getElementById('list')

// Variable Trackers
const headEl = document.getElementById('head')
const midEl = document.getElementById('mid')
const tailEl = document.getElementById('tail')
const currentSearchEl = document.getElementById('current-search')

/*** SEARCH FUNCTIONS***/

// Get mid value for a list segment
function getMid(head, tail) {
  return Math.floor((head + tail) / 2)
}

// Set up for search
function searchList(searchVal) {
  const l = document.querySelectorAll('.list-item')
  const head = 0
  const tail = l.length
  highlightActiveSection(l[head], l[tail - 1])
  activeSelection.style.display = 'flex'
  binarySearch(l, head, tail - 1, searchVal)
}

// Perform Binary Search
function binarySearch(l, head, tail, searchVal) {
  const mid = getMid(head, tail)
  updateDOMValues(l, head, mid, tail, searchVal)
  highlightActiveSection(l[head], l[tail])
  showMid(l, mid)

  if (tail < head) {
    console.log(`Your value ${searchVal} was not found in the list`)
  } else if (tail === head) {
    if (l[head].getAttribute('data-id')) {
      console.log(`Your value ${searchVal} was  found at l[${head}]`)
    } else {
      console.log(`Your value ${searchVal} was not found in the list`)
    }
  } else {
    if (l[mid].getAttribute('data-id') < searchVal) {
      setTimeout(() => {
        binarySearch(l, mid + 1, tail, searchVal)
      }, 3000)
    } else if (l[mid].getAttribute('data-id') > searchVal) {
      setTimeout(() => {
        binarySearch(l, head, mid - 1, searchVal)
      }, 3000)
    } else {
      console.log(`Your value ${searchVal} was  found at l[${mid}]`)
    }
  }
}

/*** DOM MANIP FUNCTIONS ***/

// Highlight the active section of the list
function highlightActiveSection(head, tail) {
  const listContainerWidth = listContainer.getBoundingClientRect().right

  const offsetLeft = head.getBoundingClientRect().left
  const offsetRight = listContainerWidth - tail.getBoundingClientRect().right

  activeSelection.style.left = `${offsetLeft - 20}px`
  activeSelection.style.right = `${offsetRight - 20}px`
}

// Show the current value being looked at

function showMid(l, mid) {
  l.forEach((item, idx) =>
    idx === mid ? item.classList.add('mid') : item.classList.remove('mid')
  )
}

function updateDOMValues(l, head, mid, tail, cur) {
  headEl.innerText = `el[${head}]: ${l[head].getAttribute('data-id')}`
  midEl.innerText = `el[${mid}]: ${l[mid].getAttribute('data-id')}`
  tailEl.innerText = `el[${tail}]: ${l[tail].getAttribute('data-id')}`
  currentSearchEl.innerText = cur
}

/*** EVENT LISTENERS ***/

// @TODO: Insert value into list
insert.addEventListener('submit', (e) => {
  e.preventDefault()

  alert('On my todo list...')
  insertInput.value = ''
})

// Find value in list
search.addEventListener('submit', (e) => {
  e.preventDefault()
  searchVal = searchInput.value
  console.log(searchVal)
  searchList(searchVal)
  searchInput.value = ''
})

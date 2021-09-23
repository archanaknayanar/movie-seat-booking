const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const clearBtn = document.querySelector('.clear');

let ticketPrice = +movieSelect.value;

//clear local storage
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

populateUI();
//Save selected movie index and price
function setMovieData(movieIndex , moviePrice) {
    localStorage.setItem('selectedMovieIndex' , movieIndex);
    localStorage.setItem('selectedMoviePrice' , moviePrice);
}

//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //Copy selected seats into an array (using Spread operator)
    //Map through the array
    //return new array indexes 
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats' , JSON.stringify(seatsIndex));
    console.log(seatsIndex);
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    //keep the movie name selected upon reload
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex , e.target.value);
    updateSelectedCount();
})

//Seat click event
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') &&
     !e.target.classList.contains('occupied'))
     {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

//Initial count and total set
updateSelectedCount();
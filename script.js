const dropdownCon = document.querySelector(".dropdown");
const sortBtn = document.querySelector(".sort-btn");
const movieListCon = document.querySelector(".movieListCon");

// send top button
const sendUpBtn = document.querySelector(".sendUp-btn");

const notiCon = document.querySelector(".notiCon");


const images = [
  {
    imageSrc: "harry_potter 1.jpg",
    movieName: "Harry Potter and the Philosopher's Stone (2001)",
    rating: 7.6,
  // the month starts from 0,0 to 11 month(year, month, day)
    releaseDate: new Date(2001, 9, 4),
  },
  {
    imageSrc: "harry_potter 2.jpg",
    movieName: "Harry Potter and the Chamber of Secrets (2002)",
    rating: 7.4,
    releaseDate: new Date(2002, 9, 15),
  },
  {
    imageSrc: "harry_potter 3.jpg",
    movieName: "Harry Potter and the Prisoner of Azkaban (2004)",
    rating: 7.9,
    releaseDate: new Date(2004, 5, 4),
  },
  {
    imageSrc: "harry_potter 4.jpg",
    movieName: "Harry Potter and the Goblet of Fire (2005)",
    rating: 7.7,
    releaseDate: new Date(2005, 9, 18),
  },
  {
    imageSrc: "harry_potter 5.jpg",
    movieName: "Harry Potter and the Order of the Phoenix (2007)",
    rating: 7.5,
    releaseDate: new Date(2007, 6, 11),
  },
  {
    imageSrc: "harry_potter 6.jpg",
    movieName: "Harry Potter and the Half-Blood Prince (2009)",
    rating: 7.6,
    releaseDate: new Date(2009, 6, 15),
  },
  {
    imageSrc: "harry_potter 7.jpg",
    movieName: "Harry Potter and the Deathly Hallows: Part 1 (2010)",
    rating: 7.7,
    releaseDate: new Date(2010, 9, 19),
  },
  {
    imageSrc: "harry_potter 8.jpg",
    movieName: "Harry Potter and the Deathly Hallows: Part 2 (2011)",
    rating: 8.1,
    releaseDate: new Date(2011, 6, 15),
  }
];



sortBtn.addEventListener("click", () => {
  // create dropdown ul element
  const ulContainer = document.createElement("ul");
  ulContainer.classList.add("dropdown-list");
  ulContainer.innerHTML = `
     <li class="list-names" id="oldest">Oldest</li>
     <li class="list-names" id="newest">Newest</li>
     <li class="list-names" id="atoZ">Name (A - Z)</li>
     <li class="list-names" id="ztoA">Name (Z - A)</li>
  `;
  dropdownCon.appendChild(ulContainer);
  
  const dropdownItems = document.querySelectorAll(".list-names");
  dropdownItems.forEach((element) => {
    element.addEventListener("click", (e) => {
      const sortTagId = e.target.id;
      if(sortTagId === "oldest") {
      // show movies from oldest to newest
        const oldestMovie = images.sort((a,b) => a.releaseDate.getTime() - b.releaseDate.getTime());
        showImages(oldestMovie);

      // the message inside notification element
        const notimessage = "Movies from oldest to newest";
        noti(notimessage);
      }else if(sortTagId === "newest") {
      // show movies from newest to oldest
        const newestMovie = images.sort((a,b) => b.releaseDate.getTime() - a.releaseDate.getTime());
        showImages(newestMovie);

        const notimessage = "Movies from newest to oldest";
        noti(notimessage);
      }else if(sortTagId === "atoZ") {
      // show movies from name a to z
        const NameAtoZ = images.sort((a,b) => a.movieName.localeCompare(b.movieName));
        showImages(NameAtoZ);

        const notimessage = "Movies name A to Z";
        noti(notimessage);
      }else {
      // show movies from name z to a
        const NameZtoA = images.sort((a,b) => b.movieName.localeCompare(a.movieName));
        showImages(NameZtoA);

        const notimessage = "Movies name Z to A";
        noti(notimessage);
      };
    // remove dropdown list after the li tag is clicked
      ulContainer.remove();
    });
  });
});



// remove the dropdown list on scrolling the page
document.addEventListener("scroll", () => {
  const ulContainer = document.querySelector(".dropdown-list");
  if(ulContainer) {
    ulContainer.remove();
  };
});




// add movies inside movie container element
const showImages = (images) => {
  movieListCon.innerHTML = "";
  images.forEach((movie) => {
  const movieCon = `
     <div class="movie">
        <div class="imgCon">
          <img src="${movie.imageSrc}">
        </div>
        <div class="textCon">
          <h3>${movie.movieName}</h3>
          <h6>Genre - Adventure, Family, Fantasy</h6>
          <div>IMDB rating &#9733 ${movie.rating}</div>
          <div>Release Date - ${movie.releaseDate.toLocaleDateString()}</div>
        </div>
      </div>
    `;
  movieListCon.innerHTML += movieCon;
  });
};

showImages(images);

// send page to the top with smooth scrolling effect
sendUpBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



// notification on clicking the sort list
function noti(notimessage) {
  notiCon.innerHTML = "";
  const message = document.createElement("div");
  message.className = "noti";
  message.textContent = notimessage;
  notiCon.appendChild(message);
  
  message.style.bottom = `-${message.offsetHeight}px`;
  
  setTimeout(() => {
    message.style.bottom = "0px";
  }, 100);
  
  setTimeout(() => {
    message.style.bottom = `-${message.offsetHeight}px`;
  }, 2000);
};

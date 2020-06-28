const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// quote api = https://type.fit/api/quotes
const quotesAPI = "https://type.fit/api/quotes";

function randomNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if(!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

function tweetQuote() {
  const author = authorText.innerText;
  const quote = quoteText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

async function getQuote() {
  loading();
  try {
    const response = await fetch(quotesAPI);
    const data = await response.json();
    // returns random number from
    const quoteNum = await randomNum(data.length);

    // destructure
    let { text, author } = data[quoteNum];

    // check if author is blank
    if (author === null) {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = author;
    }

    // check if quote text is > 50 characters
    if (text.length > 70) {
      quoteText.classList.add("long-quote");
      quoteText.classList.add("red-text");
    }

    quoteText.innerText = text;

    complete();
  } catch (error) {
    console.log("oops!", error);
  }
}

// event listeners
newQuoteBtn.addEventListener("click", getQuote);

twitterBtn.addEventListener('click', tweetQuote);

getQuote();

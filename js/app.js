// User input's DOM elements
const fileName = document.getElementById('file-name');
const reset = document.getElementById('reset');
const time = document.getElementById('time');
const date = document.getElementById('date');
const rexeets = document.getElementById('rexeets');
const quotes = document.getElementById('quotes');
const likes = document.getElementById('likes');
const generate = document.getElementById('generate');

// Capturing all Radio buttons
const themeRadios = document.getElementsByName('theme_radio');
const verifiedRadios = document.getElementsByName('verified_radio');

// Preview's DOM elements
const xeetBox = document.getElementById('xeet_box');
const xeet = document.getElementById('xeet');
const xeetAvatar = document.getElementById('xeet_avatar');
const xeetName = document.getElementById('xeet_name');
const xeetVerified = document.getElementById('xeet_verified');
const xeetUsername = document.getElementById('xeet_username');
const xeetMessage = document.getElementById('xeet_message');
const xeetTime = document.getElementById('xeet_time');
const xeetDate = document.getElementById('xeet_date');
const xeetClient = document.getElementById('xeet_client');
const xeetRexeets = document.getElementById('xeet_rexeets');
const xeetQuotes = document.getElementById('xeet_quotes');
const xeetLikes = document.getElementById('xeet_likes');

// Capturing Download button
const download = document.getElementById('download');

const messageTemplate = "";

const messageValues = {
  holiday: ["Christmas", "New Year", "Thanksgiving", "Halloween", "Easter", "Independence Day", "Veterans Day", "Columbus Day"],
  enemies: ["the Democrats", "the crazy radical leftists", "the media", "the fake media", "the dangerous and deranged criminals", "the corrupt liberals"],
  accusation: ["are trying to destroy our country", "are lying to you", "are corrupt", "are stealing from you", "are ruining our values", "want to make America weak", "want to crash our economy", "want to take away your rights", "are trying to brainwash our children", "are against our sacred freedoms", "are trying to take away your guns", "are trying to cancel our culture", "are trying to erase our history", "are trying to silence us", "are trying to control you", "are trying to divide us", "are trying to destroy our way of life"],
  unrelatedEvent: ["the stock market crash", "the border crisis", "the energy crisis", "the high inflation", "the crime wave", "other countries disrespecting us", "potholes not being filled", "people dying of fentanyl overdoses", "your cold coffee"],
  nonRelatedBody: ["this should stop now", "I'm the only one that can stop them", "they fear me", "they are also very evil and stupid", "they are the reason why our country is in such a mess", "they are the reason why we have so many problems", "they are the reason why we can't have nice things", "they are the reason why we can't trust anyone anymore", "they are the reason why we need to take back our country"],
  insult1: ["sad", "pathetic", "plain stupid", "tragic", "disgusting", "shamefully", "libtard", "sleepy", "crooked", "fake"],
  insult2: ["is the reason behind everything that is wrong with our country", "should be ashamed of themselves", "is a disgrace to our nation", "is ruining our future", "is destroying our values and those of our children", "keeps cheating at golf", "is a big meany"],
  politicalFigure: ["Joe Biden", "Nancy Pelosi", "Chuck Schumer", "Kamala Harris", "AOC"],
  randomPunchline: ["make America great again", "build the wall", "drain the swamp", "lock her up", "stop the steal", "save our country"],
  peopleNotAffected: ["the hardworking Americans", "the small business owners", "the patriots", "the middle class"],
  problem: ["crime", "illegal aliens", "communism", "woke culture", "the radical left", "the fake news media"],
  godMagaReference: ["God bless America", "God bless our troops", "Make America Great Again", "God bless the USA", "MAGA", "America First", "let's make America great again"]
};

function hydrateMessageTemplate({ holiday, enemies, accusation, unrelatedEvent, nonRelatedBody, insult1, insult2, politicalFigure, randomPunchline, peopleNotAffected, problem, godMagaReference }) {
  return `Happy ${holiday}, including all the ${enemies} that ${accusation} and are behind ${unrelatedEvent}.
${nonRelatedBody} and ${insult1} ${politicalFigure} ${insult2}.
From now on I will ${randomPunchline}, so that the ${peopleNotAffected} can finally be great and no longer fear ${problem}.

Again, Happy ${holiday}, and ${godMagaReference}`.toUpperCase();
}




// Month names
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Theme
let themeColor = '#ffffff';

// Number Formatter for Rexeets, Quote Xeets and Likes
function numberFormatter(num, fixed) {
  // terminate early
  if (num === null) return null;
  // terminate early
  if (num === 0) return '0';

  fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show

  let b = num.toPrecision(2).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power

  return e;
}

// Render Message in Xeet
function renderMessage() {
  const messageValue = {};
  for (const key in messageValues) {
    if (Array.isArray(messageValues[key])) {
      const randomIndex = Math.floor(Math.random() * messageValues[key].length);
      messageValue[key] = messageValues[key][randomIndex];
    }
  }

  xeetMessage.innerText = hydrateMessageTemplate(messageValue);
  const characterCountEl = message.nextElementSibling.querySelector('.count');
  characterCountEl.innerText = xeetMessage.innerText.length;
}

// Render Time in Xeet
function renderTime() {
  const timeValue = time.value.trim();

  if (timeValue === '') {
    xeetTime.innerText = getCurrentTime();
  } else {
    xeetTime.innerText = timeValue;
  }
}

// Render Date in Xeet
function renderDate() {
  const dateValue = date.value.trim();

  if (dateValue === '') {
    xeetDate.innerText = getCurrentDate();
  } else {
    xeetDate.innerText = dateValue;
  }
}

// Render Client in Xeet
function renderClient() {
  const clientValue = client.value.trim();

  if (clientValue === '') {
    xeetClient.innerText = 'Twitter Web App';
  } else {
    xeetClient.innerText = clientValue;
  }
}

// Render Rexeets in Xeet
function renderRexeets() {
  xeetRexeets.parentElement.classList.remove('hide');
  let rexeetsValue = rexeets.value;

  if (rexeetsValue === '') {
    xeetRexeets.innerText = '96';
  } else {
    rexeetsValue = +rexeetsValue;
    if (rexeetsValue >= 0) {
      if (rexeetsValue === 0) {
        xeetRexeets.parentElement.classList.add('hide');
      } else {
        xeetRexeets.innerText = numberFormatter(rexeetsValue);
      }
    } else {
      xeetRexeets.innerText = '96';
    }
  }
}

// Render Quotes in Xeet
function renderQuotes() {
  xeetQuotes.parentElement.classList.remove('hide');
  let quotesValue = quotes.value;

  if (quotesValue === '') {
    xeetQuotes.innerText = '88';
  } else {
    quotesValue = +quotesValue;
    if (quotesValue >= 0) {
      if (quotesValue === 0) {
        xeetQuotes.parentElement.classList.add('hide');
      } else {
        xeetQuotes.innerText = numberFormatter(quotesValue);
      }
    } else {
      xeetQuotes.innerText = '88';
    }
  }
}

// Render Likes in Xeet
function renderLikes() {
  xeetLikes.parentElement.classList.remove('hide');
  let likesValue = likes.value;

  if (likesValue === '') {
    xeetLikes.innerText = '153';
  } else {
    likesValue = +likesValue;
    if (likesValue >= 0) {
      if (likesValue === 0) {
        xeetLikes.parentElement.classList.add('hide');
      } else {
        xeetLikes.innerText = numberFormatter(likesValue);
      }
    } else {
      xeetLikes.innerText = '153';
    }
  }
}

// Returns current Time
function getCurrentTime() {
  const dateObj = new Date();
  let hours = +dateObj.getHours();
  let minutes = ('00' + dateObj.getMinutes()).slice(-2);
  let suffix;

  if (hours > 12) {
    hours = hours - 12;
    suffix = 'PM';
  } else {
    if (hours === 0) {
      hours = 12;
      suffix = 'AM';
    } else if (hours === 12) {
      suffix = 'PM';
    } else {
      suffix = 'AM';
    }
  }

  return `${hours}:${minutes} ${suffix}`;
}

// Returns current Date
function getCurrentDate() {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  return `${MONTHS[month]} ${day}, ${year}`;
}

// Set Theme
function toggleTheme(ev) {
  let choice;

  for (let i = 0; i < themeRadios.length; i++) {
    if (themeRadios[i].checked) {
      choice = themeRadios[i].value;
    }
  }

  if (choice === 'dim') {
    xeet.className = 'xeet dim';
    xeetBox.className = 'xeet_box dim';
    themeColor = '#15202b';
  } else if (choice === 'dark') {
    xeet.className = 'xeet dark';
    xeetBox.className = 'xeet_box dark';
    themeColor = '#000000';
  } else {
    xeet.className = 'xeet';
    xeetBox.className = 'xeet_box';
    themeColor = '#ffffff';
  }
}

// Toggle Verified Badge
function toggleVerified() {
  let choice;

  for (let i = 0; i < verifiedRadios.length; i++) {
    if (verifiedRadios[i].checked) {
      choice = verifiedRadios[i].value;
    }
  }

  if (choice === 'show') {
    xeetVerified.classList.remove('hide');
  } else {
    xeetVerified.classList.add('hide');
  }
}

// Generate filenames for the image which is to be downloaded
function generateFileName() {
  return `xeet${Math.floor(Math.random() * 90000) + 10000}`;
}

// Download it to the local machine
function saveAs(uri, filename) {
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

// Take screenshot of the xeet
function takeScreenshot() {
  window.scrollTo(0, 0);
  html2canvas(document.querySelector('.xeet'), {
    allowTaint: true,
    backgroundColor: themeColor,
    useCORS: true,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), generateFileName());
  });
}

// Set Timestamp when page is loaded
function setTimestamp() {
  renderTime();
  renderDate();
}

// On load
setTimestamp();

// Event Listeners
time.addEventListener('input', renderTime);
date.addEventListener('input', renderDate);
rexeets.addEventListener('input', renderRexeets);
quotes.addEventListener('input', renderQuotes);
likes.addEventListener('input', renderLikes);
download.addEventListener('click', takeScreenshot);
generate.addEventListener('click', renderMessage);

for (let i = 0; i < themeRadios.length; i++) {
  themeRadios[i].addEventListener('change', toggleTheme);
}

for (let i = 0; i < verifiedRadios.length; i++) {
  verifiedRadios[i].addEventListener('change', toggleVerified);
}

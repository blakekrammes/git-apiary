'use strict';
const PUBAPISEARCH_URL = 'https://api.publicapis.org/entries';

// function that contains the query object and the jQuery get-request method to obtain the APIs requested data
function getDataFromApiByCategory(searchTerm, callback) {
  const query = {
    category: searchTerm,
    https: true
  };
  $.getJSON(PUBAPISEARCH_URL, query, callback).fail(errorMessage => {
    alert('There was a problem with your public API search by category.');
  })
}

function getDataFromApiByTitle(searchTerm, callback) {
  const query = {
    title: searchTerm,
    https: true
  };
  $.getJSON(PUBAPISEARCH_URL, query, callback).fail(errorMessage => {
    alert('There was a problem with your public API search by title.');
  })
}

//a function to create the result <li>
function createLI(result) {
  const resultLI = (`
  <li class="result-li pub-api-result-li"><a class="appender" href="${result.Link}" target="_blank">${result.API}</a><span class="li-divider"> |</span></li>`);
  return resultLI;
}

// displays the results of the public API search
function displayResults(data) {
  $('main').prop('hidden', false);
  $('.pagination').prop('hidden', true);
  // conditional to check if function received valid data from the search
  if (data.entries !== null) {
  let firstIndex = 0; // first of 5 array items
  let secondIndex = 5; // last of 5 array items
  let pageCount = 1;  // current page of 5 array items
  const APIResults = data.entries.map((item, index) => createLI(item));
  let totalPages = Math.ceil(APIResults.length / 5);
  let resultTotal = APIResults.length;
  $('.no-results-message-container').prop('hidden', true);
  $('.result-text, .public-api-search-results').prop('hidden', false);
  $('.result-text').html(`${resultTotal} Public API(s):`);
  $('.public-api-search-results').html(APIResults.slice(firstIndex, secondIndex));
    if (APIResults.length > 5) {
      firstIndex = 0;
      secondIndex = 5;
      pageCount = 1;
      $('.next-token, .pagination').prop('hidden', false);
      $('.pagination').html(`Page ${pageCount} of ${totalPages}`);
      $('.message-appender').prop('hidden', true);
      listenForPageTokenClicks(APIResults, totalPages, firstIndex, secondIndex, pageCount);
    }
    else if (totalPages == 1) {
      $('.no-results-message-container').prop('hidden', true);
      $('.next-token, .prev-token, .pagination').prop('hidden', true);
    } 
  } // end of condition to check if data is a valid object
  else {
    $('.no-results-message').css('display', 'block');
    $('.no-results-message-container').prop('hidden', false);
    $('.no-results-message-container').html(`<p class="no-results-message">No Public API Results. If Searching by Category, Try 'Food', 'Shopping', etc. For Full List of Categories, Go <a href="https://api.publicapis.org/categories" target="_blank">Here</a></p>`);
    $('.result-text, .public-api-search-results, .next-token, .pagination').prop('hidden', true);
  }
}

// listens for page token clicks to cycle back and forth through public api results
function listenForPageTokenClicks(searchResults, pageTotal, index1, index2, currentPage) {
  // cycle forward on next-token click
  $('.next-token').click(function(event) {
    index1 = addFirstIndex(index1);
    index2 = addSecondIndex(index2);
    currentPage = addPageCount(currentPage);
    $('.public-api-search-results').html(searchResults.slice(index1, index2));
    $('.pagination').html(`Page ${currentPage} of ${pageTotal}`);
    if (currentPage !== pageTotal || currentPage == 1) { $('.next-token').prop('hidden', false);}
    if (currentPage == pageTotal) { $('.next-token').prop('hidden', true); $('.prev-token').prop('hidden', false);}
    else if (currentPage !== 1) { $('.prev-token').prop('hidden', false); }
    else if (currentPage == 1) { $('.prev-token').prop('hidden', true); }
  })
  // cycle backwards on prev-token click
  $('.prev-token').click(function(event) {
    index1 = subFirstIndex(index1); 
    index2 = subSecondIndex(index2);
    currentPage = subPageCount(currentPage);
    $('.public-api-search-results').html(searchResults.slice(index1, index2));
    $('.pagination').html(`Page ${currentPage} of ${pageTotal}`);
    if (currentPage !== pageTotal || currentPage == 1) { $('.next-token').prop('hidden', false); }
    if (currentPage == pageTotal) { $('.next-token').prop('hidden', true); }
    else if (currentPage !== 1) { $('.prev-token').prop('hidden', false); }
    else if (currentPage == 1) { $('.prev-token').prop('hidden', true); }
  })
}

// functions to increment pagination and result display variables
function addPageCount(pgCount) {
  return pgCount + 1;
}
function addFirstIndex(indexOne) {
  return indexOne + 5;
}
function addSecondIndex(indexTwo) {
  return indexTwo + 5;
}

// functions to decrement pagination and result display variables
function subPageCount(pgCount) {
  return pgCount - 1;
}
function subFirstIndex(indexOne) {
  return indexOne - 5;
}
function subSecondIndex(indexTwo) {
  return indexTwo - 5;
}

// code for github search–––––––––––––––––––––––––––––
const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

function getDataFromGithubApi(gitTerm, gitCallback) {
  const gitQuery = {
    q: `${gitTerm} api`,
    per_page: 50
  }
  $.getJSON(GITHUB_SEARCH_URL, gitQuery, gitCallback).fail(errorMessage => {
    alert('There was a problem with your GitHub search.');
  })
  if ($('#github-box').is(':checked') || $('#category-box').is(':checked')) {
  }
  else {
    getDataFromYoutubeApi(gitTerm, displayYoutubeResults);
  }
}

//a function to create the result <li> for git search
function createGitLI(gitResult) {
  const gitResultLI = (`
  <li class="result-li git-result-li"><a href="${gitResult.html_url}" target="_blank">${gitResult.name}</a> by <a href="${gitResult.owner.html_url}" target="_blank">${gitResult.owner.login}</a><span class="li-divider">   |</span></li>`);
  return gitResultLI;
}

// displays the results of the github API search
function displayGitResults(gitData) {
  $('main').prop('hidden', false);
  $('.git-pagination').prop('hidden', true);
  let firstGitIndex = 0; // first of 5 array items
  let secondGitIndex = 5; // last of 5 array items
  let gitPageCount = 1;  // current page of 5 array items
  const gitAPIResults = gitData.items.map((item, index) => createGitLI(item));
  let totalGitPages = Math.ceil(gitAPIResults.length / 5);
  let gitResultTotal = gitAPIResults.length;
  $('.git-result-text, .github-api-search-results').prop('hidden', false);
  $('.git-result-text').html(`${gitResultTotal} Repositories:`);
  $('.github-api-search-results').html(gitAPIResults.slice(firstGitIndex, secondGitIndex));
    if (gitAPIResults.length > 5) {
      firstGitIndex = 0;
      secondGitIndex = 5;
      gitPageCount = 1;
      $('.next-git-token, .git-pagination, .githubSearchLink').prop('hidden', false);
      $('.git-pagination').html(`Page ${gitPageCount} of ${totalGitPages}`);
      listenForGithubPageTokenClicks(gitAPIResults, totalGitPages, firstGitIndex, secondGitIndex, gitPageCount);
    }
    else if (totalGitPages == 1) {
      $('.next-git-token, .prev-git-token, .git-pagination').prop('hidden', true);
    } 
}

// creates a link to the search results on github
function createGithubSearchLink(searchTerm) {
return `https://github.com/search?q=${searchTerm}+api`;
}

// listens for page token clicks to cycle back and forth through github api results
function listenForGithubPageTokenClicks(searchResults, pageTotal, index1, index2, currentPage) {
  // cycle forward on next-token click
  $('.next-git-token').click(function(event) {
    index1 = addFirstIndex(index1);
    index2 = addSecondIndex(index2);
    currentPage = addPageCount(currentPage);
    $('.github-api-search-results').html(searchResults.slice(index1, index2));
    $('.git-pagination').html(`Page ${currentPage} of ${pageTotal}`);
    if (currentPage !== pageTotal || currentPage == 1) { $('.next-git-token').prop('hidden', false);}
    if (currentPage == pageTotal) { $('.next-git-token').prop('hidden', true); }
    else if (currentPage !== 1) { $('.prev-git-token').prop('hidden', false); }
    else if (currentPage == 1) { $('.prev-git-token').prop('hidden', true); }
  })
  // cycle backwards on prev-token click
  $('.prev-git-token').click(function(event) {
    index1 = subFirstIndex(index1); 
    index2 = subSecondIndex(index2);
    currentPage = subPageCount(currentPage);
    $('.github-api-search-results').html(searchResults.slice(index1, index2));
    $('.git-pagination').html(`Page ${currentPage} of ${pageTotal}`);
    if (currentPage !== pageTotal || currentPage == 1) { $('.next-git-token').prop('hidden', false); }
    if (currentPage == pageTotal) { $('.next-git-token').prop('hidden', true); }
    else if (currentPage !== 1) { $('.prev-git-token').prop('hidden', false); }
    else if (currentPage == 1) { $('.prev-git-token').prop('hidden', true); }
  })
}

// code for youtube search–––––––––––––––––––––––––––––
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=';

function getDataFromYoutubeApi(youtubeTerm, youtubeCallback) {
  const youtubeQuery = {
    q: `${youtubeTerm} api`,
    maxResults: 50,
    part: 'snippet',
    type: 'video',
    key: 'AIzaSyAiGRsOIEbFoHzFwI69mwce6ujYAnsNtig'
  }
  setTimeout(function() {
  $.getJSON(YOUTUBE_SEARCH_URL, youtubeQuery, youtubeCallback).fail(errorMessage => {
    alert('There was a problem with your YouTube search.');
  })
  }, 600);
}

//creates individual result <li> for each youtube search result
function createYoutubeLI(youtubeResult) {
  const youtubeResultLI = (`
  <li class="result-li youtube-result-li"><a class="youtube-link" href="${YOUTUBE_VIDEO_URL}${youtubeResult.id.videoId}" target="_blank"><div class="youtube-thumbnail-container"><img src="${youtubeResult.snippet.thumbnails.medium.url}" alt="videoImage" class="youtube-thumbnail"><div class="youtube-thumbnail-title">${youtubeResult.snippet.title}</div></div></a></li>`);
  return youtubeResultLI;
}

// displays the results of the youtube api search
function displayYoutubeResults(youtubeData) {
  $('main').prop('hidden', false);
  $('.youtube-pagination').prop('hidden', true);
  let firstYoutubeIndex = 0; // first of 5 array items
  let secondYoutubeIndex = 5; // last of 5 array items
  let youtubePageCount = 1;  // current page of 5 array items
  const youtubeAPIResults = youtubeData.items.map((item, index) => createYoutubeLI(item));
  let totalYoutubePages = Math.ceil(youtubeAPIResults.length / 5);
  let youtubeResultTotal = youtubeAPIResults.length;
  $('.youtube-result-text, .youtube-api-search-results').prop('hidden', false);
  $('.youtube-result-text').html(`${youtubeResultTotal} Videos:`);
  $('.youtube-api-search-results').html(youtubeAPIResults.slice(firstYoutubeIndex, secondYoutubeIndex));
    if (youtubeAPIResults.length > 5) {
      firstYoutubeIndex = 0;
      secondYoutubeIndex = 5;
      youtubePageCount = 1;
      $('.next-youtube-token, .youtube-pagination, .youtubeSearchLink').prop('hidden', false);
      $('.youtube-pagination').html(`Page ${youtubePageCount} of ${totalYoutubePages}`);
      listenForYoutubePageTokenClicks(youtubeAPIResults, totalYoutubePages, firstYoutubeIndex, secondYoutubeIndex, youtubePageCount);
    }
    else if (totalYoutubePages == 1) {
      $('.next-youtube-token, .prev-youtube-token, .youtube-pagination, .youtubeSearchLink').prop('hidden', true);
    } 
}

// creates a link to the search results on youtube
function createYoutubeSearchLink(searchTerm) { 
return `https://www.youtube.com/results?search_query=${searchTerm}+api`;
}

// listens for page token clicks to cycle back and forth through youtube api results
function listenForYoutubePageTokenClicks(searchResults, pageTotal, index1, index2, currentPage) {
  // cycle forward on next-token click
  $('.next-youtube-token').click(function(event) {
    index1 = addFirstIndex(index1);
    index2 = addSecondIndex(index2);
    currentPage = addPageCount(currentPage);
    $('.youtube-api-search-results').html(searchResults.slice(index1, index2));
    $('.youtube-pagination').html(`Page ${currentPage} of ${pageTotal}`);
    if (currentPage !== pageTotal || currentPage == 1) { $('.next-youtube-token').prop('hidden', false);}
    if (currentPage == pageTotal) { $('.next-youtube-token').prop('hidden', true); }
    else if (currentPage !== 1) { $('.prev-youtube-token').prop('hidden', false); }
    else if (currentPage == 1) { $('.prev-youtube-token').prop('hidden', true); }
  })
  // cycle backward on prev-token click
  $('.prev-youtube-token').click(function(event) {
    index1 = subFirstIndex(index1);
    index2 = subSecondIndex(index2);
    currentPage = subPageCount(currentPage);
    $('.youtube-api-search-results').html(searchResults.slice(index1, index2));
    $('.youtube-pagination').html(`Page ${currentPage} of ${pageTotal}`);
    if (currentPage !== pageTotal || currentPage == 1) { $('.next-youtube-token').prop('hidden', false); }
    if (currentPage == pageTotal) { $('.next-youtube-token').prop('hidden', true); }
    else if (currentPage !== 1) { $('.prev-youtube-token').prop('hidden', false); }
    else if (currentPage == 1) { $('.prev-youtube-token').prop('hidden', true); }
  })
}


$('.pub-api-div, .git-div, .youtube-div').css('display', 'none');

//_____________________________________________________
// watches for the search form to be submitted and sends the search/query value from the user's input to the various getDataFromApi functions
function watchSubmit() {
  // allows only 1 box to be checked at a time
  $('input[type="checkbox"]').on('change', function() {
    $('input[type="checkbox"]').not(this).prop('checked',  false);
  });
  $('.js-search-form').submit(e => {
    e.preventDefault();
    $('.no-results-message').css('display', 'none');
    $('.prev-token').prop('hidden', true);
    $('.prev-git-token').prop('hidden', true);
    const searchTarget = $('#search-input');
    const searchWord = searchTarget.val();
    let githubLink = createGithubSearchLink(searchWord);
    let youtubeLink = createYoutubeSearchLink(searchWord);
    // reset input val
    searchTarget.val('');
    if ($('#category-box').is(':checked')) {
      // $('.git-div').css('grid-row', '0');
      triggerSearchByCategory(searchWord);
    }
    else if ($('#github-box').is(':checked')) {
      // $('.git-div').css('grid-row', '1 / 5');
      triggerSearchByGithub(searchWord, githubLink);
    }
    else if ($('#youtube-box').is(':checked')) {
      // $('.git-div').css('grid-row', '0');
      triggerSearchByYoutube(searchWord, youtubeLink);
    }
    else if ($('#you-git-box').is(':checked')) {
      // $('.git-div').css('grid-row', '1 / 5');
      triggerSearchByGithubAndYoutube(searchWord, githubLink, youtubeLink);
    }
    else {
      triggerSearchByAllAPIs(searchWord, githubLink, youtubeLink);
    }
  });
}

// various functions to filter which API(s) to search
function triggerSearchByCategory(inputTerm) {
  $('.git-div, .youtube-div').css('display', 'none');
  $('.pub-api-div').css('display', 'block');
  getDataFromApiByCategory(inputTerm, displayResults);
}

function triggerSearchByGithub(inputTerm, linkToGithub) {
  $('.pub-api-div, .youtube-div').css('display', 'none');
  $('.git-div').css('display', 'block');
  getDataFromGithubApi(inputTerm, displayGitResults);
  setTimeout(function() {
    $('.githubSearchLink').prop('hidden', false);
    $('.githubSearchLink').html(`<a href="${linkToGithub}" target="_blank">Continue on Github</a>`);
  }, 1450);
}

function triggerSearchByYoutube(inputTerm, linkToYoutube) {
  $('.pub-api-div, .git-div').css('display', 'none');
    $('.youtube-div').css('display', 'block');
    getDataFromYoutubeApi(inputTerm, displayYoutubeResults);
    $('.youtubeSearchLink').html(`<a href="${linkToYoutube}" target="_blank">Continue on YouTube</a>`);
}

function triggerSearchByGithubAndYoutube(inputTerm, linkToGithub, linkToYoutube) {
  $('.pub-api-div').css('display', 'none');
  $('.youtube-div, .git-div').css('display', 'block');
  getDataFromGithubApi(inputTerm, displayGitResults);
  setTimeout(function() {
    $('.githubSearchLink').prop('hidden', false);
    $('.githubSearchLink').html(`<a href="${linkToGithub}" target="_blank">Continue on Github</a>`);
    $('.youtubeSearchLink').prop('hidden', false);
    $('.youtubeSearchLink').html(`<a href="${linkToYoutube}" target="_blank">Continue on YouTube</a>`); }, 1450);
}

function triggerSearchByAllAPIs(inputTerm, linkToGithub, linkToYoutube) {
  $('.pub-api-div, .git-div, .youtube-div').css('display', 'block');
    getDataFromApiByTitle(inputTerm, displayResults);
    getDataFromGithubApi(inputTerm, displayGitResults);
    setTimeout(function() {
      $('.githubSearchLink').prop('hidden', false);
      $('.githubSearchLink').html(`<a href="${linkToGithub}" target="_blank">Continue on Github</a>`);
      $('.youtubeSearchLink').prop('hidden', false);
      $('.youtubeSearchLink').html(`<a href="${linkToYoutube}" target="_blank">Continue on YouTube</a>`);
    }, 1450);
}

watchSubmit();
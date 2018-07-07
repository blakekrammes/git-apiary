const resultElement = $('.js-search-results');

const PUBAPISEARCH_URL = 'https://api.publicapis.org/entries';

// function that contains the query object and the jQuery get-request method to obtain the APIs requested data
function getDataFromApiByCategory(searchTerm, callback) {
  const query = {
    category: searchTerm,
    https: true
  };
  $.getJSON(PUBAPISEARCH_URL, query, callback);
}

function getDataFromApiByTitle(searchTerm, callback) {
  const query = {
    title: searchTerm,
    https: true
  };
  $.getJSON(PUBAPISEARCH_URL, query, callback);
}

//a function to create the result <li>
function createLI(result) {
  const resultLI = (`
  <li class="resultLI"><a href="${result.Link}">${result.API}</a></li>`);
  return resultLI;
}

// displays the results of the API query as HTML
function displayResults(data) {
  $('main').prop('hidden', false);
  // conditional to check if function received valid data from the search
  if (data.entries !== null) {
  let firstIndex = 0; // first of 5 array items
  let secondIndex = 5; // last of 5 array items
  let pageCount = 1;  // current page of 5 array items
  const APIResults = data.entries.map((item, index) => createLI(item));
  let totalPages = Math.ceil(APIResults.length / 5);
  let resultTotal = APIResults.length;
  $('.no-results-message').css('display', 'none');
  $('.result-text, .public-api-search-results').css('display', 'block');
  $('.result-text').html(`${resultTotal} Public API(s):`);
  $('.public-api-search-results').html(APIResults.slice(firstIndex, secondIndex));
    if (APIResults.length > 5) {
      $('.pagination').css('display', 'block');
      $('.pagination').html(`Page ${pageCount} of ${totalPages}`);
      $('.next-token').prop('hidden', false);
      // event-listener for the next button
      $('.next-token').click(function(event) {
      firstIndex = addFirstIndex(firstIndex);
      secondIndex = addSecondIndex(secondIndex);
      pageCount = addPageCount(pageCount);
      $('.public-api-search-results').html(APIResults.slice(firstIndex, secondIndex));
      $('.pagination').html(`Page ${pageCount} of ${totalPages}`);
      if (pageCount !== totalPages || pageCount == 1) { $('.next-token').prop('hidden', false);}
      if (pageCount == totalPages) { $('.next-token').prop('hidden', true); $('.prev-token').prop('hidden', false);}
      else if (pageCount !== 1) { $('.prev-token').prop('hidden', false); }
      else if (pageCount == 1) { $('.prev-token').prop('hidden', true); }
      })
      // event-listener for the prev button
      $('.prev-token').click(function(event) {
      firstIndex = subFirstIndex(firstIndex); 
      secondIndex = subSecondIndex(secondIndex);
      pageCount = subPageCount(pageCount);
      $('.public-api-search-results').html(APIResults.slice(firstIndex, secondIndex));
      $('.pagination').html(`Page ${pageCount} of ${totalPages}`);
      if (pageCount !== totalPages || pageCount == 1) { $('.next-token').prop('hidden', false); }
      if (pageCount == totalPages) { $('.next-token').prop('hidden', true); }
      else if (pageCount !== 1) { $('.prev-token').prop('hidden', false); }
      else if (pageCount == 1) { $('.prev-token').prop('hidden', true); }
      })
    }
    else if (totalPages == 1) {
      $('.next-token').prop('hidden', true);
      $('.prev-token').prop('hidden', true);
      $('.pagination').css('display', 'none');
    } 
  } // end of condition to check if data is a valid object
  else {
    $('.no-results-message').css('display', 'block');
    $('.message-appender').html(`<p class="no-results-message">No Results. If Searching by Category, Try 'Food', 'Shopping', etc.</p>`);
    $('.result-text, .public-api-search-results, .pagination').css('display', 'none');
    $('.next-token').prop('hidden', 'true');
  }
}

// functions to increment pagination and result display variables
function addPageCount(pgCount) {
  return pgCount + 1;
}
function addFirstIndex(fI) {
  return fI + 5;
}
function addSecondIndex(sI) {
  return sI + 5;
}

// functions to decrement pagination and result display variables
function subPageCount(pgCount) {
  return pgCount - 1;
}
function subFirstIndex(fI) {
  return fI - 5;
}
function subSecondIndex(sI) {
  return sI - 5;
}

// code for github search–––––––––––––––––––––––––––––
const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

function getDataFromGithubApi(gitTerm, gitCallback) {
  const gitQuery = {
    q: `${gitTerm} api`,
    per_page: 50
  }
  $.getJSON(GITHUB_SEARCH_URL, gitQuery, gitCallback);
}

//a function to create the result <li> for git search
function createGitLI(gitResult) {
  const gitResultLI = (`
  <li class="gitResultLI"><a href="${gitResult.html_url}">${gitResult.name}</a> by <a href="${gitResult.owner.html_url}">${gitResult.owner.login}</a></li>`);
  return gitResultLI;
}

function displayGitResults(gitData) {
  let firstGitIndex = 0; // first of 5 array items
  let secondGitIndex = 5; // last of 5 array items
  let gitPageCount = 1;  // current page of 5 array items
  const gitAPIResults = gitData.items.map((item, index) => createGitLI(item));
  let totalGitPages = Math.ceil(gitAPIResults.length / 5);
  let gitResultTotal = gitAPIResults.length;
  $('.git-result-text, .github-api-search-results').css('display', 'block');
  $('.git-result-text').html(`${gitResultTotal} Repositories:`);
  $('.github-api-search-results').html(gitAPIResults.slice(firstGitIndex, secondGitIndex));
    if (gitAPIResults.length > 5) {
      $('.git-pagination').css('display', 'block');
      $('.git-pagination').html(`Page ${gitPageCount} of ${totalGitPages}`);
      $('.next-git-token').prop('hidden', false);
      // event-listener for the next button
      $('.next-git-token').click(function(event) {
      firstGitIndex = addFirstIndex(firstGitIndex);
      secondGitIndex = addSecondIndex(secondGitIndex);
      gitPageCount = addPageCount(gitPageCount);
      $('.github-api-search-results').html(gitAPIResults.slice(firstGitIndex, secondGitIndex));
      $('.git-pagination').html(`Page ${gitPageCount} of ${totalGitPages}`);
      if (gitPageCount !== totalGitPages || gitPageCount == 1) { $('.next-git-token').prop('hidden', false);}
      if (gitPageCount == totalGitPages) { $('.next-git-token').prop('hidden', true);
      $('.githubSearchLink').html(`<a href="${githubSearchLink}">More</a>`) }
      else if (gitPageCount !== 1) { $('.prev-git-token').prop('hidden', false); }
      else if (gitPageCount == 1) { $('.prev-git-token').prop('hidden', true); }
      })
      // event-listener for the prev button
      $('.prev-git-token').click(function(event) {
      firstGitIndex = subFirstIndex(firstGitIndex); 
      secondGitIndex = subSecondIndex(secondGitIndex);
      gitPageCount = subPageCount(gitPageCount);
      $('.github-api-search-results').html(gitAPIResults.slice(firstGitIndex, secondGitIndex));
      $('.git-pagination').html(`Page ${gitPageCount} of ${totalGitPages}`);
      if (gitPageCount !== totalGitPages || gitPageCount == 1) { $('.next-git-token').prop('hidden', false); }
      if (gitPageCount == totalGitPages) { $('.next-git-token').prop('hidden', true); }
      else if (gitPageCount !== 1) { $('.prev-git-token').prop('hidden', false); }
      else if (gitPageCount == 1) { $('.prev-git-token').prop('hidden', true); }
      })
    }
    else if (totalGitPages == 1) {
      $('.next-git-token').prop('hidden', true);
      $('.prev-git-token').prop('hidden', true);
      $('.git-pagination').css('display', 'none');
    } 
}

// creates a link to the search results on github
function createGithubSearchLink(ST) {
return `https://github.com/search?q=${ST}+api`;
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
  $.getJSON(YOUTUBE_SEARCH_URL, youtubeQuery, youtubeCallback);
}

//a function to create the result <li> for youtube search
function createYoutubeLI(youtubeResult) {
  const youtubeResultLI = (`
  <li class="youtubeResultLI"><a href="${YOUTUBE_VIDEO_URL}${youtubeResult.id.videoId}"><img src="${youtubeResult.snippet.thumbnails.medium.url}" alt="videoImage"><span class="youtube-title">${youtubeResult.snippet.title}</span></a></li>`);
  return youtubeResultLI;
}

function displayYoutubeResults(youtubeData) {
  let firstYoutubeIndex = 0; // first of 5 array items
  let secondYoutubeIndex = 5; // last of 5 array items
  let youtubePageCount = 1;  // current page of 5 array items
  const youtubeAPIResults = youtubeData.items.map((item, index) => createYoutubeLI(item));
  let totalYoutubePages = Math.ceil(youtubeAPIResults.length / 5);
  let youtubeResultTotal = youtubeAPIResults.length;
  // let youtubeSearchLink = createYoutubeSearchLink();
  $('.youtube-result-text, .youtube-api-search-results').css('display', 'block');
  $('.youtube-result-text').html(`${youtubeResultTotal} Videos:`);
  $('.youtube-api-search-results').html(youtubeAPIResults.slice(firstYoutubeIndex, secondYoutubeIndex));
    if (youtubeAPIResults.length > 5) {
      $('.youtube-pagination').css('display', 'block');
      $('.youtube-pagination').html(`Page ${youtubePageCount} of ${totalYoutubePages}`);
      $('.next-youtube-token').prop('hidden', false);
      // event-listener for the next button
      $('.next-youtube-token').click(function(event) {
      firstYoutubeIndex = addFirstIndex(firstYoutubeIndex);
      secondYoutubeIndex = addSecondIndex(secondYoutubeIndex);
      youtubePageCount = addPageCount(youtubePageCount);
      $('.youtube-api-search-results').html(youtubeAPIResults.slice(firstYoutubeIndex, secondYoutubeIndex));
      $('.youtube-pagination').html(`Page ${youtubePageCount} of ${totalYoutubePages}`);
      if (youtubePageCount !== totalYoutubePages || youtubePageCount == 1) { $('.next-youtube-token').prop('hidden', false);}
      if (youtubePageCount == totalYoutubePages) { $('.next-youtube-token').prop('hidden', true);
      $('.youtubeSearchLink').html(`<a href="${youtubeSearchLink}">More</a>`); }
      else if (youtubePageCount !== 1) { $('.prev-youtube-token').prop('hidden', false); }
      else if (youtubePageCount == 1) { $('.prev-youtube-token').prop('hidden', true); }
      })
      // event-listener for the prev button
      $('.prev-youtube-token').click(function(event) {
      firstYoutubeIndex = subFirstIndex(firstYoutubeIndex);
      secondYoutubeIndex = subSecondIndex(secondYoutubeIndex);
      youtubePageCount = subPageCount(youtubePageCount);
      $('.youtube-api-search-results').html(youtubeAPIResults.slice(firstYoutubeIndex, secondYoutubeIndex));
      $('.youtube-pagination').html(`Page ${youtubePageCount} of ${totalYoutubePages}`);
      if (youtubePageCount !== totalYoutubePages || youtubePageCount == 1) { $('.next-youtube-token').prop('hidden', false); }
      if (youtubePageCount == totalYoutubePages) { $('.next-youtube-token').prop('hidden', true); }
      else if (youtubePageCount !== 1) { $('.prev-youtube-token').prop('hidden', false); }
      else if (youtubePageCount == 1) { $('.prev-youtube-token').prop('hidden', true); }
      })
    }
    else if (totalYoutubePages == 1) {
      $('.next-youtube-token').prop('hidden', true);
      $('.prev-youtube-token').prop('hidden', true);
      $('.youtube-pagination').css('display', 'none');
    } 
}

// creates a link to the search results on youtube
function createYoutubeSearchLink(ST) { 
return `https://www.youtube.com/results?search_query=${ST}+api`;
}

//_____________________________________________________
// watches for the search form to be submitted and sends the search/query value from the user's input to the getDataFromApi function
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
    const queryTarget = $('#js-query');
    const searchWord = queryTarget.val();
    let githubLink = createGithubSearchLink(searchWord);
    let youtubeLink = createYoutubeSearchLink(searchWord);
    // reset input val
    queryTarget.val('');
    if ($('#category-box').is(':checked')) {
      $('.git-div, .youtube-div').css('display', 'none');
      $('.pub-api-div').css('display', 'block');
      getDataFromApiByCategory(searchWord, displayResults);
    }
    else if ($('#github-box').is(':checked')) {
      $('.pub-api-div, .youtube-div').css('display', 'none');
      $('.git-div').css('display', 'block');
      getDataFromGithubApi(searchWord, displayGitResults);
      $('.githubSearchLink').html(`<a href="${githubLink}">Continue on Github</a>`);
    }
    else if ($('#youtube-box').is(':checked')) {
      $('.pub-api-div, .git-div').css('display', 'none');
      $('.youtube-div').css('display', 'block');
      getDataFromYoutubeApi(searchWord, displayYoutubeResults)
      $('.youtubeSearchLink').html(`<a href="${youtubeLink}">Continue on YouTube</a>`);
    }
    else if ($('#you-git-box').is(':checked')) {
      $('.pub-api-div').css('display', 'none');
      $('.youtube-div, .git-div').css('display', 'block');
      getDataFromGithubApi(searchWord, displayGitResults);
      getDataFromYoutubeApi(searchWord, displayYoutubeResults);
      $('.githubSearchLink').html(`<a href="${githubLink}">Continue on Github</a>`);
      $('.youtubeSearchLink').html(`<a href="${youtubeLink}">Continue on YouTube</a>`);
    }
    else {
      $('.pub-api-div, .git-div, .youtube-div').css('display', 'block');
      getDataFromApiByTitle(searchWord, displayResults);
      getDataFromGithubApi(searchWord, displayGitResults);
      getDataFromYoutubeApi(searchWord, displayYoutubeResults);
      $('.githubSearchLink').html(`<a href="${githubLink}">Continue on Github</a>`);
      $('.youtubeSearchLink').html(`<a href="${youtubeLink}">Continue on YouTube</a>`);
    }
  });
}

watchSubmit();


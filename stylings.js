// code to conditionally style html elements––––––––––

// changing search input/button colors based on focus
$('#search-input').focus(function() {
    $('#search-button').css({'color': 'rgb(114, 131, 156)',
'transition': 'linear .2s'});
    $('#search-input').css({'background': 'white',
      'transition': 'linear .2s', 'color': 'black'});
});

$('#search-input').focusout(function() {
  $('#search-button').css({'color': 'white', 'transition': 'linear .2s'});
  $('#search-input').css({'background': 'rgba(103, 105, 109, .6)', 'transition': 'linear .2s', 'color': 'white'});
});


// changing search input/button colors based on hover
$('#search-button, #search-input').mouseenter(function(){
  if ($('#search-input').is(':focus')) {
    $('#search-input').css({'background': 'white', 'transition': 'linear .2s'});
  }
  else {
    $('#search-input').css({'background': 'rgba(124, 126, 129, 0.6)', 'transition': 'linear .2s'});
  }
});
$('#search-button, #search-input').mouseleave(function(){
  if ($('#search-input').is(':focus')) {
  $('#search-input').css({'background': 'white', 'transition': 'linear .2s', 'outline': '0'});
  }
  else {
    $('#search-input').css({'background': 'rgba(103, 105, 109, .6)', 'transition': 'linear .2s'});
  }
});

//control hover/click effects of checkboxes
$('label input').focus(function() {
  if ($(this).siblings('.hex').find('.inner2').hasClass('whiten')) {
  }
  else {
    $(this).siblings('.hex').find('.inner2').addClass('hovering');
    }
});

$('label input').focusout(function() {
  $(this).siblings('.hex').find('.inner2').removeClass('hovering');
});

$('label').mouseenter(function() {
  if ($(this).find('.inner2').hasClass('whiten')) {
  }
  else {
    $(this).find('.inner2').addClass('hovering');
  }
});

$('label').mouseleave(function() {
    if ($(this).find('.inner2').hasClass('whiten')) {
    }
    else {
      $(this).find('.inner2').removeClass('hovering');
    }
});

$('label').click(function() {
  if ($(this).find('input').is(':checked')) {
    $(this).find('.inner2').removeClass('hovering');
    $(this).find('.inner2').addClass('whiten');
    $('label').not(this).find('.inner2').removeClass('whiten');
  }
  else {
    $(this).find('.inner2').removeClass('whiten');
    $(this).find('.inner2').addClass('hovering');
  }
});
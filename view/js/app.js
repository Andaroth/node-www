$("document").ready(function() {
  var hashtag = window.location.hash.substr(1);
  console.log("Page = "+hashtag);
  $(".openmenu").click(function(e){
    e.preventDefault();
    $("#menu").toggleClass("mobilehidden");
  })
  $("#toplink,.chaplink,.btn").click(function(e){
    e.preventDefault();
    $(".box").addClass("hidden");
    var thisHref = $(this).attr("href");
    console.log(thisHref);
    window.location.hash = $(this).attr("href");
    $(thisHref).removeClass("hidden");
    $(document).scrollTop(0);
  });
  
  if ((hashtag != "home") && (hashtag !="")) {
    $("#home").addClass("hidden");
  }
});
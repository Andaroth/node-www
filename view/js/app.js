$("document").ready(function() {
  $("#toplink,.chaplink,.btn").click(function(e){
    e.preventDefault();
    $(".box").addClass("hidden");
    var thisHref = $(this).attr("href");
    window.location.hash = $(this).attr("href");
    $(thisHref).removeClass("hidden");
    $(document).scrollTop(0);
  });
});
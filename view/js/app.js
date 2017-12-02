$("document").ready(function() {
  $("#toplink,.chaplink,.btn").click(function(){
    $(".box").addClass("hidden");
    var thisHref = $(this).attr("href");
    $(thisHref).removeClass("hidden");
  });
});
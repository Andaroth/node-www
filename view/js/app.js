$("document").ready(function() {
  $("#toplink,.chaplink").click(function(){
    $(".box").addClass("hidden");
    var thisHref = $(this).attr("href");
    $(thisHref).removeClass("hidden");
  });
});
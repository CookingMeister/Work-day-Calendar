// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let time = JSON.parse(localStorage.getItem("timeLord")) || [];
let hour;
let text;
$(window).on("DOMContentLoaded", () => {
  console.log("DOM loaded");
  function updateDateTime() {
    let today = dayjs();
    $("#currentDay").text(today.format("dddd | MMM. D, YYYY | h:mm A"));
  }
  setInterval(updateDateTime, 1000);

  // $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // $(".saveBtn").on("click", function (event) {
  //   event.preventDefault();
  //   hour = this.parentNode.id;
  //   console.log(hour);
  //   // text = $("textarea").val();
  //   text = $(".saveBtn").prev().val();
  //   console.log(text);
  // });

  $(".saveBtn").each(function () {
    if ($(this).prev().val()) {
      text = $(this).prev().val();
      $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        hour = this.parentNode.id;
        console.log(hour);
        text = [];
        $(".saveBtn").each(function () {
          text.push($(this).prev().val());
        });
        console.log(text);
        addTime(hour, text);
      });

      return false;
    }
  });
  function addTime(hour, text) {
    time.push({ hour, text });
    // Update local storage
    localStorage.setItem("timeLord", JSON.stringify(time));
    
  }
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.<script>
});

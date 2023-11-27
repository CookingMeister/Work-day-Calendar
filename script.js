$(window).on("DOMContentLoaded", () => {
  console.log("DOM loaded");
  function updateDateTime() {
    let today = dayjs();
    $("#currentDay").text(today.format("dddd | MMM. D, YYYY | h:mm A"));
  }
  setInterval(updateDateTime, 1000);
  let eData = JSON.parse(localStorage.getItem("calendarData")) || {};
  let hour;
  let eventText;
  let retrievedData;
  let eventForHour;

  $(".saveBtn").each(function () {
    if ($(this).prev().val()) {
      eventText = $(this).prev().val();
      $(".saveBtn").on("click", function (event) {
        // event.stopPropagation();
        hour = this.parentNode.id;
        console.log(hour);
        eventText = $(this).prev().val();
        console.log(eventText);
        eData = JSON.parse(localStorage.getItem("calendarData"));
        eData[hour] = eventText;
        localStorage.setItem("calendarData", JSON.stringify(eData));
        retrievedData = JSON.parse(localStorage.getItem("calendarData"));
        eventForHour = retrievedData[hour];
        console.log("Event for " + hour + ": " + eventForHour);
       
      });
      return false;
    }
  });
  retrievedData = JSON.parse(localStorage.getItem("calendarData"));
  eventForHour = retrievedData[hour];
  $(".saveBtn").prev().val(eventForHour);
});

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
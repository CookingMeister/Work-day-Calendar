$(window).on("DOMContentLoaded", () => {
  function updateDateTime() {
    let today = dayjs();
    $("#currentDay").text(today.format("dddd | MMM. D, YYYY | h:mm A"));
  }
  setInterval(updateDateTime, 1000);

  $(".saveBtn").on("click", function () {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    let hour = this.parentNode.id;
    console.log(hour);
    let text = $(this).prev().val();
    console.log(text);

    events.push({
      [hour]: text,
    });

    localStorage.setItem("events", JSON.stringify(events));
  });

  // Load
  let events = JSON.parse(localStorage.getItem("events"));

  if (events) {
    events.forEach((event) => {
      let key = Object.keys(event)[0];
      $(`#${key} textarea`).val(event[key]);
    });
  }
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

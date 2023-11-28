// When the DOM is loaded condition wraps entire code
$(window).on("DOMContentLoaded", () => {
  // displays current date and time
  function updateDateTime() {
    let today = dayjs();
    $("#currentDay")
      .css({ color: "rgb(248, 115, 91)", "font-size": "125%" })
      .text(today.format("dddd | MMM. D, YYYY | h:mm A"));
  }
  setInterval(updateDateTime, 1000);

  // assigns a styling class of past, present or future to each time block
  const currentHour = dayjs().hour();

  $(".time-block").each(function () {
    const blockHour = parseInt($(this).attr("id").split("-")[1]);

    $(this).removeClass("past present future");

    if (blockHour < currentHour) {
      $(this).addClass("past"); // gray
    } else if (blockHour === currentHour) {
      $(this).addClass("present"); // green
    } else {
      $(this).addClass("future"); // blue
    }
  });
  // Save button event listener
  $(".saveBtn").on("click", function () {
    const $icon = $(this).find(".fas");  

    $icon.addClass("fa-pulse");
  
    setTimeout(function(){
  
      $icon.removeClass("fa-pulse");
  
    }, 2000);
   
    
    var newP = $("<p>");

    // add content
    let html = '<div class="text-center">';
    html += "<em>-- You\'ve saved your event details!</em>";
    html += "<i class='fas fa-check' style='color: #13c940;'></i>"
    html += "</div>";
    newP.html(html);
    // select existing div
    var currentDiv = $(".container-lg");

    // insert new div before existing div
    newP.insertBefore(currentDiv);
    setTimeout(function () {
      // remove div after 2 seconds
      newP.remove();
    }, 2000);

    let events = JSON.parse(localStorage.getItem("events")) || [];
    // set values
    let hour = this.parentNode.id;
    console.log(hour);
    let text = $(this).prev().val();
    console.log(text);
    // populate object array with 'hour' as the key and 'text' as the value
    events.push({
      [hour]: text,
    });
    // set
    localStorage.setItem("events", JSON.stringify(events));
  });
  // load
  let events = JSON.parse(localStorage.getItem("events"));
  // event details automatically populated into corresponding textareas
  if (events) {
    events.forEach((event) => {
      let key = Object.keys(event);
      $(`#${key} textarea`).val(event[key]);
    });
  }
});

// When the DOM is loaded condition wraps entire code
$(window).on("DOMContentLoaded", () => {
  // displays current date and time
  function updateDateTime() {
    let today = dayjs();
    $("#currentDay")
      .css("font-size", "115%")
      .text(today.format("dddd | MMM. D, YYYY | h:mm A"));
  }

  // Update date and time every second
  setInterval(updateDateTime, 1000);

  // Assign a styling class of past, present or future to each time block
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
    $(this).attr("disabled", true);

    const $icon = $(this).find(".fas");

    $icon.addClass("fa-pulse");

    setTimeout(function () {
      $(".saveBtn").attr("disabled", false);
      $icon.removeClass("fa-pulse");
    }, 2000);

    let newP = $("<p>");
    // Add content
    let html = '<div class="text-center">';
    html += "<em>-- You saved your event details!</em>";
    html += "<i class='fas fa-check' style='color: #13c940;'></i>";
    html += "</div>";
    newP.html(html);

    const currentDiv = $(".container-lg");
    newP.insertBefore(currentDiv);

    setTimeout(function () {
      // Remove div after 2 seconds
      newP.remove();
    }, 2000);

    let events = JSON.parse(localStorage.getItem("events")) || [];
    // Set values
    let hour = this.parentNode.id;
    let text = $(this).prev().val();
    // Populate object array with 'hour' as the key and 'text' as the value
    events.push({
      [hour]: text,
    });
    // Set
    localStorage.setItem("events", JSON.stringify(events));
  });

  // Load
  let events = JSON.parse(localStorage.getItem("events"));
  // Event details automatically populated into corresponding textareas
  if (events) {
    events.forEach((event) => {
      let key = Object.keys(event);
      $(`#${key} textarea`).val(event[key]);
    });
  }
});

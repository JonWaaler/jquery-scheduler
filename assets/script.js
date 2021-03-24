// Create a schedule from 9am - 5pm at load
/* Layout of what is created by jQuery at start
<div class="row time-block">
    <h6 class="hour">9AM</h6>
    <textarea class="description future">Pick up food</textarea>
    <button class="saveBtn">
        <i class="far fa-save fa-2x"></i>
    </button>
</div>
*/
$(document).ready(function () {
  //-- Set up all 9 of the time blocks --//
  for (let i = 9; i < 13; i++) {
    $(".container").append(
      "<div class='row time-block'><h6 class='hour'>" + i + "AM</h6></div>"
    );
  }
  for (let i = 1; i < 6; i++) {
    $(".container").append(
      "<div class='row time-block'><h6 class='hour'>" + i + "PM</h6></div>"
    );
  }
  $(".row").append(
    '<textarea class="description past" placeholder="Enter Task"></textarea>'
  );
  $(".row").append('<button class="saveBtn"></button>');
  $(".saveBtn").append('<i class="far fa-save fa-2x"></i>');
  //-- End of SetUP --//

  Set_TimeBlockColour();
});

// Every so often we want to check the time to see if we need to change
// The time-block colour scheme around
window.setInterval(Set_TimeBlockColour, 2000);

// Also check the time at start
function Set_CurrentHour(num) {
  return num;
}

//-- Change colour of the text areas based on time --//
function Set_TimeBlockColour() {
  // Get current hour of the day
  // 0:00 -> 24:00
  var currentHour = dayjs().get("hour");

  // Create a string combined of all time slots
  // 9:00 AM -> 5:00 PM
  var elementText = $("h6").text();

  // Turn string into array to find out which is current time slot
  arr = elementText.split("M");

  for (let i = 0; i < arr.length; i++) {
    // remove the left over letter
    //console.log("debug:" + i);
    // 9,10,11,12,1,2,3,4,5
    let element = arr[i].slice(0, -1);
    let scheduleTime = parseInt(element);

    // converts every time-block that's less than 6 to 24 hour time
    if (scheduleTime < 6) scheduleTime += 12;

    // Decides the time block colour
    if (scheduleTime == currentHour) {
      $("div")
        .eq(i + 1)
        .children("textarea")
        .removeClass("past present future");
      $("div")
        .eq(i + 1)
        .children("textarea")
        .addClass("present");
    } else if (scheduleTime >= currentHour) {
      $("div")
        .eq(i + 1)
        .children("textarea")
        .removeClass("past present future");
      $("div")
        .eq(i + 1)
        .children("textarea")
        .addClass("future");
    } else {
      $("div")
        .eq(i + 1)
        .children("textarea")
        .removeClass("past present future");
      $("div")
        .eq(i + 1)
        .children("textarea")
        .addClass("past");
    }
  }
}

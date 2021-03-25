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
  Set_Date();
  SaveTaskInfo();
  GetTaskInfo();
});

// Every so often we want to check the time to see if we need to change
// The time-block colour scheme around
window.setInterval(Set_TimeBlockColour, 60000);

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

    // Decides the time-block colour
    if (scheduleTime == currentHour) {
      $(".row").eq(i).children("textarea").removeClass("past present future");
      $(".row").eq(i).children("textarea").addClass("present");
    } else if (scheduleTime >= currentHour) {
      $(".row").eq(i).children("textarea").removeClass("past present future");
      $(".row").eq(i).children("textarea").addClass("future");
    } else {
      $(".row").eq(i).children("textarea").removeClass("past present future");
      $(".row").eq(i).children("textarea").addClass("past");
    }
  }
}

// taskValue is the info in the task that the user enters
// timeKey is the key to set/get the task information
// TODO: Save value to local Storage
function SaveTaskInfo() {
  // Save task
  $(".saveBtn").click(function () {
    // Organize key:value pairing
    var taskValue = $(this).siblings("textarea").val();
    var timeKey = $(this).siblings("h6").text();

    // Save to localStorage
    localStorage.setItem(timeKey, taskValue);
  });
}

// TODO: get any task info from storage and put it on screen
function GetTaskInfo() {
  // For every time-block check if there's a stored key:value pair
  for (let i = 0; i < 9; i++) {
    // Get every h6 and check if it matches
    var timeblockHour = $(".row").eq(i).children("h6").text();

    var taskValue = localStorage.getItem(timeblockHour);
    if (taskValue) {
      $(".row").eq(i).children("textarea").val(taskValue);
    }
  }
}

function Set_Date() {
  // Get the date and split information into an array
  var formattedDate = dayjs().format("dddd-MMMM-D");
  formattedDate = formattedDate.split("-");

  // The suffix we give depends of what the number ends in
  var daySuffix;
  daySuffix = ordinal_suffix_of(parseInt(formattedDate[2]));

  $("#currentDay").text(
    `${formattedDate[0]}, ${formattedDate[1]} ${formattedDate[2]}${daySuffix}`
  );
}

// Code from: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return "st";
  }
  if (j == 2 && k != 12) {
    return "nd";
  }
  if (j == 3 && k != 13) {
    return "rd";
  }
  return "th";
}

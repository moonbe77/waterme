"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNotificationDate = void 0;
function calculateNotificationDate(xDays, notificationTime) {
  console.log("calculateNotificationDate", {
    xDays: xDays,
    notificationTime: notificationTime,
  });
  if (!notificationTime) {
    notificationTime = new Date();
    notificationTime.setHours(9, 0, 0, 0);
  }
  // Step 1: Get the Current Date and Time
  var currentDate = new Date();
  // Step 2: Add "x" Days to the Current Date
  var futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + xDays);
  // Step 3: Set the Notification Time
  var _a = notificationTime.toLocaleTimeString().split(":"),
    hours = _a[0],
    minutes = _a[1];
  futureDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  console.log("calculateNotificationDate", { futureDate: futureDate });
  // Step 4: Convert Timezones (Optional)
  // If necessary, you can convert futureDate to a different timezone here.
  return futureDate;
}
exports.calculateNotificationDate = calculateNotificationDate;
calculateNotificationDate(15);

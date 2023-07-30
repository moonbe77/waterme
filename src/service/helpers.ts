export function calculateNotificationDate(xDays: number, notificationTime?: Date) {
  console.log('calculateNotificationDate', { xDays, notificationTime })

  if (!notificationTime) {
    notificationTime = new Date();
    notificationTime.setHours(9, 0, 0, 0);
  }
  // Step 1: Get the Current Date and Time
  const currentDate = new Date();

  // Step 2: Add "x" Days to the Current Date
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + xDays);

  // Step 3: Set the Notification Time
  const [hours, minutes] = notificationTime.toLocaleTimeString().split(':');
  futureDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  console.log('calculateNotificationDate', { futureDate })

  // Step 4: Convert Timezones (Optional)
  // If necessary, you can convert futureDate to a different timezone here.

  return futureDate;
}

export function calculateNotificationInterval(intervalDays: number, notificationTime: Date) {
  // Step 1: Get the Current Date and Time
  const currentDate = new Date();

  // Step 2: Add "intervalDays" Days to the Current Date
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + intervalDays);

  // Step 3: Set the Notification Time
  const hours = notificationTime.getHours()
  const minutes = notificationTime.getMinutes()
  futureDate.setHours(hours, minutes, 0, 0);

  // Step 4: Calculate the Time Difference in Seconds
  const timeDifferenceInSeconds = Math.floor((futureDate.getTime() - currentDate.getTime()) / 1000);

  return timeDifferenceInSeconds;
}
export function getCurrentDateTime() {
  const now = new Date();

  const adjustedMinutes = (now.getMinutes() + 1) % 60;

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(adjustedMinutes).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const rfc3339DateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return rfc3339DateTime;
}

export const canGenerateMeme = () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const data = localStorage.getItem("memeLimit");
  const record = data ? JSON.parse(data) : {};

  // Reset count if it's a new day
  if (record.date !== today) {
    localStorage.setItem(
      "memeLimit",
      JSON.stringify({ date: today, count: 0 })
    );
    return true;
  }

  return record.count < 2;
};

export const incrementMemeCount = () => {
  const today = new Date().toISOString().split("T")[0];
  const data = localStorage.getItem("memeLimit");
  const record = data ? JSON.parse(data) : { date: today, count: 0 };

  if (record.date !== today) {
    record.date = today;
    record.count = 1;
  } else {
    record.count += 1;
  }

  localStorage.setItem("memeLimit", JSON.stringify(record));
};

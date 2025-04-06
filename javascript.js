// const ESP_IP = "http://192.168.1.104"; // Only declare once!

const fillBar = document.getElementById("fillBar");
const fillValue = document.getElementById("fillValue");
const lidStatus = document.getElementById("lidStatus");
const toggleLidBtn = document.getElementById("toggleLidBtn");

let lidOpen = false;

const updateFillLevel = async () => {
  try {
    const res = await fetch(`${ESP_IP}/fill`);
    const data = await res.json(); // Expected: { fill: 72.5 }
    const fill = Math.round(data.fill);

    fillBar.style.width = `${fill}%`;
    fillValue.textContent = `${fill}%`;

    // Color based on fill
    if (fill < 50) {
      fillBar.style.background = "green";
    } else if (fill < 80) {
      fillBar.style.background = "orange";
    } else {
      fillBar.style.background = "red";
    }
  } catch (err) {
    console.error("Failed to fetch fill level", err);
    fillValue.textContent = "Error";
    fillBar.style.background = "gray";
  }
};

const toggleLid = async () => {
  try {
    const newState = lidOpen ? "close" : "open";
    await fetch(`${ESP_IP}/lid?state=${newState}`);
    lidOpen = !lidOpen;

    lidStatus.textContent = lidOpen ? "Open" : "Closed";
    toggleLidBtn.textContent = lidOpen ? "Close Lid" : "Open Lid";
  } catch (err) {
    console.error("Failed to toggle lid", err);
    lidStatus.textContent = "Error";
  }
};

// Initial UI update
updateFillLevel();
setInterval(updateFillLevel, 5000);

// Attach event
toggleLidBtn.addEventListener("click", toggleLid);

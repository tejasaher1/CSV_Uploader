const searchDataInput = document.getElementById("searchData");

searchDataInput.addEventListener("input", function () {
  const filteredData = dataFromServer.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(this.value.toLowerCase())
    )
  );

  const tbody = document.querySelector("#tableID tbody");
  tbody.innerHTML = "";
  filteredData.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
});




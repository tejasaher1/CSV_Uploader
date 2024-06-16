const searchDataInput = document.getElementById("searchData");

searchDataInput.addEventListener("input", function (event) {
  const query = event.target.value.toLowerCase();

  if (query === "") {
    window.location.reload();
    console.log("Okkeep");
    return;
  }

  const filteredData = dataFromServer.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(query)
    )
  );

  const tbody = document.querySelector("#tableID tbody");
  tbody.innerHTML = "";
  filteredData.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.innerHTML = highlightText(value.toString(), query);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
});

function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

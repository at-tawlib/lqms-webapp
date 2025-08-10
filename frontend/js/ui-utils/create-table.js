export function createTable(headers, data) {
  const table = document.createElement("table");
  table.className = "min-w-full table-auto border-collapse";

  const thead = document.createElement("thead");
  thead.className = "bg-blue-500 text-white sticky top-0";
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    if (header) {
      const th = document.createElement("th");
      th.className =
        "border border-gray-300 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider";
      th.textContent = header;
      headerRow.appendChild(th);
    }
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.className = "bg-white divide-y divide-gray-200";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className = index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-50";
    headers.forEach((header) => {
      if (header) {
        const td = document.createElement("td");
        td.className = "border border-gray-300 px-4 py-2 text-sm text-gray-800";

        // Handle HTML content for Status and Actions columns
        if (header === "Status" || header === "Actions") {
          td.innerHTML = item[header];
        } else {
          td.textContent = item[header];
        }
        row.appendChild(td);
      }
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}

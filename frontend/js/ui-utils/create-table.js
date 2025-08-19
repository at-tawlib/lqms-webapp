export function createTable(headers, data, options = {}) {
  const { columnWidths = {}, textLimit = null, responsive = true, containerClass = "" } = options;

  // Create table container for responsive scrolling
  const container = document.createElement("div");
  container.className = `overflow-x-auto ${containerClass}`;

  const table = document.createElement("table");
  table.className = responsive
    ? "min-w-full table-auto border-collapse w-full"
    : "table-auto border-collapse";

  const thead = document.createElement("thead");
  thead.className = "bg-blue-500 text-white sticky top-0";
  const headerRow = document.createElement("tr");

  headers.forEach((header, index) => {
    if (header) {
      const th = document.createElement("th");

      // Apply custom width if specified
      const width = columnWidths[header] || columnWidths[index];
      const widthClass = width ? `w-${width}` : "";

      th.className = `border border-gray-300 px-2 sm:px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${widthClass}`;
      th.textContent = header;

      // Set explicit width for better control
      if (width && width.includes("%")) {
        th.style.width = width;
      }

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

    headers.forEach((header, headerIndex) => {
      if (header) {
        const td = document.createElement("td");

        // Apply custom width if specified
        const width = columnWidths[header] || columnWidths[headerIndex];
        const widthClass = width ? `w-${width}` : "";

        td.className = `border border-gray-300 px-2 sm:px-4 py-2 text-sm text-gray-800 ${widthClass}`;

        // Set explicit width for better control
        if (width && width.includes("%")) {
          td.style.width = width;
        }

        let content = item[header];

        // Apply text limiting if specified
        if (textLimit && typeof content === "string" && content.length > textLimit) {
          content = content.substring(0, textLimit) + "...";
        }

        // Handle HTML content for Status and Actions columns
        if (header === "Status" || header === "Actions") {
          td.innerHTML = content;
        } else {
          td.textContent = content;

          // Add word-break for long text
          if (typeof content === "string" && content.length > 20) {
            td.className += " break-words";
          }
        }

        // Add title attribute for truncated text (tooltip on hover)
        if (textLimit && typeof item[header] === "string" && item[header].length > textLimit) {
          td.title = item[header];
        }

        row.appendChild(td);
      }
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  container.appendChild(table);
  return container;
}

// Usage examples:

// Basic usage (unchanged)
// createTable(headers, data)

// With column widths
// createTable(headers, data, {
//   columnWidths: {
//     'PROCESS': '15%',
//     'RISK': '10%',
//     'CAUSE': '20%',
//     'PREVENTIVE ACTION': '25%',
//     'RESPONSIBLE': '15%',
//     'REVIEW': '10%',
//     'ACTIONS': '15%'
//   }
// });

// With text limiting
// createTable(headers, data, {
//   textLimit: 50,
//   columnWidths: { 'PREVENTIVE ACTION': '25%', 'CAUSE': '20%' }
// });

// For mobile-optimized tables
// createTable(headers, data, {
//   columnWidths: {
//     'PROCESS': '20%',
//     'RISK': '15%',
//     'ACTIONS': '20%'
//   },
//   textLimit: 30,
//   containerClass: "shadow-sm rounded-lg"
// });

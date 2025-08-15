import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "POWER STABILITY RECORD-FKBTH-CL/FS/1501";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "Date",
  "Time of Service Interruption",
  "Service Affected Interruption",
  "Reason for Interruption",
  "Duration of Interruption",
  "Has Information of Interruption Been Communicated?",
  "Status",
  "Actions",
];

let mockData = [
  {
    id: 1,
    Date: "2025-08-01",
    "Time of Service Interruption": "08:15",
    "Service Affected Interruption": "Haematology Analyser",
    "Reason for Interruption": "Power outage",
    "Duration of Interruption": "45 mins",
    "Has Information of Interruption Been Communicated?": "Yes",
    Status: "Resolved",
  },
  {
    id: 2,
    Date: "2025-08-02",
    "Time of Service Interruption": "14:20",
    "Service Affected Interruption": "Blood Bank Freezer",
    "Reason for Interruption": "Voltage fluctuation",
    "Duration of Interruption": "30 mins",
    "Has Information of Interruption Been Communicated?": "Yes",
    Status: "Resolved",
  },
  {
    id: 3,
    Date: "2025-08-03",
    "Time of Service Interruption": "10:05",
    "Service Affected Interruption": "PCR Machine",
    "Reason for Interruption": "Generator failure",
    "Duration of Interruption": "1 hr 15 mins",
    "Has Information of Interruption Been Communicated?": "Yes",
    Status: "Pending",
  },
  {
    id: 4,
    Date: "2025-08-04",
    "Time of Service Interruption": "16:40",
    "Service Affected Interruption": "Cold Room",
    "Reason for Interruption": "Maintenance work",
    "Duration of Interruption": "2 hrs",
    "Has Information of Interruption Been Communicated?": "Yes",
    Status: "Resolved",
  },
  {
    id: 5,
    Date: "2025-08-05",
    "Time of Service Interruption": "07:50",
    "Service Affected Interruption": "Microscopy Unit",
    "Reason for Interruption": "Power outage",
    "Duration of Interruption": "50 mins",
    "Has Information of Interruption Been Communicated?": "No",
    Status: "Pending",
  },
  {
    id: 6,
    Date: "2025-08-06",
    "Time of Service Interruption": "09:25",
    "Service Affected Interruption": "Microbiology Incubator",
    "Reason for Interruption": "Breaker trip",
    "Duration of Interruption": "40 mins",
    "Has Information of Interruption Been Communicated?": "Yes",
    Status: "Resolved",
  },
  {
    id: 7,
    Date: "2025-08-07",
    "Time of Service Interruption": "15:15",
    "Service Affected Interruption": "Histology Tissue Processor",
    "Reason for Interruption": "Power outage",
    "Duration of Interruption": "35 mins",
    "Has Information of Interruption Been Communicated?": "No",
    Status: "Pending",
  },
  {
    id: 8,
    Date: "2025-08-08",
    "Time of Service Interruption": "11:10",
    "Service Affected Interruption": "Blood Bank Refrigerator",
    "Reason for Interruption": "Voltage fluctuation",
    "Duration of Interruption": "25 mins",
    "Has Information of Interruption Been Communicated?": "Yes",
    Status: "Resolved",
  },
  {
    id: 9,
    Date: "2025-08-09",
    "Time of Service Interruption": "13:30",
    "Service Affected Interruption": "Haematology Analyser",
    "Reason for Interruption": "Generator fuel shortage",
    "Duration of Interruption": "1 hr",
    "Has Information of Interruption Been Communicated?": "Yes",
    Status: "Resolved",
  },
  {
    id: 10,
    Date: "2025-08-10",
    "Time of Service Interruption": "17:00",
    "Service Affected Interruption": "PCR Machine",
    "Reason for Interruption": "Electrical fault",
    "Duration of Interruption": "3 hrs",
    "Has Information of Interruption Been Communicated?": "No",
    Status: "Pending",
  },
];

let currentEditId = null;

export const renderPowerTracker = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    document.getElementById("sectionTitle").textContent = sectionNameRaw;

    contentDiv.innerHTML = `
        <div class="bg-white">
          <!-- Action Buttons -->
          <div class="flex gap-2 mb-4">
            <button
              id="addEntryBtn"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              + Add Entry
            </button>
            <button
              id="exportBtn"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export CSV
            </button>
            <button
              id="exportExcelBtn"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export Excel
            </button>
            <button
              id="printBtn"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Print
            </button>
          </div>

          <div
            id="table-container"
            class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
          ></div>
        </div>

        <!-- Add/Edit Entry Modal -->
        <div
          id="entryModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 id="entryModalTitle" class="text-lg font-bold">Add New Entry</h3>
            </div>
            <form id="entryForm" class="p-4 mt-12 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  id="date"
                  type="date"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Time of Service Interruption</label
                >
                <input
                  type="text"
                  id="interruptionTime"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 08:15"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Service Affected Interruption</label
                >
                <input
                  type="text"
                  id="serviceAffected"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Reason for Interruption</label>
                <input
                  type="text"
                  id="reason"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Duration Of Interruption</label>
                <input
                  type="text"
                  id="duration"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 45 mins"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Has information of interruption been communicated?</label
                >
                <select
                  id="communicated"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div class="flex gap-2 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Entry
                </button>
                <button
                  type="button"
                  id="cancelEntryBtn"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
    `;

    renderTable();

    // Event listeners
    document.getElementById("addEntryBtn").addEventListener("click", openAddEntryModal);
    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
    document.getElementById("printBtn").addEventListener("click", quickPrintTable);
    document.getElementById("entryForm").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancelEntryBtn").addEventListener("click", closeEntryModal);
  }, 500);
};

const renderTable = () => {
  const tableContainer = document.getElementById("table-container");

  if (mockData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No power stability entries found.</p>
        <p class="text-sm mt-2">Add your first entry using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      ...entry,
      Date: entry.Date,
      "Time of Service Interruption": entry["Time of Service Interruption"],
      "Service Affected Interruption": entry["Service Affected Interruption"],
      "Reason for Interruption": entry["Reason for Interruption"],
      "Duration of Interruption": entry["Duration of Interruption"],
      "Has Information of Interruption Been Communicated?":
        entry["Has Information of Interruption Been Communicated?"],
      Status: entry.Status,
      Actions: getActionButtonsHTML(entry.id),
    }));

    tableContainer.innerHTML = "";
    const table = createTable(headers, tableData);
    tableContainer.appendChild(table);

    // Apply HTML formatting after table is created
    applyTableFormatting();

    // Add event listeners for action buttons
    attachActionListeners();
  }
};

function applyTableFormatting() {
  const table = document.querySelector("#table-container table");
  if (!table) return;

  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row, index) => {
    const entry = mockData[index];
    if (!entry) return;

    const cells = row.querySelectorAll("td");

    if (cells[5]) {
      cells[5].innerHTML = getCommunicatedBadgeHTML(
        entry["Has Information of Interruption Been Communicated?"]
      );
    }

    if (cells[6]) {
      cells[6].innerHTML = getStatusBadgeHTML(entry.Status);
    }
  });
}

const getCommunicatedBadgeHTML = (communicated) => {
  const communicatedClasses = {
    Yes: "bg-green-100 text-green-800",
    No: "bg-red-100 text-red-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    communicatedClasses[communicated] || "bg-gray-100 text-gray-800"
  }">${communicated}</span>`;
};

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    statusClasses[status] || "bg-gray-100 text-gray-800"
  }">${status}</span>`;
};

const getActionButtonsHTML = (id) => {
  return `
    <div class="flex gap-1">
      <button data-edit="${id}" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">Edit</button>
      <button data-delete="${id}" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors">Delete</button>
    </div>
  `;
};

function attachActionListeners() {
  // Edit buttons
  document.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-edit"));
      openEditEntryModal(id);
    });
  });

  // Delete buttons
  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete"));
      deleteEntry(id);
    });
  });
}

function openAddEntryModal() {
  currentEditId = null;
  document.getElementById("entryModalTitle").textContent = "Add New Entry";
  resetForm();
  document.getElementById("entryModal").classList.remove("hidden");
}

function openEditEntryModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("entryModalTitle").textContent = "Edit Entry";

  document.getElementById("date").value = entry.Date;
  document.getElementById("interruptionTime").value = entry["Time of Service Interruption"];
  document.getElementById("serviceAffected").value = entry["Service Affected Interruption"];
  document.getElementById("reason").value = entry["Reason for Interruption"];
  document.getElementById("duration").value = entry["Duration of Interruption"];
  document.getElementById("communicated").value =
    entry["Has Information of Interruption Been Communicated?"];
  document.getElementById("status").value = entry.Status;

  document.getElementById("entryModal").classList.remove("hidden");
}

function closeEntryModal() {
  document.getElementById("entryModal").classList.add("hidden");
  resetForm();
}

function resetForm() {
  document.getElementById("entryForm").reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    Date: document.getElementById("date").value,
    "Time of Service Interruption": document.getElementById("interruptionTime").value,
    "Service Affected Interruption": document.getElementById("serviceAffected").value,
    "Reason for Interruption": document.getElementById("reason").value,
    "Duration of Interruption": document.getElementById("duration").value,
    "Has Information of Interruption Been Communicated?":
      document.getElementById("communicated").value,
    Status: document.getElementById("status").value,
  };

  if (currentEditId) {
    // Edit existing entry
    const index = mockData.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...formData };
    }
  } else {
    // Add new entry
    const maxId = mockData.length > 0 ? Math.max(...mockData.map((item) => item.id)) : 0;
    const newEntry = {
      id: maxId + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeEntryModal();
  renderTable();
}

function deleteEntry(id) {
  if (confirm("Are you sure you want to delete this entry?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      renderTable();
    }
  }
}

function exportData() {
  const csvHeaders = [
    "Date",
    "Time of Service Interruption",
    "Service Affected Interruption",
    "Reason for Interruption",
    "Duration of Interruption",
    "Has Information of Interruption Been Communicated?",
    "Status",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry.Date}"`,
      `"${entry["Time of Service Interruption"]}"`,
      `"${entry["Service Affected Interruption"]}"`,
      `"${entry["Reason for Interruption"]}"`,
      `"${entry["Duration of Interruption"]}"`,
      `"${entry["Has Information of Interruption Been Communicated?"]}"`,
      `"${entry.Status}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "power_stability_FKBTH_CL_FS_1501.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportToExcel() {
  // Check if XLSX library is available
  if (typeof XLSX === "undefined") {
    alert("Excel export requires XLSX library. Please include it in your HTML.");
    return;
  }

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();

  // Prepare data for Excel (clean format without HTML)
  const excelData = mockData.map((entry) => ({
    Date: entry.Date,
    "Time of Service Interruption": entry["Time of Service Interruption"],
    "Service Affected Interruption": entry["Service Affected Interruption"],
    "Reason for Interruption": entry["Reason for Interruption"],
    "Duration of Interruption": entry["Duration of Interruption"],
    "Has Information of Interruption Been Communicated?":
      entry["Has Information of Interruption Been Communicated?"],
    Status: entry.Status,
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 15 }, // Date
    { wch: 25 }, // Time of Service Interruption
    { wch: 30 }, // Service Affected Interruption
    { wch: 25 }, // Reason for Interruption
    { wch: 20 }, // Duration of Interruption
    { wch: 50 }, // Has Information of Interruption Been Communicated?
    { wch: 12 }, // Status
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["POWER STABILITY RECORD-FKBTH-CL/FS/1501"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Power Stability");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Power_Stability_FKBTH_CL_FS_1501_${dateStr}.xlsx`;

  // Save file
  XLSX.writeFile(wb, filename);
}

function quickPrintTable() {
  // Get the current table element
  const tableContainer = document.getElementById("table-container");
  const table = tableContainer.querySelector("table");

  if (!table) {
    alert("No data to print");
    return;
  }

  // Clone table and remove action buttons column for printing
  const printTable = table.cloneNode(true);
  const actionCells = printTable.querySelectorAll("th:last-child, td:last-child");
  actionCells.forEach((cell) => cell.remove());

  // Create print content with current table
  const printContent = `
    <html>
    <head>
      <title>Power Stability Record</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 10px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .status-badge { padding: 2px 8px; border-radius: 12px; font-size: 10px; }
        }
        @page { size: A4 landscape; margin: 0.5in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>POWER STABILITY RECORD-FKBTH-CL/FS/1501</h3>
      </div>
      ${printTable.outerHTML}
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
}

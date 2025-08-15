import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "2025 QUALITY MEETING SCHEDULE-FKBTH-CL/OP/0608";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "Month",
  "Day",
  "Venue",
  "Start Time",
  "End Time",
  "Person Responsible",
  "Status",
  "Actions",
];

let mockData = [
  {
    id: 1,
    Month: "January",
    Day: "Not Applicable",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 2,
    Month: "February",
    Day: "5",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 3,
    Month: "March",
    Day: "5",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 4,
    Month: "April",
    Day: "9",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 5,
    Month: "May",
    Day: "8",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 6,
    Month: "June",
    Day: "4",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 7,
    Month: "July",
    Day: "9",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 8,
    Month: "August",
    Day: "6",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Completed",
  },
  {
    id: 9,
    Month: "September",
    Day: "10",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Completed",
  },
  {
    id: 10,
    Month: "October",
    Day: "8",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Cancelled",
  },
  {
    id: 11,
    Month: "November",
    Day: "5",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
  {
    id: 12,
    Month: "December",
    Day: "10",
    Venue: "Conference room",
    "Start Time": "11:00am",
    "End Time": "2:00pm",
    "Person Responsible": "Quality Manager",
    Status: "Scheduled",
  },
];

let currentEditId = null;

export const renderMeeting = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    document.getElementById("sectionTitle").textContent = sectionNameRaw;

    contentDiv.innerHTML = `
        <div>
          <!-- Action Buttons -->
          <div class="flex gap-2 mb-4">
            <button
              id="addMeetingBtn"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              + Add Meeting
            </button>
            <button
              id="exportBtn"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export CSV
            </button>
            <button
              id="exportExcelBtn"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export Excel
            </button>
            <button
              id="printBtn"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Print Schedule
            </button>
          </div>

          <div
            id="table-container"
            class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
          ></div>
        </div>

        <!-- Add/Edit Meeting Modal -->
        <div
          id="meetingModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 id="meetingModalTitle" class="text-lg font-bold">Add New Meeting</h3>
            </div>
            <form id="meetingForm" class="p-4  mt-12 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  id="month"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Day</label>
                <input
                  type="text"
                  id="day"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 5 or Not Applicable"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <input
                  type="text"
                  id="venue"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Conference room"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="text"
                  id="startTime"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 11:00am"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="text"
                  id="endTime"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2:00pm"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Person Responsible</label>
                <input
                  type="text"
                  id="personResponsible"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Quality Manager"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Postponed">Postponed</option>
                </select>
              </div>
              <div class="flex gap-2 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Meeting
                </button>
                <button
                  type="button"
                  id="cancelMeetingBtn"
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
    document.getElementById("addMeetingBtn").addEventListener("click", openAddMeetingModal);
    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
    document.getElementById("printBtn").addEventListener("click", quickPrintTable);
    document.getElementById("meetingForm").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancelMeetingBtn").addEventListener("click", closeMeetingModal);
  }, 500);
};

const renderTable = () => {
  const tableContainer = document.getElementById("table-container");

  if (mockData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No quality meetings scheduled.</p>
        <p class="text-sm mt-2">Add your first meeting using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      ...entry,
      Month: entry.Month,
      Day: entry.Day,
      Venue: entry.Venue,
      "Start Time": entry["Start Time"],
      "End Time": entry["End Time"],
      "Person Responsible": entry["Person Responsible"],
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

    // Find the Status column (index 6) and apply formatting
    if (cells[6]) {
      cells[6].innerHTML = getStatusBadgeHTML(entry.Status);
    }
  });
}

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Postponed: "bg-yellow-100 text-yellow-800",
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
      openEditMeetingModal(id);
    });
  });

  // Delete buttons
  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete"));
      deleteMeeting(id);
    });
  });
}

function openAddMeetingModal() {
  currentEditId = null;
  document.getElementById("meetingModalTitle").textContent = "Add New Meeting";
  resetForm();
  document.getElementById("meetingModal").classList.remove("hidden");
}

function openEditMeetingModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("meetingModalTitle").textContent = "Edit Meeting";

  document.getElementById("month").value = entry.Month;
  document.getElementById("day").value = entry.Day;
  document.getElementById("venue").value = entry.Venue;
  document.getElementById("startTime").value = entry["Start Time"];
  document.getElementById("endTime").value = entry["End Time"];
  document.getElementById("personResponsible").value = entry["Person Responsible"];
  document.getElementById("status").value = entry.Status;

  document.getElementById("meetingModal").classList.remove("hidden");
}

function closeMeetingModal() {
  document.getElementById("meetingModal").classList.add("hidden");
  resetForm();
}

function resetForm() {
  document.getElementById("meetingForm").reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    Month: document.getElementById("month").value,
    Day: document.getElementById("day").value,
    Venue: document.getElementById("venue").value,
    "Start Time": document.getElementById("startTime").value,
    "End Time": document.getElementById("endTime").value,
    "Person Responsible": document.getElementById("personResponsible").value,
    Status: document.getElementById("status").value,
  };

  if (currentEditId) {
    // Edit existing meeting
    const index = mockData.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...formData };
    }
  } else {
    // Add new meeting
    const maxId = mockData.length > 0 ? Math.max(...mockData.map((item) => item.id)) : 0;
    const newEntry = {
      id: maxId + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeMeetingModal();
  renderTable();
}

function deleteMeeting(id) {
  if (confirm("Are you sure you want to delete this meeting?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      renderTable();
    }
  }
}

function exportData() {
  const csvHeaders = [
    "Month",
    "Day",
    "Venue",
    "Start Time",
    "End Time",
    "Person Responsible",
    "Status",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry.Month}"`,
      `"${entry.Day}"`,
      `"${entry.Venue}"`,
      `"${entry["Start Time"]}"`,
      `"${entry["End Time"]}"`,
      `"${entry["Person Responsible"]}"`,
      `"${entry.Status}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "quality_meeting_schedule_FKBTH_CL_OP_0608.csv");
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
    Month: entry.Month,
    Day: entry.Day,
    Venue: entry.Venue,
    "Start Time": entry["Start Time"],
    "End Time": entry["End Time"],
    "Person Responsible": entry["Person Responsible"],
    Status: entry.Status,
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 15 }, // Month
    { wch: 10 }, // Day
    { wch: 20 }, // Venue
    { wch: 12 }, // Start Time
    { wch: 12 }, // End Time
    { wch: 20 }, // Person Responsible
    { wch: 12 }, // Status
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["2025 QUALITY MEETING SCHEDULE-FKBTH-CL/OP/0608"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Quality Meeting Schedule");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Quality_Meeting_Schedule_FKBTH_CL_OP_0608_${dateStr}.xlsx`;

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
      <title>2025 Quality Meeting Schedule</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 11px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .status-badge { padding: 2px 8px; border-radius: 12px; font-size: 10px; }
        }
        @page { size: A4; margin: 0.5in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>2025 QUALITY MEETING SCHEDULE-FKBTH-CL/OP/0608</h3>
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

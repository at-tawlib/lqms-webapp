import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "Quality Workplan";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "Date Received",
  "Date of Correspondence",
  "Sender",
  "Subject of Correspondence",
  "Response Required (Yes/No)",
  "Action Required",
  "Action Taken By",
  "Status",
  "Notes",
  "Actions",
];

let mockData = [
  {
    id: 1,
    dateReceived: "2025-01-15",
    dateOfCorrespondence: "2025-01-14",
    sender: "Ministry of Health",
    subjectOfCorrespondence: "New laboratory quality standards implementation",
    responseRequired: "Yes",
    actionRequired: "Review and implement new standards",
    actionTakenBy: "Quality Manager",
    status: "In Progress",
    notes: "Implementation timeline: 3 months",
  },
  {
    id: 2,
    dateReceived: "2025-01-18",
    dateOfCorrespondence: "2025-01-17",
    sender: "WHO Regional Office",
    subjectOfCorrespondence: "Laboratory accreditation guidelines update",
    responseRequired: "Yes",
    actionRequired: "Update SOPs according to new guidelines",
    actionTakenBy: "Dr. Solomon Kwashie",
    status: "Pending",
    notes: "Awaiting detailed guidelines document",
  },
  {
    id: 3,
    dateReceived: "2025-01-22",
    dateOfCorrespondence: "2025-01-20",
    sender: "Ghana Health Service",
    subjectOfCorrespondence: "Quality control proficiency testing enrollment",
    responseRequired: "Yes",
    actionRequired: "Enroll in quarterly PT program",
    actionTakenBy: "Lab Manager",
    status: "Completed",
    notes: "Enrolled for Q1 2025 testing",
  },
  {
    id: 4,
    dateReceived: "2025-01-25",
    dateOfCorrespondence: "2025-01-24",
    sender: "Equipment Supplier",
    subjectOfCorrespondence: "Maintenance schedule for laboratory equipment",
    responseRequired: "No",
    actionRequired: "Update maintenance calendar",
    actionTakenBy: "Maintenance Team",
    status: "Completed",
    notes: "Schedule updated in system",
  },
  {
    id: 5,
    dateReceived: "2025-02-01",
    dateOfCorrespondence: "2025-01-30",
    sender: "External Auditor",
    subjectOfCorrespondence: "Pre-audit documentation requirements",
    responseRequired: "Yes",
    actionRequired: "Prepare audit documentation package",
    actionTakenBy: "Quality Team",
    status: "In Progress",
    notes: "Audit scheduled for March 2025",
  },
  {
    id: 6,
    dateReceived: "2025-02-05",
    dateOfCorrespondence: "2025-02-03",
    sender: "Training Institute",
    subjectOfCorrespondence: "Staff training program availability",
    responseRequired: "Yes",
    actionRequired: "Select staff for training enrollment",
    actionTakenBy: "HR Manager",
    status: "Pending",
    notes: "Budget approval required",
  },
  {
    id: 7,
    dateReceived: "2025-02-08",
    dateOfCorrespondence: "2025-02-07",
    sender: "Regulatory Authority",
    subjectOfCorrespondence: "Laboratory license renewal procedures",
    responseRequired: "Yes",
    actionRequired: "Submit renewal application and documents",
    actionTakenBy: "Administrative Officer",
    status: "In Progress",
    notes: "Renewal due by April 2025",
  },
  {
    id: 8,
    dateReceived: "2025-02-12",
    dateOfCorrespondence: "2025-02-10",
    sender: "Quality Control Lab",
    subjectOfCorrespondence: "Inter-laboratory comparison results",
    responseRequired: "No",
    actionRequired: "Review results and document findings",
    actionTakenBy: "Quality Analyst",
    status: "Completed",
    notes: "Results within acceptable range",
  },
];

let currentEditId = null;

export const renderCorrespondenceManager = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    contentDiv.innerHTML = `
            <div class="bg-green-600 text-white p-4 rounded-t-lg mb-0">
              <h2 class="text-2xl font-bold">CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
              <p class="text-green-100 text-sm">QUALITY WORKPLAN 2025 FKBTH-CL/QP/0903</p>
            </div>

            <div class="bg-white p-6 rounded-b-lg shadow-lg">
            <!-- Action Buttons -->
            <div class="flex gap-2 mb-4">
                <button
                id="addEntryBtn"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                + Add Workplan Entry
                </button>
                <button
                id="exportBtn"
                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                Export CSV
                </button>
                <button id="exportExcelBtn" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Export Excel
                </button>
                <button id="printBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
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
            >
            <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="bg-blue-600 text-white p-4 rounded-t-lg">
                <h3 id="entryModalTitle" class="text-lg font-bold">Add New Workplan Entry</h3>
                </div>
                <form id="entryForm" class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
                        <input
                        id="dateReceived"
                        type="date"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date of Correspondence</label>
                        <input
                        type="date"
                        id="dateOfCorrespondence"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Sender</label>
                        <input
                        type="text"
                        id="sender"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Action Taken By</label>
                        <input
                        type="text"
                        id="actionTakenBy"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Subject of Correspondence</label>
                    <textarea
                    id="subjectOfCorrespondence"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    required
                    ></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Action Required</label>
                    <textarea
                    id="actionRequired"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                    ></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Response Required</label>
                        <select
                        id="responseRequired"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        >
                        <option value="">Select Response Requirement</option>
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
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                    id="notes"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    placeholder="Additional notes or comments..."
                    ></textarea>
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
        <p class="text-lg">No workplan entries found.</p>
        <p class="text-sm mt-2">Add your first workplan entry using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      ...entry,
      "Date Received": formatDate(entry.dateReceived),
      "Date of Correspondence": formatDate(entry.dateOfCorrespondence),
      Sender: entry.sender,
      "Subject of Correspondence": entry.subjectOfCorrespondence,
      "Response Required (Yes/No)": entry.responseRequired,
      "Action Required": entry.actionRequired,
      "Action Taken By": entry.actionTakenBy,
      Status: entry.status,
      Notes: entry.notes || "—",
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
}

function applyTableFormatting() {
  const table = document.querySelector("#table-container table");
  if (!table) return;

  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row, index) => {
    const entry = mockData[index];
    if (!entry) return;

    const cells = row.querySelectorAll("td");

    // Response Required badge
    if (cells[4]) {
      cells[4].innerHTML = getResponseBadgeHTML(entry.responseRequired);
    }

    // Status badge
    if (cells[7]) {
      cells[7].innerHTML = getStatusBadgeHTML(entry.status);
    }
  });
}

const getResponseBadgeHTML = (response) => {
  const responseClasses = {
    Yes: "bg-blue-100 text-blue-800",
    No: "bg-gray-100 text-gray-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    responseClasses[response] || "bg-gray-100 text-gray-800"
  }">${response}</span>`;
};

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    "On Hold": "bg-red-100 text-red-800",
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
  document.getElementById("entryModalTitle").textContent = "Add New Workplan Entry";
  resetForm();
  document.getElementById("entryModal").classList.remove("hidden");
}

function openEditEntryModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("entryModalTitle").textContent = "Edit Workplan Entry";

  document.getElementById("dateReceived").value = entry.dateReceived;
  document.getElementById("dateOfCorrespondence").value = entry.dateOfCorrespondence;
  document.getElementById("sender").value = entry.sender;
  document.getElementById("subjectOfCorrespondence").value = entry.subjectOfCorrespondence;
  document.getElementById("responseRequired").value = entry.responseRequired;
  document.getElementById("actionRequired").value = entry.actionRequired;
  document.getElementById("actionTakenBy").value = entry.actionTakenBy;
  document.getElementById("status").value = entry.status;
  document.getElementById("notes").value = entry.notes || "";

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
    dateReceived: document.getElementById("dateReceived").value,
    dateOfCorrespondence: document.getElementById("dateOfCorrespondence").value,
    sender: document.getElementById("sender").value,
    subjectOfCorrespondence: document.getElementById("subjectOfCorrespondence").value,
    responseRequired: document.getElementById("responseRequired").value,
    actionRequired: document.getElementById("actionRequired").value,
    actionTakenBy: document.getElementById("actionTakenBy").value,
    status: document.getElementById("status").value,
    notes: document.getElementById("notes").value,
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
  if (confirm("Are you sure you want to delete this workplan entry?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      renderTable();
    }
  }
}

function exportData() {
  const csvHeaders = [
    "Date Received",
    "Date of Correspondence",
    "Sender",
    "Subject of Correspondence",
    "Response Required (Yes/No)",
    "Action Required",
    "Action Taken By",
    "Status",
    "Notes",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${formatDate(entry.dateReceived)}"`,
      `"${formatDate(entry.dateOfCorrespondence)}"`,
      `"${entry.sender}"`,
      `"${entry.subjectOfCorrespondence}"`,
      `"${entry.responseRequired}"`,
      `"${entry.actionRequired}"`,
      `"${entry.actionTakenBy}"`,
      `"${entry.status}"`,
      `"${entry.notes || ""}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "quality_workplan_FKBTH_CL_QP_0903.csv");
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
    "Date Received": formatDate(entry.dateReceived),
    "Date of Correspondence": formatDate(entry.dateOfCorrespondence),
    Sender: entry.sender,
    "Subject of Correspondence": entry.subjectOfCorrespondence,
    "Response Required (Yes/No)": entry.responseRequired,
    "Action Required": entry.actionRequired,
    "Action Taken By": entry.actionTakenBy,
    Status: entry.status,
    Notes: entry.notes || "",
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 15 }, // Date Received
    { wch: 20 }, // Date of Correspondence
    { wch: 20 }, // Sender
    { wch: 40 }, // Subject of Correspondence
    { wch: 20 }, // Response Required
    { wch: 35 }, // Action Required
    { wch: 20 }, // Action Taken By
    { wch: 15 }, // Status
    { wch: 30 }, // Notes
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["QUALITY WORKPLAN 2025 FKBTH-CL/QP/0903"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Quality Workplan");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Quality_Workplan_FKBTH_CL_QP_0903_${dateStr}.xlsx`;

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
      <title>Quality Workplan 2025</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 4px; text-align: left; font-size: 7px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .status-badge { padding: 1px 4px; border-radius: 6px; font-size: 6px; }
        }
        @page { size: A4 landscape; margin: 0.3in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>QUALITY WORKPLAN 2025 FKBTH-CL/QP/0903</h3>
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

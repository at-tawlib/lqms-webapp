import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "Weekly Activity Tracker";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = ["Work Area", "Activity", "Responsible", "Timeliness", "Status", "Actions"];
const mockData = [
  {
    id: 1,
    "Work Area": "Haematology",
    Activity: "Calibrate automated blood analyser",
    Responsible: "John Mensah",
    Timeliness: "08:00 - 09:00",
    Status: "Completed",
  },
  {
    id: 2,
    "Work Area": "Microbiology",
    Activity: "Sterilise culture media",
    Responsible: "Ama Boateng",
    Timeliness: "09:00 - 10:30",
    Status: "Pending",
  },
  {
    id: 3,
    "Work Area": "Serology",
    Activity: "Run HIV screening tests",
    Responsible: "Kofi Owusu",
    Timeliness: "10:30 - 12:00",
    Status: "In Progress",
  },
  {
    id: 4,
    "Work Area": "Blood Bank",
    Activity: "Crossmatch donor blood",
    Responsible: "Akosua Asante",
    Timeliness: "08:30 - 11:00",
    Status: "Completed",
  },
  {
    id: 5,
    "Work Area": "Histology",
    Activity: "Prepare biopsy slides",
    Responsible: "Kwame Addo",
    Timeliness: "09:00 - 13:00",
    Status: "Pending",
  },
  {
    id: 6,
    "Work Area": "Molecular Biology",
    Activity: "Extract DNA from samples",
    Responsible: "Sarah Nartey",
    Timeliness: "11:00 - 14:00",
    Status: "In Progress",
  },
  {
    id: 7,
    "Work Area": "Haematology",
    Activity: "Review daily QC reports",
    Responsible: "Yaw Amponsah",
    Timeliness: "14:00 - 14:30",
    Status: "Completed",
  },
  {
    id: 8,
    "Work Area": "Microbiology",
    Activity: "Inoculate samples onto agar plates",
    Responsible: "Esi Mensah",
    Timeliness: "10:00 - 12:00",
    Status: "Pending",
  },
  {
    id: 9,
    "Work Area": "Blood Bank",
    Activity: "Check blood inventory levels",
    Responsible: "Mabel Adjei",
    Timeliness: "12:00 - 13:00",
    Status: "Completed",
  },
  {
    id: 10,
    "Work Area": "Serology",
    Activity: "Prepare reagents for syphilis testing",
    Responsible: "Nana Kyeremeh",
    Timeliness: "13:00 - 14:00",
    Status: "In Progress",
  },
];
let currentEditId = null;

export const renderWeekLyActivityTracker = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    const pageTitle = sectionNameRaw;

    contentDiv.innerHTML = `
            <div class="bg-green-600 text-white p-4 rounded-t-lg mb-0">
              <h2 class="text-2xl font-bold">CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
              <p class="text-green-100 text-sm">ITINERARY FOR THE WEEK-FKBTH-CL/OP/0603</p>
            </div>

            <div class="bg-white p-6 rounded-b-lg shadow-lg">
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
            <div class="bg-white rounded-lg shadow-2xl max-w-md w-full">
                <div class="bg-blue-600 text-white p-4 rounded-t-lg">
                <h3 id="entryModalTitle" class="text-lg font-bold">Add New Entry</h3>
                </div>
                <form id="entryForm" class="p-4 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Work Area</label>
                    <input
                    type="text"
                    id="workArea"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                    <textarea
                    id="activity"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                    ></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Responsible</label>
                    <input
                    type="text"
                    id="responsible"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Timeliness</label>
                    <input
                    type="text"
                    id="timeliness"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 8:00 AM - 5:00 PM"
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
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
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
        <p class="text-lg">No itinerary entries found.</p>
        <p class="text-sm mt-2">Add your first entry using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      ...entry,
      Activity: entry.Activity.replace(/\n/g, " | "), // Replace newlines for table display
      Status: getStatusBadgeHTML(entry.Status),
      Actions: getActionButtonsHTML(entry.id),
    }));

    tableContainer.innerHTML = "";
    tableContainer.appendChild(createTable(headers, tableData));

    // Add event listeners for action buttons
    attachActionListeners();
  }
};

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
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
  document.getElementById("entryModalTitle").textContent = "Edit Entry";

  document.getElementById("workArea").value = entry["Work Area"];
  document.getElementById("activity").value = entry.Activity;
  document.getElementById("responsible").value = entry.Responsible;
  document.getElementById("timeliness").value = entry.Timeliness;
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
    "Work Area": document.getElementById("workArea").value,
    Activity: document.getElementById("activity").value,
    Responsible: document.getElementById("responsible").value,
    Timeliness: document.getElementById("timeliness").value,
    Status: document.getElementById("status").value,
  };

  if (currentEditId) {
    // Edit existing entry
    const index = mockData.findIndex((item) => item.id === currentEditId);
    mockData[index] = { ...mockData[index], ...formData };
  } else {
    // Add new entry
    const newEntry = {
      id: Math.max(...mockData.map((item) => item.id)) + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeEntryModal();
  renderTable();
}

function deleteEntry(id) {
  if (confirm("Are you sure you want to delete this entry?")) {
    mockData = mockData.filter((item) => item.id !== id);
    renderTable();
  }
}

function exportData() {
  const csvContent = "data:text/csv;charset=utf-8,";
  const headers = ["Work Area", "Activity", "Responsible", "Timeliness", "Status"];
  const csvData = [headers.join(",")];

  mockData.forEach((entry) => {
    const row = [
      `"${entry["Work Area"]}"`,
      `"${entry.Activity.replace(/"/g, '""')}"`,
      `"${entry.Responsible}"`,
      `"${entry.Timeliness}"`,
      `"${entry.Status}"`,
    ];
    csvData.push(row.join(","));
  });

  const encodedUri = encodeURI(csvContent + csvData.join("\n"));
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "itinerary_FKBTH_CL_OP_0603.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportToExcel() {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();

  // Prepare data for Excel (clean format without HTML)
  const excelData = mockData.map((entry) => ({
    "Work Area": entry["Work Area"],
    Activity: entry.Activity,
    Responsible: entry.Responsible,
    Timeliness: entry.Timeliness,
    Status: entry.Status,
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 15 }, // Work Area
    { wch: 40 }, // Activity
    { wch: 20 }, // Responsible
    { wch: 20 }, // Timeliness
    { wch: 12 }, // Status
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["ITINERARY FOR THE WEEK-FKBTH-CL/OP/0603"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Style the title (if using xlsx-style or similar)
  // Note: Basic XLSX doesn't support styling, but this shows the structure

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Itinerary");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Itinerary_FKBTH_CL_OP_0603_${dateStr}.xlsx`;

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

  // Create print content with current table
  const printContent = `
    <html>
    <head>
      <title>Laboratory Itinerary</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 10px; }
          th { background-color: #f0f0f0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>ITINERARY FOR THE WEEK-FKBTH-CL/OP/0603</h3>
      </div>
      ${table.outerHTML}
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
}

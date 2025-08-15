import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "2025 QUALITY MANAGEMENT TRAINING PLAN-FKBTH-CL/QP/0607";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "#",
  "Topic",
  "Responsible",
  "Timeliness",
  "Target",
  "Completion Deadline",
  "Status",
  "Mode of Evaluation",
  "Actions",
];

let mockData = [
  {
    id: 1,
    number: 1,
    topic: "Introduction to Quality management System",
    responsible: "Online",
    timeliness: "February-25",
    target: "All staff",
    completionDeadline: "2025-02-28",
    status: "In progress",
    modeOfEvaluation: "online certificate",
  },
  {
    id: 2,
    number: 2,
    topic: "ISO 15189:2022",
    responsible: "Dr. Solomon Kwashie",
    timeliness: "March-25",
    target: "Supervisors/Quality officers",
    completionDeadline: "2025-03-31",
    status: "Pending",
    modeOfEvaluation: "Written assessment",
  },
  {
    id: 3,
    number: 3,
    topic: "Risk assessment",
    responsible: "Dr. Solomon Kwashie",
    timeliness: "July-25",
    target: "All staff",
    completionDeadline: "2025-07-31",
    status: "Pending",
    modeOfEvaluation: "Practical test",
  },
  {
    id: 4,
    number: 4,
    topic: "Resolution of non-conformities",
    responsible: "Eunice Wiredu",
    timeliness: "March-25",
    target: "All staff",
    completionDeadline: "2025-03-31",
    status: "Pending",
    modeOfEvaluation: "Case studies",
  },
  {
    id: 5,
    number: 5,
    topic: "Writing of SOPs and review of the SOP",
    responsible: "Dr. Eran Fei",
    timeliness: "May-25",
    target: "All staff",
    completionDeadline: "2025-05-31",
    status: "Pending",
    modeOfEvaluation: "Document review",
  },
  {
    id: 6,
    number: 6,
    topic: "Needle stick injury Management",
    responsible: "DCMLS Michael Asare Baffour",
    timeliness: "May-25",
    target: "All staff",
    completionDeadline: "2025-05-31",
    status: "Pending",
    modeOfEvaluation: "Simulation exercise",
  },
  {
    id: 7,
    number: 7,
    topic: "Internal Audit",
    responsible: "Nii Abosoey Kotey",
    timeliness: "June-25",
    target: "Internal Auditors",
    completionDeadline: "2025-06-30",
    status: "Pending",
    modeOfEvaluation: "Audit practice",
  },
  {
    id: 8,
    number: 8,
    topic: "Importance of QMS in Client Service procedures",
    responsible: "Dr. Esther Okine",
    timeliness: "June-25",
    target: "Client Service Staff",
    completionDeadline: "2025-06-30",
    status: "Pending",
    modeOfEvaluation: "Role play",
  },
  {
    id: 9,
    number: 9,
    topic: "Safety in the laboratory",
    responsible: "DCMLS Michael Asare Baffour",
    timeliness: "July-25",
    target: "All staff",
    completionDeadline: "2025-07-31",
    status: "Pending",
    modeOfEvaluation: "Safety demonstration",
  },
  {
    id: 10,
    number: 10,
    topic: "The 12 essential quality systems",
    responsible: "Dr. Eran Fei/Eunice Wiredu",
    timeliness: "July-25",
    target: "All staff",
    completionDeadline: "2025-07-31",
    status: "Pending",
    modeOfEvaluation: "Group discussion",
  },
];

let currentEditId = null;

export const renderTrainingPlan = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    document.getElementById("sectionTitle").textContent = sectionNameRaw;

    contentDiv.innerHTML = `
        <div>
          <!-- Action Buttons -->
          <div class="flex gap-2 mb-4">
            <button
              id="addEntryBtn"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              + Add Training Topic
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
              <h3 id="entryModalTitle" class="text-lg font-bold">Add New Training Topic</h3>
            </div>
            <form id="entryForm" class="p-4 mt-12 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <input
                  id="topic"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
                  placeholder="e.g., February-25"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <input
                  type="text"
                  id="target"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., All staff"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Completion Deadline</label>
                <input
                  type="date"
                  id="completionDeadline"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  <option value="In progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mode of Evaluation</label>
                <input
                  type="text"
                  id="modeOfEvaluation"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., online certificate"
                  required
                />
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
        <p class="text-lg">No training topics found.</p>
        <p class="text-sm mt-2">Add your first training topic using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      ...entry,
      "#": entry.number,
      Topic: entry.topic,
      Responsible: entry.responsible,
      Timeliness: entry.timeliness,
      Target: entry.target,
      "Completion Deadline": formatDate(entry.completionDeadline),
      Status: entry.status,
      "Mode of Evaluation": entry.modeOfEvaluation,
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

    if (cells[6]) {
      cells[6].innerHTML = getStatusBadgeHTML(entry.status);
    }
  });
}

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    "In progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
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
  document.getElementById("entryModalTitle").textContent = "Add New Training Topic";
  resetForm();
  document.getElementById("entryModal").classList.remove("hidden");
}

function openEditEntryModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("entryModalTitle").textContent = "Edit Training Topic";

  document.getElementById("topic").value = entry.topic;
  document.getElementById("responsible").value = entry.responsible;
  document.getElementById("timeliness").value = entry.timeliness;
  document.getElementById("target").value = entry.target;
  document.getElementById("completionDeadline").value = entry.completionDeadline;
  document.getElementById("status").value = entry.status;
  document.getElementById("modeOfEvaluation").value = entry.modeOfEvaluation;

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
    topic: document.getElementById("topic").value,
    responsible: document.getElementById("responsible").value,
    timeliness: document.getElementById("timeliness").value,
    target: document.getElementById("target").value,
    completionDeadline: document.getElementById("completionDeadline").value,
    status: document.getElementById("status").value,
    modeOfEvaluation: document.getElementById("modeOfEvaluation").value,
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
    const maxNumber = mockData.length > 0 ? Math.max(...mockData.map((item) => item.number)) : 0;
    const newEntry = {
      id: maxId + 1,
      number: maxNumber + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeEntryModal();
  renderTable();
}

function deleteEntry(id) {
  if (confirm("Are you sure you want to delete this training topic?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      // Renumber remaining entries
      mockData.forEach((item, idx) => {
        item.number = idx + 1;
      });
      renderTable();
    }
  }
}

function exportData() {
  const csvHeaders = [
    "#",
    "Topic",
    "Responsible",
    "Timeliness",
    "Target",
    "Completion Deadline",
    "Status",
    "Mode of Evaluation",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry.number}"`,
      `"${entry.topic}"`,
      `"${entry.responsible}"`,
      `"${entry.timeliness}"`,
      `"${entry.target}"`,
      `"${formatDate(entry.completionDeadline)}"`,
      `"${entry.status}"`,
      `"${entry.modeOfEvaluation}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "quality_management_training_plan_FKBTH_CL_QP_0607.csv");
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
    "#": entry.number,
    Topic: entry.topic,
    Responsible: entry.responsible,
    Timeliness: entry.timeliness,
    Target: entry.target,
    "Completion Deadline": formatDate(entry.completionDeadline),
    Status: entry.status,
    "Mode of Evaluation": entry.modeOfEvaluation,
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 5 }, // #
    { wch: 40 }, // Topic
    { wch: 25 }, // Responsible
    { wch: 15 }, // Timeliness
    { wch: 25 }, // Target
    { wch: 18 }, // Completion Deadline
    { wch: 15 }, // Status
    { wch: 20 }, // Mode of Evaluation
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["2025 QUALITY MANAGEMENT TRAINING PLAN-FKBTH-CL/QP/0607"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Training Plan");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Quality_Management_Training_Plan_FKBTH_CL_QP_0607_${dateStr}.xlsx`;

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
      <title>Quality Management Training Plan</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 6px; text-align: left; font-size: 9px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .status-badge { padding: 2px 6px; border-radius: 8px; font-size: 8px; }
        }
        @page { size: A4 landscape; margin: 0.5in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>2025 QUALITY MANAGEMENT TRAINING PLAN-FKBTH-CL/QP/0607</h3>
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

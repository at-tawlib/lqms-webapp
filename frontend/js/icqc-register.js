import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "RISK REGISTER-FKBTH-CL/PC/1110";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "#",
  "Date",
  "Risk",
  "Root Cause",
  "Preventive Action Implemented",
  "Person Responsible",
  "Follow Up Review",
  "Residual Risk",
  "Actions",
];

let mockData = [
  {
    id: 1,
    number: 1,
    date: "2025-01-15",
    risk: "Equipment contamination in Microbiology section",
    rootCause: "Inadequate decontamination procedures",
    preventiveAction: "Implemented daily decontamination protocol with UV sterilization",
    personResponsible: "Dr. Kwame Asante",
    followUpReview: "2025-02-15",
    residualRisk: "Low",
  },
  {
    id: 2,
    number: 2,
    date: "2025-01-20",
    risk: "Sample mix-up in Haematology",
    rootCause: "Insufficient labeling verification process",
    preventiveAction: "Double verification system for sample labeling implemented",
    personResponsible: "DCMLS Michael Asare Baffour",
    followUpReview: "2025-02-20",
    residualRisk: "Medium",
  },
  {
    id: 3,
    number: 3,
    date: "2025-01-25",
    risk: "Power outage affecting cold storage",
    rootCause: "Unreliable main power supply",
    preventiveAction: "Backup generator maintenance and UPS installation",
    personResponsible: "Facilities Management Team",
    followUpReview: "2025-03-01",
    residualRisk: "Low",
  },
  {
    id: 4,
    number: 4,
    date: "2025-02-01",
    risk: "Chemical spill in Chemistry laboratory",
    rootCause: "Improper storage of reagents",
    preventiveAction: "Reorganized chemical storage with proper containment",
    personResponsible: "Dr. Solomon Kwashie",
    followUpReview: "2025-03-01",
    residualRisk: "Low",
  },
  {
    id: 5,
    number: 5,
    date: "2025-02-05",
    risk: "Needle stick injury",
    rootCause: "Inadequate disposal procedures",
    preventiveAction: "Safety training and improved sharps containers placement",
    personResponsible: "DCMLS Michael Asare Baffour",
    followUpReview: "2025-03-05",
    residualRisk: "Medium",
  },
  {
    id: 6,
    number: 6,
    date: "2025-02-10",
    risk: "Incorrect test results due to calibration drift",
    rootCause: "Irregular calibration schedule",
    preventiveAction: "Automated calibration reminder system implemented",
    personResponsible: "Quality Control Team",
    followUpReview: "2025-03-10",
    residualRisk: "Low",
  },
  {
    id: 7,
    number: 7,
    date: "2025-02-12",
    risk: "Data loss from system failure",
    rootCause: "Insufficient backup procedures",
    preventiveAction: "Automated daily backup system with cloud storage",
    personResponsible: "IT Support Team",
    followUpReview: "2025-03-12",
    residualRisk: "Low",
  },
  {
    id: 8,
    number: 8,
    date: "2025-02-15",
    risk: "Cross-contamination in PCR laboratory",
    rootCause: "Inadequate workflow separation",
    preventiveAction: "Physical barriers and dedicated equipment zones established",
    personResponsible: "Dr. Esther Okine",
    followUpReview: "2025-03-15",
    residualRisk: "Low",
  },
];

let currentEditId = null;

export const renderIQCRegister = () => {
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
                + Add Risk Entry
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
                <h3 id="entryModalTitle" class="text-lg font-bold">Add New Risk Entry</h3>
              </div>
              <form id="entryForm" class="p-4 mt-12 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label class="block text-sm font-medium text-gray-700 mb-1">Person Responsible</label>
                    <input
                      type="text"
                      id="personResponsible"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Risk</label>
                  <textarea
                    id="risk"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Root Cause</label>
                  <textarea
                    type="text"
                    id="rootCause"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Preventive Action Implemented</label
                  >
                  <textarea
                    id="preventiveAction"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Follow Up Review Date</label>
                    <input
                      type="date"
                      id="followUpReview"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Residual Risk</label>
                    <select
                      id="residualRisk"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Risk Level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
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
        <p class="text-lg">No risk entries found.</p>
        <p class="text-sm mt-2">Add your first risk entry using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      ...entry,
      "#": entry.number,
      Date: formatDate(entry.date),
      Risk: entry.risk,
      "Root Cause": entry.rootCause,
      "Preventive Action Implemented": entry.preventiveAction,
      "Person Responsible": entry.personResponsible,
      "Follow Up Review": formatDate(entry.followUpReview),
      "Residual Risk": entry.residualRisk,
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

    if (cells[7]) {
      cells[7].innerHTML = getRiskBadgeHTML(entry.residualRisk);
    }
  });
}

const getRiskBadgeHTML = (riskLevel) => {
  const riskClasses = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    riskClasses[riskLevel] || "bg-gray-100 text-gray-800"
  }">${riskLevel}</span>`;
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
  document.getElementById("entryModalTitle").textContent = "Add New Risk Entry";
  resetForm();
  document.getElementById("entryModal").classList.remove("hidden");
}

function openEditEntryModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("entryModalTitle").textContent = "Edit Risk Entry";

  document.getElementById("date").value = entry.date;
  document.getElementById("risk").value = entry.risk;
  document.getElementById("rootCause").value = entry.rootCause;
  document.getElementById("preventiveAction").value = entry.preventiveAction;
  document.getElementById("personResponsible").value = entry.personResponsible;
  document.getElementById("followUpReview").value = entry.followUpReview;
  document.getElementById("residualRisk").value = entry.residualRisk;

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
    date: document.getElementById("date").value,
    risk: document.getElementById("risk").value,
    rootCause: document.getElementById("rootCause").value,
    preventiveAction: document.getElementById("preventiveAction").value,
    personResponsible: document.getElementById("personResponsible").value,
    followUpReview: document.getElementById("followUpReview").value,
    residualRisk: document.getElementById("residualRisk").value,
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
  if (confirm("Are you sure you want to delete this risk entry?")) {
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
    "Date",
    "Risk",
    "Root Cause",
    "Preventive Action Implemented",
    "Person Responsible",
    "Follow Up Review",
    "Residual Risk",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry.number}"`,
      `"${formatDate(entry.date)}"`,
      `"${entry.risk}"`,
      `"${entry.rootCause}"`,
      `"${entry.preventiveAction}"`,
      `"${entry.personResponsible}"`,
      `"${formatDate(entry.followUpReview)}"`,
      `"${entry.residualRisk}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "risk_register_FKBTH_CL_PC_1110.csv");
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
    Date: formatDate(entry.date),
    Risk: entry.risk,
    "Root Cause": entry.rootCause,
    "Preventive Action Implemented": entry.preventiveAction,
    "Person Responsible": entry.personResponsible,
    "Follow Up Review": formatDate(entry.followUpReview),
    "Residual Risk": entry.residualRisk,
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 5 }, // #
    { wch: 12 }, // Date
    { wch: 35 }, // Risk
    { wch: 25 }, // Root Cause
    { wch: 40 }, // Preventive Action Implemented
    { wch: 20 }, // Person Responsible
    { wch: 15 }, // Follow Up Review
    { wch: 12 }, // Residual Risk
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["RISK REGISTER-FKBTH-CL/PC/1110"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Risk Register");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Risk_Register_FKBTH_CL_PC_1110_${dateStr}.xlsx`;

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
      <title>Risk Register</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 6px; text-align: left; font-size: 8px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .risk-badge { padding: 2px 6px; border-radius: 8px; font-size: 7px; }
        }
        @page { size: A4 landscape; margin: 0.5in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>RISK REGISTER-FKBTH-CL/PC/1110</h3>
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

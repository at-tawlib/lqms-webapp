import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "RISK REGISTER-FKBTH-CL/CI/1602";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "#",
  "Process Name",
  "Risk Score",
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
    "Process Name": "Sample Collection",
    "Risk Score": "High",
    "Root Cause": "Inadequate training of collection staff",
    "Preventive Action Implemented":
      "Mandatory training program implemented for all collection staff",
    "Person Responsible": "Lab Manager",
    "Follow Up Review": "2025-09-15",
    "Residual Risk": "Medium",
  },
  {
    id: 2,
    "Process Name": "Equipment Maintenance",
    "Risk Score": "Medium",
    "Root Cause": "Irregular maintenance schedule",
    "Preventive Action Implemented": "Established preventive maintenance calendar",
    "Person Responsible": "Technical Officer",
    "Follow Up Review": "2025-08-30",
    "Residual Risk": "Low",
  },
  {
    id: 3,
    "Process Name": "Result Reporting",
    "Risk Score": "High",
    "Root Cause": "Manual transcription errors",
    "Preventive Action Implemented": "Implemented electronic reporting system with verification",
    "Person Responsible": "Quality Manager",
    "Follow Up Review": "2025-09-01",
    "Residual Risk": "Low",
  },
  {
    id: 4,
    "Process Name": "Inventory Management",
    "Risk Score": "Medium",
    "Root Cause": "Poor stock tracking system",
    "Preventive Action Implemented": "Digital inventory management system installed",
    "Person Responsible": "Store Keeper",
    "Follow Up Review": "2025-08-25",
    "Residual Risk": "Low",
  },
  {
    id: 5,
    "Process Name": "Quality Control",
    "Risk Score": "Low",
    "Root Cause": "Inconsistent QC procedures",
    "Preventive Action Implemented": "Standardized QC protocols and daily monitoring",
    "Person Responsible": "Quality Control Officer",
    "Follow Up Review": "2025-09-10",
    "Residual Risk": "Very Low",
  },
];

let currentEditId = null;

export const renderRiskManagement = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    document.getElementById("sectionTitle").textContent = sectionNameRaw;

    contentDiv.innerHTML = `
        <div>
          <!-- Action Buttons -->
          <div class="flex gap-2 mb-4">
            <button
              id="addRiskBtn"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              + Add Risk
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
              Print Register
            </button>
            <button
              id="riskSummaryBtn"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Risk Summary
            </button>
          </div>

          <div
            id="table-container"
            class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
          ></div>
        </div>

        <!-- Add/Edit Risk Modal -->
        <div
          id="riskModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-green-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 id="riskModalTitle" class="text-lg font-bold">Add New Risk</h3>
            </div>
            <form id="riskForm" class="p-4 mt-12 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Process Name</label>
                <input
                  type="text"
                  id="processName"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Sample Collection"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Risk Score</label>
                <select
                  id="riskScore"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select Risk Score</option>
                  <option value="Very Low">Very Low</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Root Cause</label>
                <textarea
                  id="rootCause"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe the root cause of the risk..."
                  required
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Preventive Action Implemented</label
                >
                <textarea
                  id="preventiveAction"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe the preventive actions taken..."
                  required
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Person Responsible</label>
                <input
                  type="text"
                  id="personResponsible"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Lab Manager"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Follow Up Review Date</label>
                <input
                  type="date"
                  id="followUpReview"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Residual Risk</label>
                <select
                  id="residualRisk"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select Residual Risk</option>
                  <option value="Very Low">Very Low</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>
              <div class="flex gap-2 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Risk
                </button>
                <button
                  type="button"
                  id="cancelRiskBtn"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Risk Summary Modal -->
        <div
          id="riskSummaryModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full">
            <div class="bg-purple-600 text-white p-4 rounded-t-lg">
              <h3 class="text-lg font-bold">Risk Summary Report</h3>
            </div>
            <div id="riskSummaryContent" class="p-4"></div>
            <div class="p-4 border-t">
              <button
                id="closeSummaryBtn"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
    `;
    renderTable();

    // Event listeners
    document.getElementById("addRiskBtn").addEventListener("click", openAddRiskModal);
    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
    document.getElementById("printBtn").addEventListener("click", quickPrintTable);
    document.getElementById("riskSummaryBtn").addEventListener("click", showRiskSummary);
    document.getElementById("riskForm").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancelRiskBtn").addEventListener("click", closeRiskModal);
    document.getElementById("closeSummaryBtn").addEventListener("click", closeRiskSummary);
  }, 500);
};

const renderTable = () => {
  const tableContainer = document.getElementById("table-container");

  if (mockData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No risks registered.</p>
        <p class="text-sm mt-2">Add your first risk using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry, index) => ({
      "#": index + 1,
      "Process Name": entry["Process Name"],
      "Risk Score": entry["Risk Score"],
      "Root Cause": entry["Root Cause"],
      "Preventive Action Implemented": entry["Preventive Action Implemented"],
      "Person Responsible": entry["Person Responsible"],
      "Follow Up Review": entry["Follow Up Review"],
      "Residual Risk": entry["Residual Risk"],
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

    // Find the Risk Score column (index 2) and Residual Risk column (index 7)
    if (cells[2]) {
      cells[2].innerHTML = getRiskScoreBadgeHTML(entry["Risk Score"]);
    }

    if (cells[7]) {
      cells[7].innerHTML = getRiskScoreBadgeHTML(entry["Residual Risk"]);
    }

    // Format Follow Up Review date (index 6)
    if (cells[6] && entry["Follow Up Review"]) {
      const reviewDate = new Date(entry["Follow Up Review"]);
      const today = new Date();
      const isOverdue = reviewDate < today;

      cells[6].innerHTML = `<span class="px-2 py-1 rounded text-xs ${
        isOverdue ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
      }">${entry["Follow Up Review"]}</span>`;
    }
  });
}

const getRiskScoreBadgeHTML = (riskLevel) => {
  const riskClasses = {
    "Very Low": "bg-green-100 text-green-800",
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    "Very High": "bg-red-100 text-red-800",
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
      openEditRiskModal(id);
    });
  });

  // Delete buttons
  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete"));
      deleteRisk(id);
    });
  });
}

function openAddRiskModal() {
  currentEditId = null;
  document.getElementById("riskModalTitle").textContent = "Add New Risk";
  resetForm();
  document.getElementById("riskModal").classList.remove("hidden");
}

function openEditRiskModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("riskModalTitle").textContent = "Edit Risk";

  document.getElementById("processName").value = entry["Process Name"];
  document.getElementById("riskScore").value = entry["Risk Score"];
  document.getElementById("rootCause").value = entry["Root Cause"];
  document.getElementById("preventiveAction").value = entry["Preventive Action Implemented"];
  document.getElementById("personResponsible").value = entry["Person Responsible"];
  document.getElementById("followUpReview").value = entry["Follow Up Review"];
  document.getElementById("residualRisk").value = entry["Residual Risk"];

  document.getElementById("riskModal").classList.remove("hidden");
}

function closeRiskModal() {
  document.getElementById("riskModal").classList.add("hidden");
  resetForm();
}

function resetForm() {
  document.getElementById("riskForm").reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    "Process Name": document.getElementById("processName").value,
    "Risk Score": document.getElementById("riskScore").value,
    "Root Cause": document.getElementById("rootCause").value,
    "Preventive Action Implemented": document.getElementById("preventiveAction").value,
    "Person Responsible": document.getElementById("personResponsible").value,
    "Follow Up Review": document.getElementById("followUpReview").value,
    "Residual Risk": document.getElementById("residualRisk").value,
  };

  if (currentEditId) {
    // Edit existing risk
    const index = mockData.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...formData };
    }
  } else {
    // Add new risk
    const maxId = mockData.length > 0 ? Math.max(...mockData.map((item) => item.id)) : 0;
    const newEntry = {
      id: maxId + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeRiskModal();
  renderTable();
}

function deleteRisk(id) {
  if (confirm("Are you sure you want to delete this risk entry?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      renderTable();
    }
  }
}

function showRiskSummary() {
  const riskCounts = mockData.reduce((acc, risk) => {
    acc[risk["Risk Score"]] = (acc[risk["Risk Score"]] || 0) + 1;
    return acc;
  }, {});

  const residualRiskCounts = mockData.reduce((acc, risk) => {
    acc[risk["Residual Risk"]] = (acc[risk["Residual Risk"]] || 0) + 1;
    return acc;
  }, {});

  // Get overdue reviews
  const today = new Date();
  const overdueReviews = mockData.filter((risk) => {
    const reviewDate = new Date(risk["Follow Up Review"]);
    return reviewDate < today;
  });

  const summaryContent = `
    <div class="space-y-4">
      <div>
        <h4 class="font-semibold text-gray-800 mb-2">Initial Risk Distribution</h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          ${Object.entries(riskCounts)
            .map(
              ([level, count]) => `
            <div class="flex justify-between p-2 bg-gray-50 rounded">
              <span>${level}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <div>
        <h4 class="font-semibold text-gray-800 mb-2">Residual Risk Distribution</h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          ${Object.entries(residualRiskCounts)
            .map(
              ([level, count]) => `
            <div class="flex justify-between p-2 bg-gray-50 rounded">
              <span>${level}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div>
        <h4 class="font-semibold text-gray-800 mb-2">Review Status</h4>
        <div class="text-sm">
          <div class="flex justify-between p-2 bg-gray-50 rounded mb-1">
            <span>Total Risks:</span>
            <span class="font-medium">${mockData.length}</span>
          </div>
          <div class="flex justify-between p-2 ${
            overdueReviews.length > 0 ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
          } rounded">
            <span>Overdue Reviews:</span>
            <span class="font-medium">${overdueReviews.length}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("riskSummaryContent").innerHTML = summaryContent;
  document.getElementById("riskSummaryModal").classList.remove("hidden");
}

function closeRiskSummary() {
  document.getElementById("riskSummaryModal").classList.add("hidden");
}

function exportData() {
  const csvHeaders = [
    "Process Name",
    "Risk Score",
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
      `"${entry["Process Name"]}"`,
      `"${entry["Risk Score"]}"`,
      `"${entry["Root Cause"].replace(/"/g, '""')}"`,
      `"${entry["Preventive Action Implemented"].replace(/"/g, '""')}"`,
      `"${entry["Person Responsible"]}"`,
      `"${entry["Follow Up Review"]}"`,
      `"${entry["Residual Risk"]}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "risk_register_FKBTH_CL_CI_1602.csv");
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
    "Process Name": entry["Process Name"],
    "Risk Score": entry["Risk Score"],
    "Root Cause": entry["Root Cause"],
    "Preventive Action Implemented": entry["Preventive Action Implemented"],
    "Person Responsible": entry["Person Responsible"],
    "Follow Up Review": entry["Follow Up Review"],
    "Residual Risk": entry["Residual Risk"],
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 20 }, // Process Name
    { wch: 12 }, // Risk Score
    { wch: 40 }, // Root Cause
    { wch: 50 }, // Preventive Action
    { wch: 20 }, // Person Responsible
    { wch: 15 }, // Follow Up Review
    { wch: 15 }, // Residual Risk
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["RISK REGISTER-FKBTH-CL/CI/1602"],
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
  const filename = `Risk_Register_FKBTH_CL_CI_1602_${dateStr}.xlsx`;

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
          th, td { border: 1px solid #000; padding: 6px; text-align: left; font-size: 9px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .risk-badge { padding: 2px 6px; border-radius: 10px; font-size: 8px; }
        }
        @page { size: A4 landscape; margin: 0.3in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>RISK REGISTER-FKBTH-CL/CI/1602</h3>
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

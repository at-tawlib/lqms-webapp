import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "STAFF APPRAISAL-FKBTH-CL/OP/1614";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "Staff Name",
  "Staff Number",
  "Rank",
  "Objectives for the Year",
  "Mid Year Review",
  "Annual Appraisal",
  "Name of Appraiser",
  "Status",
  "Actions",
];

let mockData = [
  {
    id: 1,
    "Staff Name": "Dr. Kwame Asante",
    "Staff Number": "KBTH001",
    Rank: "Senior Medical Laboratory Scientist",
    "Objectives for the Year":
      "Improve turnaround time for critical tests, Lead quality improvement initiatives, Mentor junior staff",
    "Mid Year Review": "2025-06-15",
    "Annual Appraisal": "2025-12-15",
    "Name of Appraiser": "Dr. Mary Osei",
    Status: "In Progress",
  },
  {
    id: 2,
    "Staff Name": "Mrs. Akosua Mensah",
    "Staff Number": "KBTH002",
    Rank: "Medical Laboratory Scientist",
    "Objectives for the Year":
      "Complete advanced training in molecular diagnostics, Reduce sample rejection rates by 15%",
    "Mid Year Review": "2025-06-20",
    "Annual Appraisal": "2025-12-20",
    "Name of Appraiser": "Dr. Kwame Asante",
    Status: "Scheduled",
  },
  {
    id: 3,
    "Staff Name": "Mr. Joseph Boateng",
    "Staff Number": "KBTH003",
    Rank: "Laboratory Technician",
    "Objectives for the Year":
      "Maintain equipment preventive maintenance schedule, Improve customer service ratings",
    "Mid Year Review": "2025-07-01",
    "Annual Appraisal": "2025-12-30",
    "Name of Appraiser": "Mrs. Akosua Mensah",
    Status: "Scheduled",
  },
  {
    id: 4,
    "Staff Name": "Ms. Ama Darko",
    "Staff Number": "KBTH004",
    Rank: "Quality Control Officer",
    "Objectives for the Year":
      "Implement new quality control procedures, Lead ISO 15189 compliance activities",
    "Mid Year Review": "2025-06-10",
    "Annual Appraisal": "2025-12-10",
    "Name of Appraiser": "Dr. Mary Osei",
    Status: "Completed",
  },
  {
    id: 5,
    "Staff Name": "Mr. Kofi Amponsah",
    "Staff Number": "KBTH005",
    Rank: "Laboratory Assistant",
    "Objectives for the Year":
      "Complete certification in phlebotomy, Improve sample collection efficiency by 20%",
    "Mid Year Review": "2025-07-15",
    "Annual Appraisal": "2025-12-31",
    "Name of Appraiser": "Mr. Joseph Boateng",
    Status: "Overdue",
  },
  {
    id: 6,
    "Staff Name": "Dr. Grace Owusu",
    "Staff Number": "KBTH006",
    Rank: "Chief Medical Laboratory Scientist",
    "Objectives for the Year":
      "Strategic planning for laboratory expansion, Staff development and training programs",
    "Mid Year Review": "2025-06-05",
    "Annual Appraisal": "2025-12-05",
    "Name of Appraiser": "Prof. Samuel Adjei",
    Status: "Completed",
  },
];

let currentEditId = null;

export const renderAppraisalTracker = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    document.getElementById("sectionTitle").textContent = sectionNameRaw;

    contentDiv.innerHTML = `
        <div>
          <!-- Action Buttons -->
          <div class="flex gap-2 mb-4">
            <button
              id="addAppraisalBtn"
              class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              + Add Staff Appraisal
            </button>
            <button
              id="exportBtn"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export CSV
            </button>
            <button
              id="exportExcelBtn"
              class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Export Excel
            </button>
            <button
              id="printBtn"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Print Appraisal List
            </button>
            <button
              id="appraisalSummaryBtn"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Appraisal Summary
            </button>
          </div>

          <div
            id="table-container"
            class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
          ></div>
        </div>

        <!-- Add/Edit Appraisal Modal -->
        <div
          id="appraisalModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 id="appraisalModalTitle" class="text-lg font-bold">Add New Staff Appraisal</h3>
            </div>
            <form id="appraisalForm" class="p-4 mt-12 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
                <input
                  type="text"
                  id="staffName"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., Dr. Kwame Asante"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Staff Number</label>
                <input
                  type="text"
                  id="staffNumber"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., KBTH001"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                <select
                  id="rank"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Rank</option>
                  <option value="Chief Medical Laboratory Scientist">
                    Chief Medical Laboratory Scientist
                  </option>
                  <option value="Senior Medical Laboratory Scientist">
                    Senior Medical Laboratory Scientist
                  </option>
                  <option value="Medical Laboratory Scientist">Medical Laboratory Scientist</option>
                  <option value="Quality Control Officer">Quality Control Officer</option>
                  <option value="Laboratory Technician">Laboratory Technician</option>
                  <option value="Laboratory Assistant">Laboratory Assistant</option>
                  <option value="Phlebotomist">Phlebotomist</option>
                  <option value="Administrative Assistant">Administrative Assistant</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Objectives for the Year</label>
                <textarea
                  id="objectives"
                  rows="4"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="List the key objectives and goals for this staff member for the year..."
                  required
                ></textarea>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Mid Year Review Date</label>
                  <input
                    type="date"
                    id="midYearReview"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Annual Appraisal Date</label>
                  <input
                    type="date"
                    id="annualAppraisal"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name of Appraiser</label>
                <input
                  type="text"
                  id="appraiser"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., Dr. Mary Osei"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Postponed">Postponed</option>
                </select>
              </div>
              <div class="flex gap-2 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Appraisal
                </button>
                <button
                  type="button"
                  id="cancelAppraisalBtn"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Appraisal Summary Modal -->
        <div
          id="appraisalSummaryModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 class="text-lg font-bold">Appraisal Summary Report</h3>
            </div>
            <div id="appraisalSummaryContent" class="mt-1 p-4"></div>
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
    document.getElementById("addAppraisalBtn").addEventListener("click", openAddAppraisalModal);
    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
    document.getElementById("printBtn").addEventListener("click", quickPrintTable);
    document.getElementById("appraisalSummaryBtn").addEventListener("click", showAppraisalSummary);
    document.getElementById("appraisalForm").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancelAppraisalBtn").addEventListener("click", closeAppraisalModal);
    document.getElementById("closeSummaryBtn").addEventListener("click", closeAppraisalSummary);
  }, 500);
};

const renderTable = () => {
  const tableContainer = document.getElementById("table-container");

  if (mockData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No staff appraisals recorded.</p>
        <p class="text-sm mt-2">Add your first staff appraisal using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      "Staff Name": entry["Staff Name"],
      "Staff Number": entry["Staff Number"],
      Rank: entry["Rank"],
      "Objectives for the Year": entry["Objectives for the Year"],
      "Mid Year Review": entry["Mid Year Review"],
      "Annual Appraisal": entry["Annual Appraisal"],
      "Name of Appraiser": entry["Name of Appraiser"],
      Status: entry["Status"],
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

    // Find the Status column (index 7) and apply formatting
    if (cells[7]) {
      cells[7].innerHTML = getStatusBadgeHTML(entry.Status);
    }

    // Format review dates with status indicators (Mid Year Review - index 4, Annual Appraisal - index 5)
    const today = new Date();

    if (cells[4] && entry["Mid Year Review"]) {
      const reviewDate = new Date(entry["Mid Year Review"]);
      const isOverdue = reviewDate < today && entry.Status !== "Completed";

      cells[4].innerHTML = `<span class="px-2 py-1 rounded text-xs ${
        isOverdue ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
      }">${entry["Mid Year Review"]}</span>`;
    }

    if (cells[5] && entry["Annual Appraisal"]) {
      const appraisalDate = new Date(entry["Annual Appraisal"]);
      const isOverdue = appraisalDate < today && entry.Status !== "Completed";

      cells[5].innerHTML = `<span class="px-2 py-1 rounded text-xs ${
        isOverdue ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
      }">${entry["Annual Appraisal"]}</span>`;
    }
  });
}

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    Scheduled: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Overdue: "bg-red-100 text-red-800",
    Postponed: "bg-gray-100 text-gray-800",
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
      <button data-view="${id}" class="bg-teal-500 hover:bg-teal-600 text-white px-2 py-1 rounded text-xs transition-colors">View</button>
    </div>
  `;
};

function attachActionListeners() {
  // Edit buttons
  document.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-edit"));
      openEditAppraisalModal(id);
    });
  });

  // Delete buttons
  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete"));
      deleteAppraisal(id);
    });
  });

  // View buttons
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-view"));
      viewAppraisal(id);
    });
  });
}

function openAddAppraisalModal() {
  currentEditId = null;
  document.getElementById("appraisalModalTitle").textContent = "Add New Staff Appraisal";
  resetForm();
  document.getElementById("appraisalModal").classList.remove("hidden");
}

function openEditAppraisalModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("appraisalModalTitle").textContent = "Edit Staff Appraisal";

  document.getElementById("staffName").value = entry["Staff Name"];
  document.getElementById("staffNumber").value = entry["Staff Number"];
  document.getElementById("rank").value = entry["Rank"];
  document.getElementById("objectives").value = entry["Objectives for the Year"];
  document.getElementById("midYearReview").value = entry["Mid Year Review"];
  document.getElementById("annualAppraisal").value = entry["Annual Appraisal"];
  document.getElementById("appraiser").value = entry["Name of Appraiser"];
  document.getElementById("status").value = entry["Status"];

  document.getElementById("appraisalModal").classList.remove("hidden");
}

function closeAppraisalModal() {
  document.getElementById("appraisalModal").classList.add("hidden");
  resetForm();
}

function resetForm() {
  document.getElementById("appraisalForm").reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    "Staff Name": document.getElementById("staffName").value,
    "Staff Number": document.getElementById("staffNumber").value,
    Rank: document.getElementById("rank").value,
    "Objectives for the Year": document.getElementById("objectives").value,
    "Mid Year Review": document.getElementById("midYearReview").value,
    "Annual Appraisal": document.getElementById("annualAppraisal").value,
    "Name of Appraiser": document.getElementById("appraiser").value,
    Status: document.getElementById("status").value,
  };

  if (currentEditId) {
    // Edit existing appraisal
    const index = mockData.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...formData };
    }
  } else {
    // Add new appraisal
    const maxId = mockData.length > 0 ? Math.max(...mockData.map((item) => item.id)) : 0;
    const newEntry = {
      id: maxId + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeAppraisalModal();
  renderTable();
}

function deleteAppraisal(id) {
  if (confirm("Are you sure you want to delete this staff appraisal record?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      renderTable();
    }
  }
}

function viewAppraisal(id) {
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  alert(
    `Staff Appraisal Details:\n\nName: ${entry["Staff Name"]}\nNumber: ${entry["Staff Number"]}\nRank: ${entry["Rank"]}\nObjectives: ${entry["Objectives for the Year"]}\nMid Year Review: ${entry["Mid Year Review"]}\nAnnual Appraisal: ${entry["Annual Appraisal"]}\nAppraiser: ${entry["Name of Appraiser"]}\nStatus: ${entry["Status"]}`
  );
}

function showAppraisalSummary() {
  const statusCounts = mockData.reduce((acc, appraisal) => {
    acc[appraisal.Status] = (acc[appraisal.Status] || 0) + 1;
    return acc;
  }, {});

  const rankCounts = mockData.reduce((acc, appraisal) => {
    acc[appraisal.Rank] = (acc[appraisal.Rank] || 0) + 1;
    return acc;
  }, {});

  // Get overdue appraisals
  const today = new Date();
  const overdueAppraisals = mockData.filter((appraisal) => {
    const midYearDate = new Date(appraisal["Mid Year Review"]);
    const annualDate = new Date(appraisal["Annual Appraisal"]);
    return (midYearDate < today || annualDate < today) && appraisal.Status !== "Completed";
  });

  const upcomingAppraisals = mockData.filter((appraisal) => {
    const annualDate = new Date(appraisal["Annual Appraisal"]);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return (
      annualDate <= thirtyDaysFromNow && annualDate >= today && appraisal.Status !== "Completed"
    );
  });

  const summaryContent = `
    <div class="space-y-4">
      <div>
        <h4 class="font-semibold text-gray-800 mb-2">Appraisal Status Overview</h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          ${Object.entries(statusCounts)
            .map(
              ([status, count]) => `
            <div class="flex justify-between p-2 bg-gray-50 rounded">
              <span>${status}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <div>
        <h4 class="font-semibold text-gray-800 mb-2">Staff by Rank</h4>
        <div class="text-sm space-y-1 max-h-32 overflow-y-auto">
          ${Object.entries(rankCounts)
            .map(
              ([rank, count]) => `
            <div class="flex justify-between p-2 bg-gray-50 rounded">
              <span class="text-xs">${rank}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div>
        <h4 class="font-semibold text-gray-800 mb-2">Alert Summary</h4>
        <div class="text-sm space-y-1">
          <div class="flex justify-between p-2 bg-gray-50 rounded">
            <span>Total Staff:</span>
            <span class="font-medium">${mockData.length}</span>
          </div>
          <div class="flex justify-between p-2 ${
            overdueAppraisals.length > 0 ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
          } rounded">
            <span>Overdue Appraisals:</span>
            <span class="font-medium">${overdueAppraisals.length}</span>
          </div>
          <div class="flex justify-between p-2 ${
            upcomingAppraisals.length > 0 ? "bg-yellow-50 text-yellow-800" : "bg-gray-50"
          } rounded">
            <span>Due in 30 Days:</span>
            <span class="font-medium">${upcomingAppraisals.length}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("appraisalSummaryContent").innerHTML = summaryContent;
  document.getElementById("appraisalSummaryModal").classList.remove("hidden");
}

function closeAppraisalSummary() {
  document.getElementById("appraisalSummaryModal").classList.add("hidden");
}

function exportData() {
  const csvHeaders = [
    "Staff Name",
    "Staff Number",
    "Rank",
    "Objectives for the Year",
    "Mid Year Review",
    "Annual Appraisal",
    "Name of Appraiser",
    "Status",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry["Staff Name"]}"`,
      `"${entry["Staff Number"]}"`,
      `"${entry["Rank"]}"`,
      `"${entry["Objectives for the Year"].replace(/"/g, '""')}"`,
      `"${entry["Mid Year Review"]}"`,
      `"${entry["Annual Appraisal"]}"`,
      `"${entry["Name of Appraiser"]}"`,
      `"${entry["Status"]}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "staff_appraisal_FKBTH_CL_OP_1614.csv");
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
    "Staff Name": entry["Staff Name"],
    "Staff Number": entry["Staff Number"],
    Rank: entry["Rank"],
    "Objectives for the Year": entry["Objectives for the Year"],
    "Mid Year Review": entry["Mid Year Review"],
    "Annual Appraisal": entry["Annual Appraisal"],
    "Name of Appraiser": entry["Name of Appraiser"],
    Status: entry["Status"],
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 25 }, // Staff Name
    { wch: 12 }, // Staff Number
    { wch: 30 }, // Rank
    { wch: 50 }, // Objectives
    { wch: 15 }, // Mid Year Review
    { wch: 15 }, // Annual Appraisal
    { wch: 25 }, // Name of Appraiser
    { wch: 12 }, // Status
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["STAFF APPRAISAL-FKBTH-CL/OP/1614"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Staff Appraisal");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Staff_Appraisal_FKBTH_CL_OP_1614_${dateStr}.xlsx`;

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
      <title>Staff Appraisal List</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 6px; text-align: left; font-size: 9px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .status-badge { padding: 2px 6px; border-radius: 10px; font-size: 8px; }
          .objectives-cell { max-width: 200px; word-wrap: break-word; }
        }
        @page { size: A4 landscape; margin: 0.3in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>STAFF APPRAISAL-FKBTH-CL/OP/1614</h3>
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

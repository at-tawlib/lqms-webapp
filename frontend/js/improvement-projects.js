import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "Continual Improvement";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");
const headers = [
  "Initiative Title",
  "Category",
  "Priority",
  "Identified By",
  "Date Identified",
  "Target Date",
  "Status",
  "Progress %",
  "Responsible Person",
  "Actions",
];

let mockData = [
  {
    id: 1,
    "Initiative Title": "Reduce Sample Turnaround Time",
    Category: "Process Improvement",
    Priority: "High",
    "Identified By": "Dr. Grace Owusu",
    "Date Identified": "2025-01-15",
    "Target Date": "2025-06-30",
    Status: "In Progress",
    "Progress %": 65,
    "Responsible Person": "Dr. Kwame Asante",
    Description:
      "Implement workflow optimization to reduce sample processing time from 4 hours to 2 hours for routine tests",
    "Expected Outcome": "50% reduction in turnaround time, improved patient satisfaction",
    "Resources Required": "Staff training, workflow redesign, possible equipment upgrade",
  },
  {
    id: 2,
    "Initiative Title": "ISO 15189 Compliance Enhancement",
    Category: "Quality Management",
    Priority: "Critical",
    "Identified By": "Ms. Ama Darko",
    "Date Identified": "2025-02-01",
    "Target Date": "2025-12-31",
    Status: "Planning",
    "Progress %": 25,
    "Responsible Person": "Ms. Ama Darko",
    Description: "Complete implementation of remaining ISO 15189 requirements for full compliance",
    "Expected Outcome": "Achieve full ISO 15189 accreditation",
    "Resources Required": "External consultant, staff training, documentation updates",
  },
  {
    id: 3,
    "Initiative Title": "Digital Result Reporting System",
    Category: "Technology Enhancement",
    Priority: "Medium",
    "Identified By": "Mr. Joseph Boateng",
    "Date Identified": "2025-01-20",
    "Target Date": "2025-09-15",
    Status: "Approved",
    "Progress %": 15,
    "Responsible Person": "Mrs. Akosua Mensah",
    Description:
      "Implement electronic result delivery system to reduce paper usage and improve delivery speed",
    "Expected Outcome": "90% reduction in paper usage, faster result delivery",
    "Resources Required": "Software procurement, IT infrastructure, staff training",
  },
  {
    id: 4,
    "Initiative Title": "Staff Competency Assessment Program",
    Category: "Human Resources",
    Priority: "High",
    "Identified By": "Prof. Samuel Adjei",
    "Date Identified": "2025-01-10",
    "Target Date": "2025-08-30",
    Status: "Completed",
    "Progress %": 100,
    "Responsible Person": "Dr. Grace Owusu",
    Description:
      "Develop and implement comprehensive competency assessment for all laboratory staff",
    "Expected Outcome": "100% staff certified in their respective areas",
    "Resources Required": "Assessment materials, training sessions, certification process",
  },
  {
    id: 5,
    "Initiative Title": "Equipment Preventive Maintenance Optimization",
    Category: "Equipment Management",
    Priority: "Medium",
    "Identified By": "Mr. Kofi Amponsah",
    "Date Identified": "2025-02-10",
    "Target Date": "2025-07-31",
    Status: "On Hold",
    "Progress %": 10,
    "Responsible Person": "Mr. Joseph Boateng",
    Description: "Revise preventive maintenance schedules to reduce equipment downtime",
    "Expected Outcome": "20% reduction in unplanned equipment downtime",
    "Resources Required": "Maintenance schedule review, spare parts inventory",
  },
  {
    id: 6,
    "Initiative Title": "Patient Satisfaction Survey Implementation",
    Category: "Customer Service",
    Priority: "High",
    "Identified By": "Dr. Mary Osei",
    "Date Identified": "2025-01-25",
    "Target Date": "2025-05-31",
    Status: "In Progress",
    "Progress %": 80,
    "Responsible Person": "Mrs. Akosua Mensah",
    Description:
      "Implement regular patient satisfaction surveys to identify service improvement areas",
    "Expected Outcome": "Achieve 95% patient satisfaction rating",
    "Resources Required": "Survey design, data collection system, analysis tools",
  },
];

let currentEditId = null;

export const renderImprovementProjects = () => {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    contentDiv.innerHTML = `
            <div class="bg-teal-600 text-white p-4 rounded-t-lg mb-0">
              <h2 class="text-2xl font-bold">CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
              <p class="text-teal-100 text-sm">CONTINUAL IMPROVEMENT-FKBTH-CL/QM/1615</p>
            </div>

            <div class="bg-white p-6 rounded-b-lg shadow-lg">
            <!-- Action Buttons -->
            <div class="flex gap-2 mb-4">
                <button
                id="addInitiativeBtn"
                class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                + Add Initiative
                </button>
                <button
                id="exportBtn"
                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                Export CSV
                </button>
                <button id="exportExcelBtn" class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Export Excel
                </button>
                <button id="printBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Print Initiative List
                </button>
                <button id="improvementSummaryBtn" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors">
                    Improvement Summary
                </button>
            </div>

            <div
                id="table-container"
                class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
            ></div>
            </div>

            <!-- Add/Edit Initiative Modal -->
            <div
            id="initiativeModal"
            class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
            >
            <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="bg-teal-600 text-white p-4 rounded-t-lg">
                <h3 id="initiativeModalTitle" class="text-lg font-bold">Add New Improvement Initiative</h3>
                </div>
                <form id="initiativeForm" class="p-4 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Initiative Title</label>
                        <input
                        type="text"
                        id="initiativeTitle"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="e.g., Reduce Sample Turnaround Time"
                        required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                        id="category"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        required
                        >
                        <option value="">Select Category</option>
                        <option value="Process Improvement">Process Improvement</option>
                        <option value="Quality Management">Quality Management</option>
                        <option value="Technology Enhancement">Technology Enhancement</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Equipment Management">Equipment Management</option>
                        <option value="Customer Service">Customer Service</option>
                        <option value="Safety & Compliance">Safety & Compliance</option>
                        <option value="Cost Reduction">Cost Reduction</option>
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                        id="priority"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        required
                        >
                        <option value="">Select Priority</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Identified By</label>
                        <input
                        type="text"
                        id="identifiedBy"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="e.g., Dr. Grace Owusu"
                        required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Responsible Person</label>
                        <input
                        type="text"
                        id="responsiblePerson"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="e.g., Dr. Kwame Asante"
                        required
                        />
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date Identified</label>
                        <input
                        type="date"
                        id="dateIdentified"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                        <input
                        type="date"
                        id="targetDate"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Progress %</label>
                        <input
                        type="number"
                        id="progress"
                        min="0"
                        max="100"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="0-100"
                        required
                        />
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                    id="status"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                    >
                    <option value="">Select Status</option>
                    <option value="Planning">Planning</option>
                    <option value="Approved">Approved</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                    id="description"
                    rows="3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Detailed description of the improvement initiative..."
                    required
                    ></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Expected Outcome</label>
                    <textarea
                    id="expectedOutcome"
                    rows="2"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="What are the expected results and benefits?"
                    required
                    ></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Resources Required</label>
                    <textarea
                    id="resourcesRequired"
                    rows="2"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="What resources are needed to complete this initiative?"
                    required
                    ></textarea>
                </div>
                
                <div class="flex gap-2 pt-4">
                    <button
                    type="submit"
                    class="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                    Save Initiative
                    </button>
                    <button
                    type="button"
                    id="cancelInitiativeBtn"
                    class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                    Cancel
                    </button>
                </div>
                </form>
            </div>
            </div>

            <!-- Improvement Summary Modal -->
            <div
            id="improvementSummaryModal"
            class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
            >
            <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="bg-purple-600 text-white p-4 rounded-t-lg">
                <h3 class="text-lg font-bold">Continual Improvement Summary Report</h3>
                </div>
                <div id="improvementSummaryContent" class="p-4">
                </div>
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

            <!-- View Initiative Details Modal -->
            <div
            id="viewInitiativeModal"
            class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
            >
            <div class="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div class="bg-blue-600 text-white p-4 rounded-t-lg">
                <h3 class="text-lg font-bold">Initiative Details</h3>
                </div>
                <div id="viewInitiativeContent" class="p-4">
                </div>
                <div class="p-4 border-t">
                <button
                    id="closeViewBtn"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                    Close
                </button>
                </div>
            </div>
            </div>
    `;

    renderTable();

    // Event listeners
    document.getElementById("addInitiativeBtn").addEventListener("click", openAddInitiativeModal);
    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
    document.getElementById("printBtn").addEventListener("click", quickPrintTable);
    document
      .getElementById("improvementSummaryBtn")
      .addEventListener("click", showImprovementSummary);
    document.getElementById("initiativeForm").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancelInitiativeBtn").addEventListener("click", closeInitiativeModal);
    document.getElementById("closeSummaryBtn").addEventListener("click", closeImprovementSummary);
    document.getElementById("closeViewBtn").addEventListener("click", closeViewModal);
  }, 500);
};

const renderTable = () => {
  const tableContainer = document.getElementById("table-container");

  if (mockData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No improvement initiatives recorded.</p>
        <p class="text-sm mt-2">Add your first improvement initiative using the form above.</p>
      </div>
    `;
  } else {
    // Transform data to include actions and format for table
    const tableData = mockData.map((entry) => ({
      "Initiative Title": entry["Initiative Title"],
      Category: entry["Category"],
      Priority: entry["Priority"],
      "Identified By": entry["Identified By"],
      "Date Identified": entry["Date Identified"],
      "Target Date": entry["Target Date"],
      Status: entry["Status"],
      "Progress %": entry["Progress %"],
      "Responsible Person": entry["Responsible Person"],
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

    // Format Priority column (index 2)
    if (cells[2]) {
      cells[2].innerHTML = getPriorityBadgeHTML(entry.Priority);
    }

    // Format Status column (index 6)
    if (cells[6]) {
      cells[6].innerHTML = getStatusBadgeHTML(entry.Status);
    }

    // Format Progress column (index 7)
    if (cells[7]) {
      cells[7].innerHTML = getProgressBarHTML(entry["Progress %"]);
    }

    // Format dates with status indicators
    const today = new Date();

    if (cells[4] && entry["Date Identified"]) {
      cells[4].innerHTML = `<span class="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">${entry["Date Identified"]}</span>`;
    }

    if (cells[5] && entry["Target Date"]) {
      const targetDate = new Date(entry["Target Date"]);
      const isOverdue = targetDate < today && entry.Status !== "Completed";
      const isDueSoon =
        targetDate <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) && targetDate > today;

      let className = "bg-green-100 text-green-800";
      if (isOverdue) className = "bg-red-100 text-red-800";
      else if (isDueSoon) className = "bg-yellow-100 text-yellow-800";

      cells[5].innerHTML = `<span class="px-2 py-1 rounded text-xs ${className}">${entry["Target Date"]}</span>`;
    }
  });
}

const getPriorityBadgeHTML = (priority) => {
  const priorityClasses = {
    Critical: "bg-red-100 text-red-800",
    High: "bg-orange-100 text-orange-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    priorityClasses[priority] || "bg-gray-100 text-gray-800"
  }">${priority}</span>`;
};

const getStatusBadgeHTML = (status) => {
  const statusClasses = {
    Planning: "bg-gray-100 text-gray-800",
    Approved: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    "On Hold": "bg-orange-100 text-orange-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
    statusClasses[status] || "bg-gray-100 text-gray-800"
  }">${status}</span>`;
};

const getProgressBarHTML = (progress) => {
  let colorClass = "bg-red-500";
  if (progress >= 75) colorClass = "bg-green-500";
  else if (progress >= 50) colorClass = "bg-yellow-500";
  else if (progress >= 25) colorClass = "bg-orange-500";

  return `
    <div class="flex items-center">
      <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
        <div class="${colorClass} h-2 rounded-full" style="width: ${progress}%"></div>
      </div>
      <span class="text-xs font-medium">${progress}%</span>
    </div>
  `;
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
      openEditInitiativeModal(id);
    });
  });

  // Delete buttons
  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete"));
      deleteInitiative(id);
    });
  });

  // View buttons
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-view"));
      viewInitiative(id);
    });
  });
}

function openAddInitiativeModal() {
  currentEditId = null;
  document.getElementById("initiativeModalTitle").textContent = "Add New Improvement Initiative";
  resetForm();
  document.getElementById("initiativeModal").classList.remove("hidden");
}

function openEditInitiativeModal(id) {
  currentEditId = id;
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  document.getElementById("initiativeModalTitle").textContent = "Edit Improvement Initiative";

  document.getElementById("initiativeTitle").value = entry["Initiative Title"];
  document.getElementById("category").value = entry["Category"];
  document.getElementById("priority").value = entry["Priority"];
  document.getElementById("identifiedBy").value = entry["Identified By"];
  document.getElementById("dateIdentified").value = entry["Date Identified"];
  document.getElementById("targetDate").value = entry["Target Date"];
  document.getElementById("status").value = entry["Status"];
  document.getElementById("progress").value = entry["Progress %"];
  document.getElementById("responsiblePerson").value = entry["Responsible Person"];
  document.getElementById("description").value = entry["Description"];
  document.getElementById("expectedOutcome").value = entry["Expected Outcome"];
  document.getElementById("resourcesRequired").value = entry["Resources Required"];

  document.getElementById("initiativeModal").classList.remove("hidden");
}

function closeInitiativeModal() {
  document.getElementById("initiativeModal").classList.add("hidden");
  resetForm();
}

function closeViewModal() {
  document.getElementById("viewInitiativeModal").classList.add("hidden");
}

function resetForm() {
  document.getElementById("initiativeForm").reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    "Initiative Title": document.getElementById("initiativeTitle").value,
    Category: document.getElementById("category").value,
    Priority: document.getElementById("priority").value,
    "Identified By": document.getElementById("identifiedBy").value,
    "Date Identified": document.getElementById("dateIdentified").value,
    "Target Date": document.getElementById("targetDate").value,
    Status: document.getElementById("status").value,
    "Progress %": parseInt(document.getElementById("progress").value),
    "Responsible Person": document.getElementById("responsiblePerson").value,
    Description: document.getElementById("description").value,
    "Expected Outcome": document.getElementById("expectedOutcome").value,
    "Resources Required": document.getElementById("resourcesRequired").value,
  };

  if (currentEditId) {
    // Edit existing initiative
    const index = mockData.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      mockData[index] = { ...mockData[index], ...formData };
    }
  } else {
    // Add new initiative
    const maxId = mockData.length > 0 ? Math.max(...mockData.map((item) => item.id)) : 0;
    const newEntry = {
      id: maxId + 1,
      ...formData,
    };
    mockData.push(newEntry);
  }

  closeInitiativeModal();
  renderTable();
}

function deleteInitiative(id) {
  if (confirm("Are you sure you want to delete this improvement initiative?")) {
    const index = mockData.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockData.splice(index, 1);
      renderTable();
    }
  }
}

function viewInitiative(id) {
  const entry = mockData.find((item) => item.id === id);
  if (!entry) return;

  const viewContent = `
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Initiative Title</label>
          <p class="mt-1 text-sm text-gray-900 font-medium">${entry["Initiative Title"]}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <p class="mt-1">${entry["Category"]}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Priority</label>
          <p class="mt-1">${getPriorityBadgeHTML(entry.Priority)}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <p class="mt-1">${getStatusBadgeHTML(entry.Status)}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Progress</label>
          <p class="mt-1">${getProgressBarHTML(entry["Progress %"])}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Identified By</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Identified By"]}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Responsible Person</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Responsible Person"]}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Date Identified</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Date Identified"]}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Target Date</label>
          <p class="mt-1 text-sm text-gray-900">${entry["Target Date"]}</p>
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <p class="mt-1 text-sm text-gray-900">${entry["Description"]}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Expected Outcome</label>
        <p class="mt-1 text-sm text-gray-900">${entry["Expected Outcome"]}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Resources Required</label>
        <p class="mt-1 text-sm text-gray-900">${entry["Resources Required"]}</p>
      </div>
    </div>
  `;

  document.getElementById("viewInitiativeContent").innerHTML = viewContent;
  document.getElementById("viewInitiativeModal").classList.remove("hidden");
}

function showImprovementSummary() {
  const statusCounts = mockData.reduce((acc, initiative) => {
    acc[initiative.Status] = (acc[initiative.Status] || 0) + 1;
    return acc;
  }, {});

  const categoryCounts = mockData.reduce((acc, initiative) => {
    acc[initiative.Category] = (acc[initiative.Category] || 0) + 1;
    return acc;
  }, {});

  const priorityCounts = mockData.reduce((acc, initiative) => {
    acc[initiative.Priority] = (acc[initiative.Priority] || 0) + 1;
    return acc;
  }, {});

  // Calculate average progress
  const totalProgress = mockData.reduce((sum, initiative) => sum + initiative["Progress %"], 0);
  const averageProgress = mockData.length > 0 ? Math.round(totalProgress / mockData.length) : 0;

  // Get overdue initiatives
  const today = new Date();
  const overdueInitiatives = mockData.filter((initiative) => {
    const targetDate = new Date(initiative["Target Date"]);
    return (
      targetDate < today && initiative.Status !== "Completed" && initiative.Status !== "Cancelled"
    );
  });

  const dueSoonInitiatives = mockData.filter((initiative) => {
    const targetDate = new Date(initiative["Target Date"]);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return (
      targetDate <= thirtyDaysFromNow &&
      targetDate >= today &&
      initiative.Status !== "Completed" &&
      initiative.Status !== "Cancelled"
    );
  });

  const completedInitiatives = mockData.filter((initiative) => initiative.Status === "Completed");
  const inProgressInitiatives = mockData.filter(
    (initiative) => initiative.Status === "In Progress"
  );

  const summaryContent = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Status Overview -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Status Overview</h4>
        <div class="space-y-2">
          ${Object.entries(statusCounts)
            .map(
              ([status, count]) => `
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span class="text-sm">${status}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Category Distribution -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Category Distribution</h4>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          ${Object.entries(categoryCounts)
            .map(
              ([category, count]) => `
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span class="text-xs">${category}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Priority Distribution -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Priority Distribution</h4>
        <div class="space-y-2">
          ${Object.entries(priorityCounts)
            .map(
              ([priority, count]) => `
            <div class="flex justify-between items-center p-2 ${
              priority === "Critical"
                ? "bg-red-50 text-red-800"
                : priority === "High"
                ? "bg-orange-50 text-orange-800"
                : priority === "Medium"
                ? "bg-yellow-50 text-yellow-800"
                : "bg-green-50 text-green-800"
            } rounded">
              <span class="text-sm">${priority}:</span>
              <span class="font-medium">${count}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- Key Metrics -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-3">Key Metrics</h4>
        <div class="space-y-2">
          <div class="flex justify-between items-center p-2 bg-blue-50 text-blue-800 rounded">
            <span class="text-sm">Total Initiatives:</span>
            <span class="font-medium">${mockData.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 bg-green-50 text-green-800 rounded">
            <span class="text-sm">Completed:</span>
            <span class="font-medium">${completedInitiatives.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 bg-yellow-50 text-yellow-800 rounded">
            <span class="text-sm">In Progress:</span>
            <span class="font-medium">${inProgressInitiatives.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 ${
            overdueInitiatives.length > 0 ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
          } rounded">
            <span class="text-sm">Overdue:</span>
            <span class="font-medium">${overdueInitiatives.length}</span>
          </div>
          <div class="flex justify-between items-center p-2 ${
            dueSoonInitiatives.length > 0 ? "bg-orange-50 text-orange-800" : "bg-gray-50"
          } rounded">
            <span class="text-sm">Due in 30 Days:</span>
            <span class="font-medium">${dueSoonInitiatives.length}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Progress Overview -->
    <div class="mt-6">
      <h4 class="font-semibold text-gray-800 mb-3">Progress Overview</h4>
      <div class="bg-gray-50 p-4 rounded">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm">Overall Average Progress:</span>
          <span class="font-medium">${averageProgress}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div class="h-3 rounded-full ${
            averageProgress >= 75
              ? "bg-green-500"
              : averageProgress >= 50
              ? "bg-yellow-500"
              : averageProgress >= 25
              ? "bg-orange-500"
              : "bg-red-500"
          }" style="width: ${averageProgress}%"></div>
        </div>
      </div>
    </div>
    
    ${
      overdueInitiatives.length > 0
        ? `
    <!-- Overdue Initiatives Alert -->
    <div class="mt-6">
      <h4 class="font-semibold text-red-800 mb-3">⚠️ Overdue Initiatives</h4>
      <div class="bg-red-50 border border-red-200 rounded p-3">
        ${overdueInitiatives
          .map(
            (initiative) => `
          <div class="text-sm text-red-800 mb-1">
            <strong>${initiative["Initiative Title"]}</strong> - Due: ${initiative["Target Date"]} (${initiative["Responsible Person"]})
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      dueSoonInitiatives.length > 0
        ? `
    <!-- Due Soon Initiatives -->
    <div class="mt-6">
      <h4 class="font-semibold text-orange-800 mb-3">📅 Due Soon (Next 30 Days)</h4>
      <div class="bg-orange-50 border border-orange-200 rounded p-3">
        ${dueSoonInitiatives
          .map(
            (initiative) => `
          <div class="text-sm text-orange-800 mb-1">
            <strong>${initiative["Initiative Title"]}</strong> - Due: ${initiative["Target Date"]} (${initiative["Responsible Person"]})
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
  `;

  document.getElementById("improvementSummaryContent").innerHTML = summaryContent;
  document.getElementById("improvementSummaryModal").classList.remove("hidden");
}

function closeImprovementSummary() {
  document.getElementById("improvementSummaryModal").classList.add("hidden");
}

function exportData() {
  const csvHeaders = [
    "Initiative Title",
    "Category",
    "Priority",
    "Identified By",
    "Date Identified",
    "Target Date",
    "Status",
    "Progress %",
    "Responsible Person",
    "Description",
    "Expected Outcome",
    "Resources Required",
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvHeaders.join(",") + "\n";

  mockData.forEach((entry) => {
    const row = [
      `"${entry["Initiative Title"]}"`,
      `"${entry["Category"]}"`,
      `"${entry["Priority"]}"`,
      `"${entry["Identified By"]}"`,
      `"${entry["Date Identified"]}"`,
      `"${entry["Target Date"]}"`,
      `"${entry["Status"]}"`,
      `"${entry["Progress %"]}"`,
      `"${entry["Responsible Person"]}"`,
      `"${entry["Description"].replace(/"/g, '""')}"`,
      `"${entry["Expected Outcome"].replace(/"/g, '""')}"`,
      `"${entry["Resources Required"].replace(/"/g, '""')}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "continual_improvement_FKBTH_CL_QM_1615.csv");
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
    "Initiative Title": entry["Initiative Title"],
    Category: entry["Category"],
    Priority: entry["Priority"],
    "Identified By": entry["Identified By"],
    "Date Identified": entry["Date Identified"],
    "Target Date": entry["Target Date"],
    Status: entry["Status"],
    "Progress %": entry["Progress %"],
    "Responsible Person": entry["Responsible Person"],
    Description: entry["Description"],
    "Expected Outcome": entry["Expected Outcome"],
    "Resources Required": entry["Resources Required"],
  }));

  // Create worksheet from data
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const colWidths = [
    { wch: 30 }, // Initiative Title
    { wch: 20 }, // Category
    { wch: 10 }, // Priority
    { wch: 20 }, // Identified By
    { wch: 12 }, // Date Identified
    { wch: 12 }, // Target Date
    { wch: 12 }, // Status
    { wch: 10 }, // Progress %
    { wch: 20 }, // Responsible Person
    { wch: 40 }, // Description
    { wch: 30 }, // Expected Outcome
    { wch: 30 }, // Resources Required
  ];
  ws["!cols"] = colWidths;

  // Add title rows
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL"],
      ["CONTINUAL IMPROVEMENT-FKBTH-CL/QM/1615"],
      [""], // Empty row
    ],
    { origin: "A1" }
  );

  // Shift data down to accommodate title
  XLSX.utils.sheet_add_json(ws, excelData, { origin: "A4" });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Continual Improvement");

  // Generate filename with current date
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const filename = `Continual_Improvement_FKBTH_CL_QM_1615_${dateStr}.xlsx`;

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
      <title>Continual Improvement Initiatives</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 4px; text-align: left; font-size: 8px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          .priority-badge, .status-badge { padding: 2px 4px; border-radius: 8px; font-size: 7px; }
          .progress-bar { font-size: 7px; }
        }
        @page { size: A4 landscape; margin: 0.3in; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h2>
        <h3>CONTINUAL IMPROVEMENT-FKBTH-CL/QM/1615</h3>
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

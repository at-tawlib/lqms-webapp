import { createTable } from "./ui-utils/create-table.js";
import { showLoading } from "./ui-utils/show-loading.js";

const sectionNameRaw = "Internal Audit Non-conformities: FKBTH-CL/IA/0901.28";
const sectionName = sectionNameRaw.toLowerCase().replace(/ /g, "-");

// Department data with NC counts
let departmentData = [
  { id: 1, department: "Administration", resolved: 1, pending: 0 },
  { id: 2, department: "Immunology", resolved: 0, pending: 0 },
  { id: 3, department: "Haematology", resolved: 0, pending: 0 },
  { id: 4, department: "Chemical Pathology", resolved: 0, pending: 0 },
  { id: 5, department: "Microbiology", resolved: 0, pending: 0 },
  { id: 6, department: "Client Service", resolved: 0, pending: 0 },
];

// Action Plan data
let actionPlanData = [
  {
    id: 1,
    nonConformity: "The 2023 Management review report did not include timeline for action items",
    majorMinor: "Minor",
    rootCause: "1. Insufficient management oversight 2. Inadequate training of staff",
    correctiveAction:
      "1. Train staff in minute taking 2. Develop a quality indicator for record review",
    assignedPersonnel: "Solomon Kwashie",
    completionDate: "30/1/2025",
    followUp: "Training completed. Record review initiated",
  },
];

const departmentHeaders = ["Department", "Number of NCs Resolved", "Number of NCs Pending"];
const actionPlanHeaders = [
  "Noted non-conformities/deficiencies (ISO 15189 clause)",
  "Major/Minor",
  "Root Cause",
  "Corrective Action",
  "Assigned Personnel",
  "Completion Date",
  "Follow-up",
];

let currentEditId = null;
let currentSection = "departments";

export function renderAuditNonConformities() {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  setTimeout(() => {
    document.getElementById("sectionTitle").textContent = sectionNameRaw;
    
    contentDiv.innerHTML = `
        <div>
          <!-- Navigation Tabs -->
          <div class="flex border-b border-gray-200">
            <button
              id="departmentTab"
              class="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50"
            >
              Departments Overview
            </button>
            <button
              id="actionPlanTab"
              class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Action Plan
            </button>
          </div>

          <!-- Department Overview Section -->
          <div id="departmentSection" class="bg-white p-2">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold text-gray-800">Department Non-conformities Overview</h3>
              <button
                id="addDepartmentBtn"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                + Add Department
              </button>
            </div>
            <div
              id="departmentTableContainer"
              class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
            ></div>
          </div>

          <!-- Action Plan Section -->
          <div id="actionPlanSection" class="bg-white p-2 hidden">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-800">Action Plan</h3>
              <div class="flex gap-2">
                <button
                  id="addActionBtn"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  + Add Action Item
                </button>
                <button
                  id="exportExcelBtn"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Export Excel
                </button>
                <button
                  id="printBtn"
                  class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Print
                </button>
              </div>
            </div>
            <div
              id="actionPlanTableContainer"
              class="overflow-x-auto rounded-lg shadow-md border border-gray-200"
            ></div>
          </div>
        </div>

        <!-- Department Modal -->
        <div
          id="departmentModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div class="bg-blue-600 text-white p-4 rounded-t-lg">
              <h3 id="departmentModalTitle" class="text-lg font-bold">Add Department</h3>
            </div>
            <form id="departmentForm" class="p-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  id="departmentName"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Number of NCs Resolved</label>
                <input
                  type="number"
                  id="resolvedCount"
                  min="0"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Number of NCs Pending</label>
                <input
                  type="number"
                  id="pendingCount"
                  min="0"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div class="flex gap-2 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  id="cancelDepartmentBtn"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Action Plan Modal -->
        <div
          id="actionModal"
          class="fixed inset-0 flex items-center justify-center p-4 hidden z-50 bg-black bg-opacity-50"
          style="overflow-y: auto"
        >
          <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div class="fixed bg-blue-600 text-white p-4 rounded-t-lg max-w-lg w-full h-12">
              <h3 id="actionModalTitle" class="text-lg font-bold">Add Action Item</h3>
            </div>
            <form id="actionForm" class="p-6 mt-12 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Noted Non-conformities/Deficiencies (ISO 15189 clause)</label
                  >
                  <textarea
                    id="nonConformity"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Major/Minor</label>
                  <select
                    id="majorMinor"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Assigned Personnel</label>
                  <input
                    type="text"
                    id="assignedPersonnel"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Root Cause</label>
                  <textarea
                    id="rootCause"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Corrective Action</label>
                  <textarea
                    id="correctiveAction"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                  <input
                    type="date"
                    id="completionDate"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Follow-up</label>
                  <textarea
                    id="followUp"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                  ></textarea>
                </div>
              </div>
              <div class="flex gap-2 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Action Item
                </button>
                <button
                  type="button"
                  id="cancelActionBtn"
                  class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

    `;

    // Initialize event listeners
    initializeEventListeners();

    // Render initial tables
    renderDepartmentTable();
    renderActionPlanTable();
  }, 500);
}

function initializeEventListeners() {
  // Tab switching
  document
    .getElementById("departmentTab")
    .addEventListener("click", () => switchTab("departments"));
  document.getElementById("actionPlanTab").addEventListener("click", () => switchTab("actionPlan"));

  // Department actions
  document.getElementById("addDepartmentBtn").addEventListener("click", openAddDepartmentModal);
  document.getElementById("departmentForm").addEventListener("submit", handleDepartmentFormSubmit);
  document.getElementById("cancelDepartmentBtn").addEventListener("click", closeDepartmentModal);

  // Action plan actions
  document.getElementById("addActionBtn").addEventListener("click", openAddActionModal);
  document.getElementById("actionForm").addEventListener("submit", handleActionFormSubmit);
  document.getElementById("cancelActionBtn").addEventListener("click", closeActionModal);
  document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
  document.getElementById("printBtn").addEventListener("click", printReport);
}

function switchTab(tab) {
  const departmentTab = document.getElementById("departmentTab");
  const actionPlanTab = document.getElementById("actionPlanTab");
  const departmentSection = document.getElementById("departmentSection");
  const actionPlanSection = document.getElementById("actionPlanSection");

  if (tab === "departments") {
    departmentTab.className =
      "px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50";
    actionPlanTab.className = "px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700";
    departmentSection.classList.remove("hidden");
    actionPlanSection.classList.add("hidden");
    currentSection = "departments";
  } else {
    actionPlanTab.className =
      "px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50";
    departmentTab.className = "px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700";
    actionPlanSection.classList.remove("hidden");
    departmentSection.classList.add("hidden");
    currentSection = "actionPlan";
  }
}

// Department functions
function renderDepartmentTable() {
  const tableContainer = document.getElementById("departmentTableContainer");

  if (departmentData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No departments found.</p>
        <p class="text-sm mt-2">Add departments to track non-conformities.</p>
      </div>
    `;
  } else {
    const tableData = departmentData.map((dept) => ({
      ...dept,
      Department: dept.department,
      "Number of NCs Resolved": dept.resolved,
      "Number of NCs Pending": dept.pending,
      Actions: getDepartmentActionButtonsHTML(dept.id),
    }));

    tableContainer.innerHTML = "";
    tableContainer.appendChild(createTable([...departmentHeaders, "Actions"], tableData));
    attachDepartmentActionListeners();
  }
}

function getDepartmentActionButtonsHTML(id) {
  return `
    <div class="flex gap-1">
      <button data-edit-dept="${id}" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">Edit</button>
      <button data-delete-dept="${id}" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors">Delete</button>
    </div>
  `;
}

function attachDepartmentActionListeners() {
  document.querySelectorAll("[data-edit-dept]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-edit-dept"));
      openEditDepartmentModal(id);
    });
  });

  document.querySelectorAll("[data-delete-dept]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete-dept"));
      deleteDepartment(id);
    });
  });
}

function openAddDepartmentModal() {
  currentEditId = null;
  document.getElementById("departmentModalTitle").textContent = "Add Department";
  resetDepartmentForm();
  document.getElementById("departmentModal").classList.remove("hidden");
}

function openEditDepartmentModal(id) {
  currentEditId = id;
  const dept = departmentData.find((item) => item.id === id);
  document.getElementById("departmentModalTitle").textContent = "Edit Department";

  document.getElementById("departmentName").value = dept.department;
  document.getElementById("resolvedCount").value = dept.resolved;
  document.getElementById("pendingCount").value = dept.pending;

  document.getElementById("departmentModal").classList.remove("hidden");
}

function closeDepartmentModal() {
  document.getElementById("departmentModal").classList.add("hidden");
  resetDepartmentForm();
}

function resetDepartmentForm() {
  document.getElementById("departmentForm").reset();
}

function handleDepartmentFormSubmit(e) {
  e.preventDefault();

  const formData = {
    department: document.getElementById("departmentName").value,
    resolved: parseInt(document.getElementById("resolvedCount").value),
    pending: parseInt(document.getElementById("pendingCount").value),
  };

  if (currentEditId) {
    const index = departmentData.findIndex((item) => item.id === currentEditId);
    departmentData[index] = { ...departmentData[index], ...formData };
  } else {
    const newDept = {
      id: Math.max(...departmentData.map((item) => item.id)) + 1,
      ...formData,
    };
    departmentData.push(newDept);
  }

  closeDepartmentModal();
  renderDepartmentTable();
}

function deleteDepartment(id) {
  if (confirm("Are you sure you want to delete this department?")) {
    departmentData = departmentData.filter((item) => item.id !== id);
    renderDepartmentTable();
  }
}

// Action Plan functions
function renderActionPlanTable() {
  const tableContainer = document.getElementById("actionPlanTableContainer");

  //   TODO; fix the Major/Minor view
  if (actionPlanData.length === 0) {
    tableContainer.innerHTML = `
      <div class="text-center p-8 text-gray-500">
        <p class="text-lg">No action items found.</p>
        <p class="text-sm mt-2">Add action items to track corrective actions.</p>
      </div>
    `;
  } else {
    const tableData = actionPlanData.map((action) => ({
      ...action,
      "Noted non-conformities/deficiencies (ISO 15189 clause)": action.nonConformity,
      "Major/Minor": getMajorMinorBadge(action.majorMinor),
      "Root Cause": action.rootCause,
      "Corrective Action": action.correctiveAction,
      "Assigned Personnel": action.assignedPersonnel,
      "Completion Date": action.completionDate,
      "Follow-up": action.followUp,
      Actions: getActionPlanActionButtonsHTML(action.id),
    }));

    tableContainer.innerHTML = "";
    tableContainer.appendChild(createTable([...actionPlanHeaders, "Actions"], tableData));
    attachActionPlanActionListeners();
  }
}

function getMajorMinorBadge(type) {
  const badgeClass = type === "Major" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800";
  return `<span class="px-2 py-1 rounded-full text-xs font-medium ${badgeClass}">${type}</span>`;
}

function getActionPlanActionButtonsHTML(id) {
  return `
    <div class="flex gap-1">
      <button data-edit-action="${id}" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">Edit</button>
      <button data-delete-action="${id}" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors">Delete</button>
    </div>
  `;
}

function attachActionPlanActionListeners() {
  document.querySelectorAll("[data-edit-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-edit-action"));
      openEditActionModal(id);
    });
  });

  document.querySelectorAll("[data-delete-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-delete-action"));
      deleteAction(id);
    });
  });
}

function openAddActionModal() {
  currentEditId = null;
  document.getElementById("actionModalTitle").textContent = "Add Action Item";
  resetActionForm();
  document.getElementById("actionModal").classList.remove("hidden");
}

function openEditActionModal(id) {
  currentEditId = id;
  const action = actionPlanData.find((item) => item.id === id);
  document.getElementById("actionModalTitle").textContent = "Edit Action Item";

  document.getElementById("nonConformity").value = action.nonConformity;
  document.getElementById("majorMinor").value = action.majorMinor;
  document.getElementById("rootCause").value = action.rootCause;
  document.getElementById("correctiveAction").value = action.correctiveAction;
  document.getElementById("assignedPersonnel").value = action.assignedPersonnel;
  document.getElementById("completionDate").value = action.completionDate
    .split("/")
    .reverse()
    .join("-");
  document.getElementById("followUp").value = action.followUp;

  document.getElementById("actionModal").classList.remove("hidden");
}

function closeActionModal() {
  document.getElementById("actionModal").classList.add("hidden");
  resetActionForm();
}

function resetActionForm() {
  document.getElementById("actionForm").reset();
}

function handleActionFormSubmit(e) {
  e.preventDefault();

  const completionDateInput = document.getElementById("completionDate").value;
  const formattedDate = completionDateInput.split("-").reverse().join("/");

  const formData = {
    nonConformity: document.getElementById("nonConformity").value,
    majorMinor: document.getElementById("majorMinor").value,
    rootCause: document.getElementById("rootCause").value,
    correctiveAction: document.getElementById("correctiveAction").value,
    assignedPersonnel: document.getElementById("assignedPersonnel").value,
    completionDate: formattedDate,
    followUp: document.getElementById("followUp").value,
  };

  if (currentEditId) {
    const index = actionPlanData.findIndex((item) => item.id === currentEditId);
    actionPlanData[index] = { ...actionPlanData[index], ...formData };
  } else {
    const newAction = {
      id: Math.max(...actionPlanData.map((item) => item.id)) + 1,
      ...formData,
    };
    actionPlanData.push(newAction);
  }

  closeActionModal();
  renderActionPlanTable();
}

function deleteAction(id) {
  if (confirm("Are you sure you want to delete this action item?")) {
    actionPlanData = actionPlanData.filter((item) => item.id !== id);
    renderActionPlanTable();
  }
}

// Export and Print functions
function exportToExcel() {
  const wb = XLSX.utils.book_new();

  // Department sheet
  const deptData = departmentData.map((dept) => ({
    Department: dept.department,
    "Number of NCs Resolved": dept.resolved,
    "Number of NCs Pending": dept.pending,
  }));

  const deptWs = XLSX.utils.json_to_sheet(deptData);
  XLSX.utils.book_append_sheet(wb, deptWs, "Departments");

  // Action Plan sheet
  const actionData = actionPlanData.map((action) => ({
    "Non-conformities": action.nonConformity,
    "Major/Minor": action.majorMinor,
    "Root Cause": action.rootCause,
    "Corrective Action": action.correctiveAction,
    "Assigned Personnel": action.assignedPersonnel,
    "Completion Date": action.completionDate,
    "Follow-up": action.followUp,
  }));

  const actionWs = XLSX.utils.json_to_sheet(actionData);
  XLSX.utils.book_append_sheet(wb, actionWs, "Action Plan");

  const filename = `Audit_Non_Conformities_FKBTH_CL_IA_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;
  XLSX.writeFile(wb, filename);
}

function printReport() {
  const printContent = `
    <html>
    <head>
      <title>Internal Audit Non-conformities Report</title>
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
          .section { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #000; padding: 6px; text-align: left; font-size: 10px; }
          th { background-color: #f0f0f0; font-weight: bold; }
          @page { margin: 0.5in; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>CENTRAL LABORATORY SERVICES-KORLE BU TEACHING HOSPITAL</h1>
        <h2>Internal Audit Non-conformities: FKBTH-CL/IA/0901.28</h2>
        <p>Generated: ${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString(
    "en-GB"
  )}</p>
      </div>
      
      <div class="section">
        <h3>Department Overview</h3>
        <table>
          <tr><th>Department</th><th>Resolved</th><th>Pending</th></tr>
          ${departmentData
            .map(
              (dept) => `
            <tr>
              <td>${dept.department}</td>
              <td>${dept.resolved}</td>
              <td>${dept.pending}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </div>
      
      <div class="section">
        <h3>Action Plan</h3>
        <table>
          <tr>
            <th>Non-conformity</th>
            <th>Type</th>
            <th>Root Cause</th>
            <th>Corrective Action</th>
            <th>Assigned</th>
            <th>Due Date</th>
            <th>Follow-up</th>
          </tr>
          ${actionPlanData
            .map(
              (action) => `
            <tr>
              <td>${action.nonConformity}</td>
              <td>${action.majorMinor}</td>
              <td>${action.rootCause}</td>
              <td>${action.correctiveAction}</td>
              <td>${action.assignedPersonnel}</td>
              <td>${action.completionDate}</td>
              <td>${action.followUp}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.onload = function () {
    printWindow.focus();
    printWindow.print();
  };
}

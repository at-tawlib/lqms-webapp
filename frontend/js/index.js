import { renderWeekLyActivityTracker } from "./weekly-tracker.js";

// TODO: Mock data storage - will be replaced with Firebase later
let mockData = {};
let userId = "mock-user-123";

// Data structure for the different sections
const sections = {
  "Weekly Activity Tracker": ["Work Area", "Activity", "Responsible", "Timeliness", "Status"],
  Accreditation: ["Department", "Number of NC", "Number Resolved", "Number of NCs Pending"],
  "Power Stability Tracker": [
    "#",
    "DATE",
    "#",
    "Time of Service interruption",
    "Service Affected Interruption",
    "Reason for interruption",
    "Duration of Interruption",
    "Has information of interruption communicated to Stakeholders",
    "Status",
  ],
  "Meeting Schedule": [
    "#",
    "Month",
    "Day",
    "Venue",
    "Start Time",
    "End Time",
    "Person responsible",
  ],
  "Risk Management": [
    "#",
    "PROCESS NAME",
    "RISK SCORE",
    "ROOTCAUSE",
    "PREVENTIVE ACTION IMPLEMENTED",
    "PERSON RESPONSIBLE",
    "FOLLOW UP REVIEW",
    "RESIDUAL RISK",
  ],

  "Appraisal Tracker": [
    "STAFF NAME",
    "STAFF NUMBER",
    "RANK",
    "OBJECTIVES FOR THE YEAR",
    "MID YEAR REVIEW",
    "ANNUAL APPRAISAL",
    "NAME OF APPRAISER",
  ],
  "Improvement Projects": [
    "#",
    "Department",
    "Name of project",
    "Baseline data",
    "Traget",
    "Present data",
    "Evidence of implementation",
  ],
  "Service Interruptions": [
    "#",
    "DATE",
    "Time of Service interruption",
    "Service Affected Interruption",
    "Reason for interruption",
    "Duration of Interruption",
    "Has information of interruption communicated to Stakeholders",
    "Status",
  ],
  "Training Plan": [
    "#",
    "Topic",
    "Responsible",
    "Timeliness",
    "Target",
    "Completion deadline",
    "Status",
    "Mode of evaluation",
  ],
  "ICQC Register": [
    "Date",
    "Risk",
    "Root Cause",
    "Preventive Action Implemented",
    "Person Responsible",
    "Follow Up Review",
    "Residual Risk",
  ],
  "Correspondence Manager": [
    "Date received",
    "Date of correspondence",
    "Sender",
    "Subject of correspondence",
    "Response required (Yes/No)",
    "Action Required",
    "Action taken by",
    "Status",
    "Notes",
  ],
  "Supply Planner": [
    "#",
    "Date",
    "Unit",
    "Name of item requested",
    "Specification",
    "Has evaluation being done (if applicable)",
    "Result of evaluation",
    "Date Supplied",
    "Supplier Details",
    "Serial Number",
    "Lot/Model",
    "Receiving verification comment",
  ],
  "LHIMS Stability Tracker": [
    "#",
    "DATE",
    "Time of Service LHIMS DOWNTIME",
    "Time of Service LHIMS RESUMPTION",
    "Reason for interruption",
    "Duration of Interruption",
    "Has information of interruption communicated to Stakeholders",
    "Status",
  ],
  "Equipment Adverse Report": [
    "Date",
    "Name of equipment",
    "Equipment Number",
    "A detailed description of malfunction and the risk it poses",
    "Classification",
    "Risk level",
    "Root cause",
    "Corrective Action(s) taken",
    "Person responsible",
    "Timeframe to undertake the corrective action",
    "Does Equipment need verification assesement",
    "Evidence of verification",
  ],

  "Archive Record": [
    "Serial",
    "Name of record/Item",
    "Documents code",
    "Version",
    "Archieve date",
    "Destruction date",
    "Box/File Number",
    "Shelve number",
    "Documents brought by",
    "Remark",
  ],
  "Monthly Test Count": ["DATE", "TEST", "NUMBER PERFORMED", "COMMENTS"],
  "Measurement Uncertainty": [
    "#",
    "Date",
    "Analyte",
    "MU Value",
    "Unit",
    "Date of Next Analysis",
    "Approved by:",
  ],
  "Client Survey Action Plan": [
    "#",
    "Key finding",
    "Possible root cause",
    "Corrective Actions",
    "Person Responsible",
    "Timeline",
    "Evidence",
    "Status",
  ],
  "Environment & Waste Condition": [
    "DATE",
    "DEPARTMENT",
    "UNIT",
    "HAS THE LAB BEEN CLEANED",
    "WAS THE WASTED DISPOSED",
    "ARE THE CHARTS COMPLETED",
    "REMARKS",
  ],
  "LHIMS Update": [
    "#",
    "DATE",
    "Time of Update",
    "Changes obsvred after update",
    "Is there a need for verification",
    "What was verified",
    "Remark",
  ],
  "2025 Quality Objectives": [],
  "Safety Incident Record": [
    "Date",
    "Non-conformity Number",
    "A detailed description of Safety and the risk it poses",
    "Classification",
    "Risk level",
    "Root cause",
    "Corrective Action(s) taken",
    "Is Post-Exposure Prophylaxis need?",
    "Person responsible",
    "Timeframe to undertake the corrective action",
    "Deadline to report to that corrective action has been completed",
    "Evidence of implemetnation of corrective actions",
  ],
  "Equipment Maintenance Plan": [
    "#",
    "EQUIPMENT NAME",
    "EQUIPMENT NUMBER",
    "DATE OF LAST SERVICE",
    "STATUS",
    "NEXT SERVICE DUE DATE",
    "SERVICING INSTITUTION",
  ],
  "Equipment Inventory": [
    "Name of Equipment",
    "Model",
    "Manufacturer/Supplier contact details",
    "country of origin",
    "Serial #",
    "condition received (new, used, reconditioned)",
    "Unique identifier",
    "Date Received",
    "Date of entry into servi after validation/verification",
    "DATE ENTRY TO SERVICE",
    "Date when put out of service",
    "Equipment Location",
  ],
  "Staff Needs Assessment": ["Unit", "Role", "Designation", "# Required", "# On Roll", "Deficit"],
  "Leave Planner": [
    "STAFF NAME",
    "STAFF NUMBER",
    "RANK",
    "NUMBER OF DAYS LEAVE ACCRUED",
    "NUMBER OF DAYS TAKEN",
    "DATE OF COMMENCEMENT",
    "DATE OF RESUMPTION",
    "REMARK",
  ],
  "EQA Schedule": ["TEST", "EQA PROVIDER", "FREQUENCY", "ALTERNATIVE"],
  "Chemical Inventory": [
    "Chemical Name",
    "Date received",
    "Quantity",
    "Unit",
    "Container",
    "Physical State",
    "MSDS Location",
    "Safety Notice",
    "Storage Location",
  ],
  "2025 Workplan": [
    "Key Activities",
    "Responsible",
    "Due time",
    "Timelines",
    "Deliverables",
    "Status",
  ],
  "Calibration Record": [
    "EQUIPMENT NAME",
    "EQUIPMENT NUMBER",
    "DATE OF LAST CALIBRATION",
    "STATUS",
    "NEXT CALIBRATION DUE DATE",
    "CALIBRATION INSTITUTION",
  ],
  "EQA Action Plan": [
    "#",
    "DEPARTMENT",
    "ANALYTE",
    "EQA PROVIDER",
    "DATE OF RECEIPT OF SAMPLE",
    "DATE ANALYZED",
    "DATE RESULT SUBMITTED",
    "SUBMITTED BY",
    "SCORE",
    "ACCEPTABLITY",
    "ACTION PLAN (Applicable)",
    "RESPONSIBLE PERSON",
    "STATUS",
  ],
  "Staff Duty Roster": [
    "#",
    "STAFF NAME",
    "STAFF NUMBER",
    "RANK",
    "DUTY STATION",
    "PERIOD",
    "WORK STATION DUTIES",
  ],
  "Reagent Log Information": [
    "NAME OF REAGENT",
    "OLD LOT NUMBER",
    "NEW LOT NUMBER",
    "DATE OF MANUFACTURE",
    "DATE OF EXPIRATION",
    "LOT-LOT COMPARISM ACCEPTABILITY",
    "REMARKS",
  ],
  "Environment Condition Record": [
    "#",
    "Date",
    "Unit",
    "Has environmental conditions being check?",
    "Is the any conditon out of range",
    "What action was taken for the out of range?",
    "Have all the charts been reviewed?",
    "Status of Action",
  ],
  "Consumable Tracker": [
    "#",
    "DATE",
    "CONSUMBLE NAME",
    "LOT NUMNER (IF APPLICABLE)",
    "DATE OF RECEIPT FORM STORE",
    "CONSUMABLES RECEIVED BY",
    "QUANTITY RECEIVED FROM STORE",
    "QUANTITY UTILISED BY THE TIME OF NEXT REQUISTION",
    "QUANTITY UNDER STORAGE AT THE LAB UNIT",
    "PERSONNEL MAKING REQUISITION",
  ],

  "Quality Indicator": [
    "INDICATOR",
    "TARGET",
    "MICROBIOLOGY",
    "IMMUNOLOGY",
    "HAEMATOLOGY",
    "CHEMICAL PATHOLOGY",
  ],
  "Non-Conformity Register": [
    "Date",
    "Non-conformity Number",
    "A detailed description of non-conformance and the risk it poses",
    "Classification",
    "Risk level",
    "Root cause",
    "Corrective Action(s) taken",
    "Person responsible",
    "Timeframe to undertake the corrective action",
    "Deadline to report to that corrective action has been completed",
    "Evidence of implemetnation of corrective actions",
    "Follow-up",
    "Closure Comment",
    "Outcome (to be completed once the non-conformance is closed)",
  ],
  "Management Review Action Plan": [
    "#",
    "Department",
    "Action item",
    "Person Responsible",
    "Timeline",
    "Proposed Budget (if applicable)",
    "Status",
    "Evidence of implementation",
  ],
  "Competency Register": [
    "STAFF NAME",
    "STAFF NUMBER",
    "RANK",
    "DUTY STATION",
    "LAST DATE OF ASSESSMENT",
    "AREAS OF COMPETENCY (LIST)",
    "AREA REQUIRING TRAINING (IF APPLICABLE)",
    "DATE DUE FOR NEXT ASSESSMENT",
  ],
  "Staff Suggestions": [
    "#",
    "Key finding",
    "Possible root cause",
    "Corrective Actions",
    "Person Responsible",
    "Timeline",
    "Status",
  ],
};

// Mock authentication - simulate user login
function initializeAuth() {
  document.getElementById("userIdDisplay").textContent = `User ID: ${userId}`;
  renderDashboard();
}

// Function to get mock data collection
function getMockCollection(collectionName) {
  if (!mockData[collectionName]) {
    mockData[collectionName] = [];
  }
  return mockData[collectionName];
}

// TODO: remove this, Generate some sample data for demonstration
function generateSampleData() {
  // Add sample data for a few collections
  mockData["competency-register"] = [
    {
      "STAFF NAME": "John Doe",
      "STAFF NUMBER": "EMP001",
      RANK: "Senior Technician",
      "DUTY STATION": "Laboratory A",
      "LAST DATE OF ASSESSMENT": "2024-01-15",
      "AREAS OF COMPETENCY (LIST)": "Microbiology, Sample Processing",
      "AREA REQUIRING TRAINING (IF APPLICABLE)": "Quality Control",
      "DATE DUE FOR NEXT ASSESSMENT": "2025-01-15",
      createdAt: new Date("2024-01-15"),
    },
    {
      "STAFF NAME": "Jane Smith",
      "STAFF NUMBER": "EMP002",
      RANK: "Lab Manager",
      "DUTY STATION": "Laboratory B",
      "LAST DATE OF ASSESSMENT": "2024-02-10",
      "AREAS OF COMPETENCY (LIST)": "Management, Quality Assurance",
      "AREA REQUIRING TRAINING (IF APPLICABLE)": "N/A",
      "DATE DUE FOR NEXT ASSESSMENT": "2025-02-10",
      createdAt: new Date("2024-02-10"),
    },
  ];

  mockData["leave-planner"] = [
    {
      "STAFF NAME": "John Doe",
      "STAFF NUMBER": "EMP001",
      RANK: "Senior Technician",
      "NUMBER OF DAYS LEAVE ACCRUED": "25",
      "NUMBER OF DAYS TAKEN": "10",
      "DATE OF COMMENCEMENT": "2024-07-01",
      "DATE OF RESUMPTION": "2024-07-11",
      REMARK: "Annual leave",
      createdAt: new Date("2024-06-15"),
    },
  ];

  mockData["calibration-record"] = [
    {
      "EQUIPMENT NAME": "Centrifuge Model X",
      "EQUIPMENT NUMBER": "EQ001",
      "DATE OF LAST CALIBRATION": "2024-06-01",
      STATUS: "Calibrated",
      "NEXT CALIBRATION DUE DATE": "2025-06-01",
      "CALIBRATION INSTITUTION": "Tech Calibration Services",
      createdAt: new Date("2024-06-01"),
    },
  ];
}

// Function to render a loading spinner
function showLoading(element) {
  element.innerHTML = `
    <div class="flex flex-col items-center justify-center p-8">
      <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-4 text-gray-500">Loading...</p>
    </div>
  `;
}

// Function to create a table from fetched data
function createTable(headers, data) {
  const table = document.createElement("table");
  table.className = "min-w-full table-auto border-collapse";

  const thead = document.createElement("thead");
  thead.className = "bg-gray-200 sticky top-0";
  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    if (header) {
      const th = document.createElement("th");
      th.className =
        "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
      th.textContent = header;
      headerRow.appendChild(th);
    }
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.className = "bg-white divide-y divide-gray-200";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";
    headers.forEach((header) => {
      if (header) {
        const td = document.createElement("td");
        td.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-800";
        td.textContent = item[header];
        row.appendChild(td);
      }
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}

// Main function to render a specific section
function renderSection(sectionName, headers) {
  const contentDiv = document.getElementById("content");
  showLoading(contentDiv);

  // TODO: remove this: Simulate loading delay
  setTimeout(() => {
    const pageTitle = sectionName
      .replace(/-/g, " ")
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    contentDiv.innerHTML = `
      <h2 class="text-3xl font-bold text-gray-800 mb-6">${pageTitle}</h2>
      <div id="table-container" class="overflow-x-auto rounded-lg shadow-md border border-gray-200 max-h-96"></div>
      <div id="form-container"></div>
    `;

    const tableContainer = document.getElementById("table-container");

    // TODO: Use actual data instead of mock data
    const data = getMockCollection(sectionName);

    if (data.length === 0) {
      tableContainer.innerHTML = `
        <div class="text-center p-8 text-gray-500">
          <p class="text-lg">No records found.</p>
          <p class="text-sm mt-2">Add your first record using the form below.</p>
        </div>
      `;
    } else {
      tableContainer.appendChild(createTable(headers, data));
    }
  }, 500);
}

// Function to render the main dashboard
function renderDashboard() {
  const contentDiv = document.getElementById("content");

  const dashboardContent = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Records Dashboard</h2>
    <div class="dashboard-grid">
      ${Object.keys(sections)
        .map(
          (key) => `
          <div class="card p-6 bg-blue-100 text-blue-800 rounded-xl shadow-md text-center font-semibold" data-section="${key}">
            ${key}
          </div>
        `
        )
        .join("")}
    </div>
  `;
  contentDiv.innerHTML = dashboardContent;

  // Add event listeners to the dashboard cards
  document.querySelectorAll(".dashboard-grid .card").forEach((card) => {
    card.addEventListener("click", () => {
      const sectionName = card.dataset.section;
      if (sectionName === "Weekly Activity Tracker") {
        renderWeekLyActivityTracker();
      } else handleNavClick(sectionName);
    });
  });
}

// Function to handle navigation clicks
function handleNavClick(sectionName) {
  // Update active state for nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.section === sectionName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  renderSection(sectionName.toLowerCase().replace(/ /g, "-"), sections[sectionName]);
}

// Generate dynamic nav links
function generateNavigation() {
  const nav = document.querySelector("#sidebar nav");
  Object.keys(sections).forEach((sectionName) => {
    const navLink = document.createElement("a");
    navLink.href = "#";
    navLink.id = `nav-${sectionName.toLowerCase().replace(/ /g, "-")}`;
    navLink.className = "nav-link block text-gray-700 rounded-lg mb-2";
    navLink.textContent = sectionName;
    navLink.dataset.section = sectionName;
    nav.appendChild(navLink);

    navLink.addEventListener("click", (e) => {
      e.preventDefault();
      handleNavClick(sectionName);
    });
  });
}

// // Initialize the application
function initializeApp() {
  generateNavigation();
  generateSampleData();
  initializeAuth();
}

document.getElementById("nav-dashboard").addEventListener("click", (e) => {
  initializeApp();
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  document.getElementById("nav-dashboard").classList.add("active");
});

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);

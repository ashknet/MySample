// JSON Data Structure for Power BI Front-end Application

const appData = {
    kpis: {
        finance: {
            title: "Finance KPIs",
            cards: [
                {
                    id: "patient-count-ytd",
                    value: "52,319",
                    label: "Patient Count YTD",
                    trend: "+12.5%",
                    trendType: "positive",
                    icon: "fas fa-users"
                },
                {
                    id: "patient-visits-ytd",
                    value: "3,211",
                    label: "Patient Visits YTD",
                    trend: "+8.3%",
                    trendType: "positive",
                    icon: "fas fa-calendar-check"
                },
                {
                    id: "inpatient-count",
                    value: "16,500",
                    label: "Inpatient Count",
                    trend: "-2.1%",
                    trendType: "negative",
                    icon: "fas fa-hospital"
                },
                {
                    id: "emergency-visits",
                    value: "5,855",
                    label: "Emergency Visits",
                    trend: "+5.7%",
                    trendType: "positive",
                    icon: "fas fa-ambulance"
                }
            ],
            charts: [
                {
                    id: "patient-count-chart",
                    title: "Patient Count & Patient Visits By Discharge Month Year",
                    type: "bar",
                    data: "chart-data-1"
                },
                {
                    id: "total-charges-chart",
                    title: "Total Charges Last 18 Months",
                    type: "line",
                    data: "chart-data-2"
                }
            ]
        },
        operations: {
            title: "Operations KPIs",
            cards: [
                {
                    id: "bed-occupancy",
                    value: "87%",
                    label: "Bed Occupancy Rate",
                    trend: "+3.2%",
                    trendType: "positive",
                    icon: "fas fa-bed"
                },
                {
                    id: "avg-length-stay",
                    value: "4.2",
                    label: "Avg Length of Stay (days)",
                    trend: "-0.5%",
                    trendType: "positive",
                    icon: "fas fa-clock"
                },
                {
                    id: "readmission-rate",
                    value: "12.3%",
                    label: "Readmission Rate",
                    trend: "-1.8%",
                    trendType: "positive",
                    icon: "fas fa-redo"
                },
                {
                    id: "patient-satisfaction",
                    value: "4.6",
                    label: "Patient Satisfaction Score",
                    trend: "+0.2%",
                    trendType: "positive",
                    icon: "fas fa-star"
                }
            ]
        },
        "patient-experience": {
            title: "Patient Experience KPIs",
            cards: [
                {
                    id: "wait-time",
                    value: "18",
                    label: "Avg Wait Time (min)",
                    trend: "-12%",
                    trendType: "positive",
                    icon: "fas fa-hourglass-half"
                },
                {
                    id: "patient-complaints",
                    value: "23",
                    label: "Patient Complaints",
                    trend: "-15%",
                    trendType: "positive",
                    icon: "fas fa-comment-dots"
                },
                {
                    id: "discharge-satisfaction",
                    value: "92%",
                    label: "Discharge Satisfaction",
                    trend: "+2.1%",
                    trendType: "positive",
                    icon: "fas fa-thumbs-up"
                },
                {
                    id: "follow-up-rate",
                    value: "78%",
                    label: "Follow-up Rate",
                    trend: "+5.3%",
                    trendType: "positive",
                    icon: "fas fa-phone"
                }
            ]
        },
        quality: {
            title: "Quality KPIs",
            cards: [
                {
                    id: "infection-rate",
                    value: "1.2%",
                    label: "Infection Rate",
                    trend: "-0.3%",
                    trendType: "positive",
                    icon: "fas fa-shield-virus"
                },
                {
                    id: "medication-errors",
                    value: "0.8%",
                    label: "Medication Error Rate",
                    trend: "-0.2%",
                    trendType: "positive",
                    icon: "fas fa-pills"
                },
                {
                    id: "fall-rate",
                    value: "2.1%",
                    label: "Patient Fall Rate",
                    trend: "-0.5%",
                    trendType: "positive",
                    icon: "fas fa-walking"
                },
                {
                    id: "mortality-rate",
                    value: "3.4%",
                    label: "Mortality Rate",
                    trend: "-0.1%",
                    trendType: "positive",
                    icon: "fas fa-heartbeat"
                }
            ]
        }
    },
    
    dashboards: [
        {
            id: "finance",
            title: "Finance Dashboard",
            description: "Financial metrics and revenue analysis",
            icon: "fas fa-chart-pie",
            reportCount: 12,
            lastUpdated: "2 hours ago",
            reports: [
                {
                    id: "revenue-analysis",
                    title: "Revenue Analysis",
                    description: "Monthly revenue breakdown and trends",
                    type: "report"
                },
                {
                    id: "cost-analysis",
                    title: "Cost Analysis",
                    description: "Department-wise cost breakdown",
                    type: "report"
                },
                {
                    id: "profit-margin",
                    title: "Profit Margin Report",
                    description: "Profit margin analysis by service line",
                    type: "report"
                }
            ]
        },
        {
            id: "infusion",
            title: "Finance Dashboard - Infusion",
            description: "Infusion center financial tracking",
            icon: "fas fa-infusion",
            reportCount: 8,
            lastUpdated: "1 hour ago",
            reports: [
                {
                    id: "infusion-revenue",
                    title: "Infusion Revenue Report",
                    description: "Revenue from infusion services",
                    type: "report"
                },
                {
                    id: "infusion-costs",
                    title: "Infusion Cost Analysis",
                    description: "Cost analysis for infusion center",
                    type: "report"
                }
            ]
        },
        {
            id: "medonc",
            title: "Finance Dashboard - MedOnc",
            description: "Medical oncology financial reports",
            icon: "fas fa-user-md",
            reportCount: 15,
            lastUpdated: "30 min ago",
            reports: [
                {
                    id: "medonc-revenue",
                    title: "Medical Oncology Revenue",
                    description: "Revenue from medical oncology services",
                    type: "report"
                },
                {
                    id: "chemotherapy-costs",
                    title: "Chemotherapy Cost Analysis",
                    description: "Cost analysis for chemotherapy treatments",
                    type: "report"
                },
                {
                    id: "patient-volume",
                    title: "Patient Volume Report",
                    description: "Medical oncology patient volume trends",
                    type: "report"
                }
            ]
        },
        {
            id: "radonc",
            title: "Finance Dashboard - RadOnc",
            description: "Radiation oncology financial data",
            icon: "fas fa-radiation",
            reportCount: 10,
            lastUpdated: "45 min ago",
            reports: [
                {
                    id: "radonc-revenue",
                    title: "Radiation Oncology Revenue",
                    description: "Revenue from radiation oncology services",
                    type: "report"
                },
                {
                    id: "treatment-costs",
                    title: "Treatment Cost Analysis",
                    description: "Cost analysis for radiation treatments",
                    type: "report"
                }
            ]
        }
    ],
    
    reports: {
        categories: [
            {
                id: "accounting",
                name: "Accounting",
                icon: "fas fa-calculator",
                count: 23,
                description: "Financial accounting and bookkeeping reports",
                reports: [
                    { id: "general-ledger", title: "General Ledger Report", type: "report" },
                    { id: "accounts-payable", title: "Accounts Payable Report", type: "report" },
                    { id: "accounts-receivable", title: "Accounts Receivable Report", type: "report" }
                ]
            },
            {
                id: "adt",
                name: "ADT",
                icon: "fas fa-exchange-alt",
                count: 15,
                description: "Admission, Discharge, Transfer reports",
                reports: [
                    { id: "admission-summary", title: "Admission Summary", type: "report" },
                    { id: "discharge-summary", title: "Discharge Summary", type: "report" },
                    { id: "transfer-log", title: "Transfer Log Report", type: "report" }
                ]
            },
            {
                id: "ambulatory",
                name: "Ambulatory",
                icon: "fas fa-walking",
                count: 18,
                description: "Outpatient and ambulatory care reports",
                reports: [
                    { id: "outpatient-visits", title: "Outpatient Visits Report", type: "report" },
                    { id: "clinic-schedule", title: "Clinic Schedule Report", type: "report" }
                ]
            },
            {
                id: "anesthesia",
                name: "Anesthesia",
                icon: "fas fa-procedures",
                count: 12,
                description: "Anesthesia and surgical reports",
                reports: [
                    { id: "anesthesia-log", title: "Anesthesia Log", type: "report" },
                    { id: "surgical-schedule", title: "Surgical Schedule", type: "report" }
                ]
            },
            {
                id: "appointments",
                name: "Appointments",
                icon: "fas fa-calendar-alt",
                count: 8,
                description: "Appointment scheduling and management",
                reports: [
                    { id: "appointment-summary", title: "Appointment Summary", type: "report" },
                    { id: "no-show-report", title: "No-Show Report", type: "report" }
                ]
            },
            {
                id: "archive",
                name: "Archive",
                icon: "fas fa-archive",
                count: 45,
                description: "Historical and archived reports",
                reports: [
                    { id: "historical-data", title: "Historical Data Report", type: "report" },
                    { id: "archived-records", title: "Archived Records", type: "report" }
                ]
            },
            {
                id: "behavioral-health",
                name: "Behavioral Health",
                icon: "fas fa-brain",
                count: 20,
                description: "Mental health and behavioral reports",
                reports: [
                    { id: "mental-health-census", title: "Mental Health Census", type: "report" },
                    { id: "therapy-sessions", title: "Therapy Sessions Report", type: "report" }
                ]
            },
            {
                id: "cardiology",
                name: "Cardiology",
                icon: "fas fa-heart",
                count: 25,
                description: "Cardiology and heart care reports",
                reports: [
                    { id: "cardiac-procedures", title: "Cardiac Procedures Report", type: "report" },
                    { id: "heart-monitoring", title: "Heart Monitoring Report", type: "report" }
                ]
            },
            {
                id: "census",
                name: "Census",
                icon: "fas fa-users",
                count: 10,
                description: "Patient census and occupancy reports",
                reports: [
                    { id: "daily-census", title: "Daily Census Report", type: "report" },
                    { id: "bed-occupancy", title: "Bed Occupancy Report", type: "report" }
                ]
            },
            {
                id: "clinical",
                name: "Clinical",
                icon: "fas fa-stethoscope",
                count: 35,
                description: "Clinical care and treatment reports",
                reports: [
                    { id: "clinical-outcomes", title: "Clinical Outcomes Report", type: "report" },
                    { id: "treatment-plans", title: "Treatment Plans Report", type: "report" }
                ]
            },
            {
                id: "contracting",
                name: "Contracting",
                icon: "fas fa-handshake",
                count: 15,
                description: "Contract and agreement reports",
                reports: [
                    { id: "contract-summary", title: "Contract Summary", type: "report" },
                    { id: "vendor-agreements", title: "Vendor Agreements", type: "report" }
                ]
            },
            {
                id: "covid-19",
                name: "COVID-19",
                icon: "fas fa-virus",
                count: 12,
                description: "COVID-19 related reports and analytics",
                reports: [
                    { id: "covid-cases", title: "COVID-19 Cases Report", type: "report" },
                    { id: "vaccination-status", title: "Vaccination Status Report", type: "report" }
                ]
            },
            {
                id: "crm",
                name: "CRM",
                icon: "fas fa-address-book",
                count: 8,
                description: "Customer relationship management reports",
                reports: [
                    { id: "patient-relationships", title: "Patient Relationships", type: "report" },
                    { id: "communication-log", title: "Communication Log", type: "report" }
                ]
            },
            {
                id: "custom-scheduled",
                name: "Custom Scheduled",
                icon: "fas fa-clock",
                count: 6,
                description: "Custom scheduled reports",
                reports: [
                    { id: "scheduled-reports", title: "Scheduled Reports", type: "report" }
                ]
            },
            {
                id: "customer-service",
                name: "Customer Service",
                icon: "fas fa-headset",
                count: 10,
                description: "Customer service and support reports",
                reports: [
                    { id: "service-tickets", title: "Service Tickets Report", type: "report" },
                    { id: "customer-feedback", title: "Customer Feedback Report", type: "report" }
                ]
            },
            {
                id: "demographics",
                name: "Demographics",
                icon: "fas fa-chart-bar",
                count: 18,
                description: "Patient demographic reports",
                reports: [
                    { id: "patient-demographics", title: "Patient Demographics", type: "report" },
                    { id: "population-analysis", title: "Population Analysis", type: "report" }
                ]
            },
            {
                id: "diagnosis",
                name: "Diagnosis",
                icon: "fas fa-clipboard-list",
                count: 22,
                description: "Diagnosis and medical coding reports",
                reports: [
                    { id: "diagnosis-summary", title: "Diagnosis Summary", type: "report" },
                    { id: "icd-codes", title: "ICD Codes Report", type: "report" }
                ]
            },
            {
                id: "discharges",
                name: "Discharges",
                icon: "fas fa-sign-out-alt",
                count: 14,
                description: "Patient discharge reports",
                reports: [
                    { id: "discharge-summary", title: "Discharge Summary", type: "report" },
                    { id: "discharge-planning", title: "Discharge Planning", type: "report" }
                ]
            },
            {
                id: "emergency",
                name: "Emergency",
                icon: "fas fa-ambulance",
                count: 16,
                description: "Emergency department reports",
                reports: [
                    { id: "er-census", title: "ER Census Report", type: "report" },
                    { id: "triage-summary", title: "Triage Summary", type: "report" }
                ]
            },
            {
                id: "encounters",
                name: "Encounters",
                icon: "fas fa-user-md",
                count: 20,
                description: "Patient encounter reports",
                reports: [
                    { id: "encounter-summary", title: "Encounter Summary", type: "report" },
                    { id: "provider-encounters", title: "Provider Encounters", type: "report" }
                ]
            },
            {
                id: "endoscopy",
                name: "Endoscopy",
                icon: "fas fa-microscope",
                count: 8,
                description: "Endoscopy procedure reports",
                reports: [
                    { id: "endoscopy-procedures", title: "Endoscopy Procedures", type: "report" }
                ]
            },
            {
                id: "extracts",
                name: "Extracts",
                icon: "fas fa-download",
                count: 12,
                description: "Data extraction reports",
                reports: [
                    { id: "data-extracts", title: "Data Extracts", type: "report" }
                ]
            },
            {
                id: "finance",
                name: "Finance",
                icon: "fas fa-dollar-sign",
                count: 30,
                description: "Financial reports and analytics",
                reports: [
                    { id: "financial-summary", title: "Financial Summary", type: "report" },
                    { id: "revenue-analysis", title: "Revenue Analysis", type: "report" },
                    { id: "cost-analysis", title: "Cost Analysis", type: "report" }
                ]
            },
            {
                id: "flowsheet",
                name: "Flowsheet",
                icon: "fas fa-table",
                count: 15,
                description: "Clinical flowsheet reports",
                reports: [
                    { id: "clinical-flowsheet", title: "Clinical Flowsheet", type: "report" }
                ]
            },
            {
                id: "general",
                name: "General",
                icon: "fas fa-folder",
                count: 25,
                description: "General purpose reports",
                reports: [
                    { id: "general-reports", title: "General Reports", type: "report" }
                ]
            },
            {
                id: "him",
                name: "HIM",
                icon: "fas fa-file-medical",
                count: 18,
                description: "Health Information Management reports",
                reports: [
                    { id: "medical-records", title: "Medical Records Report", type: "report" },
                    { id: "coding-audit", title: "Coding Audit Report", type: "report" }
                ]
            },
            {
                id: "hospice",
                name: "Hospice",
                icon: "fas fa-heart",
                count: 8,
                description: "Hospice care reports",
                reports: [
                    { id: "hospice-census", title: "Hospice Census", type: "report" }
                ]
            },
            {
                id: "hospital-billing",
                name: "Hospital Billing",
                icon: "fas fa-receipt",
                count: 20,
                description: "Hospital billing reports",
                reports: [
                    { id: "billing-summary", title: "Billing Summary", type: "report" },
                    { id: "claims-report", title: "Claims Report", type: "report" }
                ]
            },
            {
                id: "human-resources",
                name: "Human Resources",
                icon: "fas fa-users-cog",
                count: 15,
                description: "HR and staffing reports",
                reports: [
                    { id: "staffing-report", title: "Staffing Report", type: "report" },
                    { id: "employee-turnover", title: "Employee Turnover", type: "report" }
                ]
            },
            {
                id: "imaging",
                name: "Imaging",
                icon: "fas fa-x-ray",
                count: 12,
                description: "Medical imaging reports",
                reports: [
                    { id: "imaging-procedures", title: "Imaging Procedures", type: "report" },
                    { id: "radiology-report", title: "Radiology Report", type: "report" }
                ]
            },
            {
                id: "informatics-team",
                name: "Informatics Team",
                icon: "fas fa-laptop-code",
                count: 8,
                description: "Informatics and IT reports",
                reports: [
                    { id: "system-performance", title: "System Performance", type: "report" }
                ]
            },
            {
                id: "inpatient",
                name: "Inpatient",
                icon: "fas fa-bed",
                count: 22,
                description: "Inpatient care reports",
                reports: [
                    { id: "inpatient-census", title: "Inpatient Census", type: "report" },
                    { id: "length-of-stay", title: "Length of Stay Report", type: "report" }
                ]
            },
            {
                id: "laboratory",
                name: "Laboratory",
                icon: "fas fa-flask",
                count: 18,
                description: "Laboratory test reports",
                reports: [
                    { id: "lab-results", title: "Lab Results Report", type: "report" },
                    { id: "test-volume", title: "Test Volume Report", type: "report" }
                ]
            },
            {
                id: "managed-care",
                name: "Managed Care",
                icon: "fas fa-shield-alt",
                count: 10,
                description: "Managed care reports",
                reports: [
                    { id: "managed-care-summary", title: "Managed Care Summary", type: "report" }
                ]
            },
            {
                id: "management",
                name: "Management",
                icon: "fas fa-chart-line",
                count: 25,
                description: "Management and executive reports",
                reports: [
                    { id: "executive-dashboard", title: "Executive Dashboard", type: "report" },
                    { id: "kpi-summary", title: "KPI Summary", type: "report" }
                ]
            },
            {
                id: "marketing",
                name: "Marketing",
                icon: "fas fa-bullhorn",
                count: 8,
                description: "Marketing and outreach reports",
                reports: [
                    { id: "marketing-campaigns", title: "Marketing Campaigns", type: "report" }
                ]
            },
            {
                id: "medical-affairs",
                name: "Medical Affairs",
                icon: "fas fa-user-md",
                count: 12,
                description: "Medical affairs reports",
                reports: [
                    { id: "medical-affairs-summary", title: "Medical Affairs Summary", type: "report" }
                ]
            },
            {
                id: "mychart",
                name: "MyChart",
                icon: "fas fa-mobile-alt",
                count: 6,
                description: "MyChart patient portal reports",
                reports: [
                    { id: "mychart-usage", title: "MyChart Usage Report", type: "report" }
                ]
            },
            {
                id: "newborn",
                name: "Newborn",
                icon: "fas fa-baby",
                count: 8,
                description: "Newborn and pediatric reports",
                reports: [
                    { id: "newborn-census", title: "Newborn Census", type: "report" }
                ]
            },
            {
                id: "oncology-womens-services",
                name: "Oncology and Women's Services",
                icon: "fas fa-ribbon",
                count: 20,
                description: "Oncology and women's health reports",
                reports: [
                    { id: "oncology-census", title: "Oncology Census", type: "report" },
                    { id: "womens-health", title: "Women's Health Report", type: "report" }
                ]
            },
            {
                id: "operations-sep",
                name: "Operations SEP",
                icon: "fas fa-cogs",
                count: 15,
                description: "Operations and SEP reports",
                reports: [
                    { id: "operations-summary", title: "Operations Summary", type: "report" }
                ]
            },
            {
                id: "optime",
                name: "Optime",
                icon: "fas fa-clock",
                count: 10,
                description: "Optime scheduling reports",
                reports: [
                    { id: "optime-schedule", title: "Optime Schedule", type: "report" }
                ]
            },
            {
                id: "orders",
                name: "Orders",
                icon: "fas fa-clipboard-check",
                count: 12,
                description: "Medical orders reports",
                reports: [
                    { id: "order-summary", title: "Order Summary", type: "report" }
                ]
            },
            {
                id: "patient-flow",
                name: "Patient Flow",
                icon: "fas fa-route",
                count: 8,
                description: "Patient flow and throughput reports",
                reports: [
                    { id: "patient-flow-analysis", title: "Patient Flow Analysis", type: "report" }
                ]
            },
            {
                id: "pcms",
                name: "PCMs",
                icon: "fas fa-user-nurse",
                count: 6,
                description: "Patient Care Managers reports",
                reports: [
                    { id: "pcm-summary", title: "PCM Summary", type: "report" }
                ]
            },
            {
                id: "pharmacy",
                name: "Pharmacy",
                icon: "fas fa-pills",
                count: 14,
                description: "Pharmacy and medication reports",
                reports: [
                    { id: "pharmacy-inventory", title: "Pharmacy Inventory", type: "report" },
                    { id: "medication-usage", title: "Medication Usage", type: "report" }
                ]
            },
            {
                id: "planning",
                name: "Planning",
                icon: "fas fa-calendar-alt",
                count: 10,
                description: "Strategic planning reports",
                reports: [
                    { id: "strategic-plan", title: "Strategic Plan Report", type: "report" }
                ]
            },
            {
                id: "population-health",
                name: "Population Health",
                icon: "fas fa-globe",
                count: 12,
                description: "Population health reports",
                reports: [
                    { id: "population-health-summary", title: "Population Health Summary", type: "report" }
                ]
            },
            {
                id: "pos",
                name: "POS",
                icon: "fas fa-cash-register",
                count: 8,
                description: "Point of service reports",
                reports: [
                    { id: "pos-summary", title: "POS Summary", type: "report" }
                ]
            },
            {
                id: "practice-management",
                name: "Practice Management",
                icon: "fas fa-clinic-medical",
                count: 15,
                description: "Practice management reports",
                reports: [
                    { id: "practice-summary", title: "Practice Summary", type: "report" }
                ]
            },
            {
                id: "professional-billing",
                name: "Professional Billing",
                icon: "fas fa-file-invoice-dollar",
                count: 18,
                description: "Professional billing reports",
                reports: [
                    { id: "professional-billing-summary", title: "Professional Billing Summary", type: "report" }
                ]
            },
            {
                id: "provider-achievement",
                name: "Provider Achievement",
                icon: "fas fa-trophy",
                count: 10,
                description: "Provider performance reports",
                reports: [
                    { id: "provider-performance", title: "Provider Performance", type: "report" }
                ]
            },
            {
                id: "quality",
                name: "Quality",
                icon: "fas fa-award",
                count: 25,
                description: "Quality assurance reports",
                reports: [
                    { id: "quality-metrics", title: "Quality Metrics", type: "report" },
                    { id: "patient-safety", title: "Patient Safety Report", type: "report" }
                ]
            },
            {
                id: "quality-payment-program",
                name: "Quality Payment Program",
                icon: "fas fa-medal",
                count: 8,
                description: "QPP and value-based care reports",
                reports: [
                    { id: "qpp-summary", title: "QPP Summary", type: "report" }
                ]
            },
            {
                id: "radiology",
                name: "Radiology",
                icon: "fas fa-x-ray",
                count: 16,
                description: "Radiology and imaging reports",
                reports: [
                    { id: "radiology-procedures", title: "Radiology Procedures", type: "report" }
                ]
            },
            {
                id: "referrals",
                name: "Referrals",
                icon: "fas fa-exchange-alt",
                count: 12,
                description: "Patient referral reports",
                reports: [
                    { id: "referral-summary", title: "Referral Summary", type: "report" }
                ]
            },
            {
                id: "registration",
                name: "Registration",
                icon: "fas fa-user-plus",
                count: 10,
                description: "Patient registration reports",
                reports: [
                    { id: "registration-summary", title: "Registration Summary", type: "report" }
                ]
            },
            {
                id: "regulatory-data",
                name: "Regulatory Data",
                icon: "fas fa-gavel",
                count: 15,
                description: "Regulatory compliance reports",
                reports: [
                    { id: "regulatory-compliance", title: "Regulatory Compliance", type: "report" }
                ]
            },
            {
                id: "reimbursement",
                name: "Reimbursement",
                icon: "fas fa-money-bill-wave",
                count: 12,
                description: "Reimbursement reports",
                reports: [
                    { id: "reimbursement-summary", title: "Reimbursement Summary", type: "report" }
                ]
            },
            {
                id: "revenue-cycle-management",
                name: "Revenue Cycle Management",
                icon: "fas fa-chart-line",
                count: 20,
                description: "Revenue cycle reports",
                reports: [
                    { id: "revenue-cycle-summary", title: "Revenue Cycle Summary", type: "report" }
                ]
            },
            {
                id: "self-service-reports",
                name: "Self Service Reports",
                icon: "fas fa-user-cog",
                count: 8,
                description: "Self-service reporting tools",
                reports: [
                    { id: "self-service-dashboard", title: "Self Service Dashboard", type: "report" }
                ]
            },
            {
                id: "sb-sandbox",
                name: "S.B. Sandbox",
                icon: "fas fa-play",
                count: 5,
                description: "Sandbox and testing reports",
                reports: [
                    { id: "sandbox-reports", title: "Sandbox Reports", type: "report" }
                ]
            },
            {
                id: "supply-chain-management",
                name: "Supply Chain Management",
                icon: "fas fa-boxes",
                count: 12,
                description: "Supply chain and inventory reports",
                reports: [
                    { id: "inventory-summary", title: "Inventory Summary", type: "report" }
                ]
            },
            {
                id: "surgery",
                name: "Surgery",
                icon: "fas fa-cut",
                count: 18,
                description: "Surgical reports and analytics",
                reports: [
                    { id: "surgical-procedures", title: "Surgical Procedures", type: "report" },
                    { id: "or-utilization", title: "OR Utilization", type: "report" }
                ]
            },
            {
                id: "template",
                name: "Template",
                icon: "fas fa-file-alt",
                count: 6,
                description: "Report templates",
                reports: [
                    { id: "report-templates", title: "Report Templates", type: "report" }
                ]
            },
            {
                id: "therapy",
                name: "Therapy",
                icon: "fas fa-dumbbell",
                count: 10,
                description: "Physical and occupational therapy reports",
                reports: [
                    { id: "therapy-sessions", title: "Therapy Sessions", type: "report" }
                ]
            }
        ]
    },
    
    user: {
        name: "John Doe",
        role: "Administrator",
        department: "Oncology and Women's Services",
        avatar: "https://via.placeholder.com/32",
        permissions: ["view", "edit", "create", "delete"]
    },
    
    settings: {
        theme: "light",
        language: "en",
        notifications: true,
        autoRefresh: true,
        refreshInterval: 300000 // 5 minutes
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appData;
}
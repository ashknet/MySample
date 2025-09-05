// Classic Business Application JavaScript
$(document).ready(function() {
    'use strict';
    
    // Initialize the classic application
    initializeClassicApp();
    
    function initializeClassicApp() {
        updateSystemTime();
        setupEventListeners();
        loadReportsTree();
        setupContextMenu();
        setupKeyboardShortcuts();
        
        // Update time every second
        setInterval(updateSystemTime, 1000);
    }
    
    // System Time Display
    function updateSystemTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        $('#systemTime').text(timeString);
    }
    
    // Event Listeners
    function setupEventListeners() {
        // Menu interactions
        $('.menu-item').on('click', function(e) {
            e.stopPropagation();
            const menuText = $(this).find('span').text();
            handleMenuAction(menuText);
        });
        
        // Toolbar button clicks
        $('.toolbar-btn').on('click', function() {
            const title = $(this).attr('title');
            handleToolbarAction(title);
        });
        
        // Navigation interactions
        $('.nav-header.expandable').on('click', function() {
            toggleNavSection($(this));
        });
        
        $('.nav-item').on('click', function() {
            const tab = $(this).data('tab');
            const dashboard = $(this).data('dashboard');
            
            if (tab) {
                openKPITab(tab);
            } else if (dashboard) {
                openDashboardTab(dashboard);
            }
        });
        
        // Tab management
        $('.tab-close').on('click', function(e) {
            e.stopPropagation();
            closeTab($(this).closest('.tab'));
        });
        
        // Quick access items
        $('.quick-access-item').on('click', function() {
            const action = $(this).data('action');
            handleQuickAccess(action);
        });
        
        // Button clicks
        $('.btn').on('click', function() {
            const buttonText = $(this).text().trim();
            handleButtonAction(buttonText);
        });
        
        // Search functionality
        $('#reportSearch').on('input', function() {
            const query = $(this).val();
            searchReports(query);
        });
        
        // Window controls
        $('.control-btn').on('click', function() {
            const action = $(this).hasClass('minimize') ? 'minimize' : 
                          $(this).hasClass('maximize') ? 'maximize' : 'close';
            handleWindowControl(action);
        });
    }
    
    // Navigation Management
    function toggleNavSection(header) {
        const submenu = header.next('.nav-submenu');
        const chevron = header.find('.fa-chevron-right');
        
        if (submenu.hasClass('expanded')) {
            submenu.removeClass('expanded').slideUp(200);
            header.removeClass('expanded');
            chevron.removeClass('fa-chevron-down').addClass('fa-chevron-right');
        } else {
            submenu.addClass('expanded').slideDown(200);
            header.addClass('expanded');
            chevron.removeClass('fa-chevron-right').addClass('fa-chevron-down');
        }
    }
    
    // Tab Management
    function openTab(tabId, title, content) {
        // Check if tab already exists
        let existingTab = $(`.tab[data-tab="${tabId}"]`);
        
        if (existingTab.length === 0) {
            // Create new tab
            const tabHtml = `
                <div class="tab" data-tab="${tabId}">
                    <span>${title}</span>
                    <button class="tab-close">×</button>
                </div>
            `;
            $('.tab-bar').append(tabHtml);
            
            // Create tab content
            const contentHtml = `
                <div class="tab-pane" id="${tabId}">
                    ${content}
                </div>
            `;
            $('.tab-content').append(contentHtml);
            
            existingTab = $(`.tab[data-tab="${tabId}"]`);
        }
        
        // Activate tab
        $('.tab').removeClass('active');
        $('.tab-pane').removeClass('active');
        existingTab.addClass('active');
        $(`#${tabId}`).addClass('active');
    }
    
    function closeTab(tab) {
        const tabId = tab.data('tab');
        
        // Don't close home tab
        if (tabId === 'home') return;
        
        tab.remove();
        $(`#${tabId}`).remove();
        
        // Activate home tab if no tabs left
        if ($('.tab').length === 0) {
            $('.tab[data-tab="home"]').addClass('active');
            $('#home').addClass('active');
        } else {
            // Activate the last tab
            $('.tab').last().addClass('active');
            $('.tab-pane').last().addClass('active');
        }
    }
    
    // KPI Management
    function openKPITab(tabKey) {
        const kpiData = appData.kpis[tabKey];
        if (!kpiData) return;
        
        const kpiCards = kpiData.cards.map(card => `
            <div class="kpi-card">
                <div class="kpi-icon">
                    <i class="${card.icon}"></i>
                </div>
                <div class="kpi-info">
                    <div class="kpi-value">${card.value}</div>
                    <div class="kpi-label">${card.label}</div>
                    <div class="kpi-trend ${card.trendType}">
                        <i class="fa fa-arrow-${card.trendType === 'positive' ? 'up' : 'down'}"></i>
                        <span>${card.trend}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        const content = `
            <div class="content-header">
                <h2>${kpiData.title}</h2>
                <div class="content-actions">
                    <button class="btn btn-primary">
                        <i class="fa fa-refresh"></i>
                        Refresh
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fa fa-download"></i>
                        Export
                    </button>
                </div>
            </div>
            <div class="kpi-content">
                <div class="kpi-grid">
                    ${kpiCards}
                </div>
                <div class="charts-section">
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Patient Count & Visits by Month</h3>
                            <div class="chart-controls">
                                <button class="btn btn-small">Export</button>
                                <button class="btn btn-small">Print</button>
                            </div>
                        </div>
                        <div class="chart-placeholder">
                            <i class="fa fa-bar-chart"></i>
                            <p>Chart will be displayed here</p>
                        </div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header">
                            <h3>Total Charges Last 18 Months</h3>
                            <div class="chart-controls">
                                <button class="btn btn-small">Export</button>
                                <button class="btn btn-small">Print</button>
                            </div>
                        </div>
                        <div class="chart-placeholder">
                            <i class="fa fa-line-chart"></i>
                            <p>Chart will be displayed here</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        openTab(`kpi-${tabKey}`, kpiData.title, content);
    }
    
    // Dashboard Management
    function openDashboardTab(dashboardId) {
        const dashboard = appData.dashboards.find(d => d.id === dashboardId);
        if (!dashboard) return;
        
        const reports = dashboard.reports.map(report => `
            <div class="dashboard-report-item" data-report-id="${report.id}">
                <h4>${report.title}</h4>
                <p>${report.description}</p>
            </div>
        `).join('');
        
        const content = `
            <div class="content-header">
                <h2>${dashboard.title}</h2>
                <div class="content-actions">
                    <button class="btn btn-primary">
                        <i class="fa fa-refresh"></i>
                        Refresh
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fa fa-download"></i>
                        Export
                    </button>
                </div>
            </div>
            <div class="dashboard-content">
                <div class="dashboard-reports">
                    ${reports}
                </div>
            </div>
        `;
        
        openTab(`dashboard-${dashboardId}`, dashboard.title, content);
        
        // Add click handlers for dashboard reports
        $(`#dashboard-${dashboardId} .dashboard-report-item`).on('click', function() {
            const reportId = $(this).data('report-id');
            openReportViewer(reportId, $(this).find('h4').text());
        });
    }
    
    // Report Management
    function loadReportsTree() {
        const reportsTree = $('#reportsTree');
        reportsTree.empty();
        
        // Show first 10 categories for performance
        const categories = appData.reports.categories.slice(0, 10);
        
        categories.forEach(category => {
            const categoryHtml = `
                <div class="nav-item" data-category="${category.id}">
                    <i class="${category.icon}"></i>
                    ${category.name} (${category.count})
                </div>
            `;
            reportsTree.append(categoryHtml);
        });
        
        // Add click handlers
        $('.nav-item[data-category]').on('click', function() {
            const categoryId = $(this).data('category');
            openReportsTab(categoryId);
        });
    }
    
    function openReportsTab(categoryId) {
        const category = appData.reports.categories.find(c => c.id === categoryId);
        if (!category) return;
        
        const reports = category.reports.map(report => `
            <div class="report-item" data-report-id="${report.id}">
                <div class="report-icon">
                    <i class="fa fa-file-text-o"></i>
                </div>
                <div class="report-info">
                    <div class="report-title">${report.title}</div>
                    <div class="report-description">Report</div>
                </div>
            </div>
        `).join('');
        
        const content = `
            <div class="content-header">
                <h2>${category.name} Reports</h2>
                <div class="content-actions">
                    <div class="search-box">
                        <input type="text" placeholder="Search reports..." id="reportSearch">
                        <button class="btn btn-primary">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <button class="btn btn-secondary">
                        <i class="fa fa-filter"></i>
                        Filter
                    </button>
                </div>
            </div>
            <div class="reports-content">
                <div class="reports-list">
                    ${reports}
                </div>
            </div>
        `;
        
        openTab(`reports-${categoryId}`, `${category.name} Reports`, content);
        
        // Add click handlers for reports
        $(`#reports-${categoryId} .report-item`).on('click', function() {
            const reportId = $(this).data('report-id');
            openReportViewer(reportId, $(this).find('.report-title').text());
        });
    }
    
    function openReportViewer(reportId, reportTitle) {
        const content = `
            <div class="content-header">
                <h2>${reportTitle}</h2>
                <div class="content-actions">
                    <button class="btn btn-primary">
                        <i class="fa fa-refresh"></i>
                        Refresh
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fa fa-download"></i>
                        Export
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fa fa-print"></i>
                        Print
                    </button>
                </div>
            </div>
            <div class="report-viewer-content">
                <div class="report-placeholder">
                    <i class="fa fa-file-text-o"></i>
                    <p>Power BI Report will be embedded here</p>
                </div>
            </div>
        `;
        
        openTab(`report-${reportId}`, reportTitle, content);
    }
    
    // Search Functionality
    function searchReports(query) {
        if (!query) {
            $('.report-item').show();
            return;
        }
        
        $('.report-item').each(function() {
            const title = $(this).find('.report-title').text().toLowerCase();
            const description = $(this).find('.report-description').text().toLowerCase();
            
            if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    // Quick Access
    function handleQuickAccess(action) {
        switch(action) {
            case 'kpi-finance':
                openKPITab('finance');
                break;
            case 'dashboard-finance':
                openDashboardTab('finance');
                break;
            case 'reports-finance':
                openReportsTab('finance');
                break;
            case 'reports-clinical':
                openReportsTab('clinical');
                break;
        }
    }
    
    // Menu Actions
    function handleMenuAction(menuText) {
        switch(menuText) {
            case 'File':
                // File menu actions
                break;
            case 'Edit':
                // Edit menu actions
                break;
            case 'View':
                // View menu actions
                break;
            case 'Tools':
                // Tools menu actions
                break;
            case 'Help':
                // Help menu actions
                break;
        }
    }
    
    // Toolbar Actions
    function handleToolbarAction(title) {
        switch(title) {
            case 'New Report':
                showMessage('New Report functionality');
                break;
            case 'Open Report':
                showMessage('Open Report functionality');
                break;
            case 'Save Report':
                showMessage('Save Report functionality');
                break;
            case 'Print':
                showMessage('Print functionality');
                break;
            case 'Export':
                showMessage('Export functionality');
                break;
            case 'Refresh':
                refreshData();
                break;
            case 'Search':
                $('#reportSearch').focus();
                break;
            case 'Settings':
                showMessage('Settings functionality');
                break;
        }
    }
    
    // Button Actions
    function handleButtonAction(buttonText) {
        switch(buttonText) {
            case 'Refresh':
                refreshData();
                break;
            case 'Export':
                showMessage('Export functionality');
                break;
            case 'Print':
                showMessage('Print functionality');
                break;
            case 'Filter':
                showMessage('Filter functionality');
                break;
        }
    }
    
    // Window Controls
    function handleWindowControl(action) {
        switch(action) {
            case 'minimize':
                showMessage('Application minimized');
                break;
            case 'maximize':
                showMessage('Application maximized');
                break;
            case 'close':
                if (confirm('Are you sure you want to close the application?')) {
                    showMessage('Application closed');
                }
                break;
        }
    }
    
    // Context Menu
    function setupContextMenu() {
        $(document).on('contextmenu', '.report-item, .dashboard-report-item, .nav-item', function(e) {
            e.preventDefault();
            showContextMenu(e.pageX, e.pageY);
        });
        
        $(document).on('click', function() {
            hideContextMenu();
        });
    }
    
    function showContextMenu(x, y) {
        const contextMenu = $('#contextMenu');
        contextMenu.css({
            left: x,
            top: y,
            display: 'block'
        });
    }
    
    function hideContextMenu() {
        $('#contextMenu').hide();
    }
    
    // Keyboard Shortcuts
    function setupKeyboardShortcuts() {
        $(document).on('keydown', function(e) {
            // Ctrl+N - New Report
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                handleToolbarAction('New Report');
            }
            
            // Ctrl+O - Open Report
            if (e.ctrlKey && e.key === 'o') {
                e.preventDefault();
                handleToolbarAction('Open Report');
            }
            
            // Ctrl+S - Save Report
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleToolbarAction('Save Report');
            }
            
            // Ctrl+P - Print
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                handleToolbarAction('Print');
            }
            
            // F5 - Refresh
            if (e.key === 'F5') {
                e.preventDefault();
                refreshData();
            }
            
            // Ctrl+F - Search
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                $('#reportSearch').focus();
            }
            
            // Escape - Close context menu
            if (e.key === 'Escape') {
                hideContextMenu();
            }
        });
    }
    
    // Data Refresh
    function refreshData() {
        showMessage('Refreshing data...', 'info');
        
        // Simulate data refresh
        setTimeout(() => {
            updateLastUpdated();
            showMessage('Data refreshed successfully', 'success');
        }, 1500);
    }
    
    function updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        $('#lastUpdated').text(`${timeString}`);
    }
    
    // Message System
    function showMessage(message, type = 'info') {
        // Create message element
        const messageEl = $(`
            <div class="message message-${type}">
                <i class="fa fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `);
        
        // Add to body
        $('body').append(messageEl);
        
        // Show message
        messageEl.fadeIn(300);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            messageEl.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add debounced search
    const debouncedSearch = debounce(searchReports, 300);
    $(document).on('input', '#reportSearch', function() {
        debouncedSearch($(this).val());
    });
    
    // Initialize with welcome message
    setTimeout(() => {
        showMessage('Welcome to eLibera Business Intelligence System', 'success');
    }, 1000);
    
    console.log('Classic Business Application initialized successfully');
});
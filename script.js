// Smart Dashboard Hub - Simple & Intuitive JavaScript
$(document).ready(function() {
    'use strict';
    
    // Initialize the application
    initializeApp();
    
    function initializeApp() {
        setupEventListeners();
        loadReports();
        setupSearch();
        setupFilters();
        setupModal();
        
        // Show welcome message
        setTimeout(() => {
            showNotification('Welcome to eLibera Smart Dashboard Hub!', 'success');
        }, 1000);
    }
    
    // Event Listeners
    function setupEventListeners() {
        // Navigation category switching
        $('.nav-category').on('click', function() {
            const category = $(this).data('category');
            switchCategory(category);
        });
        
        // KPI tab switching
        $('.tab-btn').on('click', function() {
            const tab = $(this).data('tab');
            switchKPITab(tab);
        });
        
        // Dashboard view buttons
        $('.btn-view').on('click', function() {
            const dashboard = $(this).data('dashboard');
            showDashboardReports(dashboard);
        });
        
        // View toggle buttons
        $('.toggle-btn').on('click', function() {
            const view = $(this).data('view');
            toggleReportsView(view);
        });
        
        // Quick action buttons
        $('.quick-action-btn').on('click', function() {
            const action = $(this).find('span').text();
            handleQuickAction(action);
        });
        
        // Refresh button
        $('.btn-refresh').on('click', function() {
            refreshData();
        });
        
        // Report items
        $(document).on('click', '.report-item', function() {
            const reportId = $(this).data('report-id');
            const reportTitle = $(this).find('.report-title').text();
            showReportViewer(reportId, reportTitle);
        });
        
        // Recent items
        $('.recent-item').on('click', function() {
            const itemText = $(this).find('span').text();
            handleRecentItem(itemText);
        });
    }
    
    // Category Switching
    function switchCategory(category) {
        // Update navigation
        $('.nav-category').removeClass('active');
        $(`.nav-category[data-category="${category}"]`).addClass('active');
        
        // Update content sections
        $('.content-section').removeClass('active');
        $(`#${category}-section`).addClass('active');
        
        // Update page title
        const titles = {
            'kpis': 'Key Performance Indicators',
            'dashboards': 'Dashboards',
            'reports': 'Reports'
        };
        
        document.title = `eLibera - ${titles[category]}`;
        
        // Show notification
        showNotification(`Switched to ${titles[category]}`, 'info');
    }
    
    // KPI Tab Switching
    function switchKPITab(tab) {
        // Update tab buttons
        $('.tab-btn').removeClass('active');
        $(`.tab-btn[data-tab="${tab}"]`).addClass('active');
        
        // Load KPI data for the selected tab
        loadKPIData(tab);
    }
    
    function loadKPIData(tab) {
        const kpiData = appData.kpis[tab];
        if (!kpiData) return;
        
        const kpiGrid = $('.kpi-grid');
        kpiGrid.empty();
        
        kpiData.cards.forEach(card => {
            const cardHtml = `
                <div class="kpi-card">
                    <div class="kpi-header">
                        <div class="kpi-icon">
                            <i class="${card.icon}"></i>
                        </div>
                        <div class="kpi-trend ${card.trendType}">
                            <i class="fas fa-arrow-${card.trendType === 'positive' ? 'up' : 'down'}"></i>
                            <span>${card.trend}</span>
                        </div>
                    </div>
                    <div class="kpi-value">${card.value}</div>
                    <div class="kpi-label">${card.label}</div>
                </div>
            `;
            kpiGrid.append(cardHtml);
        });
        
        // Add animation to new cards
        $('.kpi-card').each(function(index) {
            $(this).css('animation-delay', `${index * 0.1}s`);
        });
    }
    
    // Dashboard Reports
    function showDashboardReports(dashboardId) {
        const dashboard = appData.dashboards.find(d => d.id === dashboardId);
        if (!dashboard) return;
        
        const modal = $('#reportModal');
        const modalTitle = $('#modalTitle');
        
        modalTitle.text(`${dashboard.title} - Reports`);
        modal.addClass('show');
        
        // Load dashboard reports
        const modalBody = $('.modal-body');
        modalBody.html(`
            <div class="dashboard-reports-grid">
                ${dashboard.reports.map(report => `
                    <div class="dashboard-report-item" data-report-id="${report.id}">
                        <div class="report-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="report-info">
                            <h4>${report.title}</h4>
                            <p>${report.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `);
        
        // Add click handlers for dashboard reports
        $('.dashboard-report-item').on('click', function() {
            const reportId = $(this).data('report-id');
            const reportTitle = $(this).find('h4').text();
            showReportViewer(reportId, reportTitle);
        });
    }
    
    // Reports Management
    function loadReports() {
        const reportsGrid = $('#reportsGrid');
        reportsGrid.empty();
        
        // Show first 20 categories for performance
        const categories = appData.reports.categories.slice(0, 20);
        
        categories.forEach(category => {
            const reportHtml = `
                <div class="report-item" data-report-id="${category.id}">
                    <div class="report-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <div class="report-title">${category.name}</div>
                    <div class="report-description">${category.description}</div>
                    <div class="report-meta">
                        <span class="report-count">${category.count} items</span>
                    </div>
                </div>
            `;
            reportsGrid.append(reportHtml);
        });
        
        // Add animation to report items
        $('.report-item').each(function(index) {
            $(this).css('animation-delay', `${index * 0.05}s`);
        });
    }
    
    // Search Functionality
    function setupSearch() {
        $('#globalSearch').on('input', function() {
            const query = $(this).val().toLowerCase();
            performGlobalSearch(query);
        });
    }
    
    function performGlobalSearch(query) {
        if (!query) {
            loadReports();
            return;
        }
        
        const results = [];
        
        // Search in reports
        appData.reports.categories.forEach(category => {
            if (category.name.toLowerCase().includes(query) || 
                category.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'category',
                    data: category
                });
            }
            
            category.reports.forEach(report => {
                if (report.title.toLowerCase().includes(query)) {
                    results.push({
                        type: 'report',
                        data: report,
                        category: category.name
                    });
                }
            });
        });
        
        // Search in dashboards
        appData.dashboards.forEach(dashboard => {
            if (dashboard.title.toLowerCase().includes(query) || 
                dashboard.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'dashboard',
                    data: dashboard
                });
            }
        });
        
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        const reportsGrid = $('#reportsGrid');
        reportsGrid.empty();
        
        if (results.length === 0) {
            reportsGrid.html('<div class="text-center" style="grid-column: 1/-1; padding: 2rem; color: #64748b;">No results found</div>');
            return;
        }
        
        results.forEach(result => {
            let html = '';
            
            if (result.type === 'category') {
                html = `
                    <div class="report-item" data-report-id="${result.data.id}">
                        <div class="report-icon">
                            <i class="${result.data.icon}"></i>
                        </div>
                        <div class="report-title">${result.data.name}</div>
                        <div class="report-description">${result.data.description}</div>
                        <div class="report-meta">
                            <span class="report-count">${result.data.count} items</span>
                        </div>
                    </div>
                `;
            } else if (result.type === 'report') {
                html = `
                    <div class="report-item" data-report-id="${result.data.id}">
                        <div class="report-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="report-title">${result.data.title}</div>
                        <div class="report-description">${result.data.description || 'Report'}</div>
                        <div class="report-meta">
                            <span class="report-count">${result.category || 'Report'}</span>
                        </div>
                    </div>
                `;
            } else if (result.type === 'dashboard') {
                html = `
                    <div class="report-item" data-dashboard-id="${result.data.id}">
                        <div class="report-icon">
                            <i class="${result.data.icon}"></i>
                        </div>
                        <div class="report-title">${result.data.title}</div>
                        <div class="report-description">${result.data.description}</div>
                        <div class="report-meta">
                            <span class="report-count">${result.data.reportCount} reports</span>
                        </div>
                    </div>
                `;
            }
            
            reportsGrid.append(html);
        });
    }
    
    // Filters
    function setupFilters() {
        $('#categoryFilter').on('change', function() {
            const category = $(this).val();
            filterReportsByCategory(category);
        });
        
        $('#sortFilter').on('change', function() {
            const sortBy = $(this).val();
            sortReports(sortBy);
        });
    }
    
    function filterReportsByCategory(category) {
        if (!category) {
            loadReports();
            return;
        }
        
        $('.report-item').each(function() {
            const itemCategory = $(this).data('report-id');
            if (itemCategory === category) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    function sortReports(sortBy) {
        const reportsGrid = $('#reportsGrid');
        const items = reportsGrid.find('.report-item').toArray();
        
        items.sort((a, b) => {
            const aText = $(a).find('.report-title').text();
            const bText = $(b).find('.report-title').text();
            
            if (sortBy === 'name') {
                return aText.localeCompare(bText);
            }
            return 0;
        });
        
        reportsGrid.empty().append(items);
    }
    
    // View Toggle
    function toggleReportsView(view) {
        const reportsGrid = $('#reportsGrid');
        
        $('.toggle-btn').removeClass('active');
        $(`.toggle-btn[data-view="${view}"]`).addClass('active');
        
        if (view === 'list') {
            reportsGrid.css('grid-template-columns', '1fr');
            $('.report-item').css('display', 'flex');
        } else {
            reportsGrid.css('grid-template-columns', 'repeat(auto-fill, minmax(280px, 1fr))');
            $('.report-item').css('display', 'block');
        }
    }
    
    // Quick Actions
    function handleQuickAction(action) {
        switch(action) {
            case 'Favorites':
                showNotification('Favorites functionality', 'info');
                break;
            case 'Recent':
                showNotification('Recent items functionality', 'info');
                break;
            case 'Export':
                showNotification('Export functionality', 'info');
                break;
            case 'Print':
                showNotification('Print functionality', 'info');
                break;
        }
    }
    
    // Recent Items
    function handleRecentItem(itemText) {
        if (itemText.includes('KPIs')) {
            switchCategory('kpis');
        } else if (itemText.includes('Dashboard')) {
            switchCategory('dashboards');
        } else if (itemText.includes('Report')) {
            switchCategory('reports');
        }
    }
    
    // Report Viewer
    function showReportViewer(reportId, reportTitle) {
        const modal = $('#reportModal');
        const modalTitle = $('#modalTitle');
        
        modalTitle.text(reportTitle);
        modal.addClass('show');
        
        // Load report content
        const modalBody = $('.modal-body');
        modalBody.html(`
            <div class="report-viewer">
                <div class="report-placeholder">
                    <i class="fas fa-chart-line"></i>
                    <p>Power BI Report: ${reportTitle}</p>
                    <p>Report ID: ${reportId}</p>
                </div>
            </div>
        `);
    }
    
    // Modal Management
    function setupModal() {
        // Close modal
        $('.modal-close, .modal').on('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Close on escape key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    function closeModal() {
        $('.modal').removeClass('show');
    }
    
    // Data Refresh
    function refreshData() {
        const refreshBtn = $('.btn-refresh');
        const icon = refreshBtn.find('i');
        
        // Add spinning animation
        icon.addClass('fa-spin');
        
        // Simulate data refresh
        setTimeout(() => {
            icon.removeClass('fa-spin');
            
            // Reload data
            loadReports();
            loadKPIData('finance');
            
            // Show success message
            showNotification('Data refreshed successfully', 'success');
        }, 2000);
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `);
        
        // Add notification styles
        notification.css({
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '2000',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            maxWidth: '400px',
            animation: 'slideIn 0.3s ease'
        });
        
        $('body').append(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.fadeOut(300, function() {
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
    const debouncedSearch = debounce(performGlobalSearch, 300);
    $('#globalSearch').on('input', function() {
        debouncedSearch($(this).val().toLowerCase());
    });
    
    // Keyboard Shortcuts
    $(document).on('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            $('#globalSearch').focus();
        }
        
        // Ctrl/Cmd + R for refresh
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            refreshData();
        }
        
        // Number keys for quick category switching
        if (e.key === '1') {
            switchCategory('kpis');
        } else if (e.key === '2') {
            switchCategory('dashboards');
        } else if (e.key === '3') {
            switchCategory('reports');
        }
    });
    
    // Responsive behavior
    function handleResize() {
        const width = $(window).width();
        
        if (width < 768) {
            $('.kpi-grid').css('grid-template-columns', '1fr');
            $('.dashboard-grid').css('grid-template-columns', '1fr');
            $('.reports-grid').css('grid-template-columns', '1fr');
        } else if (width < 1024) {
            $('.kpi-grid').css('grid-template-columns', 'repeat(2, 1fr)');
            $('.dashboard-grid').css('grid-template-columns', 'repeat(2, 1fr)');
            $('.reports-grid').css('grid-template-columns', 'repeat(auto-fill, minmax(250px, 1fr))');
        } else {
            $('.kpi-grid').css('grid-template-columns', 'repeat(4, 1fr)');
            $('.dashboard-grid').css('grid-template-columns', 'repeat(auto-fit, minmax(300px, 1fr))');
            $('.reports-grid').css('grid-template-columns', 'repeat(auto-fill, minmax(280px, 1fr))');
        }
    }
    
    $(window).on('resize', debounce(handleResize, 250));
    handleResize(); // Initial call
    
    // Add smooth scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });
    
    // Add loading states
    function showLoading(element) {
        element.addClass('loading');
    }
    
    function hideLoading(element) {
        element.removeClass('loading');
    }
    
    // Initialize with default data
    loadKPIData('finance');
    
    console.log('Smart Dashboard Hub initialized successfully');
});
// jQuery-based Power BI Front-end Application
$(document).ready(function() {
    'use strict';
    
    // Initialize the application
    initializeApp();
    
    function initializeApp() {
        loadKPIs();
        loadDashboards();
        loadReports();
        setupEventListeners();
        setupSearchFunctionality();
        setupModals();
        startAutoRefresh();
    }
    
    // KPI Management
    function loadKPIs() {
        const kpiData = appData.kpis;
        
        // Load KPI tabs
        $('.kpi-tabs').empty();
        Object.keys(kpiData).forEach(tabKey => {
            const tab = kpiData[tabKey];
            const tabButton = $(`<button class="kpi-tab" data-tab="${tabKey}">${tab.title}</button>`);
            if (tabKey === 'finance') {
                tabButton.addClass('active');
            }
            $('.kpi-tabs').append(tabButton);
        });
        
        // Load initial KPI content (Finance)
        loadKPIContent('finance');
    }
    
    function loadKPIContent(tabKey) {
        const kpiData = appData.kpis[tabKey];
        if (!kpiData) return;
        
        const kpiCards = $('.kpi-cards');
        kpiCards.empty();
        
        kpiData.cards.forEach(card => {
            const cardHtml = `
                <div class="kpi-card" data-card-id="${card.id}">
                    <div class="kpi-icon">
                        <i class="${card.icon}"></i>
                    </div>
                    <div class="kpi-content">
                        <div class="kpi-value">${card.value}</div>
                        <div class="kpi-label">${card.label}</div>
                        <div class="kpi-trend ${card.trendType}">
                            <i class="fas fa-arrow-${card.trendType === 'positive' ? 'up' : 'down'}"></i>
                            <span>${card.trend}</span>
                        </div>
                    </div>
                </div>
            `;
            kpiCards.append(cardHtml);
        });
        
        // Add animation to cards
        $('.kpi-card').each(function(index) {
            $(this).css('animation-delay', `${index * 0.1}s`);
            $(this).addClass('animate-in');
        });
    }
    
    // Dashboard Management
    function loadDashboards() {
        const dashboardGrid = $('.dashboard-grid');
        dashboardGrid.empty();
        
        appData.dashboards.forEach(dashboard => {
            const dashboardHtml = `
                <div class="dashboard-card" data-dashboard-id="${dashboard.id}">
                    <div class="dashboard-icon">
                        <i class="${dashboard.icon}"></i>
                    </div>
                    <div class="dashboard-content">
                        <h3>${dashboard.title}</h3>
                        <p>${dashboard.description}</p>
                        <div class="dashboard-meta">
                            <span class="report-count">${dashboard.reportCount} reports</span>
                            <span class="last-updated">Updated ${dashboard.lastUpdated}</span>
                        </div>
                    </div>
                    <div class="dashboard-actions">
                        <button class="btn-view" data-dashboard="${dashboard.id}">
                            <i class="fas fa-eye"></i>
                            View
                        </button>
                    </div>
                </div>
            `;
            dashboardGrid.append(dashboardHtml);
        });
        
        // Add animation to dashboard cards
        $('.dashboard-card').each(function(index) {
            $(this).css('animation-delay', `${index * 0.1}s`);
            $(this).addClass('animate-in');
        });
    }
    
    // Reports Management
    function loadReports() {
        const reportsGrid = $('#reportsGrid');
        reportsGrid.empty();
        
        appData.reports.categories.forEach(category => {
            const reportHtml = `
                <div class="report-item" data-category="${category.id}" data-type="category">
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
            $(this).addClass('animate-in');
        });
    }
    
    // Event Listeners
    function setupEventListeners() {
        // KPI Tab switching
        $(document).on('click', '.kpi-tab', function() {
            const tabKey = $(this).data('tab');
            
            $('.kpi-tab').removeClass('active');
            $(this).addClass('active');
            
            loadKPIContent(tabKey);
        });
        
        // Dashboard view button
        $(document).on('click', '.btn-view', function() {
            const dashboardId = $(this).data('dashboard');
            showDashboardReports(dashboardId);
        });
        
        // Report item click
        $(document).on('click', '.report-item', function() {
            const categoryId = $(this).data('category');
            const type = $(this).data('type');
            
            if (type === 'category') {
                showCategoryReports(categoryId);
            } else {
                showReport(categoryId);
            }
        });
        
        // View toggle buttons
        $(document).on('click', '.toggle-btn', function() {
            const view = $(this).data('view');
            
            $('.toggle-btn').removeClass('active');
            $(this).addClass('active');
            
            toggleReportsView(view);
        });
        
        // Refresh button
        $(document).on('click', '.btn-refresh', function() {
            refreshData();
        });
        
        // Quick action buttons
        $(document).on('click', '.btn-secondary', function() {
            const action = $(this).text().trim();
            handleQuickAction(action);
        });
    }
    
    // Search Functionality
    function setupSearchFunctionality() {
        // Global search
        $('#globalSearch').on('input', function() {
            const query = $(this).val().toLowerCase();
            performGlobalSearch(query);
        });
        
        // Report search
        $('#reportSearch').on('input', function() {
            const query = $(this).val().toLowerCase();
            filterReports(query);
        });
        
        // Category filter
        $('#categoryFilter').on('change', function() {
            const category = $(this).val();
            filterReportsByCategory(category);
        });
        
        // Search button
        $('.search-btn').on('click', function() {
            const query = $('#globalSearch').val();
            if (query) {
                performGlobalSearch(query);
            }
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
                    data: category,
                    match: category.name
                });
            }
            
            category.reports.forEach(report => {
                if (report.title.toLowerCase().includes(query)) {
                    results.push({
                        type: 'report',
                        data: report,
                        match: report.title,
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
                    data: dashboard,
                    match: dashboard.title
                });
            }
        });
        
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        const reportsGrid = $('#reportsGrid');
        reportsGrid.empty();
        
        if (results.length === 0) {
            reportsGrid.html('<div class="text-center" style="grid-column: 1/-1; padding: 2rem; color: #666;">No results found</div>');
            return;
        }
        
        results.forEach(result => {
            let html = '';
            
            if (result.type === 'category') {
                html = `
                    <div class="report-item" data-category="${result.data.id}" data-type="category">
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
                    <div class="report-item" data-report-id="${result.data.id}" data-type="report">
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
                    <div class="report-item" data-dashboard-id="${result.data.id}" data-type="dashboard">
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
    
    function filterReports(query) {
        $('.report-item').each(function() {
            const title = $(this).find('.report-title').text().toLowerCase();
            const description = $(this).find('.report-description').text().toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    function filterReportsByCategory(category) {
        if (!category) {
            $('.report-item').show();
            return;
        }
        
        $('.report-item').each(function() {
            const itemCategory = $(this).data('category');
            if (itemCategory === category) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    // Modal Management
    function setupModals() {
        // Close modals
        $(document).on('click', '.modal-close, .modal', function(e) {
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
    
    function showDashboardReports(dashboardId) {
        const dashboard = appData.dashboards.find(d => d.id === dashboardId);
        if (!dashboard) return;
        
        const modal = $('#dashboardModal');
        const modalTitle = $('#dashboardModalTitle');
        const dashboardReports = $('#dashboardReports');
        
        modalTitle.text(`${dashboard.title} - Reports`);
        dashboardReports.empty();
        
        dashboard.reports.forEach(report => {
            const reportHtml = `
                <div class="report-item" data-report-id="${report.id}" data-type="report">
                    <div class="report-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="report-title">${report.title}</div>
                    <div class="report-description">${report.description}</div>
                    <div class="report-meta">
                        <span class="report-count">Report</span>
                    </div>
                </div>
            `;
            dashboardReports.append(reportHtml);
        });
        
        modal.addClass('show');
    }
    
    function showCategoryReports(categoryId) {
        const category = appData.reports.categories.find(c => c.id === categoryId);
        if (!category) return;
        
        const modal = $('#dashboardModal');
        const modalTitle = $('#dashboardModalTitle');
        const dashboardReports = $('#dashboardReports');
        
        modalTitle.text(`${category.name} - Reports`);
        dashboardReports.empty();
        
        category.reports.forEach(report => {
            const reportHtml = `
                <div class="report-item" data-report-id="${report.id}" data-type="report">
                    <div class="report-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="report-title">${report.title}</div>
                    <div class="report-description">Report</div>
                    <div class="report-meta">
                        <span class="report-count">Report</span>
                    </div>
                </div>
            `;
            dashboardReports.append(reportHtml);
        });
        
        modal.addClass('show');
    }
    
    function showReport(reportId) {
        const modal = $('#reportModal');
        const modalTitle = $('#modalTitle');
        
        modalTitle.text(`Report: ${reportId}`);
        modal.addClass('show');
    }
    
    function closeModal() {
        $('.modal').removeClass('show');
    }
    
    // View Toggle
    function toggleReportsView(view) {
        const reportsGrid = $('#reportsGrid');
        
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
                showFavorites();
                break;
            case 'Recent':
                showRecent();
                break;
            case 'Filters':
                showFilters();
                break;
        }
    }
    
    function showFavorites() {
        // Implementation for favorites
        console.log('Showing favorites');
    }
    
    function showRecent() {
        // Implementation for recent reports
        console.log('Showing recent reports');
    }
    
    function showFilters() {
        // Implementation for advanced filters
        console.log('Showing filters');
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
            loadKPIs();
            loadDashboards();
            loadReports();
            
            // Show success message
            showNotification('Data refreshed successfully', 'success');
        }, 2000);
    }
    
    function startAutoRefresh() {
        if (appData.settings.autoRefresh) {
            setInterval(() => {
                refreshData();
            }, appData.settings.refreshInterval);
        }
    }
    
    // Notifications
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.fadeOut(() => {
                notification.remove();
            });
        }, 3000);
        
        // Manual close
        notification.find('.notification-close').on('click', function() {
            notification.fadeOut(() => {
                notification.remove();
            });
        });
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
    
    // Add loading states
    function showLoading(element) {
        element.addClass('loading');
    }
    
    function hideLoading(element) {
        element.removeClass('loading');
    }
    
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
    
    // Add keyboard shortcuts
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
    });
    
    // Add tooltips
    $('[title]').each(function() {
        const title = $(this).attr('title');
        $(this).removeAttr('title');
        $(this).attr('data-tooltip', title);
    });
    
    // Initialize tooltips
    $('[data-tooltip]').hover(
        function() {
            const tooltip = $(`<div class="tooltip">${$(this).data('tooltip')}</div>`);
            $('body').append(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.css({
                top: rect.top - tooltip.outerHeight() - 5,
                left: rect.left + (rect.width / 2) - (tooltip.outerWidth() / 2)
            });
        },
        function() {
            $('.tooltip').remove();
        }
    );
    
    // Add responsive behavior
    function handleResize() {
        const width = $(window).width();
        
        if (width < 768) {
            $('.kpi-cards').css('grid-template-columns', '1fr');
            $('.dashboard-grid').css('grid-template-columns', '1fr');
            $('.reports-grid').css('grid-template-columns', '1fr');
        } else if (width < 1024) {
            $('.kpi-cards').css('grid-template-columns', 'repeat(2, 1fr)');
            $('.dashboard-grid').css('grid-template-columns', 'repeat(2, 1fr)');
            $('.reports-grid').css('grid-template-columns', 'repeat(auto-fill, minmax(250px, 1fr))');
        } else {
            $('.kpi-cards').css('grid-template-columns', 'repeat(4, 1fr)');
            $('.dashboard-grid').css('grid-template-columns', 'repeat(auto-fit, minmax(300px, 1fr))');
            $('.reports-grid').css('grid-template-columns', 'repeat(auto-fill, minmax(280px, 1fr))');
        }
    }
    
    $(window).on('resize', debounce(handleResize, 250));
    handleResize(); // Initial call
    
    // Add animation classes
    $('.kpi-card, .dashboard-card, .report-item').addClass('animate-in');
    
    // Performance optimization
    function optimizePerformance() {
        // Lazy load images
        $('img[data-src]').each(function() {
            const img = $(this);
            if (isElementInViewport(img[0])) {
                img.attr('src', img.data('src'));
                img.removeAttr('data-src');
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize performance optimization
    $(window).on('scroll', debounce(optimizePerformance, 100));
    optimizePerformance();
    
    console.log('Power BI Front-end Application initialized successfully');
});
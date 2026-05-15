const clientData = {
    'alpha': {
        pbc: { 
            total: 45, accepted: 38, pending: 7, 
            list_accepted: [ 
                { fund: "Alpha Fund I, LP", items: [{name: "Prior Year Workpapers.zip", status: "Cleared by Sarah J."}] },
                { fund: "Alpha Guarantee LP", items: [{name: "K-1 Register.xlsx", status: "Cleared by Sarah J."}] }
            ],
            list_pending: [ 
                { fund: "Alpha Guarantee LP", items: [{name: "Final Apportionment Data", status: "Overdue 2 Days", icon: "fa-exclamation-circle"}] }
            ] 
        },
        trackerRows: `
            <tr class="fund-group"><td colspan="9">Alpha Growth Fund I, LP</td></tr>
            <tr>
                <td>Alpha I</td><td>Alpha Growth Fund I, LP</td>
                <td style="display:flex;align-items:center;"><div class="owner-avatar" style="background:#e2231a;">MD</div> Michael D.</div></td>
                <td><span class="badge bd-d"><i class="fas fa-check"></i> Complete</span></td>
                <td><span class="badge bd-d">20 / 20</span></td>
                <td style="color:#5a6e9a;">N/A</td>
                <td style="color:#5a6e9a;">N/A</td>
                <td style="color:#5a6e9a;">N/A</td>
                <td><span class="badge bd-w">w/ onshore manager</span></td>
            </tr>
            <tr>
                <td>Alpha I</td><td>Guarantee LP</td>
                <td style="display:flex;align-items:center;"><div class="owner-avatar" style="background:#f5a623; color:black;">SJ</div> Sarah J.</div></td>
                <td><span class="badge bd-e"><i class="fas fa-ban"></i> Blocked</span></td>
                <td><span class="badge bd-w">17 / 20</span></td>
                <td><span class="badge bd-d"><i class="fas fa-check"></i> Done</span></td>
                <td><span class="badge bd-d">Sent 5/10</span></td>
                <td><span class="badge bd-d">Received 5/14</span></td>
                <td><span class="badge bd-w">comments to KGS</span></td>
            </tr>
        `
    },
    'beta': {
        pbc: { 
            total: 120, accepted: 25, pending: 95, 
            list_accepted: [ { fund: "Beta Real Estate Trust", items: [{name: "Prior Year 1065.pdf", status: "Cleared by Alex T."}] } ],
            list_pending: [ { fund: "Beta Real Estate Trust", items: [{name: "Trial Balance", status: "Overdue 1 Week", icon: "fa-exclamation-triangle"}] } ] 
        },
        trackerRows: `<tr class="fund-group"><td colspan="9">Beta Real Estate Trust, LLC</td></tr><tr><td>BRET</td><td>Beta Commercial Properties</td><td style="display:flex;align-items:center;"><div class="owner-avatar" style="background:#00d287; color:black;">AT</div> Alex T.</div></td><td><span class="badge bd-w">Awaiting Data</span></td><td><span class="badge bd-e">10 / 50</span></td><td style="color:#5a6e9a">--</td><td style="color:#5a6e9a">--</td><td style="color:#5a6e9a">--</td><td><span class="badge bd-e"><i class="fas fa-exclamation-circle"></i> Waiting on K-1s</span></td></tr>`
    }
};

function switchClient(clientId) {
    document.querySelectorAll('.channel').forEach(c => c.classList.remove('active'));
    document.getElementById('nav-' + clientId).classList.add('active');
    
    const data = clientData[clientId];
    buildDashboard(data.pbc);
    document.getElementById('tracker-body').innerHTML = data.trackerRows;
}

function buildDashboard(pbc) {
    let acceptedHtml = '';
    pbc.list_accepted.forEach(group => {
        acceptedHtml += `<div class="pbc-fund-group">${group.fund}</div>`;
        group.items.forEach(item => {
            acceptedHtml += `<div class="pbc-sub-item"><span>${item.name}</span><span style="color:var(--accent-green);"><i class="fas fa-check-circle"></i> ${item.status}</span></div>`;
        });
    });

    let pendingHtml = '';
    pbc.list_pending.forEach(group => {
        pendingHtml += `<div class="pbc-fund-group">${group.fund}</div>`;
        group.items.forEach(item => {
            pendingHtml += `<div class="pbc-sub-item"><span>${item.name}</span><span style="color:var(--accent-orange);"><i class="fas ${item.icon}"></i> ${item.status}</span></div>`;
        });
    });

    document.getElementById('dash-grid-content').innerHTML = `
        <div class="dash-card">
            <h3 style="font-size: 1.5em; margin-bottom: 20px;"><i class="fas fa-cloud-upload-alt" style="color:var(--accent-blue);"></i> PBC Collection Tracker</h3>
            <div class="accordion-item"><div class="accordion-header" style="cursor:default;"><span>Total Requested Files</span><span style="font-weight:bold; font-size:1.2em;">${pbc.total}</span></div></div>
            <div class="accordion-item">
                <div class="accordion-header" onclick="toggleAccordion(this)"><span>Accepted by KPMG</span><span style="color:var(--accent-green); font-weight:bold; font-size:1.2em;">${pbc.accepted} <i class="fas fa-chevron-down"></i></span></div>
                <div class="accordion-content"><div>${acceptedHtml}</div></div>
            </div>
            <div class="accordion-item">
                <div class="accordion-header" onclick="toggleAccordion(this)"><span>Pending Client Upload</span><span style="color:var(--accent-orange); font-weight:bold; font-size:1.2em;">${pbc.pending} <i class="fas fa-chevron-down"></i></span></div>
                <div class="accordion-content"><div>${pendingHtml}</div></div>
            </div>
        </div>`;
}

function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const wasOpen = content.classList.contains('open');
    document.querySelectorAll('.accordion-content.open').forEach(c => c.classList.remove('open'));
    if (!wasOpen) content.classList.add('open');
}

function showTab(tabId) {
    document.querySelectorAll('.tab-panel, .tab-nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function switchMainView(viewId, btnElement) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.global-sidebar .icon-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    btnElement.classList.add('active');
}

window.onload = () => switchClient('alpha');

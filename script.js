// ==========================================
// AIFREEKIT - 12 FREE AI TOOLS
// 100% English Version
// ==========================================

var toolsGrid = document.getElementById('toolsGrid');
var modal = document.getElementById('toolModal');
var modalTitle = document.getElementById('modalTitle');
var modalBody = document.getElementById('modalBody');
var closeBtn = document.getElementById('closeBtn');

var tools = [
    { id: 'drawing', icon: '🎨', name: 'Drawing Board' },
    { id: 'qr', icon: '📱', name: 'QR Code Generator' },
    { id: 'image', icon: '🖼️', name: 'Image Compressor' },
    { id: 'age', icon: '🎂', name: 'Age Calculator' },
    { id: 'emi', icon: '🧮', name: 'EMI Calculator' },
    { id: 'password', icon: '🔐', name: 'Password Generator' },
    { id: 'word', icon: '✍️', name: 'Word Counter' },
    { id: 'color', icon: '🎨', name: 'Color Picker' },
    { id: 'unit', icon: '📏', name: 'Unit Converter' },
    { id: 'text', icon: '🔤', name: 'Text Case Converter' },
    { id: 'time', icon: '⏰', name: 'Time Zone' },
    { id: 'emoji', icon: '😀', name: 'Emoji Copy' },
    { id: 'pdf', icon: '📄', name: 'PDF Viewer' },
    { id: 'caption', icon: '✍️', name: 'Caption Generator' },
    { id: 'bio', icon: '📝', name: 'Bio Generator' },
    { id: 'hashtag', icon: '#️⃣', name: 'Hashtag Generator' },
    { id: 'font', icon: '🔤', name: 'Stylish Fonts' }
];

function renderTools(list) {
    if (!list) list = tools;
    var html = '';
    for (var i = 0; i < list.length; i++) {
        html += '<div class="tool-card" onclick="openTool(\'' + list[i].id + '\')">';
        html += '<span class="tool-icon">' + list[i].icon + '</span>';
        html += '<span class="tool-name">' + list[i].name + '</span>';
        html += '</div>';
    }
    toolsGrid.innerHTML = html;
}

document.getElementById('searchInput').addEventListener('input', function(e) {
    var query = e.target.value.toLowerCase();
    var filtered = [];
    for (var i = 0; i < tools.length; i++) {
        if (tools[i].name.toLowerCase().indexOf(query) !== -1) {
            filtered.push(tools[i]);
        }
    }
    renderTools(filtered);
});

function openTool(toolId) {
    var tool = null;
    for (var i = 0; i < tools.length; i++) {
        if (tools[i].id === toolId) tool = tools[i];
    }
    if (!tool) return;
    modalTitle.textContent = tool.icon + ' ' + tool.name;
    modalBody.innerHTML = '';
    modal.classList.add('active');
    modal.style.display = 'flex';
    if (toolId === 'qr') loadQR();
    else if (toolId === 'image') loadImage();
    else if (toolId === 'age') loadAge();
    else if (toolId === 'emi') loadEMI();
    else if (toolId === 'password') loadPassword();
    else if (toolId === 'word') loadWord();
    else if (toolId === 'color') loadColor();
    else if (toolId === 'unit') loadUnit();
    else if (toolId === 'text') loadText();
    else if (toolId === 'time') loadTime();
    else if (toolId === 'emoji') loadEmoji();
    else if (toolId === 'pdf') loadPDF();
    else if (toolId === 'drawing') loadDrawing();
    else if (toolId === 'caption') loadCaption();
    else if (toolId === 'bio') loadBio();
    else if (toolId === 'hashtag') loadHashtag();
    else if (toolId === 'font') loadFont();
  }

  function closeModal() {
    var modal = document.getElementById('toolModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none'; /* Ye line button ko kaam karwayegi */
    }
    var modalBody = document.getElementById('modalBody');
    if (modalBody) {
        modalBody.innerHTML = '';
    }
  }
 if (closeBtn) {
    // Click event for computer
    closeBtn.onclick = function(e) {
        if(e) e.preventDefault();
        closeModal();
    };
    
    // Touch event for mobile phones
    closeBtn.ontouchstart = function(e) {
        if(e) e.preventDefault();
        closeModal();
    };
 }
modal.onclick = function(e) {
    if (e.target === modal) closeModal();
};

// ==========================================
// TOOL 1: QR CODE GENERATOR
// ==========================================
function loadQR() {
    modalBody.innerHTML = '<input type="text" id="qrInput" placeholder="Enter link or text...">' +
        '<button onclick="generateQR()">Generate QR Code</button>' +
        '<div id="qrResult" style="text-align:center;margin-top:15px;"></div>';
}

function generateQR() {
    var text = document.getElementById('qrInput').value.trim();
    var result = document.getElementById('qrResult');
    if (!text) {
        result.innerHTML = '<p style="color:#ff4757;">⚠️ Please enter something!</p>';
        return;
    }
    var url = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(text);
    result.innerHTML = '<img src="' + url + '" style="border-radius:10px;background:white;padding:10px;max-width:100%;"><p style="color:#00d4ff;margin-top:10px;font-size:0.85rem;">✅ Long press on image to download</p>';
}

// ==========================================
// TOOL 2: IMAGE COMPRESSOR
// ==========================================
function loadImage() {
    modalBody.innerHTML = '<input type="file" id="imgInput" accept="image/*">' +
        '<label style="font-size:0.85rem;color:#aaa;display:block;margin-top:10px;">Quality: <span id="qv">70</span>%</label>' +
        '<input type="range" id="qr2" min="10" max="100" value="70" oninput="document.getElementById(\'qv\').textContent=this.value">' +
        '<button onclick="compressImage()">Compress Image</button>' +
        '<div id="imgResult" style="text-align:center;margin-top:15px;"></div>';
}

function compressImage() {
    var fileInput = document.getElementById('imgInput');
    var quality = document.getElementById('qr2').value / 100;
    var result = document.getElementById('imgResult');
    if (!fileInput.files[0]) {
        result.innerHTML = '<p style="color:#ff4757;">⚠️ Please select an image!</p>';
        return;
    }
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            canvas.toBlob(function(blob) {
                var url = URL.createObjectURL(blob);
                var oldKb = (file.size / 1024).toFixed(1);
                var newKb = (blob.size / 1024).toFixed(1);
                result.innerHTML = '<p style="color:#00ff88;font-size:0.9rem;">✅ ' + oldKb + ' KB → ' + newKb + ' KB</p>' +
                    '<a href="' + url + '" download="compressed.jpg" style="display:inline-block;margin-top:10px;padding:10px 20px;background:linear-gradient(135deg,#00d4ff,#a855f7);color:white;text-decoration:none;border-radius:10px;font-weight:600;">⬇️ Download</a>';
            }, 'image/jpeg', quality);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// ==========================================
// TOOL 3: AGE CALCULATOR
// ==========================================
function loadAge() {
    modalBody.innerHTML = '<label style="font-size:0.85rem;color:#aaa;">Date of Birth:</label>' +
        '<input type="date" id="dobInput">' +
        '<button onclick="calculateAge()">Calculate Age</button>' +
        '<div id="ageResult" style="margin-top:15px;"></div>';
}

function calculateAge() {
    var dob = document.getElementById('dobInput').value;
    var result = document.getElementById('ageResult');
    if (!dob) {
        result.innerHTML = '<p style="color:#ff4757;">⚠️ Please select a date!</p>';
        return;
    }
    var birth = new Date(dob);
    var today = new Date();
    var years = today.getFullYear() - birth.getFullYear();
    var months = today.getMonth() - birth.getMonth();
    var days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    var totalDays = Math.floor((today - birth) / 86400000);
    result.innerHTML = '<div style="background:#0f0f1a;padding:15px;border-radius:10px;text-align:center;">' +
        '<p style="font-size:1.5rem;color:#00d4ff;font-weight:bold;">' + years + ' years, ' + months + ' months, ' + days + ' days</p>' +
        '<p style="color:#aaa;font-size:0.85rem;margin-top:10px;">Total Days: <b style="color:#fff;">' + totalDays.toLocaleString() + '</b></p>' +
        '</div>';
}

// ==========================================
// TOOL 4: EMI CALCULATOR
// ==========================================
function loadEMI() {
    modalBody.innerHTML = '<input type="number" id="loanAmount" placeholder="Loan Amount">' +
        '<input type="number" id="interestRate" placeholder="Interest Rate (% per year)">' +
        '<input type="number" id="loanTenure" placeholder="Tenure (months)">' +
        '<button onclick="calculateEMI()">Calculate EMI</button>' +
        '<div id="emiResult" style="margin-top:15px;"></div>';
}

function calculateEMI() {
    var P = parseFloat(document.getElementById('loanAmount').value);
    var R = parseFloat(document.getElementById('interestRate').value) / 12 / 100;
    var N = parseFloat(document.getElementById('loanTenure').value);
    var result = document.getElementById('emiResult');
    if (!P || !R || !N) {
        result.innerHTML = '<p style="color:#ff4757;">⚠️ Please fill all fields!</p>';
        return;
    }
    var emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    var total = emi * N;
    var interest = total - P;
    result.innerHTML = '<div style="background:#0f0f1a;padding:15px;border-radius:10px;text-align:center;">' +
        '<p style="color:#aaa;font-size:0.85rem;">Monthly EMI</p>' +
        '<p style="font-size:1.8rem;color:#00ff88;font-weight:bold;">$' + emi.toFixed(0) + '</p>' +
        '<p style="color:#aaa;font-size:0.85rem;margin-top:10px;">Interest: <b style="color:#ff6b9d;">$' + interest.toFixed(0) + '</b></p>' +
        '<p style="color:#aaa;font-size:0.85rem;">Total: <b style="color:#fff;">$' + total.toFixed(0) + '</b></p>' +
        '</div>';
}

// ==========================================
// TOOL 5: PASSWORD GENERATOR
// ==========================================
function loadPassword() {
    modalBody.innerHTML = '<label style="font-size:0.85rem;color:#aaa;">Length: <span id="lv">16</span></label>' +
        '<input type="range" id="passLen" min="4" max="50" value="16" oninput="document.getElementById(\'lv\').textContent=this.value">' +
        '<button onclick="generatePassword()">Generate Password</button>' +
        '<div id="passResult" style="margin-top:15px;"></div>';
}

function generatePassword() {
    var len = document.getElementById('passLen').value;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    var pass = '';
    for (var i = 0; i < len; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('passResult').innerHTML = '<div style="background:#0f0f1a;padding:15px;border-radius:10px;text-align:center;word-break:break-all;">' +
        '<p style="font-family:monospace;color:#00ff88;font-weight:bold;">' + pass + '</p></div>' +
        '<button onclick="navigator.clipboard.writeText(\'' + pass + '\');this.textContent=\'✅ Copied!\'">📋 Copy</button>';
}

// ==========================================
// TOOL 6: WORD COUNTER
// ==========================================
function loadWord() {
    modalBody.innerHTML = '<textarea id="wordInput" rows="6" placeholder="Enter your text here..." oninput="countWords()" style="width:100%;padding:12px;border-radius:10px;border:2px solid #2a2a4a;background:#0f0f1a;color:#fff;"></textarea>' +
        '<div style="background:#0f0f1a;padding:15px;border-radius:10px;margin-top:10px;">' +
        '<p style="color:#aaa;font-size:0.85rem;">Words: <b style="color:#00d4ff;" id="wCount">0</b></p>' +
        '<p style="color:#aaa;font-size:0.85rem;">Characters: <b style="color:#00d4ff;" id="cCount">0</b></p>' +
        '</div>';
}

function countWords() {
    var text = document.getElementById('wordInput').value;
    var words = text.trim() ? text.trim().split(/\s+/).length : 0;
    document.getElementById('wCount').textContent = words;
    document.getElementById('cCount').textContent = text.length;
}

// ==========================================
// TOOL 7: COLOR PICKER
// ==========================================
function loadColor() {
    modalBody.innerHTML = '<input type="color" id="colorInput" value="#00d4ff" style="height:60px;cursor:pointer;width:100%;" oninput="showColor()">' +
        '<div id="colorResult" style="margin-top:15px;"></div>';
    showColor();
}

function showColor() {
    var color = document.getElementById('colorInput').value;
    var r = parseInt(color.slice(1,3), 16);
    var g = parseInt(color.slice(3,5), 16);
    var b = parseInt(color.slice(5,7), 16);
    document.getElementById('colorResult').innerHTML = '<div style="background:' + color + ';height:80px;border-radius:10px;"></div>' +
        '<div style="background:#0f0f1a;padding:15px;border-radius:10px;margin-top:10px;text-align:center;">' +
        '<p style="color:#00d4ff;font-weight:bold;">' + color.toUpperCase() + '</p>' +
        '<p style="color:#aaa;font-size:0.85rem;">RGB: ' + r + ', ' + g + ', ' + b + '</p>' +
        '<button onclick="navigator.clipboard.writeText(\'' + color + '\');this.textContent=\'✅ Copied!\'">📋 Copy</button></div>';
}

// ==========================================
// TOOL 8: UNIT CONVERTER
// ==========================================
function loadUnit() {
    modalBody.innerHTML = '<select id="unitType" onchange="updateUnits()" style="width:100%;padding:12px;border-radius:10px;border:2px solid #2a2a4a;background:#0f0f1a;color:#fff;">' +
        '<option value="length">📏 Length</option>' +
        '<option value="weight">⚖️ Weight</option>' +
        '</select>' +
        '<input type="number" id="unitValue" placeholder="Enter value..." oninput="convertUnit()">' +
        '<div style="display:flex;gap:10px;margin-top:10px;">' +
        '<select id="fromUnit" onchange="convertUnit()" style="flex:1;padding:10px;border-radius:10px;border:2px solid #2a2a4a;background:#0f0f1a;color:#fff;"></select>' +
        '<select id="toUnit" onchange="convertUnit()" style="flex:1;padding:10px;border-radius:10px;border:2px solid #2a2a4a;background:#0f0f1a;color:#fff;"></select>' +
        '</div>' +
        '<div id="unitResult" style="margin-top:15px;"></div>';
    updateUnits();
}

var unitData = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mile: 1609.34, foot: 0.3048, inch: 0.0254 },
    weight: { kg: 1, g: 0.001, mg: 0.000001, pound: 0.453592, ounce: 0.0283495 }
};

function updateUnits() {
    var type = document.getElementById('unitType').value;
    var units = Object.keys(unitData[type]);
    var opts = '';
    for (var i = 0; i < units.length; i++) {
        opts += '<option value="' + units[i] + '">' + units[i].toUpperCase() + '</option>';
    }
    document.getElementById('fromUnit').innerHTML = opts;
    document.getElementById('toUnit').innerHTML = opts;
    document.getElementById('toUnit').selectedIndex = 1;
}

function convertUnit() {
    var type = document.getElementById('unitType').value;
    var val = parseFloat(document.getElementById('unitValue').value);
    var from = document.getElementById('fromUnit').value;
    var to = document.getElementById('toUnit').value;
    var result = document.getElementById('unitResult');
    if (isNaN(val)) { result.innerHTML = ''; return; }
    var converted = val * unitData[type][from] / unitData[type][to];
    result.innerHTML = '<div style="background:#0f0f1a;padding:15px;border-radius:10px;text-align:center;">' +
        '<p style="color:#aaa;font-size:0.85rem;">' + val + ' ' + from.toUpperCase() + ' =</p>' +
        '<p style="font-size:1.5rem;color:#00ff88;font-weight:bold;">' + converted.toFixed(4) + ' ' + to.toUpperCase() + '</p></div>';
}

// ==========================================
// TOOL 9: TEXT CASE CONVERTER
// ==========================================
function loadText() {
    modalBody.innerHTML = '<textarea id="caseInput" rows="4" placeholder="Enter your text here..." style="width:100%;padding:12px;border-radius:10px;border:2px solid #2a2a4a;background:#0f0f1a;color:#fff;"></textarea>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">' +
        '<button onclick="changeCase(\'upper\')">UPPERCASE</button>' +
        '<button onclick="changeCase(\'lower\')">lowercase</button>' +
        '<button onclick="changeCase(\'title\')">Title Case</button>' +
        '<button onclick="changeCase(\'sentence\')">Sentence case</button></div>';
}

function changeCase(type) {
    var input = document.getElementById('caseInput');
    var text = input.value;
    if (type === 'upper') {
        text = text.toUpperCase();
    } else if (type === 'lower') {
        text = text.toLowerCase();
    } else if (type === 'title') {
        text = text.replace(/\w\S*/g, function(w) { return w.charAt(0).toUpperCase() + w.substr(1).toLowerCase(); });
    } else if (type === 'sentence') {
        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    input.value = text;
}

// ==========================================
// TOOL 10: TIME ZONE
// ==========================================
function loadTime() {
    var zones = [
        { n: '🇮🇳 India', tz: 'Asia/Kolkata' },
        { n: '🇵🇰 Pakistan', tz: 'Asia/Karachi' },
        { n: '🇺🇸 New York', tz: 'America/New_York' },
        { n: '🇬🇧 London', tz: 'Europe/London' },
        { n: '🇦🇪 Dubai', tz: 'Asia/Dubai' },
        { n: '🇯🇵 Tokyo', tz: 'Asia/Tokyo' }
    ];
    var html = '';
    for (var i = 0; i < zones.length; i++) {
        html += '<div style="background:#0f0f1a;padding:10px 15px;border-radius:10px;margin:5px 0;display:flex;justify-content:space-between;">' +
            '<span style="color:#aaa;">' + zones[i].n + '</span>' +
            '<span style="color:#00d4ff;font-weight:bold;" id="tz' + i + '">--:--</span></div>';
    }
    modalBody.innerHTML = html;
    updateTimes(zones);
}

function updateTimes(zones) {
    for (var i = 0; i < zones.length; i++) {
        var el = document.getElementById('tz' + i);
        if (el) el.textContent = new Date().toLocaleTimeString('en-US', { timeZone: zones[i].tz, hour12: false });
    }
}

// ==========================================
// TOOL 11: EMOJI COPY
// ==========================================
function loadEmoji() {
    var emojis = ['😀','😂','🥰','😎','🤔','😴','😭','😡','🥳','🤩','😇','🤗','😱','🤯','😈','👻','💀','🤖','❤️','💛','💚','💙','💜','🖤','👍','👎','👏','🙏','💪','✌️','🤝','👋','✨','🔥','⭐','💯','🎉','🎁','🏆','⚡','💎','🌟','🌈'];
    var html = '<p style="color:#aaa;font-size:0.85rem;margin-bottom:10px;">Click on any emoji to copy it!</p>';
    html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;">';
    for (var i = 0; i < emojis.length; i++) {
        html += '<span onclick="copyEmoji(\'' + emojis[i] + '\')" style="font-size:1.5rem;cursor:pointer;text-align:center;padding:5px;border-radius:8px;background:#0f0f1a;">' + emojis[i] + '</span>';
    }
    html += '</div><div id="emojiResult" style="text-align:center;margin-top:10px;color:#00ff88;min-height:20px;"></div>';
    modalBody.innerHTML = html;
}

function copyEmoji(e) {
    navigator.clipboard.writeText(e);
    var r = document.getElementById('emojiResult');
    r.textContent = '✅ ' + e + ' copied!';
    setTimeout(function() { r.textContent = ''; }, 1500);
}

// ==========================================
// TOOL 12: PDF VIEWER
// ==========================================
function loadPDF() {
    modalBody.innerHTML = '<p style="color:#aaa;font-size:0.85rem;margin-bottom:10px;">Select a PDF file to view it</p>' +
        '<input type="file" id="pdfInput" accept="application/pdf">' +
        '<button onclick="handlePDF()">Open PDF</button>' +
        '<div id="pdfResult" style="margin-top:15px;"></div>';
}

function handlePDF() {
    var file = document.getElementById('pdfInput').files[0];
    var result = document.getElementById('pdfResult');
    if (!file) {
        result.innerHTML = '<p style="color:#ff4757;">⚠️ Please select a PDF!</p>';
        return;
    }
    var url = URL.createObjectURL(file);
    result.innerHTML = '<embed src="' + url + '" type="application/pdf" width="100%" height="400px" style="border-radius:10px;">';
}

// ==========================================
// START
// ==========================================
renderTools(tools);
// ==========================================
// TOOL 13: CAPTION GENERATOR
// ==========================================
function loadCaption() {
    modalBody.innerHTML = '<input type="text" id="capInput" placeholder="Enter topic (e.g., travel, food, love)">' +
        '<button onclick="generateCaption()">Generate Caption</button>' +
        '<div id="capResult" style="margin-top:15px;"></div>';
}

function generateCaption() {
    var topic = document.getElementById('capInput').value.trim() || 'life';
    var captions = [
        "Living for the moments that take my breath away. ✨ #" + topic,
        "Making memories I'll never forget. 💫 #" + topic,
        "Good vibes only. ✌️ #" + topic,
        "Chasing dreams and " + topic + ".",
        "Just me and my thoughts. 🌙",
        "Creating my own sunshine today. ☀️ #" + topic,
        "This is what " + topic + " looks like for me.",
        "Happiness is a choice. 😊",
        "Life is better when you're laughing.",
        "No caption needed, but here I am. 💁‍♂️"
    ];
    var randomCap = captions[Math.floor(Math.random() * captions.length)];
    document.getElementById('capResult').innerHTML = '<div style="background:#0f0f1a;padding:15px;border-radius:10px;text-align:center;">' +
        '<p style="color:#00ff88;font-size:1rem;">' + randomCap + '</p></div>' +
        '<button onclick="navigator.clipboard.writeText(\'' + randomCap + '\');this.textContent=\'✅ Copied!\'">📋 Copy Caption</button>';
}

// ==========================================
// TOOL 14: BIO GENERATOR
// ==========================================
function loadBio() {
    modalBody.innerHTML = '<input type="text" id="bioName" placeholder="Your Name">' +
        '<input type="text" id="bioJob" placeholder="Your Profession (e.g., Developer, Student)">' +
        '<button onclick="generateBio()">Generate Bio</button>' +
        '<div id="bioResult" style="margin-top:15px;"></div>';
}

function generateBio() {
    var name = document.getElementById('bioName').value.trim() || '✨';
    var job = document.getElementById('bioJob').value.trim() || 'Dreamer';
    var bios = [
        "✨ " + name + " | " + job + " 💻\n📍 India\n🔗 Link below",
        "💫 " + job + " by day, dreamer by night.\n👤 " + name,
        "🚀 " + name + "\nTurning ideas into reality.\n👇 DM for collab",
        "✨ " + job + " | " + name + "\n💖 Positive vibes only",
        "🎯 " + name + "\n" + job + " 📚\n💡 Keep learning",
        "🌙 " + name + " \n" + job + "\n📩 DM for business"
    ];
    var randomBio = bios[Math.floor(Math.random() * bios.length)];
    document.getElementById('bioResult').innerHTML = '<div style="background:#0f0f1a;padding:15px;border-radius:10px;white-space:pre-wrap;color:#00d4ff;">' + randomBio + '</div>' +
        '<button onclick="navigator.clipboard.writeText(\'' + randomBio.replace(/\n/g, '\\n') + '\');this.textContent=\'✅ Copied!\'">📋 Copy Bio</button>';
}
// ==========================================
// TOOL 15: HASHTAG GENERATOR
// ==========================================
function loadHashtag() {
    modalBody.innerHTML = '<input type="text" id="hashInput" placeholder="Enter keyword (e.g., fashion, travel)">' +
        '<button onclick="generateHashtag()">Generate Hashtags</button>' +
        '<div id="hashResult" style="margin-top:15px;"></div>';
}

function generateHashtag() {
    var keyword = document.getElementById('hashInput').value.trim().toLowerCase().replace(/\s+/g, '') || 'instagood';
    var tags = [
        "#" + keyword, "#" + keyword + "life", "#" + keyword + "lover", 
        "#" + keyword + "daily", "#" + keyword + "gram", "#" + keyword + "vibes",
        "#" + keyword + "photography", "#instagood", "#viral", "#trending",
        "#explorepage", "#foryou", "#fyp", "#love", "#photooftheday"
    ];
    var hashText = tags.join(' ');
    document.getElementById('hashResult').innerHTML = '<div style="background:#0f0f1a;padding:15px;border-radius:10px;line-height:1.6;color:#00d4ff;">' + hashText + '</div>' +
        '<button onclick="navigator.clipboard.writeText(\'' + hashText + '\');this.textContent=\'✅ Copied!\'">📋 Copy Hashtags</button>';
}

// ==========================================
// TOOL 16: STYLISH FONTS GENERATOR
// ==========================================
function loadFont() {
    modalBody.innerHTML = '<input type="text" id="fontInput" placeholder="Enter text..." oninput="generateFonts()">' +
        '<div id="fontResult" style="margin-top:15px;display:flex;flex-direction:column;gap:10px;"></div>';
    generateFonts();
}

function generateFonts() {
    var text = document.getElementById('fontInput').value || 'AIFreeKit';
    var fonts = [
        text.replace(/[a-zA-Z]/g, function(c) { return String.fromCharCode(c.charCodeAt(0) + (c >= 'a' && c <= 'z' ? 119737 : 119743)); }),
        text.replace(/[a-zA-Z]/g, function(c) { return String.fromCharCode(c.charCodeAt(0) + (c >= 'a' && c <= 'z' ? 119951 : 119957)); }),
        text.replace(/[a-zA-Z]/g, function(c) { return String.fromCharCode(c.charCodeAt(0) + (c >= 'a' && c <= 'z' ? 120017 : 120023)); }),
        text.split('').join(' '),
        text.toUpperCase() + ' ™',
        '✨ ' + text + ' ✨',
        '🔥 ' + text + ' 🔥'
    ];
    var html = '';
    for (var i = 0; i < fonts.length; i++) {
        html += '<div style="background:#0f0f1a;padding:10px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;">' +
            '<span style="color:#00d4ff;font-size:1.1rem;">' + fonts[i] + '</span>' +
            '<button onclick="navigator.clipboard.writeText(\'' + fonts[i] + '\');this.textContent=\'✅\';setTimeout(()=>this.textContent=\'Copy\',1500)" style="width:auto;padding:5px 10px;font-size:0.8rem;margin:0;">Copy</button>' +
            '</div>';
    }
    document.getElementById('fontResult').innerHTML = html;
}

// ==========================================
// START
// ==========================================

// ==========================================
// SIDEBAR MENU FUNCTIONALITY
// ==========================================

function toggleMenu() {
    var menu = document.getElementById('sideMenu');
    if (menu) {
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            loadMenuTools(); // Menu khulte hi tools load karo
        }
    }
}

// Menu mein tools add karne ka function
function loadMenuTools() {
    var menuList = document.getElementById('menuList');
    if (!menuList) return;
    
    // Agar pehle se tools add hain (duplicate na ho)
    if (document.getElementById('menuToolsGroup')) return;

    var group = document.createElement('div');
    group.id = 'menuToolsGroup';
    
    // Har tool ke liye link banao (Abhi ke liye home page pe #hash use kar rahe hain)
    tools.forEach(function(tool) {
        var li = document.createElement('li');
        // Yahan hum link change karenge jab sabke pages ban jayenge
        li.innerHTML = '<a href="javascript:void(0);" class="menu-tool-link" onclick="openToolFromMenu(\'' + tool.id + '\')">' + tool.icon + ' ' + tool.name + '</a>';
        group.appendChild(li);
    });
    
    // "All Tools" category ke theek baad group ko add karo
    var categories = document.querySelectorAll('.menu-category');
    if (categories.length > 0) {
        categories[0].insertAdjacentElement('afterend', group);
    }
}

// Menu ke andar search karne ka function
function searchMenuTools() {
    var input = document.getElementById('menuSearchInput').value.toLowerCase();
    var links = document.querySelectorAll('.menu-tool-link');
    
     for (var i = 0; i < links.length; i++) {
    var text = links[i].textContent.toLowerCase();
    if (text.indexOf(input) !== -1) {
        links[i].style.display = 'block';
    } else {
        links[i].style.display = 'none';
    }
     }
}

 function openToolFromMenu(toolId) {
    // 1. Force close the menu properly
    var menu = document.getElementById('sideMenu');
    if (menu) {
        menu.classList.remove('active');
    }
    
    // 2. Open the tool instantly
    openTool(toolId);
 }
// ===== FORCE CLOSE BUTTON (100% WORKING) =====
function forceCloseModal() {
    var modal = document.getElementById('toolModal');
    if (modal) {
        modal.style.display = 'none'; // Sabse powerful hide
        modal.classList.remove('active');
    }
    var modalBody = document.getElementById('modalBody');
    if (modalBody) {
        modalBody.innerHTML = '';
    }
}
// ==========================================
// TOOL 17: DRAWING BOARD (Canvas)
// ==========================================
 function loadDrawing() {
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 10px; display: flex; flex-direction: column; gap: 10px;">
            <!-- Background Selector -->
            <div>
                <label style="color: #aaa; font-size: 0.85rem;">Select Background:</label>
                <select id="bgSelector" onchange="changeBackground(this.value)" style="width: 100%; padding: 8px; border-radius: 5px; background: #0f0f1a; color: #00d4ff; border: 1px solid #2a2a4a;">
                    <option value="none">Blank Canvas</option>
                    <option value="batman.png">Batman (MCU)</option>
                    <option value="anime1.png">Anime Character</option>
                    <!-- Yahan hum aur images add karenge -->
                </select>
            </div>
            
            <!-- Tools -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 5px;">
                <div>
                    <input type="color" id="drawingColor" value="#00d4ff" style="width: 35px; height: 35px; border: none; cursor: pointer; vertical-align: middle; padding: 0;">
                    <select id="brushSize" style="width: 70px; padding: 5px; display: inline-block; margin: 0 5px; vertical-align: middle; background: #0f0f1a; color: #fff; border: 1px solid #2a2a4a; border-radius: 5px;">
                        <option value="2">Thin</option>
                        <option value="5" selected>Normal</option>
                        <option value="10">Thick</option>
                    </select>
                </div>
                <div>
                    <button onclick="toggleEraser()" id="eraserBtn" style="width: auto; padding: 5px 10px; margin: 0; background: #2a2a4a; color: #fff; border: 1px solid #00d4ff; font-size: 0.8rem;">🧽 Eraser</button>
                    <button onclick="clearCanvas()" style="width: auto; padding: 5px 10px; margin: 0; background: #ff4757; color: #fff; font-size: 0.8rem;">🗑️ Clear</button>
                </div>
            </div>
        </div>
        
        <!-- Drawing Area -->
        <div style="position: relative; width: 100%; height: 400px; background: #ffffff; border-radius: 10px; overflow: hidden; border: 2px solid #00d4ff;">
            <img id="bgImage" src="" style="display: none; position: absolute; width: 100%; height: 100%; object-fit: contain; pointer-events: none; z-index: 1;">
            <canvas id="drawCanvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: crosshair; touch-action: none; z-index: 2;"></canvas>
        </div>
        
        <button onclick="downloadDrawing()" style="margin-top: 15px; background: #00ff88; color: #000; font-weight: bold;">⬇️ Download Drawing</button>
    `;
    
    setTimeout(initDrawingCanvas, 100);
 }
function changeBackground(imageName) {
    var bgImg = document.getElementById('bgImage');
    if (imageName === 'none') {
        bgImg.style.display = 'none';
        bgImg.src = '';
    } else {
        bgImg.src = imageName; // Image ka naam
        bgImg.style.display = 'block';
    }
}
var isEraser = false;

function initDrawingCanvas() {
    var canvas = document.getElementById('drawCanvas');
    if (!canvas) return;
    
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    
    // Canvas size set karo
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Mouse Events
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        draw(e, canvas, ctx);
    });
    canvas.addEventListener('mousemove', function(e) {
        draw(e, canvas, ctx);
    });
    canvas.addEventListener('mouseup', function() { isDrawing = false; ctx.beginPath(); });
    canvas.addEventListener('mouseout', function() { isDrawing = false; ctx.beginPath(); });

    // Touch Events (Mobile)
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent('mousedown', { clientX: touch.clientX, clientY: touch.clientY });
        canvas.dispatchEvent(mouseEvent);
    }, {passive: false});
    
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent('mousemove', { clientX: touch.clientX, clientY: touch.clientY });
        canvas.dispatchEvent(mouseEvent);
    }, {passive: false});
    
    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        var mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });

    // Drawing function
    var drawingActive = false;
    canvas.addEventListener('mousedown', function() { drawingActive = true; });
    canvas.addEventListener('mouseup', function() { drawingActive = false; });
    canvas.addEventListener('mousemove', function(e) {
        if (!drawingActive) return;
        draw(e, canvas, ctx);
    });

    function draw(e, canvas, ctx) {
        if (!isDrawing && !drawingActive) return;
        
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        ctx.lineWidth = document.getElementById('brushSize').value;
        
        if (isEraser) {
            ctx.strokeStyle = '#ffffff'; // White color to erase
        } else {
            ctx.strokeStyle = document.getElementById('drawingColor').value;
        }
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function toggleEraser() {
    isEraser = !isEraser;
    var btn = document.getElementById('eraserBtn');
    if (isEraser) {
        btn.style.background = '#00d4ff';
        btn.style.color = '#000';
        btn.textContent = '🖌️ Pen';
    } else {
        btn.style.background = '#2a2a4a';
        btn.style.color = '#fff';
        btn.textContent = '🧽 Eraser';
    }
}

function clearCanvas() {
    var canvas = document.getElementById('drawCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function downloadDrawing() {
    var canvas = document.getElementById('drawCanvas');
    if (canvas) {
        var link = document.createElement('a');
        link.download = 'AIFreeKit-Drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}
console.log('AIFreeKit ready!');

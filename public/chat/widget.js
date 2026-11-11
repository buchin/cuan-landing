/**
 * Dojo Live Chat Drop-In Widget (Vanilla JS Shadow DOM)
 * Compatible with Dojo Live Chat Contract & Crisp Shim
 * Standard Neutral Theme (shadcn zinc / slate)
 */
(function() {
  'use strict';

  if (window.__dojo_livechat_initialized) return;
  window.__dojo_livechat_initialized = true;

  // Helper: UUID v4 generator
  function generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Identify script tag and configuration
  const currentScript = document.currentScript || (function() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('/chat/widget.js') !== -1) {
        return scripts[i];
      }
    }
    return null;
  })();

  let apiBase = '';
  if (currentScript && currentScript.getAttribute('data-api-base')) {
    apiBase = currentScript.getAttribute('data-api-base').replace(/\/+$/, '');
  } else if (currentScript && currentScript.src) {
    try {
      const u = new URL(currentScript.src);
      apiBase = u.origin;
    } catch (e) {
      apiBase = '';
    }
  }

  const defaultProduct = (currentScript && currentScript.getAttribute('data-product')) || 'cuan';

  // State & LocalStorage
  const STORAGE_GUEST_KEY = 'dojo_chat_guest_uuid';
  const STORAGE_SESSION_KEY = 'dojo_chat_session_v2:' + apiBase + ':' + defaultProduct;

  let guestUUID = localStorage.getItem(STORAGE_GUEST_KEY);
  if (!guestUUID) {
    guestUUID = generateUUID();
    localStorage.setItem(STORAGE_GUEST_KEY, guestUUID);
  }

  let sessionUUID = localStorage.getItem(STORAGE_SESSION_KEY) || null;
  let identity = { email: (currentScript && currentScript.getAttribute('data-email')) || '', name: (currentScript && currentScript.getAttribute('data-name')) || '' };
  let initPromise = null;
  let isOpen = false;
  let messages = [];
  let lastMessageId = 0;
  let unreadCount = 0;
  let isSending = false;
  let pollInterval = null;
  const acknowledgedDelivery = new Set();
  const acknowledgedRead = new Set();
  let receiptsPending = false;
  let receiptTimer = null;

  function scheduleReceipts() {
    clearTimeout(receiptTimer);
    receiptTimer = setTimeout(acknowledgeMessages, 120);
  }
  async function acknowledgeMessages() {
    if (!sessionUUID || receiptsPending) return;
    const delivered = [], read = [];
    const bounds = messagesStreamEl.getBoundingClientRect();
    for (const m of messages) {
      if (!m.uuid || m.is_internal || m.sender_type !== 'operator') continue;
      if (!acknowledgedDelivery.has(m.uuid)) delivered.push(m.uuid);
      if (!isOpen || document.visibilityState !== 'visible' || acknowledgedRead.has(m.uuid)) continue;
      const node = messagesStreamEl.querySelector(`[data-message-id="${CSS.escape(m.uuid)}"]`);
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      if (rect.height > 0 && rect.bottom > Math.max(0, bounds.top) && rect.top < Math.min(innerHeight, bounds.bottom) && rect.right > Math.max(0, bounds.left) && rect.left < Math.min(innerWidth, bounds.right)) read.push(m.uuid);
    }
    if (!delivered.length && !read.length) return;
    const d = delivered.slice(0,500), r = read.slice(0,500);
    receiptsPending = true;
    try {
      const response = await fetch(`${apiBase}/api/chat/receipts`, { method: 'POST', signal: AbortSignal.timeout(10000), headers: {'Content-Type':'application/json'}, body: JSON.stringify({session_uuid: sessionUUID, guest_uuid: guestUUID, delivered_ids:d, read_ids:r}) });
      if (response.ok) { d.forEach(id => acknowledgedDelivery.add(id)); r.forEach(id => { acknowledgedRead.add(id); acknowledgedDelivery.add(id); }); }
    } catch (_) { /* Retry on the next poll or visibility change. */ }
    finally { receiptsPending = false; }
  }

  // Create Host and Attach Shadow DOM
  const host = document.createElement('div');
  host.id = 'dojo-livechat-host';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  // Stylesheet
  const style = document.createElement('style');
  style.textContent = `
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #09090b;
      -webkit-font-smoothing: antialiased;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .dojo-launcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 28px;
      background-color: #18181b;
      color: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s;
      z-index: 2147483647;
      border: 1px solid rgba(255, 255, 255, 0.15);
      user-select: none;
    }
    .dojo-launcher:hover {
      transform: scale(1.06);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.26);
    }
    .dojo-launcher svg {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .dojo-badge {
      position: absolute;
      top: -3px;
      right: -3px;
      background-color: #ef4444;
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .dojo-badge.visible {
      display: flex;
    }
    .dojo-window {
      position: fixed;
      bottom: 88px;
      right: 20px;
      width: 380px;
      height: 580px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 120px);
      max-height: calc(100dvh - 120px);
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e4e4e7;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 2147483646;
      transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      transform-origin: bottom right;
    }
    .dojo-window.closed {
      opacity: 0;
      transform: translateY(12px) scale(0.96);
      pointer-events: none;
      display: none;
    }
    .dojo-header {
      padding: 14px 16px;
      background-color: #18181b;
      color: #fafafa;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #27272a;
    }
    .dojo-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dojo-avatar {
      width: 44px;
      height: 44px;
      border-radius: 17px;
      background-color: #27272a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .dojo-header-info {
      display: flex;
      flex-direction: column;
    }
    .dojo-header-title {
      font-size: 16px;
      font-weight: 600;
      color: #fafafa;
    }
    .dojo-header-status {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: #a1a1aa;
    }
    .dojo-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #22c55e;
    }
    .dojo-close-btn {
      background: none;
      border: none;
      color: #a1a1aa;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }
    .dojo-close-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #fafafa;
    }
    .dojo-close-btn svg {
      width: 18px;
      height: 18px;
      stroke: currentColor;
      stroke-width: 2;
    }
    .dojo-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: #fafafa;
    }
    .dojo-msg {
      display: flex;
      flex-direction: column;
      max-width: 82%;
    }
    .dojo-msg.visitor {
      align-self: flex-end;
      align-items: flex-end;
    }
    .dojo-msg.operator {
      align-self: flex-start;
      align-items: flex-start;
    }
    .dojo-msg-bubble {
      padding: 10px 14px;
      font-size: 16px;
      line-height: 1.45;
      word-break: break-word;
      white-space: pre-wrap;
    }
    .dojo-msg.visitor .dojo-msg-bubble {
      background-color: #18181b;
      color: #fafafa;
      border-radius: 16px 16px 4px 16px;
    }
    .dojo-msg.operator .dojo-msg-bubble {
      background-color: #e4e4e7;
      color: #09090b;
      border-radius: 16px 16px 16px 4px;
      border: 1px solid #d4d4d8;
    }
    .dojo-msg-meta {
      font-size: 12px;
      color: #71717a;
      margin-top: 3px;
      padding: 0 4px;
    }
    .dojo-composer {
      padding: 12px;
      background-color: #ffffff;
      border-top: 1px solid #e4e4e7;
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }
    .dojo-attach-btn {
      width: 44px;
      height: 48px;
      border-radius: 10px;
      background: none;
      color: #71717a;
      border: 1px solid #d4d4d8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      flex-shrink: 0;
    }
    .dojo-attach-btn:hover {
      background-color: #f4f4f5;
      color: #18181b;
    }
    .dojo-attach-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .dojo-attach-btn svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
    }
    .dojo-textarea {
      flex: 1;
      resize: none;
      border: 1px solid #d4d4d8;
      border-radius: 10px;
      padding: 9px 12px;
      font-size: 16px;
      line-height: 1.4;
      font-family: inherit;
      color: #09090b;
      background-color: #ffffff;
      outline: none;
      max-height: 120px;
      min-height: 48px;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .dojo-textarea:focus {
      border-color: #18181b;
    }
    .dojo-send-btn {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background-color: #18181b;
      color: #ffffff;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: opacity 0.15s, background-color 0.15s;
      flex-shrink: 0;
    }
    .dojo-send-btn:hover {
      background-color: #27272a;
    }
    .dojo-send-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .dojo-send-btn svg {
      width: 17px;
      height: 17px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `;
  shadow.appendChild(style);

  // Widget Markup
  const container = document.createElement('div');
  container.innerHTML = `
    <button type="button" class="dojo-launcher" id="launcher" title="Open live chat" aria-label="Open live chat" aria-expanded="false" aria-controls="window">
      <svg id="icon-chat" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg id="icon-close" style="display:none;" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <span class="dojo-badge" id="badge">0</span>
    </button>

    <section class="dojo-window closed" id="window" aria-label="Live chat">
      <div class="dojo-header">
        <div class="dojo-header-left">
          <div class="dojo-avatar">💬</div>
          <div class="dojo-header-info">
            <span class="dojo-header-title">Live Chat Support</span>
            <span class="dojo-header-status">
              Message our team
            </span>
          </div>
        </div>
        <button class="dojo-close-btn" id="close-btn" title="Close">
          <svg viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="dojo-messages" id="messages-stream">
        <div class="dojo-msg operator">
          <div class="dojo-msg-bubble">Hi! How can we help you with ${escapeHTML(defaultProduct)}?</div>
          <span class="dojo-msg-meta">Just now</span>
        </div>
      </div>

      <div class="dojo-composer">
        <button class="dojo-attach-btn" id="attach-btn" title="Attach file" type="button" aria-label="Attach file">
          <svg viewBox="0 0 24 24">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>
        <input type="file" id="file-input" style="display:none;" accept="image/png,image/jpeg,image/gif,application/pdf,text/plain,.txt,.md,.csv" />
        <textarea class="dojo-textarea" id="input-textarea" aria-label="Message" placeholder="Write a message…" rows="1"></textarea>
        <button class="dojo-send-btn" id="send-btn" title="Send message">
          <svg viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </section>
  `;
  shadow.appendChild(container);

  // Element Selectors
  const launcherEl = shadow.getElementById('launcher');
  const windowEl = shadow.getElementById('window');
  const closeBtnEl = shadow.getElementById('close-btn');
  const iconChatEl = shadow.getElementById('icon-chat');
  const iconCloseEl = shadow.getElementById('icon-close');
  const badgeEl = shadow.getElementById('badge');
  const messagesStreamEl = shadow.getElementById('messages-stream');
  messagesStreamEl.addEventListener('scroll', scheduleReceipts, {passive:true});
  document.addEventListener('visibilitychange', scheduleReceipts);
  const textareaEl = shadow.getElementById('input-textarea');
  const sendBtnEl = shadow.getElementById('send-btn');
  const attachBtnEl = shadow.getElementById('attach-btn');
  const fileInputEl = shadow.getElementById('file-input');

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formatTime(iso) {
    if (!iso) return 'Just now';
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  }

  // Session Initialization
  async function initializeSession() {
    try {
      const res = await fetch(`${apiBase}/api/chat/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_uuid: guestUUID,
          product: defaultProduct,
          email: identity.email,
          name: identity.name,
          current_url: window.location.href,
          referrer_url: document.referrer || '',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const sid = data.session_uuid || (data.session && data.session.uuid);
        if (sid) {
          sessionUUID = sid;
          localStorage.setItem(STORAGE_SESSION_KEY, sessionUUID);
          sendPageTelemetry();
          fetchMessages();
        }
      }
    } catch (err) {
      console.warn('[DojoLiveChat] Failed to initialize session:', err);
    }
  }

  // Page Telemetry
  async function sendPageTelemetry() {
    if (!sessionUUID) return;
    try {
      await fetch(`${apiBase}/api/chat/sessions/${sessionUUID}/page`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_url: window.location.href,
          page_title: document.title || '',
        }),
      });
    } catch (e) {
      // Ignore telemetry errors
    }
  }

  // Fetch / Poll Messages
  async function fetchMessages() {
    if (!sessionUUID) return;
    try {
      const res = await fetch(`${apiBase}/api/chat/messages?session_uuid=${encodeURIComponent(sessionUUID)}&after_id=${lastMessageId}`);
      if (res.ok) {
        const data = await res.json();
        const incoming = data.messages || [];
        let receiptChanged = false;
        for (const receipt of data.receipts || []) {
          const message = messages.find(m => m.uuid === receipt.uuid);
          if (message && (message.delivered_at !== receipt.delivered_at || message.read_confirmed_at !== receipt.read_confirmed_at)) {
            Object.assign(message, receipt); receiptChanged = true;
          }
        }
        if (incoming.length > 0) {
          let hasNew = false;
          for (let i = 0; i < incoming.length; i++) {
            const m = incoming[i];
            if (m.id > lastMessageId) {
              lastMessageId = m.id;
            }
            if (!messages.find(x => x.id === m.id || (x.uuid && x.uuid === m.uuid))) {
              messages.push(m);
              hasNew = true;
              if (!isOpen && m.sender_type !== 'visitor') {
                unreadCount++;
              }
            }
          }
          if (hasNew) {
            renderMessages();
            updateBadge();
          }
        }
        if (receiptChanged) renderMessages(true);
        scheduleReceipts();
      }
    } catch (err) {
      // Network hiccup, ignore
    }
  }

  // Render Messages
  function renderMessages(preserveScroll = false) {
    const previousScroll = messagesStreamEl.scrollTop;
    messagesStreamEl.innerHTML = '';
    // Welcome message
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'dojo-msg operator';
    welcomeDiv.innerHTML = `
      <div class="dojo-msg-bubble">Hi! How can we help you with ${escapeHTML(defaultProduct)}?</div>
      <span class="dojo-msg-meta">Live support</span>
    `;
    messagesStreamEl.appendChild(welcomeDiv);

    messages.forEach((m) => {
      const div = document.createElement('div');
      const isVisitor = m.sender_type ? m.sender_type === 'visitor' : m.author_type === 'user';
      div.className = `dojo-msg ${isVisitor ? 'visitor' : 'operator'}`;
      if (m.uuid) div.dataset.messageId = m.uuid;

      const text = m.message || m.content || '';
      const timeStr = formatTime(m.created_at);
      let attachmentHtml = '';
      if (m.attachment_url || m.has_attachment) {
        const url = (m.attachment_url || '').startsWith('http') ? m.attachment_url : apiBase + (m.attachment_url || '');
        const isImg = (m.attachment_type || '').startsWith('image/');
        if (isImg) {
          attachmentHtml = `<div style="margin-top:6px;"><a href="${url}" target="_blank" rel="noopener"><img src="${url}" alt="${escapeHTML(m.attachment_name || 'Attachment')}" style="max-width:100%;max-height:160px;border-radius:8px;display:block;" /></a></div>`;
        } else {
          attachmentHtml = `<div style="margin-top:6px;"><a href="${url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:4px;font-size:13px;text-decoration:underline;color:inherit;">📎 ${escapeHTML(m.attachment_name || 'Download file')}</a></div>`;
        }
      }

      div.innerHTML = `
        <div class="dojo-msg-bubble">${escapeHTML(text)}${attachmentHtml}</div>
        <span class="dojo-msg-meta">${timeStr}${isVisitor ? ` <span aria-label="${m.read_confirmed_at ? 'Read in chat' : m.delivered_at ? 'Delivered to chat' : 'Message saved'}" title="${m.read_confirmed_at ? 'Read in chat' : m.delivered_at ? 'Delivered to chat' : 'Message saved'}" style="${m.read_confirmed_at ? 'color:#4384ad' : ''}">${m.read_confirmed_at || m.delivered_at ? '✓✓' : '✓'}</span>` : ''}</span>
      `;
      messagesStreamEl.appendChild(div);
    });

    messagesStreamEl.scrollTop = preserveScroll ? previousScroll : messagesStreamEl.scrollHeight;
    scheduleReceipts();
  }

  function updateBadge() {
    if (unreadCount > 0 && !isOpen) {
      badgeEl.textContent = unreadCount > 9 ? '9+' : unreadCount;
      badgeEl.classList.add('visible');
    } else {
      badgeEl.classList.remove('visible');
    }
  }

  const errorEl = document.createElement('p');
  errorEl.setAttribute('role', 'alert');
  errorEl.style.cssText = 'font-size:14px;line-height:1.5;color:#b91c1c;padding:0 12px 8px;display:none';
  textareaEl.parentNode.parentNode.appendChild(errorEl);
  function showError(text) { errorEl.textContent = text; errorEl.style.display = text ? 'block' : 'none'; }

  // Send Message
  async function sendMessage(text, attachment) {
    const clean = (text || '').trim();
    if ((!clean && !attachment) || isSending) return;

    if (!sessionUUID) {
      await initSession();
    }
    if (!sessionUUID) { showError('Live chat is not connected. Try sending again.'); return; }

    isSending = true;
    sendBtnEl.disabled = true;

    try {
      const payload = {
        session_uuid: sessionUUID,
        text: clean || (attachment ? attachment.name : ''),
        product: defaultProduct,
      };
      if (attachment) {
        payload.attachment_url = attachment.url;
        payload.attachment_name = attachment.name;
        payload.attachment_type = attachment.type;
        payload.attachment_size = attachment.size;
      }
      const res = await fetch(`${apiBase}/api/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('send failed');
      if (res.ok) {
        showError('');
        textareaEl.value = '';
        autoResizeTextarea();
        await fetchMessages();
      }
    } catch (err) {
      showError('Message not sent. Your text is saved. Try again.');
    } finally {
      isSending = false;
      sendBtnEl.disabled = false;
    }
  }

  // Attach button and file input handling (Customer-to-operator only)
  if (attachBtnEl && fileInputEl) {
    attachBtnEl.addEventListener('click', () => {
      fileInputEl.click();
    });

    fileInputEl.addEventListener('change', async () => {
      const file = fileInputEl.files && fileInputEl.files[0];
      if (!file) return;
      fileInputEl.value = '';

      if (file.size > 10 * 1024 * 1024) {
        showError('File is too large. Maximum size is 10 MB.');
        return;
      }

      if (!sessionUUID) {
        await initSession();
      }
      if (!sessionUUID) {
        showError('Live chat is not connected. Try sending again.');
        return;
      }

      attachBtnEl.disabled = true;
      showError('Uploading ' + file.name + '…');

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('session_uuid', sessionUUID);
        formData.append('guest_uuid', guestUUID);

        const uploadRes = await fetch(`${apiBase}/api/chat/attachments`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json().catch(() => ({}));
          throw new Error(errData.error || 'Upload failed');
        }

        const uploaded = await uploadRes.json();
        showError('');

        await sendMessage(textareaEl.value.trim() || ('Shared: ' + file.name), {
          url: uploaded.url,
          name: uploaded.name,
          type: uploaded.type,
          size: uploaded.size,
        });
      } catch (err) {
        showError(err.message || 'Could not upload file. Try again.');
      } finally {
        attachBtnEl.disabled = false;
      }
    });
  }

  function autoResizeTextarea() {
    textareaEl.style.height = 'auto';
    textareaEl.style.height = Math.min(textareaEl.scrollHeight, 120) + 'px';
  }

  function openChat() {
    isOpen = true;
    launcherEl.setAttribute("aria-expanded", "true");
    windowEl.classList.remove('closed');
    iconChatEl.style.display = 'none';
    iconCloseEl.style.display = 'block';
    initSession();
    unreadCount = 0;
    updateBadge();
    sendPageTelemetry();
    fetchMessages();
    setTimeout(() => {
      textareaEl.focus();
      messagesStreamEl.scrollTop = messagesStreamEl.scrollHeight;
    }, 100);
  }

  function closeChat() {
    isOpen = false;
    launcherEl.setAttribute("aria-expanded", "false");
    launcherEl.focus();
    windowEl.classList.add('closed');
    iconChatEl.style.display = 'block';
    iconCloseEl.style.display = 'none';
  }

  function toggleChat() {
    if (isOpen) closeChat();
    else openChat();
  }

  function setInputText(text) {
    textareaEl.value = text || '';
    autoResizeTextarea();
  }

  // Event Listeners
  launcherEl.addEventListener('click', toggleChat);
  closeBtnEl.addEventListener('click', closeChat);
  shadow.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeChat(); });

  textareaEl.addEventListener('input', autoResizeTextarea);
  textareaEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(textareaEl.value);
    }
  });

  sendBtnEl.addEventListener('click', () => {
    sendMessage(textareaEl.value);
  });

  // Polling management
  function startPolling() {
    if (pollInterval) clearInterval(pollInterval);
    pollInterval = setInterval(fetchMessages, 3500);
  }

  // Initialize
  startPolling();

  function initSession() {
    if (!initPromise) initPromise = initializeSession().finally(() => { initPromise = null; });
    return initPromise;
  }

  // Shims: window.$dojoChat
  window.$dojoChat = {
    identify: async function(value) {
      identity = { email: (value && value.email) || '', name: (value && value.name) || '' };
      if (initPromise) await initPromise;
      if (sessionUUID || isOpen) await initSession();
    },
    open: openChat,
    close: closeChat,
    toggle: toggleChat,
    setMessage: setInputText,
    startTopic: function(topic) {
      openChat();
      if (topic) {
        sendMessage(topic);
      }
    },
  };

  // Shims: window.$crisp array push compatibility
  const crispQueue = window.$crisp || [];
  function handleCrispCommand(args) {
    if (!Array.isArray(args) || args.length === 0) return;
    const action = args[0];
    const cmd = args[1];
    const params = args[2] || [];

    if (action === 'do') {
      if (cmd === 'chat:open') openChat();
      else if (cmd === 'chat:close') closeChat();
      else if (cmd === 'chat:toggle') toggleChat();
      else if (cmd === 'message:send') {
        const text = (params && params[1]) || (params && params[0]);
        if (text) sendMessage(text);
      }
    } else if (action === 'set') {
      if (cmd === 'user:email' || cmd === 'user:nickname') {
        identity[cmd === 'user:email' ? 'email' : 'name'] = (params && params[0]) || '';
        if (sessionUUID || isOpen) Promise.resolve(initPromise).then(initSession);
      } else if (cmd === 'message:text') {
        const text = params && params[0];
        if (text) setInputText(text);
      }
    }
  }

  window.$crisp = {
    push: function(args) {
      handleCrispCommand(args);
    },
  };

  if (Array.isArray(crispQueue)) {
    for (let i = 0; i < crispQueue.length; i++) {
      handleCrispCommand(crispQueue[i]);
    }
  }
  if (sessionUUID) initSession();
})();

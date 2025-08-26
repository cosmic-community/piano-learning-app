const fs = require('fs');
const path = require('path');

function injectConsoleCapture() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('No .next directory found, skipping console capture injection');
    return;
  }

  const consoleScript = `
<script>
(function() {
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          });
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {}
  }
  
  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    captureLog('log', args);
  };
  
  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    captureLog('warn', args);
  };
  
  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    captureLog('error', args);
  };
  
  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    captureLog('info', args);
  };
  
  console.debug = function(...args) {
    originalConsole.debug.apply(console, args);
    captureLog('debug', args);
  };
  
  window.addEventListener('error', function(event) {
    captureLog('error', [\`Unhandled Error: \${event.message}\`, \`File: \${event.filename}:\${event.lineno}:\${event.colno}\`]);
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', [\`Unhandled Promise Rejection: \${event.reason}\`]);
  });
  
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(sendRouteChange, 0);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(sendRouteChange, 0);
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      sendReady();
      sendRouteChange();
    });
  } else {
    sendReady();
    sendRouteChange();
  }
  
  window.addEventListener('load', function() {
    sendReady();
    sendRouteChange();
  });
})();
</script>`;

  function injectIntoHtmlFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        injectIntoHtmlFiles(filePath);
      } else if (file.name.endsWith('.html')) {
        try {
          let content = fs.readFileSync(filePath, 'utf8');
          
          // Check if script is already injected
          if (content.includes('console-capture-ready')) {
            continue;
          }
          
          // Inject before closing head tag or at the beginning of body
          if (content.includes('</head>')) {
            content = content.replace('</head>', consoleScript + '</head>');
          } else if (content.includes('<body>')) {
            content = content.replace('<body>', '<body>' + consoleScript);
          }
          
          fs.writeFileSync(filePath, content);
          console.log(`Injected console capture script into: ${filePath}`);
        } catch (error) {
          console.error(`Error processing ${filePath}:`, error.message);
        }
      }
    }
  }
  
  try {
    injectIntoHtmlFiles(buildDir);
    console.log('Console capture script injection completed');
  } catch (error) {
    console.error('Error during console capture injection:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  injectConsoleCapture();
}

module.exports = injectConsoleCapture;
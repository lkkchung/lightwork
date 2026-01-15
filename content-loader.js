// Light Work - Content Loader
// Shared logic for loading content from content.json

async function loadPageContent(pageKey) {
    try {
        const response = await fetch('/content.json');
        const data = await response.json();

        const pageData = data[pageKey];
        const globalData = data.global;

        if (pageData) {
            injectContent(pageData);
        }

        if (globalData) {
            injectGlobalContent(globalData);
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function injectContent(data, prefix = '') {
    // Iterate through data and inject into elements with matching data-field attributes
    Object.keys(data).forEach(key => {
        const value = data[key];
        const selector = `[data-field="${key}"]`;
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            if (typeof value === 'string') {
                element.textContent = value;
            } else if (Array.isArray(value)) {
                // Handle arrays (for lists)
                if (element.tagName === 'UL' || element.tagName === 'OL') {
                    element.innerHTML = value.map(item => {
                        if (typeof item === 'string') {
                            return `<li>${item}</li>`;
                        } else if (typeof item === 'object') {
                            // Handle complex list items
                            return `<li>${item.text || item.name || item.title || JSON.stringify(item)}</li>`;
                        }
                        return '';
                    }).join('');
                }
            } else if (typeof value === 'object' && value !== null) {
                // Recursively handle nested objects
                injectContent(value, key);
            }
        });
    });
}

function injectGlobalContent(globalData) {
    // Inject global content like email, social links
    if (globalData.email) {
        document.querySelectorAll('[data-global="email"]').forEach(el => {
            if (el.tagName === 'A') {
                el.href = `mailto:${globalData.email}`;
                if (!el.textContent) {
                    el.textContent = globalData.email;
                }
            } else {
                el.textContent = globalData.email;
            }
        });
    }

    if (globalData.social) {
        if (globalData.social.linkedin) {
            document.querySelectorAll('[data-global="linkedin"]').forEach(el => {
                el.href = globalData.social.linkedin;
            });
        }

        if (globalData.social.instagram) {
            document.querySelectorAll('[data-global="instagram"]').forEach(el => {
                el.href = globalData.social.instagram;
            });
        }
    }

    if (globalData.site_name) {
        document.querySelectorAll('[data-global="site_name"]').forEach(el => {
            el.textContent = globalData.site_name;
        });
    }
}

// Helper function to set content by data attribute
function setContent(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = content;
    }
}

// Helper function to set HTML by data attribute
function setHTML(selector, html) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = html;
    }
}

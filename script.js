document.addEventListener('DOMContentLoaded', () => {
    // 表单处理
    const handleFormSubmit = async (form, lang) => {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('https://formspree.io/f/xzzdjjzn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showMessage('success', lang);
                form.reset();
            } else {
                showMessage('error', lang);
            }
        } catch (error) {
            showMessage('error', lang);
        }
    };

    // 显示消息
    const showMessage = (type, lang) => {
        const messages = document.querySelectorAll('.form-message');
        messages.forEach(msg => msg.style.display = 'none');
        
        const message = document.querySelector(`.form-message.${type}`);
        if (message) {
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        }
    };

    // 表单提交事件处理
    const forms = document.querySelectorAll('#contactForm');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const lang = document.documentElement.lang;
            await handleFormSubmit(form, lang);
        });
    });

    // 加载新闻数据
    const loadNews = async () => {
        const newsGrid = document.querySelector('.news-grid');
        newsGrid.innerHTML = '<div class="news-loading">Loading news...</div>';
        
        try {
            // 使用绝对路径获取news.json文件内容
            const response = await fetch('./news.json');
            console.log('News fetch response:', response);
            
            if (!response.ok) {
                throw new Error(`Failed to load news data: ${response.status} ${response.statusText}`);
            }
            
            const newsData = await response.json();
            console.log('News data loaded:', newsData);
            
            const lang = document.documentElement.lang;
            const news = newsData[lang === 'ja' ? 'ja' : 'en'].news;
            
            newsGrid.innerHTML = '';
            
            if (news && news.length > 0) {
                news.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            
            const date = document.createElement('div');
            date.className = 'news-date';
            date.textContent = new Date(item.date).toLocaleDateString(
                lang === 'ja' ? 'ja-JP' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
            );
            
            const title = document.createElement('div');
            title.className = 'news-title';
            
            if (item.url && item.url !== '#') {
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.title;
                title.appendChild(link);
            } else {
                title.textContent = item.title;
            }
            
                    newsItem.appendChild(date);
                    newsItem.appendChild(title);
                    newsGrid.appendChild(newsItem);
                });
            } else {
                newsGrid.innerHTML = '<div class="news-empty">No news available</div>';
            }
        } catch (error) {
            console.error('Error loading news data:', error);
            // 显示详细的错误信息在新闻区域
            newsGrid.innerHTML = `<div class="news-error">Failed to load news data: ${error.message}</div>`;
            
            // 尝试使用硬编码的备用数据
            try {
                const backupNewsData = {
                    "ja": {
                        "news": [
                            {
                                "date": "2025-03-15",
                                "title": "hello world (backup)",
                                "url": "#"
                            }
                        ]
                    },
                    "en": {
                        "news": [
                            {
                                "date": "2025-03-15",
                                "title": "hello world (backup)",
                                "url": "#"
                            }
                        ]
                    }
                };
                
                const lang = document.documentElement.lang;
                const news = backupNewsData[lang === 'ja' ? 'ja' : 'en'].news;
                
                newsGrid.innerHTML = '<div class="news-backup-notice">Using backup data</div>';
                
                news.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    
                    const date = document.createElement('div');
                    date.className = 'news-date';
                    date.textContent = new Date(item.date).toLocaleDateString(
                        lang === 'ja' ? 'ja-JP' : 'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                    );
                    
                    const title = document.createElement('div');
                    title.className = 'news-title';
                    
                    if (item.url && item.url !== '#') {
                        const link = document.createElement('a');
                        link.href = item.url;
                        link.textContent = item.title;
                        title.appendChild(link);
                    } else {
                        title.textContent = item.title;
                    }
                    
                    newsItem.appendChild(date);
                    newsItem.appendChild(title);
                    newsGrid.appendChild(newsItem);
                });
            } catch (backupError) {
                console.error('Error using backup news data:', backupError);
            }
        }
    };

    // 导航链接处理
    const navLinks = document.querySelectorAll('.nav-links a:not(.lang-switch)');
    const sections = document.querySelectorAll('section');

    // 更新活动状态的函数
    const updateActiveState = (targetId) => {
        // 如果切换到新闻部分，重新加载新闻
        if (targetId === 'news') {
            loadNews();
        }
        // 更新导航链接状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });

        // 更新section显示状态
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    };

    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            updateActiveState(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    // 处理页面加载时的初始状态
    const handleInitialState = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            updateActiveState(hash);
        } else {
            updateActiveState('home');
        }
    };

    // 处理浏览器后退/前进按钮
    window.addEventListener('popstate', handleInitialState);

    // 初始化页面状态
    handleInitialState();
});

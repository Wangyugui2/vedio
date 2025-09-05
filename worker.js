// worker.js for Cloudflare Pages
export default {
  async fetch(request, env) {
    // 处理CORS预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        }
      });
    }
    
    return new Response(HTML_CONTENT, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
      },
    });
  },
};

// HTML内容
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>万相AI视频生成器</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap">
    <style>
        /* 流云主题 - 受中国传统山水画中流动的云彩启发 */
        :root {
            /* 基础颜色 */
            --color-white-soft: #F3F6FA;
            --color-black-soft: #152944;
            
            /* 主色调及变体 */
            --color-primary: #4B7AB2;
            --color-primary-soft: rgba(75, 122, 178, 0.6);
            --color-primary-mute: rgba(75, 122, 178, 0.2);
            
            /* 亮色模式 */
            --color-background: #F3F6FA;
            --color-background-mute: #DCE6F2;
            --color-background-soft: #E8EEF5;
            
            --color-text: #152944;
            --color-text-soft: #4A5B74;
            
            --color-hover: #EBF1F8;
            --color-active: #E2EAF4;
            
            --color-border: rgba(21, 41, 68, 0.12);
            --color-border-soft: rgba(21, 41, 68, 0.06);
            
            --color-success: #4CAF50;
            --color-warning: #FF9800;
            --color-danger: #F44336;
            
            /* 组件样式 */
            --border-radius-sm: 6px;
            --border-radius: 8px;
            --border-radius-lg: 12px;
            --box-shadow: 0 4px 12px rgba(21, 41, 68, 0.08);
            --box-shadow-hover: 0 6px 16px rgba(21, 41, 68, 0.12);
            --transition-speed: 0.3s;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        body {
            background-color: var(--color-background);
            color: var(--color-text);
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px;
            background-color: var(--color-white-soft);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--box-shadow);
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
            color: var(--color-primary);
            font-weight: 700;
            font-size: 2.2rem;
            position: relative;
            padding-bottom: 15px;
        }

        h1::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background-color: var(--color-primary-soft);
            border-radius: 3px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--color-text);
            font-size: 0.95rem;
        }

        input[type="text"],
        input[type="number"],
        textarea,
        select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius);
            font-size: 16px;
            background-color: var(--color-white-soft);
            color: var(--color-text);
            transition: all var(--transition-speed);
        }

        input[type="text"]:focus,
        input[type="number"]:focus,
        textarea:focus,
        select:focus {
            border-color: var(--color-primary);
            outline: none;
            box-shadow: 0 0 0 3px var(--color-primary-mute);
        }

        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: var(--color-primary);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all var(--transition-speed);
            text-align: center;
        }

        .btn:hover {
            background-color: #3D6A9E;
            box-shadow: var(--box-shadow-hover);
            transform: translateY(-2px);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-block {
            display: block;
            width: 100%;
        }

        .tabs {
            display: flex;
            margin-bottom: 30px;
            border-bottom: 1px solid var(--color-border);
            position: relative;
        }

        .tab {
            padding: 12px 24px;
            cursor: pointer;
            font-weight: 500;
            color: var(--color-text-soft);
            transition: all var(--transition-speed);
            position: relative;
            z-index: 1;
            border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
        }

        .tab:hover {
            color: var(--color-primary);
            background-color: var(--color-hover);
        }

        .tab.active {
            color: var(--color-primary);
            font-weight: 600;
        }

        .tab.active::after {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--color-primary);
            border-radius: 2px 2px 0 0;
        }

        .tab-content {
            display: none;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .tab-content.active {
            display: block;
        }

        .image-preview {
            margin-top: 20px;
            text-align: center;
            background-color: var(--color-background-mute);
            padding: 20px;
            border-radius: var(--border-radius);
            border: 1px dashed var(--color-border);
        }

        .image-preview img {
            max-width: 100%;
            max-height: 300px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }

        .result-container {
            margin-top: 40px;
            padding: 25px;
            background-color: var(--color-background-soft);
            border-radius: var(--border-radius-lg);
            display: none;
            animation: fadeIn 0.5s ease;
            border: 1px solid var(--color-border-soft);
        }

        .result-container h2 {
            margin-bottom: 20px;
            color: var(--color-primary);
            font-weight: 600;
            font-size: 1.5rem;
        }

        .loading {
            display: none;
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background-color: var(--color-background-soft);
            border-radius: var(--border-radius);
            animation: fadeIn 0.5s ease;
        }

        .loading-spinner {
            border: 4px solid var(--color-primary-mute);
            border-left-color: var(--color-primary);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error-message {
            color: var(--color-danger);
            margin-top: 8px;
            display: none;
            font-size: 0.9rem;
            padding: 8px 12px;
            background-color: rgba(244, 67, 54, 0.1);
            border-radius: var(--border-radius-sm);
            border-left: 3px solid var(--color-danger);
        }

        .success-message {
            color: var(--color-success);
            margin-top: 8px;
            display: none;
            font-size: 0.9rem;
            padding: 8px 12px;
            background-color: rgba(76, 175, 80, 0.1);
            border-radius: var(--border-radius-sm);
            border-left: 3px solid var(--color-success);
        }

        .video-container {
            margin-top: 25px;
            text-align: center;
            background-color: var(--color-background-mute);
            padding: 20px;
            border-radius: var(--border-radius);
        }

        .video-container video {
            max-width: 100%;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }

        .info-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            background-color: var(--color-primary-soft);
            color: white;
            border-radius: 50%;
            font-size: 12px;
            margin-left: 5px;
            cursor: help;
        }

        .tooltip {
            position: relative;
            display: inline-block;
        }

        .tooltip .tooltip-text {
            visibility: hidden;
            width: 220px;
            background-color: var(--color-black-soft);
            color: white;
            text-align: center;
            border-radius: var(--border-radius-sm);
            padding: 8px 12px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -110px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 0.85rem;
            box-shadow: var(--box-shadow);
        }

        .tooltip .tooltip-text::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: var(--color-black-soft) transparent transparent transparent;
        }

        .tooltip:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 20px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
        }

        .random-seed {
            display: inline-flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            color: var(--color-primary);
            font-size: 0.9rem;
            padding: 6px 12px;
            background-color: var(--color-primary-mute);
            border-radius: var(--border-radius-sm);
            transition: all var(--transition-speed);
        }

        .random-seed:hover {
            background-color: var(--color-primary-soft);
            color: white;
        }

        .random-seed svg {
            margin-right: 5px;
        }

        .preset-prompts {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 12px;
        }

        .preset-prompt {
            padding: 8px 14px;
            background-color: var(--color-background-mute);
            border-radius: 20px;
            cursor: pointer;
            transition: all var(--transition-speed);
            font-size: 0.9rem;
            border: 1px solid var(--color-border-soft);
        }

        .preset-prompt:hover {
            background-color: var(--color-primary-mute);
            border-color: var(--color-primary-soft);
            transform: translateY(-2px);
        }
        
        .debug-info, .raw-response {
            margin-top: 20px;
            padding: 15px;
            background-color: var(--color-background-mute);
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius);
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 13px;
            white-space: pre-wrap;
            display: none;
            overflow-x: auto;
            color: var(--color-text);
        }
        
        .debug-info-header, .raw-response-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--color-border-soft);
            font-weight: 500;
            font-family: 'Noto Sans SC', sans-serif;
        }
        
        .debug-toggle, .raw-toggle {
            font-size: 0.85rem;
            color: var(--color-primary);
            cursor: pointer;
            user-select: none;
        }
        
        .debug-toggle:hover, .raw-toggle:hover {
            text-decoration: underline;
        }
        
        .file-input-container {
            position: relative;
            overflow: hidden;
            display: inline-block;
            width: 100%;
        }
        
        .file-input-container input[type="file"] {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
        
        .file-input-button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 16px;
            background-color: var(--color-background-mute);
            border: 1px dashed var(--color-border);
            border-radius: var(--border-radius);
            color: var(--color-text-soft);
            font-weight: 500;
            transition: all var(--transition-speed);
            text-align: center;
            cursor: pointer;
        }
        
        .file-input-button:hover {
            background-color: var(--color-hover);
            border-color: var(--color-primary-soft);
        }
        
        .file-input-button svg {
            margin-right: 8px;
        }
        
        .file-name {
            margin-top: 8px;
            font-size: 0.9rem;
            color: var(--color-text-soft);
            word-break: break-all;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 500;
            margin-left: 10px;
        }
        
        .status-badge.in-queue {
            background-color: rgba(255, 152, 0, 0.15);
            color: #E65100;
        }
        
        .status-badge.in-progress {
            background-color: rgba(33, 150, 243, 0.15);
            color: #0D47A1;
        }
        
        .status-badge.succeed {
            background-color: rgba(76, 175, 80, 0.15);
            color: #1B5E20;
        }
        
        .status-badge.failed {
            background-color: rgba(244, 67, 54, 0.15);
            color: #B71C1C;
        }
        
        .download-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
            padding: 10px 20px;
            background-color: var(--color-primary);
            color: white;
            border-radius: var(--border-radius);
            text-decoration: none;
            font-weight: 500;
            transition: all var(--transition-speed);
        }
        
        .download-button:hover {
            background-color: #3D6A9E;
            transform: translateY(-2px);
        }
        
        .download-button svg {
            margin-right: 8px;
        }
        
        .card {
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid var(--color-border-soft);
            transition: all var(--transition-speed);
        }
        
        .card:hover {
            box-shadow: var(--box-shadow-hover);
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--color-border-soft);
        }
        
        .card-title {
            font-weight: 600;
            color: var(--color-primary);
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>万相AI视频生成器</h1>
        
        <div class="tabs">
            <div class="tab active" data-tab="text-to-video">文生视频</div>
            <div class="tab" data-tab="image-to-video">图生视频</div>
        </div>
        
        <div class="tab-content active" id="text-to-video-content">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">API配置</div>
                </div>
                
                <div class="form-group">
                    <label for="api-key">API密钥 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">输入您的SiliconFlow API密钥</span></span></label>
                    <input type="text" id="api-key" placeholder="输入您的API密钥">
                    <div class="error-message" id="api-key-error">请输入有效的API密钥</div>
                </div>
                
                <div class="form-group">
                    <label for="api-url">API地址 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">默认为官方API地址，一般无需修改</span></span></label>
                    <input type="text" id="api-url" value="https://api.siliconflow.cn/v1/video/submit" placeholder="API地址">
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">生成参数</div>
                </div>
                
                <div class="form-group">
                    <label for="model-name">模型选择</label>
                    <select id="model-name">
                        <option value="Wan-AI/Wan2.2-T2V-A14B">Wan-AI/Wan2.2-T2V-A14B</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="prompt">提示词 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">描述您想要生成的视频内容</span></span></label>
                    <textarea id="prompt" rows="4" placeholder="描述您想要生成的视频内容"></textarea>
                    <div class="preset-prompts">
                        <div class="preset-prompt">一个女人戴着黑色帽子</div>
                        <div class="preset-prompt">海浪拍打海岸</div>
                        <div class="preset-prompt">一个灰发男人</div>
                        <div class="preset-prompt">年轻女子穿着红色连衣裙</div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="negative-prompt">负面提示词（可选） <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">描述您不希望在生成的视频中出现的内容</span></span></label>
                    <textarea id="negative-prompt" rows="3" placeholder="描述您不希望在生成的视频中出现的内容"></textarea>
                </div>
                
                <div class="grid">
                    <div class="form-group">
                        <label for="seed">种子值 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">控制随机性的数值，相同种子值可以生成相似结果</span></span></label>
                        <div style="display: flex; align-items: center;">
                            <input type="number" id="seed" placeholder="种子值" value="123">
                            <div class="random-seed" id="random-seed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                                随机
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="image-size">图像尺寸</label>
                        <select id="image-size">
                            <option value="1280x720">1280x720 (横向)</option>
                            <option value="720x1280">720x1280 (纵向)</option>
                            <option value="960x960">960x960 (正方形)</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-block" id="generate-btn">生成视频</button>
        </div>
        
        <div class="tab-content" id="image-to-video-content">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">API配置</div>
                </div>
                
                <div class="form-group">
                    <label for="api-key-i2v">API密钥 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">输入您的SiliconFlow API密钥</span></span></label>
                    <input type="text" id="api-key-i2v" placeholder="输入您的API密钥">
                    <div class="error-message" id="api-key-i2v-error">请输入有效的API密钥</div>
                </div>
                
                <div class="form-group">
                    <label for="api-url-i2v">API地址 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">默认为官方API地址，一般无需修改</span></span></label>
                    <input type="text" id="api-url-i2v" value="https://api.siliconflow.cn/v1/video/submit" placeholder="API地址">
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">生成参数</div>
                </div>
                
                <div class="form-group">
                    <label for="model-name-i2v">模型选择</label>
                    <select id="model-name-i2v">
                        <option value="Wan-AI/Wan2.2-I2V-A14B">Wan-AI/Wan2.2-I2V-A14B</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="image-upload">上传图片 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">上传一张图片作为视频生成的参考</span></span></label>
                    <div class="file-input-container">
                        <div class="file-input-button" id="file-input-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            点击上传图片
                        </div>
                        <input type="file" id="image-upload" accept="image/*">
                    </div>
                    <div class="file-name" id="file-name"></div>
                    <div class="error-message" id="image-upload-error">请上传有效的图片</div>
                </div>
                
                <div class="image-preview">
                    <img id="preview-image" src="" alt="" style="display: none;">
                </div>
                
                <div class="form-group">
                    <label for="prompt-i2v">提示词 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">描述您想要生成的视频内容</span></span></label>
                    <textarea id="prompt-i2v" rows="4" placeholder="描述您想要生成的视频内容"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="negative-prompt-i2v">负面提示词（可选） <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">描述您不希望在生成的视频中出现的内容</span></span></label>
                    <textarea id="negative-prompt-i2v" rows="3" placeholder="描述您不希望在生成的视频中出现的内容"></textarea>
                </div>
                
                <div class="grid">
                    <div class="form-group">
                        <label for="seed-i2v">种子值 <span class="tooltip"><span class="info-icon">?</span><span class="tooltip-text">控制随机性的数值，相同种子值可以生成相似结果</span></span></label>
                        <div style="display: flex; align-items: center;">
                            <input type="number" id="seed-i2v" placeholder="种子值" value="123">
                            <div class="random-seed" id="random-seed-i2v">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                                随机
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="image-size-i2v">图像尺寸</label>
                        <select id="image-size-i2v">
                            <option value="1280x720">1280x720 (横向)</option>
                            <option value="720x1280">720x1280 (纵向)</option>
                            <option value="960x960">960x960 (正方形)</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-block" id="generate-btn-i2v">生成视频</button>
        </div>
        
        <div class="loading" id="loading">
            <div class="loading-spinner"></div>
            <p>正在生成视频，请稍候...</p>
        </div>
        
        <div class="result-container" id="result-container">
            <h2>生成结果</h2>
            <div class="success-message" id="success-message">视频生成成功！</div>
            <div class="error-message" id="error-message">视频生成失败，请检查参数后重试。</div>
            
            <div class="video-container" id="video-container">
                <!-- 视频将在这里显示 -->
            </div>
            
            <div class="form-group" id="request-id-container" style="margin-top: 20px;">
                <label for="request-id">请求ID</label>
                <input type="text" id="request-id" readonly>
                <p style="margin-top: 10px; font-size: 14px;">请保存此ID，您可以使用它来查询视频生成状态。</p>
            </div>
            
            <div class="debug-info" id="debug-info">
                <div class="debug-info-header">
                    <span>调试信息</span>
                    <span class="debug-toggle" id="debug-toggle">隐藏</span>
                </div>
                <div id="debug-content"></div>
            </div>
            
            <div class="raw-response" id="raw-response">
                <div class="raw-response-header">
                    <span>原始响应</span>
                    <span class="raw-toggle" id="raw-toggle">隐藏</span>
                </div>
                <div id="raw-content"></div>
            </div>
        </div>
    </div>

    <script>
        // 切换标签页
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // 移除所有标签页的active类
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // 添加当前标签页的active类
                tab.classList.add('active');
                
                if (tabId === 'text-to-video') {
                    document.getElementById('text-to-video-content').classList.add('active');
                } else if (tabId === 'image-to-video') {
                    document.getElementById('image-to-video-content').classList.add('active');
                }
            });
        });
        
        // 随机种子
        document.getElementById('random-seed').addEventListener('click', () => {
            document.getElementById('seed').value = Math.floor(Math.random() * 1000000);
        });
        
        document.getElementById('random-seed-i2v').addEventListener('click', () => {
            document.getElementById('seed-i2v').value = Math.floor(Math.random() * 1000000);
        });
        
        // 预设提示词
        const presetPrompts = document.querySelectorAll('.preset-prompt');
        presetPrompts.forEach(prompt => {
            prompt.addEventListener('click', () => {
                document.getElementById('prompt').value = prompt.textContent;
            });
        });
        
        // 图片预览
        const imageUpload = document.getElementById('image-upload');
        const previewImage = document.getElementById('preview-image');
        const fileName = document.getElementById('file-name');
        const fileInputButton = document.getElementById('file-input-button');
        
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    fileName.textContent = file.name;
                    fileInputButton.textContent = '更换图片';
                };
                reader.readAsDataURL(file);
            }
        });
        
        // 调试信息切换
        document.getElementById('debug-toggle').addEventListener('click', function() {
            const debugContent = document.getElementById('debug-content');
            if (debugContent.style.display === 'none') {
                debugContent.style.display = 'block';
                this.textContent = '隐藏';
            } else {
                debugContent.style.display = 'none';
                this.textContent = '显示';
            }
        });
        
        // 原始响应切换
        document.getElementById('raw-toggle').addEventListener('click', function() {
            const rawContent = document.getElementById('raw-content');
            if (rawContent.style.display === 'none') {
                rawContent.style.display = 'block';
                this.textContent = '隐藏';
            } else {
                rawContent.style.display = 'none';
                this.textContent = '显示';
            }
        });
        
        // 添加调试信息显示功能
        function showDebugInfo(info) {
            const debugInfoElement = document.getElementById('debug-info');
            const debugContentElement = document.getElementById('debug-content');
            debugContentElement.textContent = JSON.stringify(info, null, 2);
            debugInfoElement.style.display = 'block';
        }
        
        // 显示原始响应
        function showRawResponse(text) {
            const rawResponseElement = document.getElementById('raw-response');
            const rawContentElement = document.getElementById('raw-content');
            rawContentElement.textContent = text;
            rawResponseElement.style.display = 'block';
        }
        
        // 安全解析JSON
        async function safeParseJSON(response) {
            const text = await response.text();
            showRawResponse(text);
            
            try {
                // 尝试直接解析
                return JSON.parse(text);
            } catch (e) {
                console.error("JSON解析错误:", e);
                
                try {
                    // 尝试清理响应文本后再解析
                    // 移除可能的BOM标记和其他非标准字符
                    const cleanedText = text.replace(/^\uFEFF/, '').trim();
                    return JSON.parse(cleanedText);
                } catch (e2) {
                    console.error("清理后JSON解析仍然失败:", e2);
                    
                    // 如果仍然失败，返回一个包含原始文本的对象
                    return {
                        parseError: true,
                        originalText: text,
                        error: e2.message
                    };
                }
            }
        }
        
        // 生成视频（文生视频）
        document.getElementById('generate-btn').addEventListener('click', async () => {
            const apiKey = document.getElementById('api-key').value;
            const apiUrl = document.getElementById('api-url').value;
            const modelName = document.getElementById('model-name').value;
            const prompt = document.getElementById('prompt').value;
            const negativePrompt = document.getElementById('negative-prompt').value;
            const seed = document.getElementById('seed').value;
            const imageSize = document.getElementById('image-size').value;
            
            // 验证输入
            if (!apiKey) {
                document.getElementById('api-key-error').style.display = 'block';
                return;
            } else {
                document.getElementById('api-key-error').style.display = 'none';
            }
            
            if (!prompt) {
                alert('请输入提示词');
                return;
            }
            
            // 显示加载状态
            document.getElementById('loading').style.display = 'block';
            document.getElementById('result-container').style.display = 'none';
            document.getElementById('debug-info').style.display = 'none';
            document.getElementById('raw-response').style.display = 'none';
            
            try {
                // 准备请求数据
                const requestData = {
                    model: modelName,
                    prompt: prompt,
                    image_size: imageSize,
                    seed: parseInt(seed)
                };
                
                // 只有当负面提示词不为空时才添加到请求中
                if (negativePrompt && negativePrompt.trim() !== '') {
                    requestData.negative_prompt = negativePrompt;
                }
                
                // 使用正确的API调用格式
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': \`Bearer \${apiKey}\`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                };
                
                // 显示请求数据用于调试
                showDebugInfo({
                    request: {
                        url: apiUrl,
                        method: options.method,
                        headers: {
                            'Authorization': 'Bearer ***', // 隐藏实际API密钥
                            'Content-Type': options.headers['Content-Type']
                        },
                        body: requestData
                    }
                });
                
                const response = await fetch(apiUrl, options);
                const data = await safeParseJSON(response);
                
                // 更新调试信息
                showDebugInfo({
                    request: {
                        url: apiUrl,
                        method: options.method,
                        headers: {
                            'Authorization': 'Bearer ***', // 隐藏实际API密钥
                            'Content-Type': options.headers['Content-Type']
                        },
                        body: requestData
                    },
                    response: data
                });
                
                // 隐藏加载状态
                document.getElementById('loading').style.display = 'none';
                document.getElementById('result-container').style.display = 'block';
                
                if (data.requestId) {
                    document.getElementById('success-message').style.display = 'block';
                    document.getElementById('error-message').style.display = 'none';
                    document.getElementById('request-id').value = data.requestId;
                    
                    // 开始轮询视频状态
                    pollVideoStatus(apiKey, data.requestId);
                } else {
                    document.getElementById('success-message').style.display = 'none';
                    document.getElementById('error-message').style.display = 'block';
                    document.getElementById('error-message').textContent = \`视频生成失败: \${data.error || JSON.stringify(data)}\`;
                }
            } catch (error) {
                // 隐藏加载状态
                document.getElementById('loading').style.display = 'none';
                document.getElementById('result-container').style.display = 'block';
                document.getElementById('success-message').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = \`请求错误: \${error.message}\`;
                
                // 更新调试信息
                showDebugInfo({
                    error: error.message,
                    stack: error.stack
                });
            }
        });
        
        // 生成视频（图生视频）
        document.getElementById('generate-btn-i2v').addEventListener('click', async () => {
            const apiKey = document.getElementById('api-key-i2v').value;
            const apiUrl = document.getElementById('api-url-i2v').value;
            const modelName = document.getElementById('model-name-i2v').value;
            const prompt = document.getElementById('prompt-i2v').value;
            const negativePrompt = document.getElementById('negative-prompt-i2v').value;
            const seed = document.getElementById('seed-i2v').value;
            const imageSize = document.getElementById('image-size-i2v').value;
            const imageFile = document.getElementById('image-upload').files[0];
            
            // 验证输入
            if (!apiKey) {
                document.getElementById('api-key-i2v-error').style.display = 'block';
                return;
            } else {
                document.getElementById('api-key-i2v-error').style.display = 'none';
            }
            
            if (!imageFile) {
                document.getElementById('image-upload-error').style.display = 'block';
                return;
            } else {
                document.getElementById('image-upload-error').style.display = 'none';
            }
            
            // 显示加载状态
            document.getElementById('loading').style.display = 'block';
            document.getElementById('result-container').style.display = 'none';
            document.getElementById('debug-info').style.display = 'none';
            document.getElementById('raw-response').style.display = 'none';
            
            try {
                // 读取图片文件为base64
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                
                reader.onload = async () => {
                    const base64Image = reader.result;
                    
                    // 准备请求数据
                    const requestData = {
                        model: modelName,
                        image_size: imageSize,
                        image: base64Image,
                        seed: parseInt(seed)
                    };
                    
                    // 只有当提示词不为空时才添加到请求中
                    if (prompt && prompt.trim() !== '') {
                        requestData.prompt = prompt;
                    }
                    
                    // 只有当负面提示词不为空时才添加到请求中
                    if (negativePrompt && negativePrompt.trim() !== '') {
                        requestData.negative_prompt = negativePrompt;
                    }
                    
                    // 使用正确的API调用格式
                    const options = {
                        method: 'POST',
                        headers: {
                            'Authorization': \`Bearer \${apiKey}\`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    };
                    
                    // 显示请求数据用于调试（不包含完整的base64图像数据）
                    const debugRequestData = {...requestData};
                    if (debugRequestData.image) {
                        debugRequestData.image = debugRequestData.image.substring(0, 50) + '... [截断]';
                    }
                    
                    showDebugInfo({
                        request: {
                            url: apiUrl,
                            method: options.method,
                            headers: {
                                'Authorization': 'Bearer ***', // 隐藏实际API密钥
                                'Content-Type': options.headers['Content-Type']
                            },
                            body: debugRequestData
                        }
                    });
                    
                    const response = await fetch(apiUrl, options);
                    const data = await safeParseJSON(response);
                    
                    // 更新调试信息
                    showDebugInfo({
                        request: {
                            url: apiUrl,
                            method: options.method,
                            headers: {
                                'Authorization': 'Bearer ***', // 隐藏实际API密钥
                                'Content-Type': options.headers['Content-Type']
                            },
                            body: debugRequestData
                        },
                        response: data
                    });
                    
                    // 隐藏加载状态
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('result-container').style.display = 'block';
                    
                    if (data.requestId) {
                        document.getElementById('success-message').style.display = 'block';
                        document.getElementById('error-message').style.display = 'none';
                        document.getElementById('request-id').value = data.requestId;
                        
                        // 开始轮询视频状态
                        pollVideoStatus(apiKey, data.requestId);
                    } else {
                        document.getElementById('success-message').style.display = 'none';
                        document.getElementById('error-message').style.display = 'block';
                        document.getElementById('error-message').textContent = \`视频生成失败: \${data.error || JSON.stringify(data)}\`;
                    }
                };
            } catch (error) {
                // 隐藏加载状态
                document.getElementById('loading').style.display = 'none';
                document.getElementById('result-container').style.display = 'block';
                document.getElementById('success-message').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = \`请求错误: \${error.message}\`;
                
                // 更新调试信息
                showDebugInfo({
                    error: error.message,
                    stack: error.stack
                });
            }
        });
        
        // 轮询视频状态
        async function pollVideoStatus(apiKey, requestId) {
            try {
                // 准备请求数据 - 使用正确的参数名称 "requestId" 而不是 "request_id"
                const requestData = {
                    requestId: requestId
                };
                
                // 使用正确的API调用格式和正确的API端点
                const options = {
                    method: 'POST',
                    headers: {
                        'Authorization': \`Bearer \${apiKey}\`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                };
                
                // 使用正确的API端点 "/status" 而不是 "/result"
                const response = await fetch('https://api.siliconflow.cn/v1/video/status', options);
                
                // 使用安全的JSON解析方法
                const data = await safeParseJSON(response);
                
                // 更新调试信息
                showDebugInfo({
                    pollRequest: {
                        url: 'https://api.siliconflow.cn/v1/video/status',
                        method: options.method,
                        body: requestData
                    },
                    pollResponse: data
                });
                
                // 检查是否有解析错误
                if (data.parseError) {
                    document.getElementById('success-message').style.display = 'none';
                    document.getElementById('error-message').style.display = 'block';
                    document.getElementById('error-message').textContent = \`JSON解析错误: \${data.error}\`;
                    return;
                }
                
                // 处理正常响应 - 注意状态值为 "Succeed" 而不是 "succeeded"
                if (data.status === 'Succeed') {
                    // 视频生成成功
                    const videoContainer = document.getElementById('video-container');
                    
                    // 检查结果格式，适应不同的API响应结构
                    const videoUrl = data.results && data.results.videos && data.results.videos.length > 0 
                        ? data.results.videos[0].url 
                        : (data.result && data.result.video_url ? data.result.video_url : null);
                    
                    if (videoUrl) {
                        videoContainer.innerHTML = \`
                            <video controls autoplay loop>
                                <source src="\${videoUrl}" type="video/mp4">
                                您的浏览器不支持视频标签。
                            </video>
                            <a href="\${videoUrl}" target="_blank" download class="download-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                下载视频
                            </a>
                        \`;
                    } else {
                        document.getElementById('success-message').style.display = 'none';
                        document.getElementById('error-message').style.display = 'block';
                        document.getElementById('error-message').textContent = '视频URL不可用，请检查API响应格式';
                    }
                } else if (data.status === 'Failed') {
                    // 视频生成失败
                    document.getElementById('success-message').style.display = 'none';
                    document.getElementById('error-message').style.display = 'block';
                    document.getElementById('error-message').textContent = \`视频生成失败: \${data.reason || JSON.stringify(data)}\`;
                } else if (data.status === 'InQueue' || data.status === 'InProgress') {
                    // 视频正在生成中，继续轮询
                    document.getElementById('success-message').style.display = 'none';
                    document.getElementById('error-message').style.display = 'none';
                    document.getElementById('loading').style.display = 'block';
                    
                    // 显示状态徽章
                    const statusClass = data.status === 'InQueue' ? 'in-queue' : 'in-progress';
                    document.getElementById('loading').innerHTML = \`
                        <div class="loading-spinner"></div>
                        <p>视频生成中 <span class="status-badge \${statusClass}">\${data.status}</span></p>
                        <p style="margin-top: 10px; font-size: 0.9rem; color: var(--color-text-soft);">请耐心等待，这可能需要几分钟时间...</p>
                    \`;
                    
                    setTimeout(() => {
                        pollVideoStatus(apiKey, requestId);
                    }, 3000); // 每3秒轮询一次
                } else {
                    // 未知状态
                    document.getElementById('success-message').style.display = 'none';
                    document.getElementById('error-message').style.display = 'block';
                    document.getElementById('error-message').textContent = \`未知状态: \${data.status || JSON.stringify(data)}\`;
                }
            } catch (error) {
                document.getElementById('success-message').style.display = 'none';
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').textContent = \`轮询错误: \${error.message}\`;
                
                // 更新调试信息
                showDebugInfo({
                    pollError: error.message,
                    stack: error.stack
                });
            }
        }
        
        // 直接查询视频状态（使用请求ID）
        function checkVideoStatus() {
            const apiKey = document.getElementById('api-key').value || document.getElementById('api-key-i2v').value;
            const requestId = document.getElementById('request-id').value;
            
            if (!apiKey) {
                alert('请输入API密钥');
                return;
            }
            
            if (!requestId) {
                alert('请输入请求ID');
                return;
            }
            
            // 显示加载状态
            document.getElementById('loading').style.display = 'block';
            document.getElementById('loading').innerHTML = \`
                <div class="loading-spinner"></div>
                <p>正在查询视频状态，请稍候...</p>
            \`;
            
            // 开始轮询视频状态
            pollVideoStatus(apiKey, requestId);
        }
        
        // 添加手动查询按钮
        const requestIdContainer = document.getElementById('request-id-container');
        const checkButton = document.createElement('button');
        checkButton.className = 'btn';
        checkButton.style.marginTop = '15px';
        checkButton.innerHTML = \`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            手动查询状态
        \`;
        checkButton.addEventListener('click', checkVideoStatus);
        requestIdContainer.appendChild(checkButton);
        
        // 初始化调试信息和原始响应的内容区域显示状态
        document.getElementById('debug-content').style.display = 'block';
        document.getElementById('raw-content').style.display = 'block';
    </script>
</body>
</html>`;

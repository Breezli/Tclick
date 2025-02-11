const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
	const win = new BrowserWindow({
		width: 500,
		height: 210,
		x: 800, // 指定初始 x 坐标
		y: 20, // 指定初始 y 坐标
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
			// 设置 CSP
			additionalArguments: ['--disable-features=ElectronSandbox'], // 根据需要调整
			webviewTag: false, // 禁止使用 <webview> 标签
			webSecurity: true,
			sandbox: true,
			contentSecurityPolicy: `
        default-src 'self';
        script-src 'self';
        connect-src 'self';
        style-src 'self' 'unsafe-inline'; /* 如果需要内联样式 */
        img-src 'self' data:;
        font-src 'self';
      `,
		},
		title: 'Clock', // 设置窗口标题
		icon: path.join(__dirname, 'dist', 'installer-icon.ico'), // 设置窗口图标
		autoHideMenuBar: true, //自动隐藏菜单栏
		alwaysOnTop: true, // 确保窗口始终在顶部
		// frame: false, // 隐藏窗口边框
		// resizable: false, // 禁止调整窗口大小
		transparent: true, // 使窗口透明
		// skipTaskbar: true, // 跳过任务栏显示
	})

	if (process.env.NODE_ENV === 'development') {
		win.loadURL('http://localhost:5173')
		// win.loadFile('dist/index.html')
	} else {
		win.loadFile(path.resolve(__dirname, 'dist', 'index.html'))
	}
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// 其他事件监听器...

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

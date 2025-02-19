const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 320,
		minHeight: 400,
		x: undefined,
		y: undefined,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
			additionalArguments: ['--disable-features=ElectronSandbox'],
			webviewTag: false,
			webSecurity: true,
			sandbox: true,
			contentSecurityPolicy: `
        default-src 'self';
        script-src 'self';
        connect-src 'self';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data:;
        font-src 'self';
      `,
		},
		title: 'TClick',
		icon: path.join(__dirname, 'dist', 'installer-icon.ico'),
		autoHideMenuBar: true,
		alwaysOnTop: false,
		transparent: false,
	})

	if (process.env.NODE_ENV === 'development') {
		win.loadURL('http://localhost:5173')
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

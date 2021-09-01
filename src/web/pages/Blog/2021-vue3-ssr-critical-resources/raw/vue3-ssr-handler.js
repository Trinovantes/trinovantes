// Express handler for rendering Vue 3 application

server.get('*', async(req, res) => {
    const app = createSSRApp()
    const appContent = await renderToString(app)
    const html = `
        <html>
        <body>
            <div id="app">${appContent}</div>
            <script src="main.js"></script>
        </body>
        </html>
    `

    res.end(html)
})

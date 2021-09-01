server.get('*', async(req, res) => {
    const renderer = new VueSsrRenderer('ssr-manifest.json')
    const { app, router } = createApp()
    const routeComponents = getMatchedComponents(router.currentRoute.value)
    const html = await renderer.render(app, appContext, routeComponents)
    res.end(html)
})

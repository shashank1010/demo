import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'

const renderApp = title => `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  </head>
  <body>
    <div id="root" class="${APP_CONTAINER_CLASS}"></div>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
  </body>
</html>
`

export default renderApp

import { getQueryStringParam } from 'substance'
import { TextureWebApp } from 'substance-texture'

window.addEventListener('load', () => {
  /*
    The DAR storage is used to load and save DARs.
    In the web demo we use an in-memory implementation, which is reset on every reload.
   */
  const storageType = 'vfs'
  const vfs = window.vfs

  /*
    Only 'kitchen-sink' is available in the web demo.
    The corresponding DAR will be loaded from the storage.
  */
  const archiveId = 'kitchen-sink'

  /*
    Client-side routing needs to be disabled because SciFree does their own routing.
  */
  const enableRouting = false

  /*
    Texture can be configured to be readonly = not editable.
  */
  const readOnly = getQueryStringParam('readonly') === 'true'

  /*
    Provide a HTML param 'scrollto' containing a node id (see 'data-id' attributes of rendered elements, or @id attributes in XML)
   */
  const scrollToNodeId = getQueryStringParam('scrollto')

  window.app = SciFreeTextureWebApp.mount({
    archiveId,
    storageType,
    vfs,
    enableRouting,
    editable: !readOnly,
    scrollToNodeId: scrollToNodeId
  }, window.document.body)
})

class SciFreeTextureWebApp extends TextureWebApp {
  // Note: this.state.archive is null until the archive is loaded
  // Once loaded it is rendered immediately, and only after that
  // then we can do things such as scrolling to content
  didUpdate () {
    if (this.state.archive && this.props.scrollToNodeId) {
      const articlePanel = this.find('.sc-article-panel')
      if (articlePanel) {
        articlePanel.send('scrollTo', { nodeId: this.props.scrollToNodeId })
      }
    }
  }
}

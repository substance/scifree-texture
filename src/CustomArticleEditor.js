import { $$ } from 'substance'
import { DefaultArticleEditor, Managed } from 'substance-texture'

/**
 * This example monkey-patches the DefaultArticleEditor, to display a 'logo' in the toolbar.
 */
export default class CustomArticleEditor extends DefaultArticleEditor {
  _renderToolbar () {
    const Toolbar = this.getComponent('toolbar')
    const configurator = this._getConfigurator()
    // ATTENTION: a toolpanel 'toolbar' has to be configured via Configurator
    const items = configurator.getToolPanel('toolbar', true)

    return $$('div').addClass('se-toolbar-wrapper').append(
      $$('div', { class: 'se-logo' }, 'SciFree'),
      $$(Managed(Toolbar), {
        items,
        bindings: ['commandStates']
      }).ref('toolbar')
    )
  }
}

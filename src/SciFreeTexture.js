import { Texture } from 'substance-texture'
import CustomArticleEditor from './CustomArticleEditor'
import CustomParagraphComponent from './CustomParagraphComponent'

Texture.registerPlugin({
  name: 'scifree-customizations',
  configure (configurator) {
    const articleConfig = configurator.getConfiguration('article')

    /*
      Note: Texture uses a so called Configurator to setup model, converters, and also rendering components.
      Many things can be already customized very easily by overriding the registration, replaceing
      the default implementation by a custom one.
      Below just two examples. Notice the need of `{ force: true }` to override exisiting registrations.
    */
    articleConfig.addComponent('article-editor', CustomArticleEditor, { force: true })
    articleConfig.addComponent('paragraph', CustomParagraphComponent, { force: true })
  }
})

import { ParagraphComponent } from 'substance-texture'

export default class CustomParagraphComponent extends ParagraphComponent {
  render () {
    return super.render().addClass('sc-custom-paragraph')
  }
}

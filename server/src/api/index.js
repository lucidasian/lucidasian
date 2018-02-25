import article from './article'
import authenticate from './authenticate'
import user from './user'

export default ({ app, DB }) => {
  article: article({ app, DB })
  authenticate: authenticate({ app, DB })
  user: user({ app, DB })
}
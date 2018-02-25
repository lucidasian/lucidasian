import article from './article'
import authenticate from './authenticate'
import user from './user'

export default ({ app, DB, passport }) => {
  article: article({ app, DB })
  authenticate: authenticate({ app, DB, passport })
  user: user({ app, DB })
}
import authenticate from './authenticate'
import user from './user'

export default ({ app, DB }) => {
  authenticate: authenticate({ app, DB })
  user: user({ app, DB })
}
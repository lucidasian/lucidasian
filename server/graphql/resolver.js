export default {
  Article: {
    async positions (root, args) {
      return root.positions
    }
  },
  Articles: {
    async cover (root, args, { DB }) {
      const covers = root.filter(article => article.positions.cover)

      const coversWithDisplayName = covers.map((cover) => {
        const newCover = {
          id: cover._id,
          title: cover.title,
          content: cover.content,
          publish: cover.publish,
          positions: cover.positions,
          tags: cover.tags,
          createdBy: DB.User.getDisplayName(cover.createdBy.socialID, cover.createdBy.socialType),
          updatedBy: cover.updatedBy ? DB.User.getDisplayName(cover.updatedBy.socialID, cover.updatedBy.socialType) : null,
          createdAt: cover.createdAt,
          updatedAt: cover.updatedAt
        }
        return newCover
      })
      
      return coversWithDisplayName
    },
    async highlights (root, args, { DB }) {
      const highlights = root.filter(article => article.positions.highlights)

      const highlightsWithDisplayName = highlights.map((highlight) => {
        const newHighlight = {
          id: highlight._id,
          title: highlight.title,
          content: highlight.content,
          publish: highlight.publish,
          positions: highlight.positions,
          tags: highlight.tags,
          createdBy: DB.User.getDisplayName(highlight.createdBy.socialID, highlight.createdBy.socialType),
          updatedBy: highlight.updatedBy ? DB.User.getDisplayName(highlight.updatedBy.socialID, highlight.updatedBy.socialType) : null,
          createdAt: highlight.createdAt,
          updatedAt: highlight.updatedAt
        }
        return newHighlight
      })
      return highlightsWithDisplayName
    },
    async trips (root, args, { DB }) {
      const trips = root.filter(article => article.positions.trips)

      const tripsWithDisplayName = trips.map((trip) => {
        const newTrip = {
          id: trip._id,
          title: trip.title,
          content: trip.content,
          publish: trip.publish,
          positions: trip.positions,
          tags: trip.tags,
          createdBy: DB.User.getDisplayName(trip.createdBy.socialID, trip.createdBy.socialType),
          updatedBy: trip.updatedBy ? DB.User.getDisplayName(trip.updatedBy.socialID, trip.updatedBy.socialType) : null,
          createdAt: trip.createdAt,
          updatedAt: trip.updatedAt
        }
        return newTrip
      })      
      return tripsWithDisplayName
    }
  },
  User: {
    async loginLogs (root, args, { DB, user }) {
      // admin role is required to use this method
      if (user.roles.admin) {
        const foundUser = await DB.User.getUser(root.socialID, root.socialType)
        // can't direct access loginLogs cause it give us undefined
        const loginLogs = await JSON.parse(JSON.stringify(foundUser.loginLogs)) 
        return loginLogs
      }
    },
    async roles (root, args) {
      return root.roles
    }
  },
  Users: {
    async admin ( root, args, { DB, user }) {
      const admins = await root.filter(user => user.roles.admin)
      return admins
    },
    async member ( root, args, { DB, user }) {
      const members = await root.filter(user => user.roles.member)
      return members
    },
    async staff ( root, args, { DB, user }) {
      const staffs = await root.filter(article => article.roles.staff)
      return staffs
    }
  },
  Query: {
    async articles (root, args, { DB }) {
      const articles = await DB.Article.getAllArticle()
      return articles
    },
    async loginUser (root, args, { user }) {
      return {
        socialID: user.socialID,
        socialType: user.socialType,
        roles: user.roles,
        displayName: user.displayName
      }
    },
    async user (root, args, { DB }) {
      const user = await DB.User.findOne({
        socialID: args.socialID,
        socialType: args.socialType
      })
      return user
    },
    async users (root, args, { DB, user }) {
      // admin role is required to use this method
      if (user.roles.admin) {
        let users = await DB.User.getAllUser()
        return users
      }
    }
  },
  Mutation: {
    async addStaffRole (root, args, { DB, user }) {
      // admin role is required to use this method
      if (user.roles.admin) {
        // find the user then add staff role
        const updatedUser = await DB.User.addStaffRole(args.socialID, args.socialType)
        // // if user is exist, then return updated user information, else return null
        if (updatedUser) {
          return {
            socialID: updatedUser.socialID,
            socialType: updatedUser.socialType,
            roles: updatedUser.roles,
            loginLogs: updatedUser.loginLogs,
            displayName: updatedUser.displayName
          }
        }
      }
    },
    async createArticle (root, args, { DB, user }) {
      // staff role is required to use this method
      if (user.roles.staff) {
        const newArticle = await DB.Article.createArticle(
          user, 
          args.title, 
          args.content, 
          args.publish, 
          args.positions, 
          args.tags
        )

        return {
          id: newArticle._id,
          title: newArticle.title,
          content: newArticle.content,
          publish: newArticle.publish,
          positions: newArticle.positions,
          tags: newArticle.tags,
          createdBy: DB.User.getDisplayName(newArticle.createdBy.socialID, newArticle.createdBy.socialType),
          updatedBy: newArticle.updatedBy ? DB.User.getDisplayName(newArticle.updatedBy.socialID, newArticle.updatedBy.socialType) : null,
          createdAt: newArticle.createdAt,
          updatedAt: newArticle.updatedAt
        }
      }
    },
    async modifyArticle (root, args, { DB, user }) {
      // staff role is required to use this method
      if (user.roles.staff) {
        let modifyArticle = await DB.Article.modifyArticle(
          user, 
          args.articleID,
          args.title, 
          args.content, 
          args.publish, 
          args.positions, 
          args.tags
        )

        return {
          id: modifyArticle._id,
          title: modifyArticle.title,
          content: modifyArticle.content,
          publish: modifyArticle.publish,
          positions: modifyArticle.positions,
          tags: modifyArticle.tags,
          createdBy: DB.User.getDisplayName(modifyArticle.createdBy.socialID, modifyArticle.createdBy.socialType),
          updatedBy: modifyArticle.updatedBy ? DB.User.getDisplayName(modifyArticle.updatedBy.socialID, modifyArticle.updatedBy.socialType) : null,
          createdAt: modifyArticle.createdAt,
          updatedAt: modifyArticle.updatedAt
        }
      }
    },
    async removeStaffRole (root, args, { DB, user }) {
      // admin role is required to use this method
      if (user.roles.admin) {
        // find the user then add staff role
        const updatedUser = await DB.User.removeStaffRole(args.socialID, args.socialType)
        // // if user is exist, then return updated user information, else return null
        if (updatedUser) {
          return {
            socialID: updatedUser.socialID,
            socialType: updatedUser.socialType,
            roles: updatedUser.roles,
            loginLogs: updatedUser.loginLogs,
            displayName: updatedUser.displayName
          }
        }
      }
    }
  }
}
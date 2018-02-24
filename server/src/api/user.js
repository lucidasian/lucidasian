export default ({ app, DB }) => {
  // Get all user
  app.get('/api/user/all', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.admin) {
      const foundUsers = await DB.User.getAllUser()
      if (foundUsers) {
        res.send({
          success: true,
          data: foundUsers
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 200
        })
        .status(204)
      }
    } else {
      res.send({
        success: false,
        errCode: 100
      })
      .status(403)
    }
    next()
  })

  // Get all user by role
  app.get('/api/user/all/:role', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.admin) {
      const foundUsers = await DB.User.getAllUserByRole(req.params.role)
      if (foundUsers) {
        res.send({
          success: true,
          data: foundUsers
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 200
        })
        .status(204)
      }
    } else {
      res.send({
        success: false,
        errCode: 100
      })
      .status(403)
    }
    next()
  })

  // Get current user's login logs
  app.get('/api/user/login/log/', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.member) {
      const socialID = caller.socialID, socialType = caller.socialType
      const foundUser = await DB.User.getUser(socialID, socialType)
      if (foundUser) {
        res.send({
          success: true,
          data: foundUser.loginLogs
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 200
        })
        .status(204)
      }
    } else {
      res.send({
        success: false,
        errCode: 102
      })
      .status(403)
    }
    next()
  })

  // Get current user basic info
  app.get('/api/user/basic/me', (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.member) {
      res.send({
        success: true,
        data: {
          socialID: caller.socialID,
          socialType: caller.socialType,
          roles: caller.roles,
          displayName: caller.displayName
        }
      })
      .status(200)
    } else {
      res.send({
        success: false,
        errCode: 102
      })
      .status(403)
    }
    next()
  })

  // Get a user basic info
  app.get('/api/user/basic/:socialType/:socialID', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.staff) {
      const socialID = req.params.socialID, socialType = req.params.socialType
      const foundUsers = await DB.User.getUser(socialID, socialType)
      if (foundUsers) {
        res.send({
          success: true,
          data: {
            socialID: foundUsers.socialID,
            socialType: foundUsers.socialType,
            roles: foundUsers.roles,
            displayName: foundUsers.displayName
          }
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 200
        })
        .status(204)
      }
    } else {
      res.send({
        success: false,
        errCode: 101
      })
      .status(403)
    }
    next()
  })

  // Get all user basic info
  app.get('/api/user/basic/all', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.staff) {
      const socialID = req.params.socialID, socialType = req.params.socialType
      let foundUsers = await DB.User.getAllUser()
      if (foundUsers) {
        foundUsers = foundUsers.map(x => {
          x = JSON.parse(JSON.stringify(x))
          delete x.loginLogs
          delete x.createdAt
          delete x._id
          delete x.__v
          delete x.token
          return x
        }) 
        
        res.send({
          success: true,
          data: foundUsers
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 200
        })
        .status(204)
      }
    } else {
      res.send({
        success: false,
        errCode: 101
      })
      .status(403)
    }
    next()
  })

  //  Get a user's login logs
  app.get('/api/user/login/log/:socialType/:socialID', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.admin) {
      const socialID = req.params.socialID, socialType = req.params.socialType
      const foundUser = await DB.User.getUser(socialID, socialType)
      if (foundUser) {
        res.send({
          success: true,
          data: foundUser.loginLogs
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 200
        })
        .status(204)
      }
    } else {
      res.send({
        success: false,
        errCode: 100
      })
      .status(403)
    }
    next()
  })

  // Get current user's roles
  app.get('/api/user/roles', (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.member) {
      res.send({
        success: true,
        data: caller.roles
      })
      .status(200)
    } else {
      res.send({
        success: false,
        errCode: 102
      })
      .status(403)
    }
    next()
  })
  
  // Get a user's roles
  app.get('/api/user/roles/:socialType/:socialID', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.admin) {
      const socialID = req.params.socialID, socialType = req.params.socialType
      const foundUser = await DB.User.getUser(socialID, socialType)
      if (foundUser) {
        res.send({
          success: true,
          data: foundUser.roles
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 200
        })
        .status(204)
      }
    } else {
      res.send({
        success: false,
        errCode: 100
      })
      .status(403)
    }
    next()
  })

  // Promote an user to staff role
  app.put('/api/user/role/promote/staff', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.admin) {
      const socialID = req.body.socialID, socialType = req.body.socialType
      const updatedUser = await DB.User.promoteStaffRole(socialID, socialType)
      if (updatedUser && updatedUser.roles.staff) {
        res.send({
          success: true,
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 300
        })
        .status(400)
      }
    } else {
      res.send({
        success: false,
        errCode: 100
      })
      .status(403)
    }
    next()
  })

  // Demote an staff to member role
  app.put('/api/user/role/demote/staff', async (req, res, next) => {
    const caller = req.user

    if (caller && caller.roles.admin) {
      const socialID = req.body.socialID, socialType = req.body.socialType
      const updatedUser = await DB.User.demoteStaffRole(socialID, socialType)
      if (updatedUser && !updatedUser.roles.staff) {
        res.send({
          success: true,
        })
        .status(200)
      } else {
        res.send({
          success: false,
          errCode: 300
        })
        .status(400)
      }
    } else {
      res.send({
        success: false,
        errCode: 100
      })
      .status(403)
    }
    next()
  })
}

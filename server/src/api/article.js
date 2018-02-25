export default ({ app, DB }) => {
  // Get an article by id
  app.get('/api/article/:id', async (req, res, next) => {
    const caller = req.user
    const id = req.params.id
    
    const foundArticle = await DB.Article.getByID(id)
    
    if (foundArticle && caller && caller.roles.staff) {
      // return data for staff
      res.send({
        success: true,
        data: {
          title: foundArticle.title,
          content: foundArticle.content,
          tags: foundArticle.tags,
          createdBy: await DB.User.getDisplayName(foundArticle.createdBy.socialID, foundArticle.createdBy.socialType),
          createdAt: foundArticle.createdAt,
          updatedBy: foundArticle.updatedBy ? await DB.User.getDisplayName(foundArticle.updatedBy.socialID, foundArticle.updatedBy.socialType) : null,
          updatedAt: foundArticle.updatedAt ? foundArticle.updatedAt : null,
          publish: foundArticle.publish,
          positions: foundArticle.positions
        }
      })
      .status(200)
    } else if (foundArticle && foundArticle.publish) {
      // return data for member and guest
      res.send({
        success: true,
        data: {
          title: foundArticle.title,
          content: foundArticle.content,
          tags: foundArticle.tags,
          createdBy: await DB.User.getDisplayName(foundArticle.createdBy.socialID, foundArticle.createdBy.socialType),
          createdAt: foundArticle.createdAt,
          updatedBy: foundArticle.updatedBy ? await DB.User.getDisplayName(foundArticle.updatedBy.socialID, foundArticle.updatedBy.socialType) : null,
          updatedAt: foundArticle.updatedAt ? foundArticle.updatedAt : null,
        }
      })
      .status(200)
    } else {
      // content not found or not publish in member and guest case
      res.send({
        success: false,
        errCode: 200
      })
      .status(204)
    }
    next()
  })

  // Get all basic article info (_id, title) group by positions
  app.get('/api/articles', async (req, res, next) => {
    const articles = await DB.Article.getAll()
    let covers = articles.filter(x => x.positions.cover)
    let highlights = articles.filter(x => x.positions.highlights)
    let trips = articles.filter(x => x.positions.trips)

    covers = covers.map(x => {
      const temp = {
        id: x._id,
        title: x.title
      }
      return temp
    })

    highlights = highlights.map(x => {
      const temp = {
        id: x._id,
        title: x.title
      }
      return temp
    })

    trips = trips.map(x => {
      const temp = {
        id : x._id,
        title: x.title
      }
      return temp
    })

    res.send({
      success: true,
      data: {
        covers: covers.length != 0 ? covers : null,
        highlights: highlights.length != 0 ? highlights : null,
        trips: trips.length != 0 ? trips : null
      }
    })
    .status(200)

    next()
  })

  // Create an article
  app.post('/api/article/create', async (req, res, next) => {
    const caller = req.user
    
    if (caller && caller.roles.staff) {
      // creator from session
      const creatorID = caller.socialID,
            creatorType = caller.socialType,
            title = req.body.title,
            content = req.body.content,
            publish = req.body.publish,
            positions = req.body.positions,
            tags = req.body.tags
      if (title != undefined && content != undefined && publish != undefined && positions != undefined && tags != undefined) {
        const newArticle = await DB.Article.create(
          { creatorType, creatorID },
          { title, content, publish, positions, tags }
        )
        if (newArticle) {
          res.send({
            success: true,
            data: {
              id: newArticle._id
            }
          })
          .status(200)
        } else {
          res.send({
            success: false,
            errCode: 400
          })
          .status(500)
        }
      } else {
        res.send({
          success: false,
          errCode: 301
        })
        .status(400)  
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

  // Modify an article
  app.put('/api/article/modify', async (req, res, next) => {
    const caller = req.user
    console.log(caller)
    console.log(req.body)
    if (caller && caller.roles.staff) {
      // creator from session
      const updaterID = caller.socialID,
            updaterType = caller.socialType,
            id = req.body.id,
            title = req.body.title,
            content = req.body.content,
            publish = req.body.publish,
            positions = req.body.positions,
            tags = req.body.tags
      console.log(id, title, content, publish, positions, tags)
      if (id != undefined && title != undefined && content != undefined && publish != undefined && positions != undefined && tags != undefined) {
        const updatedArticle = await DB.Article.modify(
          { updaterType, updaterID },
          { id, title, content, publish, positions, tags }
        )
        if (updatedArticle) {
          res.send({
            success: true,
            data: {
              id: updatedArticle._id
            }
          })
          .status(200)
        } else {
          res.send({
            success: false,
            errCode: 400
          })
          .status(500)
        }
      } else {
        res.send({
          success: false,
          errCode: 301
        })
        .status(400)  
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
}
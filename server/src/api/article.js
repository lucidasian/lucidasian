export default ({ app, DB }) => {
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
        const newArticle = await DB.Article.createArticle(
          { creatorType, creatorID },
          { title, content, publish, positions, tags }
        )
        console.log(newArticle)
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
  })
}
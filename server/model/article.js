import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publish: { type: Boolean, default: false},
  positions: { 
    cover: { type: Boolean, default: false },
    highlights: { type: Boolean, default: false },
    trips: { type: Boolean, default: false }
  },
  tags: { type: [String], enum: ['culture', 'adventure'] },
  createdBy: { 
    socialID: { type: String, required: true },
    socialType: { type: String, required: true }
  },
  updatedBy: { 
    socialID: { type: String },
    socialType: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
})

// articleSchema.index({ socialID: 1, socialType: -1 }, { unique: true })

// using the schema to make a collection in our DB
export const Article = mongoose.model('Article', articleSchema)

export const createArticle = async (user, title, content, publish, positions, tags) => {
  if (positions) {
    // cast from array to object
    var positions = await positions.reduce((accumulator, currentElement) => {
      accumulator[currentElement] = true
      return accumulator
    }, {
      // initial object
      cover: false,
      highlights: false,
      trips: false
    })
  }

  const newArticle = await new Article({
    title: title,
    content: content,
    publish: publish,
    positions: positions,
    tags: tags,
    createdBy: {
      socialID: user.socialID,
      socialType: user.socialType
    }
  })
  return newArticle.save()
}

export const getAllArticle = async() => {
  const articles = await Article.find()
  return articles
}

export const modifyArticle = async (user, articleID, title, content, publish, positions, tags) => {
  if (positions) {
    // cast from array to object
    var positions = await positions.reduce((accumulator, currentElement) => {
      accumulator[currentElement] = true
      return accumulator
    }, {
      // initial object
      cover: false,
      highlights: false,
      trips: false
    })
  }

  const updatedArticle = await Article.findOneAndUpdate({
    // conditions
    _id: articleID
  }, {
    // update
    title: title,
    content: content,
    publish: publish,
    positions: positions,
    tags: tags,
    updatedBy: {
      socialID: user.socialID,
      socialType: user.socialType
    },
    updatedAt: Date.now()
  }, {
    new: true, // return modified document
  })

  return updatedArticle
}
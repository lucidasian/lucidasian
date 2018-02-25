import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publish: { type: Boolean, default: false},
  positions: { 
    cover: { type: Boolean, default: false },
    highlight: { type: Boolean, default: false },
    trip: { type: Boolean, default: false }
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

export const create = async (
  { creatorType, creatorID },
  { title, content, publish, positions, tags }
) => {
  // cast from array to object
  var positions = await positions.reduce((accumulator, currentElement) => {
    accumulator[currentElement] = true
    return accumulator
  }, {
    // initial accumulator
    cover: false,
    highlight: false,
    trip: false
  })

  const newArticle = await new Article({
    title: title,
    content: content,
    publish: publish,
    positions: positions,
    tags: tags,
    createdBy: {
      socialID: creatorID,
      socialType: creatorType
    }
  })
  return newArticle.save()
}

export const getByID = async (_id) => {
  const article = await Article.findOne({
    _id: _id,
  })
  return article
}

export const getAll = async() => {
  const articles = await Article.find().sort('-createdAt')
  return articles
}

export const modify = async (
  { updaterType, updaterID },
  { id, title, content, publish, positions, tags }
) => {
  // cast from array to object
  var positions = await positions.reduce((accumulator, currentElement) => {
    accumulator[currentElement] = true
    return accumulator
  }, {
    // initial accumulator
    cover: false,
    highlight: false,
    trip: false
  })

  const updatedArticle = await Article.findOneAndUpdate({
    // conditions
    _id: id
  }, {
    // update
    title: title,
    content: content,
    publish: publish,
    positions: positions,
    tags: tags,
    updatedBy: {
      socialID: updaterID,
      socialType: updaterType
    },
    updatedAt: Date.now()
  }, {
    new: true, // return modified document
  })

  return updatedArticle
}
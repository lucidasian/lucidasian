// cast roles from array objects to an object
export const rolesCasting = (roles) => {
  return new Promise(async (resolve, reject) => {
    roles = await JSON.parse(JSON.stringify(roles)) // can't direct access cause it give us undefined
    // reduce array to object
    roles = await roles.reduce((accumulator, currentElement) => {
      accumulator[currentElement.name] = true
      return accumulator
    }, {
      // initial object
      admin: false,
      member: false,
      staff: false
    })
    resolve(roles)
  })
}
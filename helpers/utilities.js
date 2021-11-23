//Assuming we have unique usernames so this return array of 1 item
const findOneByUsername = (array, element) => {
  return array.find((e) => e.username === element)
}
const findOneById = (array, element) => {
  return array.find((e) => e.id === element)
}

const filterUsers = (array) => {
  return array.map((element) => {
    const { password, ...rest } = element
    return rest
  })
}

const filterUser = (array, element) => {
  return filterUsers(array).find((e) => e.username === element)
}

module.exports = { findOneByUsername, filterUsers, filterUser, findOneById }

const {
  fetchRepositories,
  fetchDevelopers
} = require("@huchenme/github-trending")

const cloud = require("wx-server-sdk")
cloud.init()

const typeMapFn = {
  repo: fetchRepositories,
  user: fetchDevelopers
}
exports.main = async ({ type = "repo", language, since }, context) => {
  let data = null
  try {
    data = await typeMapFn[type]({ language, since })
  } catch (e) {
    console.log(`get ${type} err: `, e)
  }
  return { data }
}

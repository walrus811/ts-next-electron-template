
if (process.argv.length < 3) {
  console.log(
      "you must specify version number like ex) node set-version.js 1.0.0"
  )
  return
}

//12.12.12
const VERSION_REGEX = /\d{1,2}.\d{1,2}\.\d{1,2}/
const inputVersion = process.argv[2]

if (!inputVersion.match(VERSION_REGEX)) {
  console.log(
      `version number format is '\d{1,2}.\d{1,2}\.\d{1,2}', ex) 1.2.12. your input : ${inputVersion}`
  )
  return
}

let package = require("../package.json")
let packageDeploy = require("../package-deploy.json")
package.version = inputVersion
packageDeploy.version = inputVersion

const fs = require("fs")

const packageData = JSON.stringify(package, null, 2)

fs.writeFileSync("package.json", packageData)

const packageDeployData = JSON.stringify(packageDeploy, null, 2)

fs.writeFileSync("package-deploy.json", packageDeployData)
console.log(`version is bumped up to ${inputVersion}`)

// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Create contest', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Create contest', async function() {
    await driver.get("http://35.225.238.45:3000/")
    await driver.manage().window().setRect(858, 824)
    await driver.findElement(By.id("slide-right-button")).click()
    await driver.findElement(By.name("roll_no")).click()
    await driver.findElement(By.name("roll_no")).sendKeys("F18121")
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).sendKeys("admin")
    await driver.findElement(By.css(".in")).click()
    await driver.findElement(By.css(".swal2-confirm")).click()
    await driver.findElement(By.css("div:nth-child(2) > .MuiPaper-root > .MuiCardMedia-root")).click()
    await driver.findElement(By.css(".btn")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("Test 1")
    await driver.findElement(By.id("start")).click()
    await driver.findElement(By.id("start")).sendKeys("2021-04-22T12:07")
    await driver.findElement(By.id("swal2-content")).click()
    await driver.findElement(By.id("end")).click()
    await driver.findElement(By.id("end")).click()
    await driver.findElement(By.id("end")).sendKeys("2021-04-22T15:08")
    await driver.findElement(By.id("swal2-content")).click()
    await driver.findElement(By.css(".swal2-confirm")).click()
    await driver.findElement(By.css(".swal2-confirm")).click()
    await driver.close()
  })
})

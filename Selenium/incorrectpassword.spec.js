// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Incorrect password', function() {
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
  it('Incorrect password', async function() {
    await driver.get("http://35.225.238.45:3000/")
    await driver.manage().window().setRect(1051, 806)
    await driver.findElement(By.id("slide-right-button")).click()
    await driver.findElement(By.name("roll_no")).click()
    await driver.findElement(By.name("roll_no")).sendKeys("18121")
    await driver.findElement(By.id("sign-in-form")).click()
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("roll_no")).click()
    await driver.findElement(By.css(".in")).click()
    await driver.findElement(By.name("roll_no")).sendKeys("18212")
    await driver.findElement(By.css(".in")).click()
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).sendKeys("sadaf")
    await driver.findElement(By.css(".in")).click()
    await driver.findElement(By.css(".swal2-confirm")).click()
    await driver.close()
  })
})

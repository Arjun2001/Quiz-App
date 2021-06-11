// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('PHONE LOGIN', function() {
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
  it('PHONE LOGIN', async function() {
    await driver.get("http://35.225.238.45:3000/")
    await driver.manage().window().setRect(858, 824)
    await driver.findElement(By.id("slide-right-button")).click()
    await driver.findElement(By.css(".bi")).click()
    {
      const element = await driver.findElement(By.css(".bi"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    {
      const element = await driver.findElement(By.css(".firebaseui-id-country-selector"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css(".firebaseui-relative-wrapper > .firebaseui-error-wrapper")).click()
    {
      const element = await driver.findElement(By.css(".firebaseui-id-country-selector-code"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    await driver.findElement(By.css(".firebaseui-id-country-selector-code")).click()
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css(".mdl-button:nth-child(101)")).click()
    await driver.findElement(By.id("ui-sign-in-phone-number-input")).click()
    await driver.findElement(By.id("ui-sign-in-phone-number-input")).sendKeys("7092938301")
    await driver.switchTo().frame(0)
    await driver.findElement(By.css(".recaptcha-checkbox-border")).click()
    await driver.switchTo().defaultContent()
    await driver.switchTo().frame(2)
    await driver.close()
  })
})

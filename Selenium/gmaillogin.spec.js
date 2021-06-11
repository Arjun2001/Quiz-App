// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Gmail login', function() {
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
  it('Gmail login', async function() {
    await driver.get("https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=1043691686545-4nknph7lefhv3n4sbna3v1qua3ve54fl.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fquizapp-3d61b.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDkkM2HvjPKAzORd2uq6i2a6WFJjMltL71z-YTTQ6LO8rvFi8-TtSVzSX56uKUpHAHP-hLamejX4mVBGRsGyarXYLNDasygthEh-gtc9TABbIbj_mFdeBe8y4faenYXRyYyXHB6WJINcdBtEE29Mc5jHpSVliJBvYav04rdhOMxmrb2BzZaGcTyxOtaB2F-WjgZJ1z4p6brh3rERiIKpG4oFfX2s9fWIQbC3p3FHW5BvK4zPCYrW2yZzBc0uKqwM7LGKmm63eZv0BiK_ikKMMb6vO_FIu4U_MpAjcVTPoLqYl8U8MN8O9z9krm_TTBL32SCucHY&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=http%3A%2F%2Flocalhost%3A3000&flowName=GeneralOAuthFlow")
    await driver.manage().window().setRect(860, 824)
    await driver.findElement(By.css(".JDAKTe:nth-child(2) > .lCoei")).click()
    await driver.close()
  })
})
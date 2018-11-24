/*
 Lab 3 testing

 Jaak Luht, Katre Kuklase, Tanel Joosep, Hendrik Ekke Altnurme
 
 @desc
*/

// Require the Puppeteer module and the built-in assert module
const assert = require('assert')
const puppeteer = require('puppeteer')
const { expect } = require('chai')

let browser
let page

// Launch browser
before(async () => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
})

// Start a test suite
describe('Lab3 testid', () => {
  it('Kasutaja on amazon.co.uk lehel', async () => {

    // Set the view port size
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.co.uk/', { waitUntil: 'networkidle0' })

    // Assert the search input is there
    const searchInput = await page.$('input#twotabsearchtextbox')
    assert.ok(searchInput)
  }).timeout(50000)

  it('FN1_Otsingusse märksõna lisamine kuvab tulemuse', async () => {
    // kasutaja otsib terminit "Office chair"
    await page.type('input#twotabsearchtextbox', 'Office chair')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#resultsCol')
    const firstProduct = await page.$('.s-item-container')
    assert.ok(firstProduct)
    await page.screenshot({ path: 'amzFN1.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

  it('FN2_Kliendiabi lehe avamine', async () => {
    await page.waitForSelector('#navFooter')
    await page.click('#navFooter > div.navFooterVerticalColumn.navAccessibility > div > div:nth-child(7) > ul > li.nav_last > a')
    await page.waitForSelector('body > div:nth-child(27) > div.help-content.csg')
    const landedOnHelp = await page.$('body > div:nth-child(27) > div.help-content.csg')
    assert.ok(landedOnHelp)
    await page.screenshot({ path: 'amzFN2.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

  it('FN3_toodete sorteerimine', async () => {
    await page.waitForSelector('#nav-search')
    await page.type('input#twotabsearchtextbox', 'Office chair')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#s-result-info-bar-content')
    await page.waitForSelector('#resultsCol')
    await page.screenshot({ path: 'amzFN3-1.png'})
    await page.select('#sort', 'price-asc-rank')
    await page.waitForSelector('#resultsCol')
    await page.screenshot({ path: 'amzFN3-2.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

  it('FN4_Kasutajat registreerimata ei saa oste sooritada', async () => {
    await page.waitForSelector('#nav-search')
    await page.type('input#twotabsearchtextbox', 'Office chair')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#resultsCol')
    await page.click('#atfResults')
    await page.waitForSelector('#dp-container')
    await page.waitForSelector('#buyNow_feature_div')
    await page.screenshot({ path: 'amzFN4-1.png'})
    await page.click('#buy-now-button')
    await page.waitForSelector('#authportal-main-section')
    const landedOnLogin = await page.$('#authportal-main-section > div:nth-child(2) > div > div > form > div > div > div')
    assert.ok(landedOnLogin)
    await page.screenshot({ path: 'amzFN4-2.png'})
    await page.click('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
  }).timeout(50000)

  it('FN5_toote ostukorvi lisamine', async () => {
    await page.waitForSelector('#nav-search')
    await page.type('input#twotabsearchtextbox', 'Office chair')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#resultsCol')
    await page.click('#atfResults')
    await page.waitForSelector('#dp-container')
    await page.waitForSelector('#addToCart_feature_div')
    await page.screenshot({ path: 'amzFN5-1.png'})
    await page.click('#add-to-cart-button')
    await page.waitForSelector('#huc-v2-order-row-with-divider')
    const addedToCartNotice = await page.$('#huc-v2-order-row-items-msg')
    assert.ok(addedToCartNotice)
    await page.screenshot({ path: 'amzFN5-2.png'})
    await page.click('#nav-cart')
    await page.waitForSelector('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature')
    const addedToCartItem = await page.$('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature')
    assert.ok(addedToCartItem)
    await page.screenshot({ path: 'amzFN5-3.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

  it('FN6_toote ostukorvist kustutamine', async () => {
    await page.waitForSelector('#nav-search')
    await page.click('#nav-cart')
    await page.waitForSelector('#a-page > div.a-container')
    await page.waitForSelector('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature > div > div.sc-list-item-content > div > div.a-column.a-span8 > div > div > div.a-fixed-left-grid-col.a-col-right')
    await page.screenshot({ path: 'amzFN6-1.png'})
    await page.click('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature > div > div.sc-list-item-content > div > div.a-column.a-span8 > div > div > div.a-fixed-left-grid-col.a-col-right > div > span.a-size-small.sc-action-delete > span > input[type="submit"]')
    await page.waitForSelector('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature > div > div.sc-list-item-removed-msg.a-padding-medium')
    const cartEmpty = await page.$('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature > div > div.sc-list-item-removed-msg.a-padding-medium')
    assert.ok(cartEmpty)
    await page.screenshot({ path: 'amzFN6-2.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

  it('FN7_E-poe tutvustuse kuvamine', async () => {
    await page.waitForSelector('#navFooter')
    await page.click('#navFooter > div.navFooterVerticalColumn.navAccessibility > div > div:nth-child(1) > ul > li:nth-child(2) > a')
    await page.waitForSelector('body > footer > div')
    await page.screenshot({ path: 'amzFN7.png'})
    await page.click('body > footer > div > div.PageHome-footer-topRow > div.PageHome-footerContent > a')
  }).timeout(50000)

  it('FN8_Kampaaniate lehe kuvamine', async () => {
    await page.waitForSelector('#nav-search')
    await page.waitForSelector('#nav-xshop')
    await page.click('#nav-xshop > a:nth-child(3)')
    await page.waitForSelector('#merchandised-content')
    await page.screenshot({ path: 'amzFN8.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

  it('FN9_Kasutaja saab sisse logida', async () => {
    await page.waitForSelector('#nav-search')
    await page.waitForSelector('#nav-tools')
    await page.click('#nav-link-yourAccount')
    await page.waitForSelector('#authportal-main-section')
    await page.type('#ap_email', 'testkasutaja3@hotmail.com')
    await page.type('#ap_password', 'Testkasutaja123')
    await page.click('#signInSubmit')
    await page.waitForSelector('#nav-search')
    await page.screenshot({ path: 'amzFN9.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

  it('FN10_Kasutaja saab välja logida', async () => {
    await page.waitForSelector('#nav-search')
    await page.click('#nav-item-signout')
    await page.waitForSelector('#nav-search')
    await page.screenshot({ path: 'amzFN9.png'})
    await page.click('#nav-logo > a.nav-logo-link')
  }).timeout(50000)

})

after(async () => {
  await browser.close()
})
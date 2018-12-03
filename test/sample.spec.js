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
describe('Kasutaja autentimine', () => {
  it('Kasutaja on amazon.co.uk lehel', async () => {

    // Set the view port size
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.co.uk/', { waitUntil: 'networkidle0' })

    // Assert the search input is there
    const searchInput = await page.$('input#twotabsearchtextbox')
    assert.ok(searchInput)
  }).timeout(50000)

  it('Kasutaja saab sisse logida (Test 4)', async () => {
    await page.waitForSelector('#nav-search')
    await page.waitForSelector('#nav-tools')
    await page.click('#nav-link-yourAccount')
    await page.waitForSelector('#authportal-main-section')
    await page.type('#ap_email', 'testkasutaja3@hotmail.com')
    await page.type('#ap_password', 'Testkasutaja123')
    await page.click('#signInSubmit')
    await page.waitForSelector('#nav-search')
    await page.screenshot({ path: 'test4.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Kasutaja saab välja logida (Test 5)', async () => {
    await page.waitForSelector('#nav-search')
    await page.waitForSelector('#nav-flyout-anchor')
    await page.hover('#nav-link-yourAccount')
    await page.waitForSelector('#nav-flyout-yourAccount > div.nav-template.nav-flyout-content.nav-tpl-itemList')
    await page.click('#nav-item-signout')
    await page.waitForSelector('#authportal-main-section > div:nth-child(2) > div > div > form > div > div > div')
    await page.screenshot({ path: 'test5.png'})
    await page.click('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
  }).timeout(50000)

  it('Registreerimata kasutaja ei saa toote eest maksta (Test 6)', async () => {
    await page.waitForSelector('#nav-search')
    await page.type('input#twotabsearchtextbox', 'Wilton Kingsize Six Hole Muffin Tin')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#resultsCol')
    await page.click('#result_1 > div > div.a-fixed-left-grid > div > div.a-fixed-left-grid-col.a-col-right > div.a-row.a-spacing-small > div:nth-child(1) > a > h2')
    await page.waitForSelector('#dp-container')
    await page.waitForSelector('#buyNow_feature_div')
    await page.click('#buy-now-button')
    await page.waitForSelector('#authportal-main-section')
    await page.screenshot({ path: 'test6.png'})
    await page.click('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Kasutaja avab kliendiabi lehe (Test 1)', async () => {
    await page.waitForSelector('#navFooter')
    await page.click('#navFooter > div.navFooterVerticalColumn.navAccessibility > div > div:nth-child(7) > ul > li.nav_last > a')
    await page.waitForSelector('body > div:nth-child(27) > div.help-content.csg > div.csg-inner > div.csg-header.a-row.a-spacing-small > div > h1')
    await page.screenshot({ path: 'test1.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Kasutajakonto loomine (Test 2)', async () => {
    await page.waitForSelector('#nav-search')
    await page.waitForSelector('#nav-tools')
    await page.click('#nav-link-yourAccount')
    await page.waitForSelector('#authportal-main-section')
    await page.click('#createAccountSubmit')
    await page.waitForSelector('#ap_register_form > div > div > h1')
    await page.screenshot({ path: 'test2.png'})
    await page.click('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Kasutaja on unustanud parooli (Test 3)', async () => {
    await page.waitForSelector('#nav-search')
    await page.waitForSelector('#nav-tools')
    await page.click('#nav-link-yourAccount')
    await page.waitForSelector('#authportal-main-section')
    await page.click('#auth-fpp-link-bottom')
    await page.waitForSelector('#authportal-main-section > div:nth-child(2) > div > div.a-box.a-spacing-base > div > form > h1')
    await page.screenshot({ path: 'test3.png'})
    await page.click('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

})

describe('Sooduspakkumised ning kampaaniad kasutajale', () => {
  it('Kasutaja on amazon.co.uk lehel', async () => {

    // Set the view port size
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.co.uk/', { waitUntil: 'networkidle0' })

    // Assert the search input is there
    const searchInput = await page.$('input#twotabsearchtextbox')
    assert.ok(searchInput)
  }).timeout(50000)

  it('Käiva kampaania lehele navigeerimine (Test 17)', async () => {
    await page.waitForSelector('#nav-search')
    await page.click('#nav-belt > div.nav-right')
    await page.screenshot({ path: 'test17.png'})
    await page.goBack()
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Amazom prime prooviaja lehele navigeerimine (Test 16)', async () => {
    await page.waitForSelector('#nav-search')
    await page.waitForSelector('#nav-tools')
    await page.click('#nav-link-prime')
    await page.waitForSelector('#prime-hero-header')
    await page.click('#prime-header-CTA > span > input')
    await page.waitForSelector('#authportal-main-section > div:nth-child(2) > div > div > form > div > div > div')
    await page.screenshot({ path: 'test16.png'})
    await page.click('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('e-poodi tutvustav leht "About us" (Test 15)', async () => {
    await page.waitForSelector('#navFooter')
    await page.click('#navFooter > div.navFooterVerticalColumn.navAccessibility > div > div:nth-child(1) > ul > li:nth-child(2) > a')
    await page.waitForSelector('body > footer > div')
    await page.screenshot({ path: 'test15.png'})
    await page.click('body > footer > div > div.PageHome-footer-topRow > div.PageHome-footerContent > a')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Tööpakkumise lehe kuvamine (Test 13)', async () => {
    await page.waitForSelector('#navFooter')
    await page.click('#navFooter > div.navFooterVerticalColumn.navAccessibility > div > div:nth-child(1) > ul > li.nav_first > a')
    await page.waitForSelector('#home-search > h1')
    await page.screenshot({ path: 'test13.png'})
    await page.goBack()
    await page.waitForSelector('#nav-search')
  }).timeout(50000)
})

describe('Ostukorvi funktsionaalsus', () => {
  it('Kasutaja on amazon.co.uk lehel', async () => {

    // Set the view port size
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.amazon.co.uk/', { waitUntil: 'networkidle0' })

    // Assert the search input is there
    const searchInput = await page.$('input#twotabsearchtextbox')
    assert.ok(searchInput)
  }).timeout(50000)

  it('Toote otsimine, mis on laoseisus (Test 7)', async () => {
    await page.type('input#twotabsearchtextbox', 'Wilton Kingsize Six Hole Muffin Tin')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#resultsCol')
    const displayProduct = await page.$('#result_0')
    assert.ok(displayProduct)
    await page.screenshot({ path: 'test7success.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search') 
  }).timeout(50000)

  it('Toote otsimine, mida ei ole laoseisus (Test 7)', async () => {
    await page.type('input#twotabsearchtextbox', 'Blue unorthodox chipmunk eating a bagle')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#noResultsTitle')
    const noProduct = await page.$('#noResultsTitle')
    assert.ok(noProduct)
    await page.screenshot({ path: 'test7fail.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search') 
  }).timeout(50000)

  it('Toote info vaatamine (Test 12)', async () => {
    await page.waitForSelector('#nav-search')
    await page.type('input#twotabsearchtextbox', 'Wilton Kingsize Six Hole Muffin Tin')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#resultsCol')
    await page.screenshot({ path: 'test12.png'})
    await page.waitForSelector('#nav-search')
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Kasutaja sorteerib hinna alusesl otsingu tulemusi (Test 8)', async () => {
    await page.waitForSelector('#nav-search')
    await page.type('input#twotabsearchtextbox', 'Office chair')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#s-result-info-bar-content')
    await page.waitForSelector('#resultsCol')
    await page.select('#sort', 'price-asc-rank')
    await page.waitForSelector('#resultsCol')
    await page.screenshot({ path: 'test8.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Toote ostukorvi lisamine (Test 9)', async () => {
    await page.waitForSelector('#nav-search')
    await page.type('input#twotabsearchtextbox', 'Wilton Kingsize Six Hole Muffin Tin')
    await page.click('#nav-search > form > div.nav-right')
    await page.waitForSelector('#resultsCol')
    await page.click('#result_1 > div > div.a-fixed-left-grid > div > div.a-fixed-left-grid-col.a-col-right > div.a-row.a-spacing-small > div:nth-child(1) > a > h2')
    await page.waitForSelector('#dp-container')
    await page.waitForSelector('#addToCart_feature_div')
    await page.waitForSelector('#add-to-cart-button')
    await page.click('#add-to-cart-button')
    await page.waitForSelector('#huc-v2-order-row-with-divider')
    const addedToCartNotice = await page.$('#huc-v2-order-row-items-msg')
    assert.ok(addedToCartNotice)
    await page.click('#nav-cart')
    await page.waitForSelector('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature')
    const addedToCartItem = await page.$('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature')
    assert.ok(addedToCartItem)
    await page.screenshot({ path: 'test9.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Toote koguse muutmine ostukorvis (Test 11)', async () => {
    await page.waitForSelector('#nav-search')
    await page.click('#nav-cart')
    await page.waitForSelector('#a-page > div.a-container')
    await page.waitForSelector('#a-autoid-0-announce')
    await page.click('#a-autoid-0-announce')
    await page.waitForSelector('#a-popover-1 > div > div')
    await page.click('#dropdown1_1')
    await page.waitForSelector('#a-popover-1 > div > div')
    await page.waitForSelector('#nav-search')
    await page.screenshot({ path: 'test11.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Toote eest maksmise lehele suunamine (Test 18)', async () => {
    await page.waitForSelector('#nav-search')
    await page.click('#nav-cart')
    await page.waitForSelector('#a-page > div.a-container')
    await page.waitForSelector('#sc-buy-box-ptc-button')
    await page.click('#sc-buy-box-ptc-button')
    await page.waitForSelector('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
    await page.screenshot({ path: 'test18.png'})
    await page.click('#a-page > div.a-section.a-padding-medium.auth-workflow > div.a-section.a-spacing-none.auth-navbar > div > a')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)

  it('Toote ostukorvist eemaldamine (Test 10)', async () => {
    await page.waitForSelector('#nav-search')
    await page.click('#nav-cart')
    await page.waitForSelector('#a-page > div.a-container')
    await page.waitForSelector('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature > div > div.sc-list-item-content > div > div.a-column.a-span8 > div > div > div.a-fixed-left-grid-col.a-col-right')
    await page.click('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature > div > div.sc-list-item-content > div > div.a-column.a-span8 > div > div > div.a-fixed-left-grid-col.a-col-right > div > span.a-size-small.sc-action-delete > span > input[type="submit"]')
    await page.waitForSelector('#sc-active-cart > div')
    // const cartEmpty = await page.$('#activeCartViewForm > div.sc-list-body.sc-java-remote-feature > div > div.sc-list-item-removed-msg.a-padding-medium')
    // assert.ok(cartEmpty)
    await page.screenshot({ path: 'test10.png'})
    await page.click('#nav-logo > a.nav-logo-link')
    await page.waitForSelector('#nav-search')
  }).timeout(50000)
  
})

after(async () => {
  await browser.close()
})
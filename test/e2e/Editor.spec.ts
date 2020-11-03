// import 'expect-puppeteer'

// const timeout = 10000;

// describe('Editor init', () => {

//   beforeAll(async () => {
//     await page.goto('http://localhost:8088', { waitUntil: "domcontentloaded" });
//   });

//   afterAll(async () => {
//     await page.close()
//   })

//   beforeEach(async () => {
//     await jestPuppeteer.resetBrowser()
//   })

//   test('it should can init basic editor by new Editor instance pass dom', async() => {

//     const editor = await page.$('#editor')
//     expect(await editor.$eval('.editor-toolbar', node => node.innerHTML)).not.toBe(null)
//     expect(await editor.$eval('.editor-content', node => node.innerHTML)).not.toBe(null)
//   })
// })

jest.setTimeout(100000)

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google')
  })
})

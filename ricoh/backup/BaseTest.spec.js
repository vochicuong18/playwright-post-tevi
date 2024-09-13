import test from '../../src/utilities/fixture'

test.describe( () => {
test.beforeAll('Navigate to homepage', async ({page}) => {
    await page.goto('http://ricoh.cloud.bluecomvn.com/');
})

test.afterAll('Clean up', async ({page}) => {
    await page.close()
}) 
})
import {test} from "../../src/utilities/Fixtures";

test('post tevi', async ({
                         browserContext,
                         homePage,
                         myAccount,
                         audience,
                         star,
                         allowReplying,
                         canComment,
                         allowRepWithLink,
                         pinPost,
                         collection,
                         statusPost,
                         filePath,
                     }) => {
    await homePage.goToMyAccountPage()
    await myAccount.createNewPost()
    await myAccount.selectAudience(audience, star)
    await myAccount.postSetting(allowReplying, canComment, allowRepWithLink, pinPost)
    await myAccount.selectCollection(collection)
    await myAccount.fillStatus(statusPost)
    await myAccount.attachFile(filePath)
    // await myAccount.submitPost()
})
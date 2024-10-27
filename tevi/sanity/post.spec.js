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
    console.log("-------audience1: ", audience)
    await homePage.goToMyAccountPage()
    console.log("-------audience2: ", audience)

    await myAccount.createNewPost()
    await myAccount.selectAudience(audience, star)
    await myAccount.postSetting(allowReplying, canComment, allowRepWithLink, pinPost)
    await myAccount.selectCollection(collection)
    await myAccount.fillStatus(statusPost)
    await myAccount.attachFile(filePath)
    await myAccount.submitPost()
    console.log("-------audience3: ", audience)
})
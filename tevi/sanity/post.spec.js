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

    console.log("-------audience: ", audience)
    console.log("-------star: ", star)
    console.log("-------allowReplying: ", allowReplying)
    console.log("-------canComment: ", canComment)
    console.log("-------allowRepWithLink: ", allowRepWithLink)
    console.log("-------pinPost: ", pinPost)
    console.log("-------collection: ", collection)
    console.log("-------statusPost: ", statusPost)
    console.log("-------filePath: ", filePath)



    await homePage.goToMyAccountPage()
    await myAccount.createNewPost()
    await myAccount.selectAudience(audience, star)
    await myAccount.postSetting(allowReplying, canComment, allowRepWithLink, pinPost)
    await myAccount.selectCollection(collection)
    await myAccount.fillStatus(statusPost)
    await myAccount.attachFile(filePath)
    // await myAccount.submitPost()
})
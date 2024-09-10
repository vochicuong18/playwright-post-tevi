
let MAX_COUNT = 30  

class WaitUtility {
    

    constructor(page) {
		this.page = page
	}

    async sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
      }

    async waitForURLEndWith(endURL){
        for (let i = 0; i < MAX_COUNT; i++) {
          if (this.page.url().endsWith(endURL))
            break
          else
            await this.sleep(1)
        }
    }  

    async waitForURLContains(url){
      for (let i = 0; i < MAX_COUNT; i++) {
        if (this.page.url().includes(url))
          break
        else
          await this.sleep(1)
      }
  }  
}

export default WaitUtility
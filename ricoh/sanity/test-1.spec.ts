import { test, expect } from '@playwright/test';
import StringUtility from '../../src/utilities/StringUtility';

test('test', async ({ page }) => {
   let data = StringUtility.removeLines('test      \n    from')
   console.log(data)
   console.log(StringUtility.removeRedundantCharacter(data, '  '))
});
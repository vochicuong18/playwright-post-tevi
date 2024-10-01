import {test} from '@playwright/test'
import checkout from '../sanity/CheckOutAsUserTest.spec'
import loginTest from "../sanity/LoginTest_WithoutFixture.spec";

test.describe('login', loginTest)
test.describe('checkout', checkout)
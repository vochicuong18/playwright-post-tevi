import {test} from '@playwright/test'
import checkout from '../backup/CheckOutAsUserTest.spec'
import loginTest from "../backup/LoginTest_WithoutFixture.spec";

test.describe('login', loginTest)
test.describe('checkout', checkout)
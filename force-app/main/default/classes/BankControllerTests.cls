@isTest
public class BankControllerTests {
    @testSetup
    static void setup() {
        // Create test data
        BankAccount__c testAccount = new BankAccount__c(
            Name = 'Test Account',
            Amount__c = 1000,
            CreditCardNo__c = '12345678',
            Age__c = 30
        );
        insert testAccount;
    }

    @isTest
    static void testGetAccountById() {
        // Retrieve the test account
        BankAccount__c testAccount = [SELECT Id FROM BankAccount__c LIMIT 1];

        // Call the method
        BankAccount__c result = BankController.getAccountById(testAccount.Id);

        // Verify the results
        System.assertNotEquals(null, result, 'The result should not be null');
        System.assertEquals(testAccount.Id, result.Id, 'The account Id should match');
        System.assertEquals('Test Account', result.Name, 'The account name should match');
        System.assertEquals(1000, result.Amount__c, 'The account amount should match');
        System.assertEquals('12345678', result.CreditCardNo__c, 'The credit card number should match');
        System.assertEquals(30, result.Age__c, 'The account age should match');
    }
}
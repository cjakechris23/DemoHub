public with sharing class BankingAppController {

    @AuraEnabled(cacheable=true)
    public static BankAccount__c getBankAccounts() {
    try {
        // Assuming UserInfo.getUserId() to get the current user's ID  
        return [SELECT Id, Name, Amount__c, CreditCardNo__c FROM BankAccount__c LIMIT 1];
    } catch (Exception e) {
        // Handle the exception or log it
        System.debug('Error retrieving bank accounts: ' + e.getMessage());
        throw e;
    }
}

    @AuraEnabled
    public static void createBankAccount(String name, Integer age, Decimal amount, String creditCardNo) {
        BankAccount__c newBankAccount = new BankAccount__c();
        newBankAccount.Name = name;
        newBankAccount.Amount__c = amount;
        newBankAccount.creditCardNo__c = creditCardNo;
        newBankAccount.Age__c = age;
        insert newBankAccount;
    }

    @AuraEnabled
    public static void updateBankAccount(Id accountId, String name, Decimal amount, String creditCardNo) {
        BankAccount__c accountToUpdate = [SELECT Id, Name, Amount__c, CreditCardNo__c FROM BankAccount__c WHERE Id = :accountId LIMIT 1];
        accountToUpdate.Name = name;
        accountToUpdate.Amount__c = amount;
        accountToUpdate.CreditCardNo__c = creditCardNo;
        update accountToUpdate;
    }
}


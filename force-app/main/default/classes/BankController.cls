/**
 * @description       : For getting bank account information
 * @author            : Jake Chris Delos Reyes
 * @group             : 
 * @last modified on  : 06-04-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class BankController {
    @AuraEnabled(cacheable=true)
    public static List<BankAccount__c> getBankInfo(Id userId) {
        return [SELECT Id, Name, Amount__c, CreditCardNo__c, Age__c FROM BankAccount__c WHERE OwnerId = :userId];
    }

   
    @AuraEnabled
    public static BankAccount__c deposit(Id accountId, Decimal amount) {
        BankAccount__c acc = [SELECT Amount__c FROM BankAccount__c WHERE Id     = :accountId FOR UPDATE];
        acc.Amount__c += amount;
        update acc;
        return acc;
    }

    @AuraEnabled
    public static List<BankAccount__c> searchBankAccountsByName(String searchTerm) {
    // Ensure search term is not null or empty
        if (String.isBlank(searchTerm)) {
            throw new IllegalArgumentException('Search term must not be blank.');
        }

        // Add wildcard to the search term to match any records starting with the term
        String formattedSearchTerm = '%' + searchTerm + '%';

        // Execute the SOSL query
        List<List<sObject>> searchResults = [FIND :formattedSearchTerm 
                                            IN ALL FIELDS 
                                            RETURNING BankAccount__c (Id, Name, CreditCardNo__c, Amount__c)];

        // Cast the results to the correct type
        List<BankAccount__c> bankAccounts = (List<BankAccount__c>)searchResults[0];

        return bankAccounts;
    }
    
    @AuraEnabled
    public static BankAccount__c withdraw(Id accountId, Decimal amount) {
    try {
        BankAccount__c acc = [SELECT Amount__c 
                                FROM BankAccount__c 
                                WHERE Id = :accountId FOR UPDATE];
        if (acc.Amount__c >= amount) {
            acc.Amount__c -= amount;
            update acc;
        } else {
            throw new AuraHandledException('Insufficient funds');
        }
        return acc;
    } catch (Exception e) {
        throw new AuraHandledException('Error: ' + e.getMessage());
    }
}   


}
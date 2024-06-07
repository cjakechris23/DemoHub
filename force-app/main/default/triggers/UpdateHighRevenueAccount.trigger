trigger UpdateHighRevenueAccount on Account (after insert) {
    
    // Text to append to the Account name
    String textToAppend = ' Test'; // Change this value as needed
    
    // List to hold Accounts to be updated
    List<Account> accountsToUpdate = new List<Account>();
    
    // Iterate through the trigger records
    for (Account acc : Trigger.new) {
        // Check if the Name field is not null or empty
        if (String.isNotBlank(acc.Name)) {
            // Append " Test" to the existing name
            acc.Name += textToAppend;
        }
        else {
            // If Name is null or empty, set it to "Test"
            acc.Name = 'Test';
        }
        accountsToUpdate.add(acc);
    }
    
    // Update the Accounts to apply the new name
    if (!accountsToUpdate.isEmpty()) {
        update accountsToUpdate;
    }
}
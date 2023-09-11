document.getElementById("startButton").addEventListener("click", function() {
    let mentee = document.getElementById("menteeDropdown").value;
    let activity = document.getElementById("activityDropdown").value;
    let details = mentee + ' ' + activity;
    let startTime = new Date().toISOString();

    // Assuming you've set up the Google Sheets API and OAuth2
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'A2', // Assuming A1 contains headers
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        values: [[startTime, '', '', '', details]]
    }).then(function(response) {
        console.log('Data written!');
    });
});

document.getElementById("stopButton").addEventListener("click", function() {
    let endTime = new Date().toISOString();

    // Get the last row with start time but empty end time
    // Assuming you've set up the Google Sheets API and OAuth2
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'B2:B' // End Time column
    }).then(function(response) {
        let rows = response.result.values;
        let lastRowIndex = rows.length;

        // Update end time
        gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: 'YOUR_SPREADSHEET_ID',
            range: 'B' + (lastRowIndex + 1), 
            valueInputOption: 'RAW',
            values: [[endTime]]
        }).then(function(response) {
            console.log('End time recorded!');
        });
    });
});

/**
 * RSVP backend for the wedding website (Google Apps Script).
 * This receives RSVP submissions and appends them as rows to your Google Sheet.
 *
 * SETUP (one time, ~10 min) — full walkthrough in SETUP-GUIDE.md:
 *   1. Create a new Google Sheet (sheets.new). This is your live RSVP dashboard.
 *   2. In that sheet: Extensions ▸ Apps Script.
 *   3. Delete the sample code, paste THIS entire file, click Save.
 *   4. Deploy ▸ New deployment ▸ type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   5. Authorize when prompted. Copy the Web app URL it gives you.
 *   6. Paste that URL into index.html → CONFIG.rsvpEndpoint.
 *
 * To see responses: just open the Sheet. Each RSVP is a new row.
 */

var SHEET_NAME = 'RSVPs';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // avoid two submissions writing at once
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // write a header row the first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Attending', 'Party Size', 'Events', 'Meal', 'Song Request', 'Message']);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      d.name || '',
      d.email || '',
      d.attending || '',
      d.guests || '',
      d.events || '',
      d.meal || '',
      d.song || '',
      d.message || ''
    ]);

    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// lets you open the Web app URL in a browser to confirm it's live
function doGet() {
  return json({ result: 'ok', message: 'RSVP endpoint is live.' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

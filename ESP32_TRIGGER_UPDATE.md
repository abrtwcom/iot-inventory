# ESP32 Master Code Update - Add Trigger Scan Feature

You need to add this trigger detection code to your ESP32 Master to listen for scan requests from the Receiver Portal.

## Add this near the top of your ESP32 code (after Firebase initialization):

```cpp
// Add this variable to track trigger state
bool scanTriggered = false;
unsigned long lastTriggerCheck = 0;
const unsigned long TRIGGER_CHECK_INTERVAL = 1000; // Check every 1 second
```

## Add this function to check for trigger:

```cpp
// Check if receiver requested a scan
bool checkTriggerScan() {
  String path = "/warehouse/scanner/trigger_scan";
  
  if (Firebase.getBool(firebaseData, path + "/requested")) {
    if (firebaseData.boolData()) {
      Serial.println("=== SCAN TRIGGERED BY RECEIVER ===");
      return true;
    }
  }
  return false;
}
```

## Update your loop() function:

Replace your current `loop()` with this updated version:

```cpp
void loop() {
  // Check for trigger scan every second
  if (millis() - lastTriggerCheck > TRIGGER_CHECK_INTERVAL) {
    lastTriggerCheck = millis();
    scanTriggered = checkTriggerScan();
  }
  
  // Send heartbeat to Firebase
  updateScannerStatus("online");
  
  // If scan is triggered OR periodic scan time (every 30 seconds)
  static unsigned long lastPeriodicScan = 0;
  bool shouldScan = scanTriggered || (millis() - lastPeriodicScan > 30000);
  
  if (shouldScan) {
    if (scanTriggered) {
      Serial.println("=== EXECUTING TRIGGERED SCAN ===");
      updateScannerStatus("scanning");
    }
    
    // Scan for all slaves
    for (int i = 0; i < NUM_SLAVES; i++) {
      scanAndDetectSlave(SLAVES[i], i);
      delay(2000);  // small delay before next slave
      updateScannerStatus("online");
    }
    
    Serial.println("Scan cycle complete.");
    
    // Reset trigger flag after scan
    if (scanTriggered) {
      String path = "/warehouse/scanner/trigger_scan";
      Firebase.setBool(firebaseData, path + "/requested", false);
      scanTriggered = false;
      Serial.println("=== TRIGGERED SCAN COMPLETE ===");
    }
    
    lastPeriodicScan = millis();
    delay(5000);  // Wait 5 seconds before next cycle
  }
  
  // Optional: Check WiFi connection periodically
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected! Attempting reconnection...");
    connectToWiFi();
  }
}
```

## Important Notes:

1. **Database Structure**: Make sure your Firebase Realtime Database has this structure:
   ```
   warehouse/
     scanner/
       status: "online" | "scanning"
       last_seen: timestamp
       trigger_scan/
         requested: true/false
         requested_by: "receiver@email.com"
         requested_at: "2024-01-15T10:30:00Z"
     current_status/
       ESP32_Slave1/
         present: true/false
         last_seen: timestamp
         rssi: -65
       ESP32_Slave2/
         present: true/false
         last_seen: timestamp
         rssi: -72
       ESP32_Slave3/
         present: true/false
         last_seen: timestamp
         rssi: -100
     detections/
       [timestamp]/
         deviceName: "ESP32_Slave1"
         detected: true/false
         rssi: -65
         timestamp: 1705320000000
         scannerId: "WAREHOUSE_MASTER_001"
   ```

2. **Slave Device Names**: Make sure your ESP32 slaves are advertising with names exactly matching:
   - `ESP32_Slave1`
   - `ESP32_Slave2`
   - `ESP32_Slave3`

3. **Testing**: After uploading the updated code:
   - Open Receiver Portal
   - Click "Verify Bluetooth" button
   - ESP32 should detect the trigger and start scanning immediately
   - Results will appear in the Receiver Portal within 30 seconds


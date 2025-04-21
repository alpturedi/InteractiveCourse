#include <ArduinoBLE.h>
#include "Arduino_LED_Matrix.h"

BLEService ledService("4f0c973c-4a93-4949-b1bc-58940bb33b45");  // Bluetooth® Low Energy LED Service

// Bluetooth® Low Energy LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEByteCharacteristic switchCharacteristic("2A50", BLERead | BLEWrite);
BLEByteCharacteristic distanceCharacteristic("2A57", BLERead | BLEWrite);
BLEByteCharacteristic lightCharacteristic("2A60", BLERead | BLEWrite);

const int ledPin = LED_BUILTIN;  // Built-in LED pin
const int buzzerPin = 5;  //pin for piezo buzzer

ArduinoLEDMatrix matrix;


//Initialize the array to use for the LED matrix with zeros
uint8_t frame[8][12] = {
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
};

//We get distance and light as byte
byte distance, light;

void setup() {
  Serial.begin(9600);

  //Wait for the serial to be initialized. Coming from sample code.
  while (!Serial)
    ;

  //Set the LED matrix
  matrix.begin();


  // set LED pin to output mode
  pinMode(ledPin, OUTPUT);

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting Bluetooth® Low Energy module failed!");

    while (1)
      ;
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("LED");
  BLE.setAdvertisedService(ledService);

  // add the characteristic to the service
  ledService.addCharacteristic(switchCharacteristic);
  ledService.addCharacteristic(distanceCharacteristic);
  ledService.addCharacteristic(lightCharacteristic);

  // add service
  BLE.addService(ledService);

  // set the initial value for the characeristic:
  switchCharacteristic.writeValue(0);
  distanceCharacteristic.writeValue(0);
  lightCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("BLE Peripheral");
}

void loop() {
  // listen for Bluetooth® Low Energy peripherals to connect:
  BLEDevice central = BLE.central();
  
  

  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());

    // while the central is still connected to peripheral:
    while (central.connected()) {
      // if the remote device wrote to the characteristic,
      // use the value to control the LED:
      if (switchCharacteristic.written()) {
        if (switchCharacteristic.value()) {  // any value other than 0
          Serial.println("LED on");
          digitalWrite(ledPin, HIGH);  // will turn the LED on
        } else {                       // a 0 value
          Serial.println(F("LED off"));
          digitalWrite(ledPin, LOW);  // will turn the LED off
        }
      }

      if (distanceCharacteristic.written()) {
        Serial.print("Distance :");
        distance = distanceCharacteristic.value();
        Serial.println(distance);

        //If distance is greater than 10, turn on the buzzer
        if (distance > 10) {
          Serial.println("Distance exc");
          tone(buzzerPin, 392);
        } else {
          // digitalWrite(buzzerPin, LOW);
          noTone(buzzerPin);
        }
      }


      if (lightCharacteristic.written()) {
        Serial.print("Light :");
        light = lightCharacteristic.value();
        Serial.println(light);

        //Light value was around 50 to 110 so we subtracted 10 and
        //LED matrix has almost same amount of LEDs so we turn on that many
        for(int i=0; i<8; i++){
          for(int j=0; j<12; j++){
            if((light-10)>((i*12)+j)){
              frame[i][j]=1;
            }else{
              frame[i][j]=0;
            }
          }
        }
        matrix.renderBitmap(frame,8,12);
      }
    }

    // when the central disconnects, print it out:
    Serial.print(("Disconnected from central: "));
    Serial.println(central.address());
  }
}

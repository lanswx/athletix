#include <Wire.h>
#include <math.h>

const int MPU_ADDR = 0x68; 
const int BMP_ADDR = 0x76; 
const int PULSE_PIN = 34;  

uint16_t dig_T1;
int16_t  dig_T2, dig_T3;

float signalValue = 2200.0; 

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Wire.begin(21, 22);
  delay(100);

  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B); 
  Wire.write(0);    
  Wire.endTransmission(true);

  Wire.beginTransmission(BMP_ADDR);
  Wire.write(0xF4); 
  Wire.write(0x2F); 
  Wire.endTransmission(true);

  Wire.beginTransmission(BMP_ADDR);
  Wire.write(0x88);
  Wire.endTransmission(false);
  Wire.requestFrom(BMP_ADDR, 6, true);
  dig_T1 = (Wire.read() | (Wire.read() << 8));
  dig_T2 = (Wire.read() | (Wire.read() << 8));
  dig_T3 = (Wire.read() | (Wire.read() << 8));
}

void loop() {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B); 
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 6, true);
  int16_t axRaw = (Wire.read() << 8) | Wire.read();
  int16_t ayRaw = (Wire.read() << 8) | Wire.read();
  int16_t azRaw = (Wire.read() << 8) | Wire.read();
  
  float ax = (float)axRaw / 16384.0;
  float ay = (float)ayRaw / 16384.0;

  Wire.beginTransmission(BMP_ADDR);
  Wire.write(0xFA); 
  Wire.endTransmission(false);
  Wire.requestFrom(BMP_ADDR, 3, true);
  long adc_T = ((long)Wire.read() << 12) | ((long)Wire.read() << 4) | (Wire.read() >> 4);
  long var1 = ((((adc_T >> 3) - ((long)dig_T1 << 1))) * ((long)dig_T2)) >> 11;
  long var2 = (((((adc_T >> 4) - ((long)dig_T1)) * ((adc_T >> 4) - ((long)dig_T1))) >> 12) * ((long)dig_T3)) >> 14;
  float bmpTemp = ((var1 + var2) * 5 + 128) >> 8;
  bmpTemp = bmpTemp / 100.0;

  int rawPulse = analogRead(PULSE_PIN);
  signalValue = (signalValue * 0.98) + (rawPulse * 0.02); 
  float pulseWave = rawPulse - signalValue;               

  Serial.print("Pulse_Wave:"); Serial.print(pulseWave);
  Serial.print(",");
  Serial.print("BMP_Temp:");   Serial.print(bmpTemp); 
  Serial.print(",");
  Serial.print("Nakon_X:");    Serial.print(ax * 50); 
  Serial.print(",");
  Serial.print("Nakon_Y:");    Serial.println(ay * 50); 

  delay(100); 
}

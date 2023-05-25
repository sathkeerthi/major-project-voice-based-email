""" 
Google authentication not possible for third party apps
https://support.google.com/accounts/answer/6010255?sjid=7775547259714085257-AP#zippy=%2Cif-less-secure-app-access-is-off-for-your-account
"""
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import speech_recognition as sr
import time
import pyttsx3
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import os
from playsound import playsound
from gtts import gTTS
from email.header import decode_header


from CONSTANTS import EMAIL_ID, PASSWORD, LANGUAGE

option = Options()
# option.add_experimental_option("debuggerAddress","localhost:9222")
# driver=uc.Chrome(use_subprocess=True)
ser = Service("C:\\Users\\syagni1947\\Desktop\\chromedriver.exe")
# op = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=ser, options=option)

driver.maximize_window()

engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

recognizer = sr.Recognizer()
microphone = sr.Microphone()

def speak(query):
    engine.say(query)
    engine.runAndWait()

def SpeakText(command, langinp=LANGUAGE):
    """
    Text to Speech using GTTS

    Args:
        command (str): Text to speak
        langinp (str, optional): Output language. Defaults to "en".
    """
    if langinp == "": langinp = "en"
    tts = gTTS(text=command, lang=langinp)
    tts.save("~tempfile01.mp3")
    playsound("~tempfile01.mp3")
    print(command)
    os.remove("~tempfile01.mp3")

def speech_to_text():
    """
    Speech to text

    Returns:
        str: Returns transcripted text
    """
    r = sr.Recognizer()
    try:
        with sr.Microphone() as source2:
            r.adjust_for_ambient_noise(source2, duration=0.2)
            audio2 = r.listen(source2)
            MyText = r.recognize_google(audio2)
            print("You said: "+MyText)
            return MyText

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))
        return None

    except sr.UnknownValueError:
        print("unknown error occured")
        return None

def google():
    SpeakText('Opening google..')
    driver.execute_script("window.open('');")
    window_list = driver.window_handles
    driver.switch_to.window(window_list[-1])
    driver.get('https://google.com')

def youtube():
    SpeakText('Opening youtube..')
    driver.execute_script("window.open('');")
    window_list = driver.window_handles
    driver.switch_to.window(window_list[-1])
    driver.get('https://youtube.com')

def gmail():
    SpeakText("Opening gmail...")
    driver.execute_script("window.open('');")
    window_list = driver.window_handles
    driver.switch_to.window(window_list[-1])
    # driver.get('https://gmail.com')
    driver.get('http://localhost:3000')
    SpeakText("Please wait while Gmail loads")
    time.sleep(6)
    while True:
        SpeakText("Choose and speak out the option number for the task you want to perform. Say 1 to compose new mail. Say 2 to read inbox mails. Say 3 to read sent mails. Say exit to quit mail")

        speak("Speak now")
        choice = speech_to_text()

        if choice:

            if choice == '1' or choice.lower() == 'one':
                SpeakText("Your choice is 1. To compose mail")
                composeMail()
            
            elif choice == '2' or choice.lower() == 'too' or choice.lower() == 'two' or choice.lower() == 'to' or choice.lower() == 'tu':
                SpeakText("Your choice is 2. To read inbox mails")
                readInbox()
                
            elif choice == '3' or choice.lower() == 'tree' or choice.lower() == 'three':
                SpeakText("Your choice is 3. To read sent mails")
                readSentMail()

            elif choice == 'exit':
                return None
            
            else: SpeakText("Wrong choice. Please say only the number")

def composeMail():
    element = driver.find_element(By.CLASS_NAME, 'sidebar__compose')
    element.click()

    element = driver.find_element(By.CLASS_NAME, 'composeRecipients')
    element.clear()
    SpeakText("Mention the gmail ID of the persons to whom you want to send a mail. Email IDs should be separated with the word, AND.")
    speak("speak")
    receivers = speech_to_text()
    receivers = receivers.replace("at the rate", "@")
    emails = receivers.split(" and ")
    index = 0
    for email in emails:
        emails[index] = email.replace(" ", "")
        index += 1
    mailList = ' and '.join([str(elem) for elem in emails])
    SpeakText("The mail will be send to " +
              (mailList.lower()) + ". Confirm by saying YES or NO.")
    confirmMailList = speech_to_text()
    if confirmMailList:
        if confirmMailList.lower() != "yes":
            SpeakText("Operation cancelled by the user")
            return 0
    element.send_keys(mailList.lower())


    element = driver.find_element(By.CLASS_NAME, 'composeSubject')
    element.clear()
    while True:
        SpeakText("Tell me the subject...")
        speak("Speak")
        sub = speech_to_text()
        SpeakText("You said  " + sub + ". Confirm by saying YES or NO.")
        confirmMailBody = speech_to_text()
        if confirmMailBody:
            if confirmMailBody.lower() == "yes":
                element.send_keys(sub)
        else:
            SpeakText("Operation cancelled by the user")
            return 0
        break
        
    while True:
        SpeakText("Say your message")
        speak("Speak")
        msg = speech_to_text()

        SpeakText("You said  " + msg + ". Confirm by saying YES or NO.")
        confirmMailBody = speech_to_text()
        if confirmMailBody:
            if confirmMailBody.lower() == "yes":
                submit = driver.find_element(By.CLASS_NAME,"compose__btn");
                submit.click();
                SpeakText("Message sent")
                return 0
            
        else:
            SpeakText("Operation cancelled by the user")
            return 0



time.sleep(3)
SpeakText("Hello master! I am now online..")
if EMAIL_ID == "" and PASSWORD == "":
    SpeakText("Email ID and password of your account should be feeded into the constants file, until then system cannot be accessed.")
    SpeakText("Shutting down...")
else:
    while True:
        SpeakText("What do you want to do?")
        speak("Speak")
        app = speech_to_text()
        if app:    
            app = app.lower()
        
            if "open google" in app:
                google()

            elif "open youtube" in app:
                youtube()
            
            elif "open gmail" in app:
                gmail()
                
            elif "close" in app: 
                SpeakText("Closing tab...")
                driver.close()

            elif "go back" in app:
                driver.back()

            elif "go forward" in app:
                driver.forward()

            elif "exit" in app:
                SpeakText("Goodbye Master!")
                driver.quit()
                break
            else:
                SpeakText("Not a valid command. Please try again")
        
        time.sleep(1)
    

    
    
        
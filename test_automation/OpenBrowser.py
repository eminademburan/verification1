import time
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait

def open_signin_page():
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000")
    return driver

def type_email(driver, email_field, email):
    email_parts = email.split('@')
    email_field.send_keys(email_parts[0])
    action = ActionChains(driver)
    action.key_down(Keys.ALT).send_keys('q').key_up(Keys.ALT).perform()
    email_field.send_keys(email_parts[1])

def type_password(password_field, password):
    password_field.send_keys(password)

def click_login_button(driver):
    login_button = driver.find_element(By.CLASS_NAME, "sign-form-Button")
    login_button.click()

### TEST CASE 1 ###
### When the user clicks on the login button without typing anything on ###
### the email and password fields, an error message should pop below BOTH ###
### of these fields ###

def test_case_1():

    user_email = "email"
    user_password = "password"

    driver = webdriver.Chrome("chromedriver")
    driver.get("http://localhost:3000")

    #click login
    login_button = driver.find_element(By.CLASS_NAME, "sign-form-Button")
    login_button.click()

    error_message = "Email adress should be filled"
    error_msg2 = "Password should be filled"

    errors = driver.find_elements(by=By.CLASS_NAME, value="remember-me")

    for e in errors:
        if e.text == error_message or e.text == error_msg2:
            print('test 1 successful')
            break
        else:
            print('test 1 failed')
            break

    time.sleep(60)
    driver.close()

def check_valid_email(email):

    reg = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if(re.fullmatch(reg, email)):
        print("Valid Email")
    else:
        print("Invalid Email")

def check_valid_phone(phone_number):

    phone_pattern = re.compile("(0|90)?[7-9][0-9]{9}")
    if(phone_pattern.match(phone_number)):
        print("Valid Phone Number")
    else:
        print("Invalid Phone Number")

def test_case_2():

    driver = webdriver.Chrome("chromedriver")
    driver.get("http://localhost:3000")


def main():
    driver = open_signin_page()

    email_field = driver.find_element(By.NAME, "")
    password_field = driver.find_element(By.NAME, "")

    user_email = "elifozer@gmail.com"
    user_password = "hellomello3"

    type_email(driver, email_field, user_email)
    type_password(password_field, user_password)

    click_login_button(driver)

    time.sleep(60)
    driver.close()

if __name__ == '__main__':
    #main()
    check_valid_email('elifozerr1@outlook.com')
    check_valid_email('email-invalid')
    check_valid_phone('05064567898')
    check_valid_phone('905064567898')
    check_valid_phone('05064')
    #test_case_1()